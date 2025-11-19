import type { SupportedLanguage } from "shared/i18n/supportedLanguages";

export interface AppInfoCopy {
  description: string;
  versionTitle: string;
  currentVersionLabel: string;
  currentVersionValue: string;
  latestUpdateLabel: string;
  latestUpdateValue: string;
  featuresTitle: string;
  features: string[];
  teamTitle: string;
  companyLabel: string;
  emailLabel: string;
  websiteLabel: string;
  ossTitle: string;
  ossDescription: string;
  termsTitle: string;
  termsDescription: string;
  termsLinkText: string;
  termsSuffix: string;
  copyrightTitle: string;
  copyrightNotice: string;
  copyrightWarning: string;
}

export const APP_INFO_COPY: Record<SupportedLanguage, AppInfoCopy> = {
  en: {
    description:
      "A privacy-first progressive web app that makes recycling tracking easier and more rewarding.",
    versionTitle: "Version info",
    currentVersionLabel: "Current version:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Latest update:",
    latestUpdateValue: "January 2025",
    featuresTitle: "Key features",
    features: [
      "AI-powered image analysis for recyclable classification",
      "Local-first activity tracking with points and streaks",
      "Calendar-based recycling history management",
      "Map search for nearby recycling centers",
      "Offline-capable PWA with no login required",
    ],
    teamTitle: "Team",
    companyLabel: "Developer:",
    emailLabel: "Email:",
    websiteLabel: "Website:",
    ossTitle: "Open-source licenses",
    ossDescription: "This app is built with the following open-source libraries:",
    termsTitle: "Terms of use",
    termsDescription: "You can review the service terms",
    termsLinkText: "here",
    termsSuffix: ".",
    copyrightTitle: "Copyright",
    copyrightNotice: "© 2025 RecyClean Team. All rights reserved.",
    copyrightWarning:
      "All app content is protected by copyright. Do not reproduce or distribute without permission.",
  },
  ko: {
    description: "재활용 추적을 더 쉽고 보람있게 만드는 서비스 리싸이클린입니다.",
    versionTitle: "버전 정보",
    currentVersionLabel: "현재 버전:",
    currentVersionValue: "1.0.3",
    latestUpdateLabel: "최신 업데이트:",
    latestUpdateValue: "2025년 11월 19일",
    featuresTitle: "주요 기능",
    features: [
      "AI 기반 재활용 품목 이미지 분석",
      "재활용 활동 추적 및 포인트 시스템",
      "캘린더 기반 재활용 기록 관리",
      "주변 재활용 센터 지도 검색",
      "오프라인 기능 지원 PWA",
    ],
    teamTitle: "개발팀",
    companyLabel: "개발사:",
    emailLabel: "이메일:",
    websiteLabel: "웹사이트:",
    ossTitle: "오픈소스 라이선스",
    ossDescription: "이 앱은 다음 오픈소스 라이브러리로 만들어졌어요:",
    termsTitle: "이용 약관",
    termsDescription: "서비스 이용약관은",
    termsLinkText: "여기",
    termsSuffix: "에서 확인할 수 있어요.",
    copyrightTitle: "저작권",
    copyrightNotice: "© 2025 RecyClean Team. All rights reserved.",
    copyrightWarning:
      "본 앱의 모든 콘텐츠는 저작권법의 보호를 받으며, 무단 복제 및 배포를 금지해요.",
  },
  es: {
    description:
      "Una app web progresiva que prioriza la privacidad y hace que el seguimiento del reciclaje sea más fácil y gratificante.",
    versionTitle: "Información de la versión",
    currentVersionLabel: "Versión actual:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Última actualización:",
    latestUpdateValue: "enero de 2025",
    featuresTitle: "Funciones principales",
    features: [
      "Análisis de imágenes con IA para clasificar reciclables",
      "Seguimiento local de actividades con puntos y rachas",
      "Gestión del historial mediante calendario",
      "Búsqueda en el mapa de centros de reciclaje cercanos",
      "PWA sin conexión que no requiere inicio de sesión",
    ],
    teamTitle: "Equipo",
    companyLabel: "Desarrollador:",
    emailLabel: "Correo:",
    websiteLabel: "Sitio web:",
    ossTitle: "Licencias de código abierto",
    ossDescription: "Esta app está construida con las siguientes librerías de código abierto:",
    termsTitle: "Términos de uso",
    termsDescription: "Puedes consultar los términos del servicio",
    termsLinkText: "aquí",
    termsSuffix: ".",
    copyrightTitle: "Derechos de autor",
    copyrightNotice: "© 2025 RecyClean Team. Todos los derechos reservados.",
    copyrightWarning:
      "Todo el contenido está protegido por derechos de autor. No se permite la reproducción sin permiso.",
  },
  fr: {
    description:
      "Une app web progressive qui privilégie la confidentialité et facilite le suivi du recyclage de manière plus gratifiante.",
    versionTitle: "Informations sur la version",
    currentVersionLabel: "Version actuelle :",
    currentVersionValue: "0.1.0 (Bêta)",
    latestUpdateLabel: "Dernière mise à jour :",
    latestUpdateValue: "janvier 2025",
    featuresTitle: "Fonctionnalités clés",
    features: [
      "Analyse d'image par IA pour classifier les recyclables",
      "Suivi local des activités avec points et séries",
      "Gestion de l'historique via un calendrier",
      "Carte des centres de recyclage à proximité",
      "PWA hors ligne sans connexion requise",
    ],
    teamTitle: "Équipe",
    companyLabel: "Éditeur :",
    emailLabel: "E-mail :",
    websiteLabel: "Site web :",
    ossTitle: "Licences open source",
    ossDescription: "Cette application utilise les bibliothèques open source suivantes :",
    termsTitle: "Conditions d'utilisation",
    termsDescription: "Vous pouvez consulter les conditions du service",
    termsLinkText: "ici",
    termsSuffix: ".",
    copyrightTitle: "Droits d'auteur",
    copyrightNotice: "© 2025 RecyClean Team. Tous droits réservés.",
    copyrightWarning:
      "L'ensemble du contenu est protégé par le droit d'auteur. Reproduction ou diffusion interdite.",
  },
};

