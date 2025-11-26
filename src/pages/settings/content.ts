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
      "RecyClean tracks your recycling with cloud sync, AI classification, and multi-device access.",
    versionTitle: "Version info",
    currentVersionLabel: "Current version:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Latest update:",
    latestUpdateValue: "November 26, 2025",
    featuresTitle: "Key features",
    features: [
      "Account-based cloud sync for dashboard, plans, and calendar with automatic refreshes",
      "AI-powered image analysis that matches materials and awards points",
      "Goal tracking with streaks, monthly targets, and point history",
      "Map search for nearby recycling centers with region-aware results",
      "Multi-language experience (English, Korean, Spanish, French) with in-app switcher",
      "Installable PWA with light offline cache for recently visited screens",
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
    description: "클라우드 동기화와 AI 분류로 여러 기기에서 재활용을 추적하는 서비스예요.",
    versionTitle: "버전 정보",
    currentVersionLabel: "현재 버전:",
    currentVersionValue: "0.1.0 (베타)",
    latestUpdateLabel: "최신 업데이트:",
    latestUpdateValue: "2025년 11월 26일",
    featuresTitle: "주요 기능",
    features: [
      "계정 기반 클라우드 동기화로 대시보드·계획·캘린더를 자동 최신화",
      "AI 이미지 분석으로 재활용 품목을 매칭하고 포인트를 부여",
      "연속 기록(스트릭), 월 목표, 포인트 이력을 한눈에 확인",
      "지역 기반 재활용 센터 지도 검색",
      "앱 내 언어 전환이 가능한 다국어 지원 (한국어/영어/스페인어/프랑스어)",
      "최근 화면을 보존하는 가벼운 오프라인 캐시를 제공하는 설치형 PWA",
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
      "RecyClean facilita tu reciclaje con sincronización en la nube, clasificación por IA y acceso en varios dispositivos.",
    versionTitle: "Información de la versión",
    currentVersionLabel: "Versión actual:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Última actualización:",
    latestUpdateValue: "26 de noviembre de 2025",
    featuresTitle: "Funciones principales",
    features: [
      "Sincronización en la nube por cuenta para tablero, planes y calendario con actualizaciones automáticas",
      "Análisis de imágenes con IA que identifica materiales y asigna puntos",
      "Seguimiento de streaks, metas mensuales e historial de puntos",
      "Búsqueda en el mapa de centros de reciclaje cercanos según tu región",
      "Experiencia multilingüe (inglés, coreano, español, francés) con selector en la app",
      "PWA instalable con caché ligera sin conexión para pantallas recientes",
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
      "RecyClean suit votre recyclage avec synchronisation cloud, classification IA et accès multi-appareils.",
    versionTitle: "Informations sur la version",
    currentVersionLabel: "Version actuelle :",
    currentVersionValue: "0.1.0 (Bêta)",
    latestUpdateLabel: "Dernière mise à jour :",
    latestUpdateValue: "26 novembre 2025",
    featuresTitle: "Fonctionnalités clés",
    features: [
      "Synchronisation cloud par compte pour tableau de bord, plans et calendrier avec mises à jour automatiques",
      "Analyse d'image par IA pour reconnaître les matériaux et attribuer des points",
      "Suivi des séries, objectifs mensuels et historique des points",
      "Recherche cartographique des centres de recyclage proches selon la région",
      "Expérience multilingue (anglais, coréen, espagnol, français) avec sélecteur intégré",
      "PWA installable avec cache hors ligne léger pour les écrans récents",
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
          "Record each recycling activity to earn points automatically. Different materials award 1-10 points (e.g., PET bottles: 3pt, aluminum cans: 4pt, electronics: 10pt). Accumulate points to track your environmental impact.",
      },
      analysis: {
        question: "How do I use image analysis?",
        answer:
          "Open the Analyze tab, tap the camera icon or choose a photo from your gallery. The AI will identify the item and display recycling guidelines. Only recyclable items can be saved to your activity log with earned points.",
      },
      centers: {
        question: "How do I find recycling centers?",
        answer:
          "In the Map tab, you can search for nearby recycling centers. Enable location permission for more accurate results based on your current position. Each center shows its address and accepted materials.",
      },
      dataLoss: {
        question: "I signed out or cleared my cache—did I lose my data?",
        answer:
          "If you are signed in, your dashboard, plans, and calendar are stored on RecyClean servers and will resync after you log in again. Clearing browser data only removes the local cache and access tokens. In guest mode, items saved in the local activity log live only on this device; clearing browser storage or switching devices removes them.",
      },
      issues: {
        question: "The app is not working properly",
        intro: "Try the following troubleshooting steps:",
        stepsTitle: "Troubleshooting steps",
        steps: [
          "Check your network connection or VPN and try again",
          "Log out and sign back in to refresh your session",
          "Refresh the page or close and reopen the browser",
          "Clear browser cache (Settings > Privacy > Clear browsing data)",
          "Update your browser to the latest version",
        ],
        outro: "If the problem persists, please contact our support team.",
      },
    },
    guideTitle: "Usage guide",
    guideItems: [
      {
        label: "Dashboard:",
        description: "View today's recycling stats and recent activity at a glance",
      },
      {
        label: "Analyze:",
        description: "Capture or upload photos to identify recyclables using AI",
      },
      { label: "Calendar:", description: "Browse and manage your monthly recycling history" },
      { label: "Map:", description: "Find nearby recycling centers with location and details" },
      {
        label: "Settings:",
        description: "Manage account sync, language, notifications, and privacy settings",
      },
    ],
    contactTitle: "Contact us",
    contactIntro: "For additional questions, email",
    contactOutro: ".",
  },
  ko: {
    faqTitle: "자주 묻는 질문 (FAQ)",
    faq: {
      points: {
        question: "Q. 포인트는 어떻게 적립되나요?",
        answer:
          "재활용 활동을 기록하면 자동으로 포인트가 적립돼요. 품목별로 1-10점이 차등 부여돼요 (예: PET병 3점, 알루미늄 캔 4점, 전자제품 10점). 포인트를 모아 환경 기여도를 확인해보세요.",
      },
      analysis: {
        question: "Q. 이미지 분석은 어떻게 사용하나요?",
        answer:
          "분석 탭에서 카메라 아이콘을 터치하거나 갤러리에서 사진을 선택하세요. AI가 품목을 인식하고 분리배출 방법을 알려드려요. 재활용 가능한 품목만 포인트와 함께 활동 기록에 저장할 수 있어요.",
      },
      centers: {
        question: "Q. 재활용 센터는 어떻게 찾나요?",
        answer:
          "지도 탭에서 주변 재활용 센터를 검색할 수 있어요. 위치 권한을 허용하면 현재 위치 기반으로 더 정확한 결과를 제공해요. 각 센터의 주소와 수거 품목도 확인할 수 있어요.",
      },
      dataLoss: {
        question: "Q. 로그아웃했거나 캐시를 지웠는데 데이터가 사라졌나요?",
        answer:
          "로그인 상태라면 대시보드·계획·캘린더 데이터는 RecyClean 서버에 저장되어 있으며 다시 로그인하면 동기화돼요. 브라우저 데이터 삭제 시 로컬 캐시와 접근 토큰만 지워져요. 게스트 모드에서 저장한 활동 기록은 기기에만 남으므로 브라우저 저장소 삭제나 기기 변경 시 사라져요.",
      },
      issues: {
        question: "Q. 앱이 제대로 작동하지 않아요",
        intro: "다음 문제 해결 단계를 시도해보세요:",
        stepsTitle: "문제 해결 단계",
        steps: [
          "네트워크 연결이나 VPN을 확인하고 다시 시도",
          "세션 갱신을 위해 로그아웃 후 다시 로그인",
          "페이지 새로고침 또는 브라우저 닫고 다시 열기",
          "브라우저 캐시 삭제 (설정 > 개인정보 보호 > 인터넷 사용 기록 삭제)",
          "브라우저를 최신 버전으로 업데이트",
        ],
        outro: "문제가 지속되면 고객 지원팀에 문의해주세요.",
      },
    },
    guideTitle: "사용 가이드",
    guideItems: [
      { label: "대시보드:", description: "오늘의 재활용 통계와 최근 활동을 한눈에 확인해요" },
      { label: "분석:", description: "사진을 찍거나 업로드해서 AI로 재활용 품목을 판별해요" },
      { label: "캘린더:", description: "월별 재활용 기록을 조회하고 관리해요" },
      { label: "지도:", description: "주변 재활용 센터 위치와 상세 정보를 확인해요" },
      { label: "설정:", description: "계정 동기화, 언어, 알림, 프라이버시를 관리해요" },
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
          "Registra cada actividad para acumular puntos automáticamente. Cada material otorga 1-10 puntos (ej: botellas PET: 3pt, latas de aluminio: 4pt, electrónicos: 10pt). Acumula puntos para ver tu impacto ambiental.",
      },
      analysis: {
        question: "P. ¿Cómo uso el análisis de imágenes?",
        answer:
          "Abre la pestaña Analizar, toca el icono de cámara o elige una foto de la galería. La IA identificará el artículo y mostrará las instrucciones de reciclaje. Solo los reciclables se pueden guardar con los puntos ganados.",
      },
      centers: {
        question: "P. ¿Cómo encuentro centros de reciclaje?",
        answer:
          "En la pestaña Mapa puedes buscar centros cercanos. Activa el permiso de ubicación para resultados más precisos basados en tu posición actual. Cada centro muestra su dirección y materiales aceptados.",
      },
      dataLoss: {
        question: "P. Cerré sesión o borré la caché, ¿perdí mis datos?",
        answer:
          "Si estás conectado, tu tablero, planes y calendario se guardan en los servidores de RecyClean y se sincronizarán al iniciar sesión otra vez. Borrar los datos del navegador solo elimina la caché local y los tokens de acceso. En modo invitado, los elementos guardados en el registro local viven solo en este dispositivo; borrar el almacenamiento del navegador o cambiar de dispositivo los elimina.",
      },
      issues: {
        question: "P. La app no funciona correctamente",
        intro: "Prueba estos pasos de solución:",
        stepsTitle: "Pasos de solución",
        steps: [
          "Comprueba la conexión de red o VPN y vuelve a intentar",
          "Cierra sesión y vuelve a entrar para refrescar la sesión",
          "Actualiza la página o cierra y vuelve a abrir el navegador",
          "Borra la caché del navegador (Ajustes > Privacidad > Borrar datos de navegación)",
          "Actualiza tu navegador a la última versión",
        ],
        outro: "Si el problema persiste, contacta a nuestro equipo de soporte.",
      },
    },
    guideTitle: "Guía de uso",
    guideItems: [
      {
        label: "Panel:",
        description: "Ve las estadísticas de reciclaje y actividad reciente de un vistazo",
      },
      {
        label: "Analizar:",
        description: "Captura o sube fotos para identificar reciclables con IA",
      },
      { label: "Calendario:", description: "Explora y gestiona tu historial mensual de reciclaje" },
      {
        label: "Mapa:",
        description: "Encuentra centros de reciclaje cercanos con ubicación y detalles",
      },
      {
        label: "Ajustes:",
        description: "Gestiona la sincronización de la cuenta, idioma, notificaciones y privacidad",
      },
    ],
    contactTitle: "Contáctanos",
    contactIntro: "Si tienes preguntas, escribe a",
    contactOutro: ".",
  },
  fr: {
    faqTitle: "Questions fréquentes (FAQ)",
    faq: {
      points: {
        question: "Q. Comment les points sont-ils attribués ?",
        answer:
          "Enregistrez chaque activité pour gagner des points automatiquement. Chaque matériau rapporte 1-10 points (ex : bouteilles PET : 3pt, canettes aluminium : 4pt, électronique : 10pt). Accumulez des points pour suivre votre impact environnemental.",
      },
      analysis: {
        question: "Q. Comment utiliser l'analyse d'image ?",
        answer:
          "Ouvrez l'onglet Analyser, touchez l'icône caméra ou choisissez une photo de votre galerie. L'IA identifiera l'objet et affichera les consignes de recyclage. Seuls les recyclables peuvent être sauvegardés avec les points gagnés.",
      },
      centers: {
        question: "Q. Comment trouver les centres de recyclage ?",
        answer:
          "Dans l'onglet Carte, recherchez les centres proches. Activez la localisation pour des résultats plus précis selon votre position. Chaque centre affiche son adresse et les matériaux acceptés.",
      },
      dataLoss: {
        question: "Q. Je me suis déconnecté ou j'ai vidé le cache : ai-je perdu mes données ?",
        answer:
          "Si vous êtes connecté, votre tableau de bord, vos plans et votre calendrier sont stockés sur les serveurs RecyClean et se resynchroniseront après reconnexion. Vider les données du navigateur supprime seulement le cache local et les jetons d'accès. En mode invité, les éléments enregistrés dans le journal local restent uniquement sur cet appareil ; effacer le stockage du navigateur ou changer d'appareil les supprime.",
      },
      issues: {
        question: "Q. L'application ne fonctionne pas correctement",
        intro: "Essayez ces étapes de dépannage :",
        stepsTitle: "Étapes de dépannage",
        steps: [
          "Vérifiez votre connexion réseau ou VPN puis réessayez",
          "Déconnectez-vous puis reconnectez-vous pour rafraîchir la session",
          "Actualisez la page ou fermez et rouvrez le navigateur",
          "Effacez le cache du navigateur (Réglages > Confidentialité > Effacer les données)",
          "Mettez à jour votre navigateur vers la dernière version",
        ],
        outro: "Si le problème persiste, contactez notre équipe d'assistance.",
      },
    },
    guideTitle: "Guide d'utilisation",
    guideItems: [
      {
        label: "Tableau de bord :",
        description: "Consultez vos stats de recyclage et activité récente d'un coup d'œil",
      },
      {
        label: "Analyser :",
        description: "Prenez ou importez des photos pour identifier les recyclables avec l'IA",
      },
      {
        label: "Calendrier :",
        description: "Parcourez et gérez votre historique mensuel de recyclage",
      },
      {
        label: "Carte :",
        description: "Trouvez les centres de recyclage proches avec localisation et détails",
      },
      {
        label: "Réglages :",
        description:
          "Gérez la synchronisation du compte, la langue, les notifications et la confidentialité",
      },
    ],
    contactTitle: "Nous contacter",
    contactIntro: "Pour toute question, écrivez à",
    contactOutro: ".",
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
      "RecyClean uses a hybrid cloud + local cache approach. When you sign in, your profile, plans, and recycling stats are stored on RecyClean servers; localStorage keeps only session tokens, preferences, and recent cached items for faster loading.",
    collectTitle: "Data we store",
    collectDescription: "We store the following for your account or device:",
    collect: {
      requiredLabel: "Account & profile:",
      requiredValue:
        "Account ID, nickname, region, and authentication tokens to keep you signed in",
      optionalLabel: "Device permissions:",
      optionalValue: "Location (for map results), push notifications (when available)",
      automaticLabel: "Activity data:",
      automaticValue:
        "Recycling plans, calendar entries, and AI classification results you choose to save, with timestamps. In guest mode these stay on this device; when signed in they sync to your account.",
    },
    purposeTitle: "How your data is used",
    purposeList: [
      "Authenticate you and keep your session active (tokens saved locally and refreshed securely)",
      "Store and sync your recycling plans, dashboard stats, and calendar across devices",
      "Process AI image analysis to provide recycling guidance",
      "Remember your language, theme, and notification preferences on this device",
      "Provide location-aware map results and optional alerts when you grant permission",
    ],
    retentionTitle: "Data retention",
    retentionDescription:
      "Server data is kept while your account is active and removed when you request deletion. Local cache (tokens, preferences, recent cached screens) remains until you log out, reset data, or clear browser storage.",
    deletionTitle: "Delete your data",
    deletionDescription:
      'Use "Reset data" in Settings to clear local cache and sign out. To delete your account or server-side data, email privacy@recyclean.com and we will process the removal.',
    contactTitle: "Privacy inquiries",
    contactIntro: "For privacy questions contact",
    contactOutro: ".",
  },
  ko: {
    policyTitle: "개인정보 처리방침",
    policyDescription:
      "RecyClean은 클라우드+로컬 캐시 하이브리드 방식이에요. 로그인하면 프로필·계획·재활용 통계가 RecyClean 서버에 저장되고, 브라우저 localStorage에는 세션 토큰·환경설정·최근 화면 캐시만 남아요.",
    collectTitle: "저장되는 데이터",
    collectDescription: "계정 또는 기기를 위해 다음 정보를 저장해요:",
    collect: {
      requiredLabel: "계정·프로필:",
      requiredValue: "계정 ID, 닉네임, 지역, 로그인 유지를 위한 인증 토큰",
      optionalLabel: "기기 권한:",
      optionalValue: "위치 정보(지도 결과 개선), 푸시 알림(지원되는 경우)",
      automaticLabel: "활동 데이터:",
      automaticValue:
        "사용자가 저장한 재활용 계획, 캘린더 항목, AI 분류 결과와 시간 정보. 게스트 모드에서는 기기에만 저장되고, 로그인하면 계정에 동기화돼요.",
    },
    purposeTitle: "데이터 사용 방식",
    purposeList: [
      "보안 토큰으로 로그인 상태를 유지하고 세션을 보호해요",
      "재활용 계획·대시보드 통계·캘린더를 기기 간 동기화해요",
      "업로드한 이미지의 AI 분석 결과로 분리배출 가이드를 제공해요",
      "이 기기에서 언어, 테마, 알림 설정을 기억해요",
      "권한을 허용하면 위치 기반 지도 결과와 알림을 제공해요",
    ],
    retentionTitle: "데이터 보관",
    retentionDescription:
      "서버 데이터는 계정이 활성인 동안 보관하며 삭제 요청 시 제거해요. 로컬 캐시(토큰, 설정, 최근 화면)는 로그아웃·데이터 초기화·브라우저 저장소 삭제 시 지워져요.",
    deletionTitle: "데이터 삭제",
    deletionDescription:
      '설정의 "데이터 초기화"로 로컬 캐시를 지우고 로그아웃할 수 있어요. 서버에 저장된 계정 데이터 삭제를 원하면 privacy@recyclean.com 으로 요청해주세요.',
    contactTitle: "문의하기",
    contactIntro: "개인정보 보호 관련 문의는",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    policyTitle: "Política de privacidad",
    policyDescription:
      "RecyClean usa un modelo híbrido de nube + caché local. Al iniciar sesión, tu perfil, planes y estadísticas se guardan en los servidores de RecyClean; el localStorage solo mantiene los tokens de sesión, preferencias y pantallas recientes para cargar más rápido.",
    collectTitle: "Datos que almacenamos",
    collectDescription: "Almacenamos lo siguiente para tu cuenta o dispositivo:",
    collect: {
      requiredLabel: "Cuenta y perfil:",
      requiredValue:
        "ID de cuenta, alias, región y tokens de autenticación para mantener la sesión",
      optionalLabel: "Permisos del dispositivo:",
      optionalValue:
        "Ubicación (para resultados del mapa), notificaciones push (cuando estén disponibles)",
      automaticLabel: "Datos de actividad:",
      automaticValue:
        "Planes de reciclaje, entradas de calendario y resultados de clasificación por IA que guardes, con marcas de tiempo. En modo invitado se quedan en este dispositivo; al iniciar sesión se sincronizan con tu cuenta.",
    },
    purposeTitle: "Cómo se usan tus datos",
    purposeList: [
      "Autenticarte y mantener tu sesión activa (tokens guardados localmente y renovados de forma segura)",
      "Almacenar y sincronizar tus planes, estadísticas del tablero y calendario entre dispositivos",
      "Procesar el análisis de imágenes con IA para ofrecer guías de reciclaje",
      "Recordar idioma, tema y preferencias de notificaciones en este dispositivo",
      "Ofrecer resultados de mapa basados en ubicación y alertas opcionales cuando otorgas permiso",
    ],
    retentionTitle: "Retención de datos",
    retentionDescription:
      "Los datos en el servidor se conservan mientras tu cuenta esté activa y se eliminan cuando solicites la supresión. La caché local (tokens, preferencias, pantallas recientes) permanece hasta que cierres sesión, restablezcas datos o borres el almacenamiento del navegador.",
    deletionTitle: "Eliminar datos",
    deletionDescription:
      'Usa "Restablecer datos" en Ajustes para borrar la caché local y cerrar sesión. Para eliminar la cuenta o los datos en el servidor, escribe a privacy@recyclean.com y gestionaremos la eliminación.',
    contactTitle: "Consultas de privacidad",
    contactIntro: "Para preguntas sobre privacidad contacta a",
    contactOutro: ".",
  },
  fr: {
    policyTitle: "Politique de confidentialité",
    policyDescription:
      "RecyClean adopte un modèle hybride cloud + cache local. Lorsque vous êtes connecté, votre profil, vos plans et vos statistiques de recyclage sont stockés sur les serveurs RecyClean ; le localStorage ne conserve que les jetons de session, vos préférences et les écrans récents pour un chargement rapide.",
    collectTitle: "Données que nous stockons",
    collectDescription:
      "Nous stockons les informations suivantes pour votre compte ou votre appareil :",
    collect: {
      requiredLabel: "Compte et profil :",
      requiredValue:
        "Identifiant de compte, pseudo, région et jetons d'authentification pour maintenir la session",
      optionalLabel: "Autorisations :",
      optionalValue:
        "Localisation (pour les résultats de la carte), notifications push (si disponibles)",
      automaticLabel: "Données d'activité :",
      automaticValue:
        "Plans de recyclage, entrées de calendrier et résultats de classification IA que vous enregistrez, avec horodatage. En mode invité, ils restent sur cet appareil ; une fois connecté, ils se synchronisent avec votre compte.",
    },
    purposeTitle: "Utilisation des données",
    purposeList: [
      "Vous authentifier et sécuriser votre session (jetons conservés localement et renouvelés en toute sécurité)",
      "Synchroniser vos plans, statistiques du tableau de bord et calendrier entre appareils",
      "Traiter l'analyse d'images IA pour fournir des consignes de recyclage",
      "Mémoriser la langue, le thème et les préférences de notification sur cet appareil",
      "Fournir des résultats cartographiques basés sur la localisation et des alertes optionnelles lorsque vous l'autorisez",
    ],
    retentionTitle: "Conservation des données",
    retentionDescription:
      "Les données serveur sont conservées tant que votre compte est actif et supprimées sur demande. Le cache local (jetons, préférences, écrans récents) reste jusqu'à la déconnexion, la réinitialisation des données ou le nettoyage du stockage du navigateur.",
    deletionTitle: "Supprimer vos données",
    deletionDescription:
      'Utilisez "Réinitialiser les données" dans Réglages pour effacer le cache local et vous déconnecter. Pour supprimer le compte ou les données côté serveur, contactez privacy@recyclean.com et nous traiterons la suppression.',
    contactTitle: "Questions de confidentialité",
    contactIntro: "Pour toute question contactez",
    contactOutro: ".",
  },
};
