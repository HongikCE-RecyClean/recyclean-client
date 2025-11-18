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
    description: "A smart recycling assistant that makes sustainable habits easier and more fun.",
    versionTitle: "Version info",
    currentVersionLabel: "Current version:",
    currentVersionValue: "1.0.0",
    latestUpdateLabel: "Latest update:",
    latestUpdateValue: "January 2025",
    featuresTitle: "Key features",
    features: [
      "AI-powered image analysis for recyclables",
      "Track recycling activity and earn points",
      "Calendar-based history management",
      "Map search for nearby recycling centers",
      "Personalized stats and performance reports",
    ],
    teamTitle: "Team",
    companyLabel: "Developer:",
    emailLabel: "Email:",
    websiteLabel: "Website:",
    ossTitle: "Open-source licenses",
    ossDescription: "This app uses the following open-source libraries:",
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
      "지구를 위한 작은 실천, 재활용을 더 쉽고 재미있게 만드는 스마트 재활용 도우미예요.",
    versionTitle: "버전 정보",
    currentVersionLabel: "현재 버전:",
    currentVersionValue: "1.0.0",
    latestUpdateLabel: "최신 업데이트:",
    latestUpdateValue: "2025년 1월",
    featuresTitle: "주요 기능",
    features: [
      "AI 기반 재활용 품목 이미지 분석",
      "재활용 활동 추적 및 포인트 적립",
      "캘린더 기반 활동 기록 관리",
      "주변 재활용 센터 지도 검색",
      "개인화된 통계 및 성과 리포트",
    ],
    teamTitle: "개발팀",
    companyLabel: "개발사:",
    emailLabel: "이메일:",
    websiteLabel: "웹사이트:",
    ossTitle: "오픈소스 라이선스",
    ossDescription: "이 앱은 다음 오픈소스 라이브러리를 사용해요:",
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
    description: "Un asistente inteligente que hace que reciclar sea más fácil y entretenido.",
    versionTitle: "Información de la versión",
    currentVersionLabel: "Versión actual:",
    currentVersionValue: "1.0.0",
    latestUpdateLabel: "Última actualización:",
    latestUpdateValue: "enero de 2025",
    featuresTitle: "Funciones principales",
    features: [
      "Análisis de imágenes con IA para materiales reciclables",
      "Seguimiento de actividades y puntos acumulados",
      "Gestión del historial mediante calendario",
      "Búsqueda en el mapa de centros de reciclaje cercanos",
      "Estadísticas personalizadas e informes de rendimiento",
    ],
    teamTitle: "Equipo",
    companyLabel: "Desarrollador:",
    emailLabel: "Correo:",
    websiteLabel: "Sitio web:",
    ossTitle: "Licencias de código abierto",
    ossDescription: "Esta app utiliza las siguientes librerías de código abierto:",
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
    description: "Un assistant intelligent qui rend le recyclage plus simple et agréable.",
    versionTitle: "Informations sur la version",
    currentVersionLabel: "Version actuelle :",
    currentVersionValue: "1.0.0",
    latestUpdateLabel: "Dernière mise à jour :",
    latestUpdateValue: "janvier 2025",
    featuresTitle: "Fonctionnalités clés",
    features: [
      "Analyse d'image par IA pour les déchets recyclables",
      "Suivi des activités de recyclage et points cumulés",
      "Gestion de l'historique via un calendrier",
      "Carte des centres de recyclage à proximité",
      "Statistiques personnalisées et rapports de performance",
    ],
    teamTitle: "Équipe",
    companyLabel: "Éditeur :",
    emailLabel: "E-mail :",
    websiteLabel: "Site web :",
    ossTitle: "Licences open source",
    ossDescription: "Cette application utilise les bibliothèques open source suivantes :",
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
          "Log each recycling activity to earn points automatically. Material type and quantity affect the reward, and streak bonuses boost your total.",
      },
      analysis: {
        question: "How do I use image analysis?",
        answer:
          "Open the Analyze tab, tap the camera icon, or pick a photo from your gallery. The AI will instantly explain how to sort the item.",
      },
      centers: {
        question: "How do I find recycling centers?",
        answer:
          "In the Map tab you can search for nearby centers based on your location. Allow location access for more accurate results.",
      },
      dataLoss: {
        question: "My data disappeared",
        answer:
          "Check that you are signed in. Local data can reset when signing out, but cloud backups restore once you log in again.",
      },
      issues: {
        question: "The app is not working properly",
        intro: "Try the following steps:",
        stepsTitle: "Troubleshooting steps",
        steps: [
          "Force close the app and reopen it",
          "Update to the latest version",
          "Restart your device",
          "Clear the app cache (Settings > Storage)",
        ],
        outro: "If the problem continues, contact the support team.",
      },
    },
    guideTitle: "Usage guide",
    guideItems: [
      { label: "Dashboard:", description: "View today's summary and recent records." },
      { label: "Analyze:", description: "Use the camera or gallery to check recyclability." },
      { label: "Calendar:", description: "Review monthly recycling activity at a glance." },
      { label: "Map:", description: "Find nearby centers and see their hours." },
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
          "재활용 활동을 기록하면 자동으로 포인트가 적립돼요. 재활용 품목의 종류와 양에 따라 차등 적용되며, 연속 기록 달성 시 보너스 포인트를 받을 수 있어요.",
      },
      analysis: {
        question: "Q. 이미지 분석은 어떻게 사용하나요?",
        answer:
          "분석 탭에서 카메라 아이콘을 터치하거나 갤러리에서 사진을 선택하세요. AI가 자동으로 재활용 가능 여부와 분리배출 방법을 알려드려요.",
      },
      centers: {
        question: "Q. 재활용 센터는 어떻게 찾나요?",
        answer:
          "지도 탭에서 현재 위치를 기반으로 가까운 재활용 센터를 찾을 수 있어요. 위치 권한을 허용해주시면 더 정확한 결과를 제공해드려요.",
      },
      dataLoss: {
        question: "Q. 데이터가 사라졌어요",
        answer:
          "로그인 상태를 확인해주세요. 로그아웃 시 로컬 데이터가 초기화될 수 있고, 다시 로그인하면 클라우드에 저장된 데이터가 복원돼요.",
      },
      issues: {
        question: "Q. 앱이 제대로 작동하지 않아요",
        intro: "다음 단계를 시도해보세요:",
        stepsTitle: "문제 해결 단계",
        steps: [
          "앱을 완전히 종료 후 재실행",
          "최신 버전으로 업데이트",
          "기기 재부팅",
          "앱 캐시 삭제 (설정 > 저장공간)",
        ],
        outro: "문제가 지속되면 고객 지원팀에 문의해주세요.",
      },
    },
    guideTitle: "사용 가이드",
    guideItems: [
      { label: "대시보드:", description: "오늘의 활동 요약과 최근 기록을 확인할 수 있어요" },
      { label: "분석:", description: "카메라나 갤러리로 재활용 가능 여부를 즉시 확인하세요" },
      { label: "캘린더:", description: "월별 재활용 활동을 한눈에 볼 수 있어요" },
      { label: "지도:", description: "주변 재활용 센터 위치와 운영 시간을 확인하세요" },
    ],
    contactTitle: "문의하기",
    contactIntro: "추가 문의사항이 있으시면",
    contactOutro: "으로 연락해주세요. 평일 09:00-18:00에 빠르게 답변드려요.",
  },
  es: {
    faqTitle: "Preguntas frecuentes (FAQ)",
    faq: {
      points: {
        question: "P. ¿Cómo se acumulan los puntos?",
        answer:
          "Registra cada actividad de reciclaje para acumular puntos automáticamente. El tipo y la cantidad de material modifican la recompensa y las rachas otorgan bonos.",
      },
      analysis: {
        question: "P. ¿Cómo uso el análisis de imágenes?",
        answer:
          "Abre la pestaña Analizar, toca el icono de cámara o elige una foto de tu galería. La IA te dirá cómo clasificar el artículo al instante.",
      },
      centers: {
        question: "P. ¿Cómo encuentro centros de reciclaje?",
        answer:
          "En la pestaña Mapa puedes buscar centros cercanos según tu ubicación. Permite el acceso a la ubicación para mayor precisión.",
      },
      dataLoss: {
        question: "P. Mis datos desaparecieron",
        answer:
          "Verifica que hayas iniciado sesión. Los datos locales pueden reiniciarse al cerrar sesión, pero el respaldo en la nube se restaura al volver a entrar.",
      },
      issues: {
        question: "P. La app no funciona correctamente",
        intro: "Prueba estos pasos:",
        stepsTitle: "Pasos de solución",
        steps: [
          "Cierra la app por completo y ábrela de nuevo",
          "Actualiza a la versión más reciente",
          "Reinicia tu dispositivo",
          "Borra la caché de la app (Ajustes > Almacenamiento)",
        ],
        outro: "Si el problema continúa, contacta al equipo de soporte.",
      },
    },
    guideTitle: "Guía de uso",
    guideItems: [
      { label: "Panel:", description: "Consulta el resumen del día y los registros recientes." },
      {
        label: "Analizar:",
        description: "Utiliza la cámara o la galería para verificar el reciclaje.",
      },
      { label: "Calendario:", description: "Revisa la actividad mensual de un vistazo." },
      { label: "Mapa:", description: "Encuentra centros cercanos y sus horarios." },
    ],
    contactTitle: "Contáctanos",
    contactIntro: "Si tienes dudas, escribe a",
    contactOutro: ". Respondemos de lunes a viernes de 09:00 a 18:00.",
  },
  fr: {
    faqTitle: "Questions fréquentes (FAQ)",
    faq: {
      points: {
        question: "Q. Comment les points sont-ils attribués ?",
        answer:
          "Enregistrez chaque activité de recyclage pour gagner des points automatiquement. Le type et la quantité influent sur la récompense, et les séries offrent des bonus.",
      },
      analysis: {
        question: "Q. Comment utiliser l'analyse d'image ?",
        answer:
          "Ouvrez l'onglet Analyser, touchez l'icône caméra ou choisissez une photo. L'IA vous indiquera comment trier l'objet.",
      },
      centers: {
        question: "Q. Comment trouver les centres de recyclage ?",
        answer:
          "Dans l'onglet Carte, recherchez les centres proches selon votre position. Autorisez la localisation pour un meilleur résultat.",
      },
      dataLoss: {
        question: "Q. Mes données ont disparu",
        answer:
          "Vérifiez que vous êtes connecté·e. Les données locales peuvent être réinitialisées après une déconnexion, mais elles se restaurent depuis le cloud après connexion.",
      },
      issues: {
        question: "Q. L'application ne fonctionne pas correctement",
        intro: "Essayez les étapes suivantes :",
        stepsTitle: "Étapes de dépannage",
        steps: [
          "Fermez complètement l'application puis rouvrez-la",
          "Mettez à jour vers la dernière version",
          "Redémarrez votre appareil",
          "Effacez le cache de l'application (Réglages > Stockage)",
        ],
        outro: "Si le problème persiste, contactez l'équipe d'assistance.",
      },
    },
    guideTitle: "Guide d'utilisation",
    guideItems: [
      {
        label: "Tableau de bord :",
        description: "Consultez le résumé du jour et les derniers enregistrements.",
      },
      {
        label: "Analyser :",
        description: "Utilisez la caméra ou la galerie pour vérifier le recyclage.",
      },
      { label: "Calendrier :", description: "Visualisez l'activité mensuelle en un coup d'œil." },
      { label: "Carte :", description: "Trouvez les centres proches et leurs horaires." },
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
      "RecyClean values your personal data and complies with applicable privacy laws.",
    collectTitle: "Data we collect",
    collectDescription: "We collect the following information to provide the service:",
    collect: {
      requiredLabel: "Required:",
      requiredValue: "Email address, nickname, profile photo",
      optionalLabel: "Optional:",
      optionalValue: "Location (for center search), notification consent",
      automaticLabel: "Automatic:",
      automaticValue: "Recycling history, point records, app usage metrics",
    },
    purposeTitle: "How we use your data",
    purposeList: [
      "Deliver the service and identify users",
      "Track recycling activity and provide statistics",
      "Grant points and rewards",
      "Send personalized recommendations and reminders",
      "Improve the service and build new features",
    ],
    retentionTitle: "Retention period",
    retentionDescription:
      "We delete data immediately when you delete your account or request removal, unless laws require temporary retention.",
    deletionTitle: "Deletion requests",
    deletionDescription:
      "You can request deletion anytime from the settings menu. Deleted information cannot be restored, so proceed carefully.",
    contactTitle: "Privacy contact",
    contactIntro: "For any privacy questions email",
    contactOutro: ".",
  },
  ko: {
    policyTitle: "개인정보 처리방침",
    policyDescription:
      "RecyClean은 사용자의 개인정보를 소중히 여기며, 개인정보 보호법 등 관련 법령을 준수하고 있어요.",
    collectTitle: "수집하는 개인정보",
    collectDescription: "서비스 제공을 위해 다음의 정보를 수집해요:",
    collect: {
      requiredLabel: "필수 항목:",
      requiredValue: "이메일 주소, 닉네임, 프로필 사진",
      optionalLabel: "선택 항목:",
      optionalValue: "위치 정보(재활용 센터 검색 시), 알림 수신 동의",
      automaticLabel: "자동 수집:",
      automaticValue: "재활용 활동 기록, 포인트 내역, 앱 사용 통계",
    },
    purposeTitle: "개인정보의 이용 목적",
    purposeList: [
      "서비스 제공 및 사용자 식별",
      "재활용 활동 추적 및 통계 제공",
      "포인트 적립 및 리워드 제공",
      "맞춤형 추천 및 알림 발송",
      "서비스 개선 및 신규 서비스 개발",
    ],
    retentionTitle: "개인정보의 보유 및 이용 기간",
    retentionDescription:
      "회원 탈퇴 시 또는 개인정보 삭제 요청 시 즉시 파기해요. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관 후 파기해요.",
    deletionTitle: "개인정보 삭제 요청",
    deletionDescription:
      "언제든지 설정 메뉴에서 회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있어요. 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.",
    contactTitle: "문의하기",
    contactIntro: "개인정보 보호와 관련된 문의사항은",
    contactOutro: "으로 연락해주세요.",
  },
  es: {
    policyTitle: "Política de privacidad",
    policyDescription:
      "RecyClean protege tus datos personales y cumple con las leyes de privacidad aplicables.",
    collectTitle: "Datos que recopilamos",
    collectDescription: "Recopilamos la siguiente información para ofrecer el servicio:",
    collect: {
      requiredLabel: "Obligatorio:",
      requiredValue: "Correo electrónico, alias, foto de perfil",
      optionalLabel: "Opcional:",
      optionalValue: "Ubicación (para buscar centros), permiso de notificaciones",
      automaticLabel: "Automático:",
      automaticValue: "Historial de reciclaje, puntos, métricas de uso de la app",
    },
    purposeTitle: "Para qué usamos tus datos",
    purposeList: [
      "Prestar el servicio e identificar a los usuarios",
      "Registrar la actividad y mostrar estadísticas",
      "Otorgar puntos y recompensas",
      "Enviar recomendaciones y recordatorios personalizados",
      "Mejorar la app y crear nuevas funciones",
    ],
    retentionTitle: "Periodo de conservación",
    retentionDescription:
      "Eliminamos los datos al darte de baja o cuando solicitas la eliminación, salvo que la ley exija conservarlos temporalmente.",
    deletionTitle: "Solicitar eliminación",
    deletionDescription:
      "Puedes pedir la eliminación en cualquier momento desde ajustes. La información borrada no se puede recuperar, así que decide con cuidado.",
    contactTitle: "Contacto de privacidad",
    contactIntro: "Para dudas sobre privacidad escribe a",
    contactOutro: ".",
  },
  fr: {
    policyTitle: "Politique de confidentialité",
    policyDescription:
      "RecyClean protège vos données personnelles et respecte les lois en vigueur.",
    collectTitle: "Données collectées",
    collectDescription: "Nous recueillons les informations suivantes pour fournir le service :",
    collect: {
      requiredLabel: "Obligatoire :",
      requiredValue: "Adresse e-mail, pseudo, photo de profil",
      optionalLabel: "Optionnel :",
      optionalValue: "Localisation (pour trouver des centres), consentement aux notifications",
      automaticLabel: "Automatique :",
      automaticValue: "Historique de recyclage, points, statistiques d'utilisation",
    },
    purposeTitle: "Utilisation des données",
    purposeList: [
      "Fournir le service et identifier les utilisateurs",
      "Suivre l'activité de recyclage et fournir des statistiques",
      "Attribuer des points et des récompenses",
      "Envoyer des recommandations et rappels personnalisés",
      "Améliorer le service et développer de nouvelles fonctions",
    ],
    retentionTitle: "Durée de conservation",
    retentionDescription:
      "Nous supprimons les données dès la suppression du compte ou sur demande, sauf obligation légale de conservation temporaire.",
    deletionTitle: "Demande de suppression",
    deletionDescription:
      "Vous pouvez demander la suppression à tout moment via les réglages. Les données supprimées ne peuvent pas être restaurées, soyez prudent.",
    contactTitle: "Contact confidentialité",
    contactIntro: "Pour toute question, écrivez à",
    contactOutro: ".",
  },
};