export interface HelpCopy {
  faqTitle: string;
  faq: {
    points: { question: string; answer: string };
    analysis: { question: string; answer: string };
    centers: { question: string; answer: string };
    dataLoss: { question: string; answer: string };
    issues: {
      question: string;
      intro: string;
      stepsTitle: string;
      steps: string[];
      outro: string;
    };
  };
  guideTitle: string;
  guideItems: { label: string; description: string }[];
  contactTitle: string;
  contactIntro: string;
  contactOutro: string;
}

export const HELP_COPY: Record<SupportedLanguage, HelpCopy> = {
  en: {
    faqTitle: "Frequently asked questions (FAQ)",
    faq: {
      points: {
        question: "How are points earned?",
        answer:
          "Record each recycling activity to earn points automatically. Different materials award different points (1-10 per item). Maintain daily streaks for bonus points.",
      },
      analysis: {
        question: "How do I use image analysis?",
        answer:
          "Open the Analyze tab, tap the camera icon or choose a gallery photo. The AI will classify the item and show recycling instructions. Only recyclable items can be saved to your activity log.",
      },
      centers: {
        question: "How do I find recycling centers?",
        answer:
          "In the Map tab you can search for nearby centers. Grant location permission for more accurate results based on your current position.",
      },
      dataLoss: {
        question: "My data disappeared",
        answer:
          "All data is stored in browser localStorage. Clearing browser cache/cookies or switching devices will erase your data permanently with no recovery option. Backup is not available—please be cautious.",
      },
      issues: {
        question: "The app is not working properly",
        intro: "Try the following troubleshooting steps:",
        stepsTitle: "Troubleshooting steps",
        steps: [
          "Force close the app and reopen it",
          "Clear browser cache (Settings > Privacy > Clear browsing data)",
          "Update your browser to the latest version",
          "Try using a different browser (Chrome, Edge, Safari recommended)",
        ],
        outro: "If the problem continues, contact the support team.",
      },
    },
    guideTitle: "Usage guide",
    guideItems: [
      { label: "Dashboard:", description: "View today's stats and recent activity records" },
      {
        label: "Analyze:",
        description: "Use camera or gallery to identify recyclables with AI",
      },
      { label: "Calendar:", description: "Review and manage monthly recycling history" },
      { label: "Map:", description: "Find nearby centers and check operating hours" },
      {
        label: "Settings:",
        description: "Customize preferences, manage data, and view app information",
      },
    ],
    contactTitle: "Contact us",
    contactIntro: "For additional questions email",
    contactOutro: ". We reply on weekdays 09:00–18:00.",
  },
  ko: {
    faqTitle: "자주 묻는 질문 (FAQ)",
    faq: {
      points: {
        question: "Q. 포인트는 어떻게 적립되나요?",
        answer:
          "재활용 활동을 기록하면 자동으로 포인트가 적립돼요. 품목별로 1-10점이 차등 부여되며, 매일 연속 기록 시 보너스 포인트를 받을 수 있어요.",
      },
      analysis: {
        question: "Q. 이미지 분석은 어떻게 사용하나요?",
        answer:
          "분석 탭에서 카메라 아이콘을 터치하거나 갤러리 사진을 선택하세요. AI가 재활용 가능 여부와 분리배출 방법을 알려드려요. 재활용 가능한 품목만 활동 기록에 저장할 수 있어요.",
      },
      centers: {
        question: "Q. 재활용 센터는 어떻게 찾나요?",
        answer:
          "지도 탭에서 주변 재활용 센터를 검색할 수 있어요. 위치 권한을 허용하면 현재 위치 기반으로 더 정확한 결과를 제공해드려요.",
      },
      dataLoss: {
        question: "Q. 데이터가 사라졌어요",
        answer:
          "모든 데이터는 브라우저에 저장돼요. 브라우저 캐시/쿠키 삭제나 기기 변경 시 데이터가 영구적으로 삭제되며 복구할 수 없어요. 백업 기능이 없으니 주의해주세요.",
      },
      issues: {
        question: "Q. 앱이 제대로 작동하지 않아요",
        intro: "다음 문제 해결 단계를 시도해보세요:",
        stepsTitle: "문제 해결 단계",
        steps: [
          "앱을 완전히 종료 후 재실행",
          "브라우저 캐시 삭제 (설정 > 개인정보 보호 > 인터넷 사용 기록 삭제)",
          "브라우저를 최신 버전으로 업데이트",
          "다른 브라우저로 시도 (Chrome, Edge, Safari 권장)",
        ],
        outro: "문제가 지속되면 고객 지원팀에 문의해주세요.",
      },
    },
    guideTitle: "사용 가이드",
    guideItems: [
      { label: "대시보드:", description: "오늘의 통계와 최근 활동 기록을 확인해요" },
      { label: "분석:", description: "카메라나 갤러리로 AI 기반 재활용 품목 판별을 해요" },
      { label: "캘린더:", description: "월별 재활용 기록을 조회하고 관리해요" },
      { label: "지도:", description: "주변 재활용 센터 위치와 운영 시간을 확인해요" },
      { label: "설정:", description: "환경설정, 데이터 관리, 앱 정보를 확인해요" },
    ],
    contactTitle: "문의하기",
    contactIntro: "추가 문의사항이 있으시면",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    faqTitle: "Preguntas frecuentes (FAQ)",
    faq: {
      points: {
        question: "P. ¿Cómo se acumulan los puntos?",
        answer:
          "Registra cada actividad para acumular puntos automáticamente. Cada material otorga 1-10 puntos. Mantén rachas diarias para puntos extra.",
      },
      analysis: {
        question: "P. ¿Cómo uso el análisis de imágenes?",
        answer:
          "Abre la pestaña Analizar, toca el icono de cámara o elige una foto de la galería. La IA clasificará el artículo y mostrará las instrucciones. Solo los reciclables se pueden guardar en tu registro.",
      },
      centers: {
        question: "P. ¿Cómo encuentro centros de reciclaje?",
        answer:
          "En la pestaña Mapa puedes buscar centros cercanos. Permite la ubicación para resultados más precisos basados en tu posición actual.",
      },
      dataLoss: {
        question: "P. Mis datos desaparecieron",
        answer:
          "Todos los datos se guardan en localStorage del navegador. Borrar caché/cookies o cambiar de dispositivo eliminará tus datos permanentemente sin recuperación. No hay respaldo disponible—ten precaución.",
      },
      issues: {
        question: "P. La app no funciona correctamente",
        intro: "Prueba estos pasos de solución:",
        stepsTitle: "Pasos de solución",
        steps: [
          "Cierra la app por completo y ábrela de nuevo",
          "Borra la caché del navegador (Ajustes > Privacidad > Borrar datos de navegación)",
          "Actualiza tu navegador a la última versión",
          "Intenta con otro navegador (Chrome, Edge, Safari recomendados)",
        ],
        outro: "Si el problema continúa, contacta al equipo de soporte.",
      },
    },
    guideTitle: "Guía de uso",
    guideItems: [
      { label: "Panel:", description: "Consulta estadísticas de hoy y registros recientes" },
      {
        label: "Analizar:",
        description: "Usa cámara o galería para identificar reciclables con IA",
      },
      { label: "Calendario:", description: "Revisa y gestiona el historial mensual" },
      { label: "Mapa:", description: "Encuentra centros cercanos y sus horarios" },
      { label: "Ajustes:", description: "Personaliza opciones, gestiona datos y ve información" },
    ],
    contactTitle: "Contáctanos",
    contactIntro: "Si tienes dudas, escribe a",
    contactOutro: ". Respondemos de lunes a viernes de 09:00 a 18:00.",
  },
  fr: {
    faqTitle: "Questions fréquentes (FAQ)",
    faq: {
      points: {
        question: "Q. Comment les points sont-ils attribués ?",
        answer:
          "Enregistrez chaque activité pour gagner des points automatiquement. Chaque matériau rapporte 1-10 points. Maintenez des séries quotidiennes pour des points bonus.",
      },
      analysis: {
        question: "Q. Comment utiliser l'analyse d'image ?",
        answer:
          "Ouvrez l'onglet Analyser, touchez l'icône caméra ou choisissez une photo. L'IA classifiera l'objet et affichera les instructions. Seuls les recyclables peuvent être sauvegardés.",
      },
      centers: {
        question: "Q. Comment trouver les centres de recyclage ?",
        answer:
          "Dans l'onglet Carte, recherchez les centres proches. Autorisez la localisation pour des résultats plus précis selon votre position actuelle.",
      },
      dataLoss: {
        question: "Q. Mes données ont disparu",
        answer:
          "Toutes les données sont stockées dans localStorage du navigateur. Effacer le cache/cookies ou changer d'appareil supprimera vos données définitivement sans récupération. Aucune sauvegarde disponible—soyez prudent.",
      },
      issues: {
        question: "Q. L'application ne fonctionne pas correctement",
        intro: "Essayez ces étapes de dépannage :",
        stepsTitle: "Étapes de dépannage",
        steps: [
          "Fermez complètement l'application puis rouvrez-la",
          "Effacez le cache du navigateur (Réglages > Confidentialité > Effacer les données)",
          "Mettez à jour votre navigateur vers la dernière version",
          "Essayez un autre navigateur (Chrome, Edge, Safari recommandés)",
        ],
        outro: "Si le problème persiste, contactez l'équipe d'assistance.",
      },
    },
    guideTitle: "Guide d'utilisation",
    guideItems: [
      {
        label: "Tableau de bord :",
        description: "Consultez les stats du jour et les derniers enregistrements",
      },
      {
        label: "Analyser :",
        description: "Utilisez la caméra ou la galerie pour identifier les recyclables avec l'IA",
      },
      { label: "Calendrier :", description: "Visualisez et gérez l'historique mensuel" },
      { label: "Carte :", description: "Trouvez les centres proches et leurs horaires" },
      {
        label: "Réglages :",
        description: "Personnalisez, gérez les données et consultez les informations",
      },
    ],
    contactTitle: "Nous contacter",
    contactIntro: "Pour toute question, écrivez à",
    contactOutro: ". Réponse du lundi au vendredi de 09h00 à 18h00.",
  },
};

