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
    description: "RecyClean is a service that makes recycling tracking easier and more rewarding.",
    versionTitle: "Version info",
    currentVersionLabel: "Current version:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Latest update:",
    latestUpdateValue: "November 26, 2025",
    featuresTitle: "Key features",
    features: [
      "AI-powered image analysis for recyclable classification",
      "Recycling activity tracking with a points system",
      "Calendar-based recycling history management",
      "Map search for nearby recycling centers",
      "Multi-language support (English, Korean, Spanish, French)",
      "Offline-capable PWA experience",
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
    description: "재활용 추적을 더 쉽고 보람있게 만드는 서비스 리싸이클린이에요.",
    versionTitle: "버전 정보",
    currentVersionLabel: "현재 버전:",
    currentVersionValue: "0.1.0 (베타)",
    latestUpdateLabel: "최신 업데이트:",
    latestUpdateValue: "2025년 11월 26일",
    featuresTitle: "주요 기능",
    features: [
      "AI 기반 재활용 품목 이미지 분석",
      "재활용 활동 추적 및 포인트 시스템",
      "캘린더 기반 재활용 기록 관리",
      "주변 재활용 센터 지도 검색",
      "다국어 지원 (한국어, 영어, 스페인어, 프랑스어)",
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
      "RecyClean es un servicio que hace que el seguimiento del reciclaje sea más fácil y gratificante.",
    versionTitle: "Información de la versión",
    currentVersionLabel: "Versión actual:",
    currentVersionValue: "0.1.0 (Beta)",
    latestUpdateLabel: "Última actualización:",
    latestUpdateValue: "26 de noviembre de 2025",
    featuresTitle: "Funciones principales",
    features: [
      "Análisis de imágenes con IA para clasificar reciclables",
      "Seguimiento de actividades de reciclaje con sistema de puntos",
      "Gestión del historial mediante calendario",
      "Búsqueda en el mapa de centros de reciclaje cercanos",
      "Soporte multilingüe (inglés, coreano, español, francés)",
      "PWA con funciones sin conexión",
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
      "RecyClean est un service qui rend le suivi du recyclage plus simple et plus gratifiant.",
    versionTitle: "Informations sur la version",
    currentVersionLabel: "Version actuelle :",
    currentVersionValue: "0.1.0 (Bêta)",
    latestUpdateLabel: "Dernière mise à jour :",
    latestUpdateValue: "26 novembre 2025",
    featuresTitle: "Fonctionnalités clés",
    features: [
      "Analyse d'image par IA pour classifier les recyclables",
      "Suivi des activités de recyclage avec système de points",
      "Gestion de l'historique via un calendrier",
      "Carte des centres de recyclage à proximité",
      "Support multilingue (anglais, coréen, espagnol, français)",
      "PWA compatible hors ligne",
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
        question: "My data disappeared",
        answer:
          "All data is stored locally in your browser's localStorage. Clearing browser data, cookies, or switching devices will permanently erase your data with no recovery option. There is no cloud backup—please be cautious when clearing browser storage.",
      },
      issues: {
        question: "The app is not working properly",
        intro: "Try the following troubleshooting steps:",
        stepsTitle: "Troubleshooting steps",
        steps: [
          "Refresh the page or close and reopen the browser",
          "Clear browser cache (Settings > Privacy > Clear browsing data)",
          "Update your browser to the latest version",
          "Try a different browser (Chrome, Edge, Safari recommended)",
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
        description: "Customize app preferences, language, and manage your data",
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
        question: "Q. 데이터가 사라졌어요",
        answer:
          "모든 데이터는 브라우저의 로컬 저장소(localStorage)에 저장돼요. 브라우저 데이터 삭제, 쿠키 삭제, 또는 기기 변경 시 데이터가 영구적으로 삭제되며 복구할 수 없어요. 클라우드 백업이 없으니 브라우저 저장소 삭제 시 주의해주세요.",
      },
      issues: {
        question: "Q. 앱이 제대로 작동하지 않아요",
        intro: "다음 문제 해결 단계를 시도해보세요:",
        stepsTitle: "문제 해결 단계",
        steps: [
          "페이지 새로고침 또는 브라우저 닫고 다시 열기",
          "브라우저 캐시 삭제 (설정 > 개인정보 보호 > 인터넷 사용 기록 삭제)",
          "브라우저를 최신 버전으로 업데이트",
          "다른 브라우저로 시도 (Chrome, Edge, Safari 권장)",
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
      { label: "설정:", description: "앱 환경설정, 언어 변경, 데이터 관리를 해요" },
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
        question: "P. Mis datos desaparecieron",
        answer:
          "Todos los datos se guardan localmente en el localStorage de tu navegador. Borrar datos del navegador, cookies o cambiar de dispositivo eliminará tus datos permanentemente sin recuperación. No hay respaldo en la nube—ten cuidado al limpiar el almacenamiento del navegador.",
      },
      issues: {
        question: "P. La app no funciona correctamente",
        intro: "Prueba estos pasos de solución:",
        stepsTitle: "Pasos de solución",
        steps: [
          "Actualiza la página o cierra y vuelve a abrir el navegador",
          "Borra la caché del navegador (Ajustes > Privacidad > Borrar datos de navegación)",
          "Actualiza tu navegador a la última versión",
          "Prueba con otro navegador (Chrome, Edge, Safari recomendados)",
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
      { label: "Ajustes:", description: "Personaliza preferencias, idioma y gestiona tus datos" },
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
        question: "Q. Mes données ont disparu",
        answer:
          "Toutes les données sont stockées localement dans le localStorage de votre navigateur. Effacer les données du navigateur, les cookies ou changer d'appareil supprimera définitivement vos données sans récupération. Il n'y a pas de sauvegarde cloud—soyez prudent lors du nettoyage du stockage.",
      },
      issues: {
        question: "Q. L'application ne fonctionne pas correctement",
        intro: "Essayez ces étapes de dépannage :",
        stepsTitle: "Étapes de dépannage",
        steps: [
          "Actualisez la page ou fermez et rouvrez le navigateur",
          "Effacez le cache du navigateur (Réglages > Confidentialité > Effacer les données)",
          "Mettez à jour votre navigateur vers la dernière version",
          "Essayez un autre navigateur (Chrome, Edge, Safari recommandés)",
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
        description: "Personnalisez vos préférences, langue et gérez vos données",
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
      "RecyClean is a privacy-first app. All data is stored locally in your browser's localStorage and is never transmitted to any server.",
    collectTitle: "Data stored on your device",
    collectDescription: "The following information is stored in your browser:",
    collect: {
      requiredLabel: "Profile:",
      requiredValue: "Nickname, region preference, join date",
      optionalLabel: "Device permissions:",
      optionalValue: "Location (for recycling center search), push notifications",
      automaticLabel: "Activity data:",
      automaticValue: "Recycling entries with material type, quantity, date, and points earned",
    },
    purposeTitle: "How your data is used",
    purposeList: [
      "All data processing happens locally on your device only",
      "Track recycling activity and calculate points based on material type",
      "Display personalized statistics and environmental impact",
      "Remember your language, theme, and notification preferences",
      "No data is ever sent to external servers or third parties",
    ],
    retentionTitle: "Data retention",
    retentionDescription:
      "Your data remains in your browser's localStorage indefinitely until you delete it. Clearing browser data, cookies, or reinstalling the app will permanently erase all information with no recovery option.",
    deletionTitle: "Delete your data",
    deletionDescription:
      'Use "Reset data" in Settings to permanently erase all local data including your profile and activity history. This action cannot be undone. Also note that clearing browser storage will have the same effect.',
    contactTitle: "Privacy inquiries",
    contactIntro: "For privacy questions contact",
    contactOutro: ".",
  },
  ko: {
    policyTitle: "개인정보 처리방침",
    policyDescription:
      "RecyClean은 프라이버시 우선 앱이에요. 모든 데이터는 브라우저의 로컬 저장소(localStorage)에만 저장되며 서버로 전송되지 않아요.",
    collectTitle: "기기에 저장되는 데이터",
    collectDescription: "브라우저에 다음 정보가 저장돼요:",
    collect: {
      requiredLabel: "프로필:",
      requiredValue: "닉네임, 지역 설정, 가입일",
      optionalLabel: "기기 권한:",
      optionalValue: "위치 정보(재활용 센터 검색용), 푸시 알림",
      automaticLabel: "활동 데이터:",
      automaticValue: "재활용 기록 (품목 유형, 수량, 날짜, 획득 포인트)",
    },
    purposeTitle: "데이터 사용 방식",
    purposeList: [
      "모든 데이터 처리는 사용자 기기 내에서만 이루어져요",
      "재활용 활동 추적 및 품목별 포인트 계산",
      "개인화된 통계 및 환경 기여도 표시",
      "언어, 테마, 알림 설정 기억",
      "외부 서버나 제3자에게 데이터를 절대 전송하지 않아요",
    ],
    retentionTitle: "데이터 보관",
    retentionDescription:
      "데이터는 사용자가 삭제하기 전까지 브라우저의 localStorage에 무기한 보관돼요. 브라우저 데이터 삭제, 쿠키 삭제, 또는 앱 재설치 시 모든 정보가 영구적으로 삭제되며 복구할 수 없어요.",
    deletionTitle: "데이터 삭제",
    deletionDescription:
      '설정 메뉴의 "데이터 초기화"로 프로필과 활동 기록을 포함한 모든 로컬 데이터를 영구 삭제할 수 있어요. 이 작업은 되돌릴 수 없어요. 브라우저 저장소 삭제도 동일한 효과가 있으니 주의해주세요.',
    contactTitle: "문의하기",
    contactIntro: "개인정보 보호 관련 문의는",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    policyTitle: "Política de privacidad",
    policyDescription:
      "RecyClean prioriza tu privacidad. Todos los datos se almacenan localmente en el localStorage de tu navegador y nunca se transmiten a ningún servidor.",
    collectTitle: "Datos almacenados en tu dispositivo",
    collectDescription: "La siguiente información se guarda en tu navegador:",
    collect: {
      requiredLabel: "Perfil:",
      requiredValue: "Alias, preferencia de región, fecha de registro",
      optionalLabel: "Permisos del dispositivo:",
      optionalValue: "Ubicación (para buscar centros de reciclaje), notificaciones push",
      automaticLabel: "Datos de actividad:",
      automaticValue:
        "Registros de reciclaje con tipo de material, cantidad, fecha y puntos ganados",
    },
    purposeTitle: "Cómo se usan tus datos",
    purposeList: [
      "Todo el procesamiento ocurre localmente solo en tu dispositivo",
      "Registrar actividad de reciclaje y calcular puntos según el tipo de material",
      "Mostrar estadísticas personalizadas e impacto ambiental",
      "Recordar tu idioma, tema y preferencias de notificación",
      "Los datos nunca se envían a servidores externos ni terceros",
    ],
    retentionTitle: "Retención de datos",
    retentionDescription:
      "Tus datos permanecen en el localStorage del navegador indefinidamente hasta que los elimines. Borrar datos del navegador, cookies o reinstalar la app eliminará toda la información permanentemente sin recuperación.",
    deletionTitle: "Eliminar datos",
    deletionDescription:
      'Usa "Restablecer datos" en Ajustes para borrar permanentemente todos los datos locales incluyendo tu perfil e historial de actividad. Esta acción no se puede deshacer. También ten en cuenta que limpiar el almacenamiento del navegador tiene el mismo efecto.',
    contactTitle: "Consultas de privacidad",
    contactIntro: "Para preguntas sobre privacidad contacta a",
    contactOutro: ".",
  },
  fr: {
    policyTitle: "Politique de confidentialité",
    policyDescription:
      "RecyClean privilégie la confidentialité. Toutes les données sont stockées localement dans le localStorage de votre navigateur et ne sont jamais transmises à un serveur.",
    collectTitle: "Données stockées sur votre appareil",
    collectDescription: "Les informations suivantes sont enregistrées dans votre navigateur :",
    collect: {
      requiredLabel: "Profil :",
      requiredValue: "Pseudo, préférence de région, date d'inscription",
      optionalLabel: "Autorisations :",
      optionalValue: "Localisation (recherche de centres), notifications push",
      automaticLabel: "Données d'activité :",
      automaticValue: "Entrées de recyclage avec type de matériau, quantité, date et points gagnés",
    },
    purposeTitle: "Utilisation des données",
    purposeList: [
      "Tout le traitement s'effectue uniquement localement sur votre appareil",
      "Suivre l'activité de recyclage et calculer les points selon le type de matériau",
      "Afficher des statistiques personnalisées et votre impact environnemental",
      "Mémoriser votre langue, thème et préférences de notification",
      "Les données ne sont jamais envoyées à des serveurs externes ou tiers",
    ],
    retentionTitle: "Conservation des données",
    retentionDescription:
      "Vos données restent dans le localStorage du navigateur indéfiniment jusqu'à suppression. Effacer les données du navigateur, les cookies ou réinstaller l'app supprimera définitivement toutes les informations sans récupération.",
    deletionTitle: "Supprimer vos données",
    deletionDescription:
      'Utilisez "Réinitialiser les données" dans Réglages pour effacer définitivement toutes les données locales incluant votre profil et historique d\'activité. Cette action est irréversible. Notez aussi que nettoyer le stockage du navigateur a le même effet.',
    contactTitle: "Questions de confidentialité",
    contactIntro: "Pour toute question contactez",
    contactOutro: ".",
  },
};
