import { describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import * as fs from "node:fs";
import * as ts from "typescript";
import { enTranslation } from "../src/shared/i18n/locales/en";
import { koTranslation } from "../src/shared/i18n/locales/ko";
import { esTranslation } from "../src/shared/i18n/locales/es";
import { frTranslation } from "../src/shared/i18n/locales/fr";
import { SUPPORTED_LANGUAGES } from "../src/shared/i18n/supportedLanguages";
import { resources } from "../src/shared/i18n/resources";

type TranslationRecord = Record<string, unknown>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.resolve(ROOT_DIR, "src");

const locales = {
  en: enTranslation,
  ko: koTranslation,
  es: esTranslation,
  fr: frTranslation,
} as const;

function isPlainObject(value: unknown): value is TranslationRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function flattenKeys(input: TranslationRecord, parentKey = ""): string[] {
  const entries: string[] = [];
  for (const [key, value] of Object.entries(input)) {
    const composedKey = parentKey ? `${parentKey}.${key}` : key;
    if (isPlainObject(value)) {
      entries.push(...flattenKeys(value, composedKey));
      continue;
    }
    entries.push(composedKey);
  }
  return entries;
}

function collectSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry.name) || entry.name.endsWith(".d.ts")) {
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

type WildcardPattern = {
  pattern: string;
  source: string;
};

function templateToPattern(node: ts.TemplateExpression): string {
  let pattern = node.head.text;
  node.templateSpans.forEach((span) => {
    pattern += "*";
    pattern += span.literal.text;
  });
  return pattern;
}

function wildcardToRegex(pattern: string): RegExp {
  const placeholder = "__WILDCARD__";
  const withPlaceholder = pattern.replace(/\*/g, placeholder);
  const escaped = withPlaceholder.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const normalized = escaped.replace(new RegExp(placeholder, "g"), ".*");
  return new RegExp(`^${normalized}$`);
}

function collectUsedTranslationKeys() {
  const usedKeys = new Set<string>();
  const unmatchedPatterns: WildcardPattern[] = [];

  const sourceFiles = collectSourceFiles(SRC_DIR);
  for (const filePath of sourceFiles) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
      filePath,
      fileContent,
      ts.ScriptTarget.Latest,
      true,
      filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    const visit = (node: ts.Node) => {
      if (ts.isStringLiteralLike(node)) {
        if (referenceKeys.has(node.text)) {
          usedKeys.add(node.text);
        }
      } else if (ts.isTemplateExpression(node)) {
        const pattern = templateToPattern(node);
        const regex = wildcardToRegex(pattern);
        const matches = referenceKeyList.filter((key) => regex.test(key));
        if (matches.length > 0) {
          matches.forEach((match) => usedKeys.add(match));
        } else {
          const literalParts = pattern.split("*").filter(Boolean);
          const hasPotentialMatch =
            literalParts.length > 0 &&
            referenceKeyList.some((key) => {
              let cursor = 0;
              return literalParts.every((part) => {
                const foundIndex = key.indexOf(part, cursor);
                if (foundIndex === -1) {
                  return false;
                }
                cursor = foundIndex + part.length;
                return true;
              });
            });
          if (hasPotentialMatch) {
            unmatchedPatterns.push({
              pattern,
              source: `${filePath}:${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}`,
            });
          }
        }
      }
      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  return { usedKeys, unmatchedPatterns };
}

const referenceKeys = new Set(flattenKeys(enTranslation));
const referenceKeyList = [...referenceKeys];

describe("i18n translations", () => {
  it("keeps all locales in sync", () => {
    const referenceList = [...referenceKeys].sort();
    for (const [locale, translation] of Object.entries(locales)) {
      const keys = flattenKeys(translation).sort();
      if (
        keys.length !== referenceList.length ||
        !keys.every((key, index) => key === referenceList[index])
      ) {
        const missing = referenceList.filter((key) => !keys.includes(key));
        const extra = keys.filter((key) => !referenceList.includes(key));
        throw new Error(
          `Locale ${locale} is missing keys: ${missing.join(", ") || "없음"}, extra keys: ${extra.join(", ") || "없음"}`,
        );
      }
    }
  });

  it("registers every locale everywhere", () => {
    const localeCodes = Object.keys(locales).sort();
    expect(localeCodes).toEqual([...SUPPORTED_LANGUAGES].sort());
    expect(Object.keys(resources).sort()).toEqual(localeCodes);
  });

  it("rejects missing or unused translation keys", () => {
    const { usedKeys, unmatchedPatterns } = collectUsedTranslationKeys();
    expect(unmatchedPatterns).toEqual([]);

    const missingKeys = [...usedKeys].filter((key) => !referenceKeys.has(key));
    expect(missingKeys).toEqual([]);

    const unusedKeys = [...referenceKeys].filter((key) => !usedKeys.has(key));
    expect(unusedKeys).toEqual([]);
  });
});