export interface PrivacyCopy {
  policyTitle: string;
  policyDescription: string;
  collectTitle: string;
  collectDescription: string;
  collect: {
    requiredLabel: string;
    requiredValue: string;
    optionalLabel: string;
    optionalValue: string;
    automaticLabel: string;
    automaticValue: string;
  };
  purposeTitle: string;
  purposeList: string[];
  retentionTitle: string;
  retentionDescription: string;
  deletionTitle: string;
  deletionDescription: string;
  contactTitle: string;
  contactIntro: string;
  contactOutro: string;
}

export const PRIVACY_COPY: Record<SupportedLanguage, PrivacyCopy> = {
  en: {
    policyTitle: "Privacy policy",
    policyDescription:
      "RecyClean is a privacy-first app. All data is stored locally on your device (browser localStorage) and never transmitted to any server.",
    collectTitle: "Data stored on your device",
    collectDescription: "The following information is stored locally in your browser:",
    collect: {
      requiredLabel: "Required:",
      requiredValue: "Nickname",
      optionalLabel: "Device permissions:",
      optionalValue: "Location (for recycling center search), notifications",
      automaticLabel: "Activity data:",
      automaticValue: "Recycling entries, points, streak records, app settings",
    },
    purposeTitle: "How your data is used",
    purposeList: [
      "All data processing happens locally on your device",
      "Track recycling activity and calculate points",
      "Display personalized statistics and insights",
      "Remember your preferences and settings",
      "No data is sent to external servers or third parties",
    ],
    retentionTitle: "Data retention",
    retentionDescription:
      "Your data remains in browser localStorage until you delete it. Clearing browser data or uninstalling the app will permanently erase all information with no recovery option.",
    deletionTitle: "Delete your data",
    deletionDescription:
      'Use "Reset data" in Settings to permanently erase all local data. This action cannot be undone. Be cautious when clearing browser cache or cookies.',
    contactTitle: "Privacy inquiries",
    contactIntro: "For privacy questions contact",
    contactOutro: ".",
  },
  ko: {
    policyTitle: "개인정보 처리방침",
    policyDescription:
      "RecyClean은 프라이버시 우선 앱이에요. 모든 데이터는 사용자의 기기에만 저장돼요.",
    collectTitle: "기기에 저장되는 데이터",
    collectDescription: "브라우저에 다음 정보가 저장돼요:",
    collect: {
      requiredLabel: "필수 항목:",
      requiredValue: "닉네임",
      optionalLabel: "기기 권한:",
      optionalValue: "위치 정보(재활용 센터 검색용), 알림",
      automaticLabel: "활동 데이터:",
      automaticValue: "재활용 기록, 포인트, 스트릭, 앱 설정",
    },
    purposeTitle: "데이터 사용 방식",
    purposeList: [
      "모든 데이터 처리는 사용자 기기 내에서만 이루어져요",
      "재활용 활동 추적 및 포인트 계산",
      "개인화된 통계 및 인사이트 제공",
      "사용자 설정 및 선호사항 기억",
      "외부 서버나 제3자에게 데이터를 전송하지 않아요",
    ],
    retentionTitle: "데이터 보관",
    retentionDescription:
      "데이터는 사용자가 삭제하기 전까지 브라우저에 보관돼요. 브라우저 데이터 삭제나 앱 제거 시 모든 정보가 영구적으로 삭제되며 복구할 수 없어요.",
    deletionTitle: "데이터 삭제",
    deletionDescription:
      '설정 메뉴의 "데이터 초기화"로 모든 로컬 데이터를 영구 삭제할 수 있어요. 이 작업은 되돌릴 수 없으니 신중하게 결정해주세요. 브라우저 캐시나 쿠키 삭제 시에도 주의가 필요해요.',
    contactTitle: "문의하기",
    contactIntro: "개인정보 보호 관련 문의는",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    policyTitle: "Política de privacidad",
    policyDescription:
      "RecyClean prioriza tu privacidad. Todos los datos se almacenan localmente en tu dispositivo (localStorage del navegador) y nunca se transmiten a ningún servidor.",
    collectTitle: "Datos almacenados en tu dispositivo",
    collectDescription: "La siguiente información se guarda localmente en tu navegador:",
    collect: {
      requiredLabel: "Obligatorio:",
      requiredValue: "Alias",
      optionalLabel: "Permisos del dispositivo:",
      optionalValue: "Ubicación (para buscar centros de reciclaje), notificaciones",
      automaticLabel: "Datos de actividad:",
      automaticValue: "Registros de reciclaje, puntos, rachas, ajustes de la app",
    },
    purposeTitle: "Cómo se usan tus datos",
    purposeList: [
      "Todo el procesamiento ocurre localmente en tu dispositivo",
      "Registrar actividad de reciclaje y calcular puntos",
      "Mostrar estadísticas e información personalizada",
      "Recordar tus preferencias y configuración",
      "No se envían datos a servidores externos ni terceros",
    ],
    retentionTitle: "Retención de datos",
    retentionDescription:
      "Tus datos permanecen en localStorage hasta que los elimines. Borrar datos del navegador o desinstalar la app eliminará toda la información permanentemente sin opción de recuperación.",
    deletionTitle: "Eliminar datos",
    deletionDescription:
      'Usa "Restablecer datos" en Ajustes para borrar permanentemente todos los datos locales. Esta acción no se puede deshacer. Ten cuidado al limpiar la caché o las cookies del navegador.',
    contactTitle: "Consultas de privacidad",
    contactIntro: "Para preguntas sobre privacidad contacta a",
    contactOutro: ".",
  },
  fr: {
    policyTitle: "Politique de confidentialité",
    policyDescription:
      "RecyClean privilégie la confidentialité. Toutes les données sont stockées localement sur votre appareil (localStorage du navigateur) et ne sont jamais transmises à un serveur.",
    collectTitle: "Données stockées sur votre appareil",
    collectDescription:
      "Les informations suivantes sont enregistrées localement dans votre navigateur :",
    collect: {
      requiredLabel: "Obligatoire :",
      requiredValue: "Pseudo",
      optionalLabel: "Autorisations :",
      optionalValue: "Localisation (recherche de centres), notifications",
      automaticLabel: "Données d'activité :",
      automaticValue: "Entrées de recyclage, points, séries, paramètres",
    },
    purposeTitle: "Utilisation des données",
    purposeList: [
      "Tout le traitement s'effectue localement sur votre appareil",
      "Suivre l'activité de recyclage et calculer les points",
      "Afficher des statistiques et analyses personnalisées",
      "Mémoriser vos préférences et paramètres",
      "Aucune donnée n'est envoyée à des serveurs ou tiers",
    ],
    retentionTitle: "Conservation des données",
    retentionDescription:
      "Vos données restent dans localStorage jusqu'à suppression. Effacer les données du navigateur ou désinstaller l'app supprimera définitivement toutes les informations sans récupération possible.",
    deletionTitle: "Supprimer vos données",
    deletionDescription:
      'Utilisez "Réinitialiser les données" dans Réglages pour effacer définitivement toutes les données locales. Cette action est irréversible. Attention lors du nettoyage du cache ou des cookies.',
    contactTitle: "Questions de confidentialité",
    contactIntro: "Pour toute question contactez",
    contactOutro: ".",
  },
};
