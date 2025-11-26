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
      "RecyClean helps you track recycling activities with AI-powered classification and cloud sync. Use it without an account or sign in to sync across devices.",
    versionTitle: "Version",
    currentVersionLabel: "Current:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Updated:",
    latestUpdateValue: "November 27, 2025",
    featuresTitle: "Key features",
    features: [
      "Guest mode or account-based cloud sync for your recycling data",
      "AI image analysis to identify materials and earn points",
      "Track streaks, monthly goals, and point history",
      "Find nearby recycling centers on the map",
      "4 languages supported (English, Korean, Spanish, French)",
      "Install as an app for quick access and offline support",
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
    description:
      "RecyClean은 AI 분류와 클라우드 동기화로 재활용 활동을 기록해요. 계정 없이 바로 사용하거나 로그인해서 여러 기기에서 동기화할 수 있어요.",
    versionTitle: "버전",
    currentVersionLabel: "현재:",
    currentVersionValue: "0.1.0 (베타)",
    latestUpdateLabel: "업데이트:",
    latestUpdateValue: "2025년 11월 27일",
    featuresTitle: "주요 기능",
    features: [
      "게스트 모드 또는 계정 기반 클라우드 동기화",
      "AI 이미지 분석으로 품목 판별 및 포인트 적립",
      "연속 기록(스트릭), 월 목표, 포인트 이력 추적",
      "지도에서 주변 재활용 센터 검색",
      "4개 언어 지원 (한국어, 영어, 스페인어, 프랑스어)",
      "앱으로 설치해서 빠르게 접근하고 오프라인에서도 사용",
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
      "RecyClean te ayuda a registrar actividades de reciclaje con clasificación IA y sincronización en la nube. Úsalo sin cuenta o inicia sesión para sincronizar entre dispositivos.",
    versionTitle: "Versión",
    currentVersionLabel: "Actual:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Actualización:",
    latestUpdateValue: "27 de noviembre de 2025",
    featuresTitle: "Funciones principales",
    features: [
      "Modo invitado o sincronización en la nube con cuenta",
      "Análisis de imágenes con IA para identificar materiales y ganar puntos",
      "Seguimiento de rachas, metas mensuales e historial de puntos",
      "Encuentra centros de reciclaje cercanos en el mapa",
      "4 idiomas disponibles (inglés, coreano, español, francés)",
      "Instálalo como app para acceso rápido y uso sin conexión",
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
      "RecyClean vous aide à suivre vos activités de recyclage avec classification IA et synchronisation cloud. Utilisez-le sans compte ou connectez-vous pour synchroniser entre appareils.",
    versionTitle: "Version",
    currentVersionLabel: "Actuelle :",
    currentVersionValue: "0.1.0 (Bêta)",
    latestUpdateLabel: "Mise à jour :",
    latestUpdateValue: "27 novembre 2025",
    featuresTitle: "Fonctionnalités clés",
    features: [
      "Mode invité ou synchronisation cloud avec compte",
      "Analyse d'image IA pour identifier les matériaux et gagner des points",
      "Suivi des séries, objectifs mensuels et historique des points",
      "Trouvez les centres de recyclage proches sur la carte",
      "4 langues disponibles (anglais, coréen, espagnol, français)",
      "Installez comme app pour un accès rapide et une utilisation hors ligne",
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
    guestMode: { question: string; answer: string };
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
    faqTitle: "Frequently asked questions",
    faq: {
      guestMode: {
        question: "Can I use RecyClean without an account?",
        answer:
          "Yes! You can use core features like AI analysis and activity tracking without signing in. Your data stays on this device. Sign in with Kakao to sync across devices and access your history anywhere.",
      },
      points: {
        question: "How are points earned?",
        answer:
          "Each recycling activity earns 1–10 points based on the material. For example: PET bottles (3pt), aluminum cans (4pt), electronics (10pt). Track your points to see your environmental impact grow.",
      },
      analysis: {
        question: "How do I use AI image analysis?",
        answer:
          'Go to the Analyze tab, tap the camera or choose a photo. The AI identifies the item and shows recycling instructions. Tap "Save" to log the activity and earn points.',
      },
      centers: {
        question: "How do I find recycling centers?",
        answer:
          "Open the Map tab to see nearby centers. Allow location access for distance-based results. Each center shows its address, hours, and accepted materials.",
      },
      dataLoss: {
        question: "Will I lose data if I sign out or clear cache?",
        answer:
          "If you're signed in, your data syncs to the cloud and will restore when you sign back in. Guest data is stored locally—clearing cache or switching devices will remove it.",
      },
      issues: {
        question: "The app isn't working properly",
        intro: "Try these quick fixes:",
        stepsTitle: "Troubleshooting steps",
        steps: [
          "Check your internet or VPN connection",
          "Sign out and sign back in",
          "Refresh the page or restart the browser",
          "Clear browser cache in Settings",
          "Update your browser to the latest version",
        ],
        outro: "Still having trouble? Contact our support team below.",
      },
    },
    guideTitle: "Feature guide",
    guideItems: [
      {
        label: "Dashboard:",
        description: "See today's stats, recent activity, and progress at a glance",
      },
      {
        label: "Analyze:",
        description: "Snap or upload a photo to identify recyclables with AI",
      },
      { label: "Calendar:", description: "Review and manage your monthly recycling history" },
      { label: "Map:", description: "Find nearby recycling centers with details and directions" },
      {
        label: "Settings:",
        description: "Manage your account, language, notifications, and privacy",
      },
    ],
    contactTitle: "Need more help?",
    contactIntro: "Email us at",
    contactOutro: " and we'll get back to you.",
  },
  ko: {
    faqTitle: "자주 묻는 질문",
    faq: {
      guestMode: {
        question: "계정 없이도 사용할 수 있나요?",
        answer:
          "네! AI 분석, 활동 기록 등 주요 기능을 로그인 없이 사용할 수 있어요. 데이터는 이 기기에만 저장돼요. 카카오로 로그인하면 여러 기기에서 기록을 동기화하고 어디서든 확인할 수 있어요.",
      },
      points: {
        question: "포인트는 어떻게 적립되나요?",
        answer:
          "재활용 활동마다 품목별로 1~10점이 적립돼요. 예: PET병 3점, 알루미늄 캔 4점, 전자제품 10점. 포인트를 모아 나의 환경 기여도를 확인해보세요.",
      },
      analysis: {
        question: "AI 이미지 분석은 어떻게 사용하나요?",
        answer:
          '분석 탭에서 카메라 아이콘을 터치하거나 갤러리에서 사진을 선택하세요. AI가 품목을 인식하고 분리배출 방법을 알려드려요. "저장"을 눌러 활동을 기록하고 포인트를 받으세요.',
      },
      centers: {
        question: "재활용 센터는 어떻게 찾나요?",
        answer:
          "지도 탭에서 주변 센터를 검색할 수 있어요. 위치 권한을 허용하면 거리순으로 정렬돼요. 각 센터의 주소, 운영시간, 수거 품목을 확인할 수 있어요.",
      },
      dataLoss: {
        question: "로그아웃하거나 캐시를 삭제하면 데이터가 사라지나요?",
        answer:
          "로그인 상태라면 데이터가 클라우드에 동기화되어 있어서 다시 로그인하면 복원돼요. 게스트 모드 데이터는 로컬에 저장되므로 캐시 삭제나 기기 변경 시 삭제될 수 있어요.",
      },
      issues: {
        question: "앱이 제대로 작동하지 않아요",
        intro: "다음을 시도해보세요:",
        stepsTitle: "문제 해결 단계",
        steps: [
          "인터넷 또는 VPN 연결 확인",
          "로그아웃 후 다시 로그인",
          "페이지 새로고침 또는 브라우저 재시작",
          "설정에서 브라우저 캐시 삭제",
          "브라우저를 최신 버전으로 업데이트",
        ],
        outro: "문제가 계속되면 아래로 문의해주세요.",
      },
    },
    guideTitle: "기능 안내",
    guideItems: [
      { label: "대시보드:", description: "오늘의 통계, 최근 활동, 진행 상황을 한눈에 확인" },
      { label: "분석:", description: "사진을 찍거나 업로드해서 AI로 재활용 품목 판별" },
      { label: "캘린더:", description: "월별 재활용 기록 조회 및 관리" },
      { label: "지도:", description: "주변 재활용 센터 위치와 상세 정보 확인" },
      { label: "설정:", description: "계정, 언어, 알림, 프라이버시 관리" },
    ],
    contactTitle: "더 궁금한 점이 있나요?",
    contactIntro: "",
    contactOutro: "으로 문의해주세요.",
  },
  es: {
    faqTitle: "Preguntas frecuentes",
    faq: {
      guestMode: {
        question: "¿Puedo usar RecyClean sin cuenta?",
        answer:
          "¡Sí! Puedes usar funciones principales como análisis con IA y registro de actividades sin iniciar sesión. Tus datos se quedan en este dispositivo. Inicia sesión con Kakao para sincronizar entre dispositivos y acceder a tu historial desde cualquier lugar.",
      },
      points: {
        question: "¿Cómo se acumulan los puntos?",
        answer:
          "Cada actividad de reciclaje otorga 1–10 puntos según el material. Por ejemplo: botellas PET (3pt), latas de aluminio (4pt), electrónicos (10pt). Acumula puntos para ver crecer tu impacto ambiental.",
      },
      analysis: {
        question: "¿Cómo uso el análisis de imágenes con IA?",
        answer:
          'Ve a la pestaña Analizar, toca la cámara o elige una foto. La IA identifica el artículo y muestra instrucciones de reciclaje. Toca "Guardar" para registrar la actividad y ganar puntos.',
      },
      centers: {
        question: "¿Cómo encuentro centros de reciclaje?",
        answer:
          "Abre la pestaña Mapa para ver centros cercanos. Permite el acceso a ubicación para resultados por distancia. Cada centro muestra su dirección, horario y materiales aceptados.",
      },
      dataLoss: {
        question: "¿Perderé datos si cierro sesión o borro la caché?",
        answer:
          "Si tienes sesión iniciada, tus datos se sincronizan en la nube y se restaurarán al volver a entrar. Los datos de invitado se guardan localmente; borrar caché o cambiar de dispositivo los eliminará.",
      },
      issues: {
        question: "La app no funciona correctamente",
        intro: "Prueba estas soluciones rápidas:",
        stepsTitle: "Pasos de solución",
        steps: [
          "Comprueba tu conexión a internet o VPN",
          "Cierra sesión y vuelve a entrar",
          "Actualiza la página o reinicia el navegador",
          "Borra la caché del navegador en Ajustes",
          "Actualiza tu navegador a la última versión",
        ],
        outro: "¿Sigues con problemas? Contacta a nuestro equipo de soporte abajo.",
      },
    },
    guideTitle: "Guía de funciones",
    guideItems: [
      {
        label: "Panel:",
        description: "Ve las estadísticas de hoy, actividad reciente y progreso de un vistazo",
      },
      {
        label: "Analizar:",
        description: "Toma o sube una foto para identificar reciclables con IA",
      },
      { label: "Calendario:", description: "Revisa y gestiona tu historial mensual de reciclaje" },
      {
        label: "Mapa:",
        description: "Encuentra centros de reciclaje cercanos con detalles y direcciones",
      },
      {
        label: "Ajustes:",
        description: "Gestiona tu cuenta, idioma, notificaciones y privacidad",
      },
    ],
    contactTitle: "¿Necesitas más ayuda?",
    contactIntro: "Escríbenos a",
    contactOutro: " y te responderemos.",
  },
  fr: {
    faqTitle: "Questions fréquentes",
    faq: {
      guestMode: {
        question: "Puis-je utiliser RecyClean sans compte ?",
        answer:
          "Oui ! Vous pouvez utiliser les fonctions principales comme l'analyse IA et le suivi des activités sans vous connecter. Vos données restent sur cet appareil. Connectez-vous avec Kakao pour synchroniser entre appareils et accéder à votre historique partout.",
      },
      points: {
        question: "Comment les points sont-ils attribués ?",
        answer:
          "Chaque activité de recyclage rapporte 1 à 10 points selon le matériau. Par exemple : bouteilles PET (3pt), canettes aluminium (4pt), électronique (10pt). Accumulez des points pour voir grandir votre impact environnemental.",
      },
      analysis: {
        question: "Comment utiliser l'analyse d'image IA ?",
        answer:
          "Allez dans l'onglet Analyser, touchez la caméra ou choisissez une photo. L'IA identifie l'objet et affiche les consignes de recyclage. Touchez « Enregistrer » pour sauvegarder l'activité et gagner des points.",
      },
      centers: {
        question: "Comment trouver les centres de recyclage ?",
        answer:
          "Ouvrez l'onglet Carte pour voir les centres proches. Autorisez la localisation pour des résultats par distance. Chaque centre affiche son adresse, ses horaires et les matériaux acceptés.",
      },
      dataLoss: {
        question: "Vais-je perdre mes données si je me déconnecte ou vide le cache ?",
        answer:
          "Si vous êtes connecté, vos données se synchronisent dans le cloud et seront restaurées à la reconnexion. Les données invité sont stockées localement ; vider le cache ou changer d'appareil les supprimera.",
      },
      issues: {
        question: "L'application ne fonctionne pas correctement",
        intro: "Essayez ces solutions rapides :",
        stepsTitle: "Étapes de dépannage",
        steps: [
          "Vérifiez votre connexion internet ou VPN",
          "Déconnectez-vous puis reconnectez-vous",
          "Actualisez la page ou redémarrez le navigateur",
          "Effacez le cache du navigateur dans Réglages",
          "Mettez à jour votre navigateur vers la dernière version",
        ],
        outro: "Toujours un problème ? Contactez notre équipe ci-dessous.",
      },
    },
    guideTitle: "Guide des fonctionnalités",
    guideItems: [
      {
        label: "Tableau de bord :",
        description: "Consultez vos stats du jour, activité récente et progression d'un coup d'œil",
      },
      {
        label: "Analyser :",
        description: "Prenez ou importez une photo pour identifier les recyclables avec l'IA",
      },
      {
        label: "Calendrier :",
        description: "Parcourez et gérez votre historique mensuel de recyclage",
      },
      {
        label: "Carte :",
        description: "Trouvez les centres de recyclage proches avec détails et itinéraires",
      },
      {
        label: "Réglages :",
        description: "Gérez votre compte, langue, notifications et confidentialité",
      },
    ],
    contactTitle: "Besoin d'aide supplémentaire ?",
    contactIntro: "Écrivez-nous à",
    contactOutro: " et nous vous répondrons.",
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
  thirdPartyTitle: string;
  thirdPartyDescription: string;
  rightsTitle: string;
  rightsDescription: string;
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
      "RecyClean uses a hybrid cloud and local approach. When signed in, your profile, plans, and recycling stats sync to our servers. Local storage keeps session tokens and preferences for faster loading. You can also use core features without an account—data stays on your device.",
    collectTitle: "Data we collect",
    collectDescription: "We collect the following based on your account or device:",
    collect: {
      requiredLabel: "Account & profile:",
      requiredValue: "Account ID, nickname, region, and secure tokens to keep you signed in",
      optionalLabel: "Device permissions:",
      optionalValue: "Location (for nearby centers), notifications (for reminders)",
      automaticLabel: "Activity data:",
      automaticValue:
        "Recycling plans, calendar entries, and AI results you save. Signed-in data syncs across devices; guest data stays local.",
    },
    purposeTitle: "How we use your data",
    purposeList: [
      "Keep you signed in securely with encrypted tokens",
      "Sync your recycling history and stats across devices",
      "Analyze images to provide recycling guidance",
      "Remember your language, theme, and notification settings",
      "Show nearby recycling centers when you allow location access",
    ],
    thirdPartyTitle: "Third-party sharing",
    thirdPartyDescription:
      "We do not sell or share your personal data with third parties for advertising. Data is only processed by our secure servers and trusted infrastructure providers.",
    rightsTitle: "Your rights",
    rightsDescription:
      "You can access, update, or delete your data anytime. Use Settings to edit your profile or reset local data. For full account deletion, contact us via email.",
    retentionTitle: "Data retention",
    retentionDescription:
      "Server data is kept while your account is active and deleted upon request. Local data (tokens, preferences) remains until you sign out or clear browser storage.",
    deletionTitle: "Delete your data",
    deletionDescription:
      'Use "Reset data" in Settings to clear local cache and sign out. To delete your account and all server data, email privacy@recyclean.com.',
    contactTitle: "Contact us",
    contactIntro: "For privacy questions, reach out to",
    contactOutro: ".",
  },
  ko: {
    policyTitle: "개인정보 처리방침",
    policyDescription:
      "RecyClean은 클라우드와 로컬 저장소를 함께 활용해요. 로그인하면 프로필·계획·재활용 통계가 서버에 동기화되고, 브라우저에는 세션 토큰과 환경설정만 저장돼요. 계정 없이도 기본 기능을 사용할 수 있으며, 이 경우 데이터는 기기에만 남아요.",
    collectTitle: "수집하는 데이터",
    collectDescription: "계정 또는 기기에 따라 다음 정보를 수집해요:",
    collect: {
      requiredLabel: "계정·프로필:",
      requiredValue: "계정 ID, 닉네임, 지역, 로그인 유지를 위한 보안 토큰",
      optionalLabel: "기기 권한:",
      optionalValue: "위치 정보(주변 센터 검색), 알림(리마인더 수신)",
      automaticLabel: "활동 데이터:",
      automaticValue:
        "저장한 재활용 계획, 캘린더 기록, AI 분석 결과. 로그인 상태면 기기 간 동기화되고, 게스트 모드면 이 기기에만 저장돼요.",
    },
    purposeTitle: "데이터 사용 방식",
    purposeList: [
      "암호화된 토큰으로 안전하게 로그인 상태 유지",
      "재활용 기록과 통계를 기기 간 동기화",
      "이미지 분석으로 분리배출 가이드 제공",
      "언어, 테마, 알림 설정 기억",
      "위치 권한 허용 시 주변 재활용 센터 안내",
    ],
    thirdPartyTitle: "제3자 제공",
    thirdPartyDescription:
      "개인정보를 광고 목적으로 제3자에게 판매하거나 공유하지 않아요. 데이터는 보안 서버와 신뢰할 수 있는 인프라에서만 처리돼요.",
    rightsTitle: "사용자 권리",
    rightsDescription:
      "언제든 데이터를 열람·수정·삭제할 수 있어요. 설정에서 프로필을 편집하거나 로컬 데이터를 초기화할 수 있고, 계정 전체 삭제는 이메일로 요청해주세요.",
    retentionTitle: "데이터 보관",
    retentionDescription:
      "서버 데이터는 계정이 활성인 동안 보관하며 요청 시 삭제해요. 로컬 데이터(토큰, 설정)는 로그아웃하거나 브라우저 저장소를 비울 때까지 유지돼요.",
    deletionTitle: "데이터 삭제",
    deletionDescription:
      '설정의 "데이터 초기화"로 로컬 캐시를 지우고 로그아웃할 수 있어요. 계정과 서버 데이터 전체 삭제는 privacy@recyclean.com으로 요청해주세요.',
    contactTitle: "문의하기",
    contactIntro: "개인정보 관련 문의는",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    policyTitle: "Política de privacidad",
    policyDescription:
      "RecyClean combina almacenamiento en la nube y local. Al iniciar sesión, tu perfil, planes y estadísticas se sincronizan con nuestros servidores. El almacenamiento local guarda tokens y preferencias para cargar más rápido. También puedes usar las funciones principales sin cuenta: los datos se quedan en tu dispositivo.",
    collectTitle: "Datos que recopilamos",
    collectDescription: "Recopilamos lo siguiente según tu cuenta o dispositivo:",
    collect: {
      requiredLabel: "Cuenta y perfil:",
      requiredValue: "ID de cuenta, alias, región y tokens seguros para mantener la sesión",
      optionalLabel: "Permisos del dispositivo:",
      optionalValue: "Ubicación (para centros cercanos), notificaciones (para recordatorios)",
      automaticLabel: "Datos de actividad:",
      automaticValue:
        "Planes de reciclaje, entradas de calendario y resultados de IA que guardes. Los datos con sesión se sincronizan entre dispositivos; los datos de invitado se quedan locales.",
    },
    purposeTitle: "Cómo usamos tus datos",
    purposeList: [
      "Mantener tu sesión activa de forma segura con tokens cifrados",
      "Sincronizar tu historial y estadísticas de reciclaje entre dispositivos",
      "Analizar imágenes para ofrecer guías de reciclaje",
      "Recordar tu idioma, tema y configuración de notificaciones",
      "Mostrar centros de reciclaje cercanos cuando permitas la ubicación",
    ],
    thirdPartyTitle: "Compartir con terceros",
    thirdPartyDescription:
      "No vendemos ni compartimos tus datos personales con terceros para publicidad. Los datos solo se procesan en nuestros servidores seguros y proveedores de infraestructura de confianza.",
    rightsTitle: "Tus derechos",
    rightsDescription:
      "Puedes acceder, actualizar o eliminar tus datos en cualquier momento. Usa Ajustes para editar tu perfil o restablecer datos locales. Para eliminar tu cuenta por completo, contáctanos por correo.",
    retentionTitle: "Retención de datos",
    retentionDescription:
      "Los datos del servidor se conservan mientras tu cuenta esté activa y se eliminan a petición. Los datos locales (tokens, preferencias) permanecen hasta que cierres sesión o borres el almacenamiento del navegador.",
    deletionTitle: "Eliminar tus datos",
    deletionDescription:
      'Usa "Restablecer datos" en Ajustes para borrar la caché local y cerrar sesión. Para eliminar tu cuenta y todos los datos del servidor, escribe a privacy@recyclean.com.',
    contactTitle: "Contacto",
    contactIntro: "Para consultas de privacidad, escribe a",
    contactOutro: ".",
  },
  fr: {
    policyTitle: "Politique de confidentialité",
    policyDescription:
      "RecyClean combine stockage cloud et local. Une fois connecté, votre profil, vos plans et vos statistiques se synchronisent sur nos serveurs. Le stockage local conserve les jetons et préférences pour un chargement rapide. Vous pouvez aussi utiliser les fonctions principales sans compte : vos données restent sur cet appareil.",
    collectTitle: "Données collectées",
    collectDescription:
      "Nous collectons les informations suivantes selon votre compte ou appareil :",
    collect: {
      requiredLabel: "Compte et profil :",
      requiredValue:
        "Identifiant de compte, pseudo, région et jetons sécurisés pour maintenir la session",
      optionalLabel: "Autorisations :",
      optionalValue: "Localisation (pour les centres proches), notifications (pour les rappels)",
      automaticLabel: "Données d'activité :",
      automaticValue:
        "Plans de recyclage, entrées de calendrier et résultats IA enregistrés. Les données connectées se synchronisent entre appareils ; les données invité restent locales.",
    },
    purposeTitle: "Utilisation des données",
    purposeList: [
      "Maintenir votre session active en toute sécurité avec des jetons chiffrés",
      "Synchroniser votre historique et vos statistiques de recyclage entre appareils",
      "Analyser les images pour fournir des conseils de recyclage",
      "Mémoriser votre langue, thème et paramètres de notification",
      "Afficher les centres de recyclage proches lorsque vous autorisez la localisation",
    ],
    thirdPartyTitle: "Partage avec des tiers",
    thirdPartyDescription:
      "Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins publicitaires. Les données sont uniquement traitées par nos serveurs sécurisés et fournisseurs d'infrastructure de confiance.",
    rightsTitle: "Vos droits",
    rightsDescription:
      "Vous pouvez accéder, modifier ou supprimer vos données à tout moment. Utilisez Réglages pour éditer votre profil ou réinitialiser les données locales. Pour supprimer entièrement votre compte, contactez-nous par e-mail.",
    retentionTitle: "Conservation des données",
    retentionDescription:
      "Les données serveur sont conservées tant que votre compte est actif et supprimées sur demande. Les données locales (jetons, préférences) restent jusqu'à la déconnexion ou le nettoyage du stockage du navigateur.",
    deletionTitle: "Supprimer vos données",
    deletionDescription:
      "Utilisez « Réinitialiser les données » dans Réglages pour effacer le cache local et vous déconnecter. Pour supprimer votre compte et toutes les données serveur, écrivez à privacy@recyclean.com.",
    contactTitle: "Contact",
    contactIntro: "Pour toute question de confidentialité, contactez",
    contactOutro: ".",
  },
};
