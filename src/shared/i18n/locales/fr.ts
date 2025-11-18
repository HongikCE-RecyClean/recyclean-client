export const frTranslation = {
  app: {
    name: "RecyClean",
  },
  header: {
    logoAlt: "Logo {{appName}}",
    profileButton: "Ouvrir le menu utilisateur",
  },
  navigation: {
    home: "Accueil",
    analyze: "Analyser",
    calendar: "Calendrier",
    map: "Carte",
    settings: "Réglages",
  },
  onboarding: {
    tagline: "Le recyclage devient simple",
    description:
      "Consignez vos petits gestes écolo au quotidien.\\nTrouvez facilement les points de dépôt proches.",
    cta: "Commencer",
    hint: "Commencez à agir pour la planète avec {{appName}} dès maintenant.",
  },
  dashboard: {
    welcome: {
      greeting: "Bonjour, {{name}} !",
      defaultName: "ami",
      helper: "Je vous accompagne pour le recyclage d'aujourd'hui.",
      stats: {
        items: "Objets traités aujourd'hui",
        points: "Points gagnés",
        streak: "Jours consécutifs",
      },
    },
    tracker: {
      title: "Suivi d'activité",
      monthlyPoints: "Points cumulés ce mois-ci",
      goal: "Objectif {{goal}}pt",
      percent: "{{percent}} % réalisés",
      highlight: "Objectif atteint !",
      logAction: "Enregistrer une activité",
      stats: {
        entries: "Enregistrements",
        items: "Objets",
        categories: "Catégories",
      },
    },
    materialSearch: {
      title: "Recherche de matériaux",
      placeholder: "Recherchez par matériau ou objet",
      filters: {
        all: "Tous",
        Plastic: "Plastique",
        Glass: "Verre",
        Metal: "Métal",
        Paper: "Papier",
      },
      recyclable: "Recyclable",
      notRecyclable: "Non admis",
      empty: "Aucun résultat pour ce filtre.",
      showMore: "Afficher plus",
      showLess: "Afficher moins",
    },
    recentActivity: {
      title: "Activité récente",
      meta: "{{count}} objets · {{time}}",
      points: "+{{points}} pts",
      empty:
        "Aucune activité enregistrée pour le moment. Commencez par enregistrer votre première activité de recyclage !",
    },
    monthlyProgress: {
      title: "Progression de l'objectif mensuel",
      value: "{{current}} / {{goal}} points",
      subtitle: "Mise à jour janvier 2025",
      percent: "{{percent}} % réalisés",
    },
    quickActions: {
      title: "Actions rapides",
      analyze: "Analyser avec l'IA",
      map: "Trouver des points de dépôt",
      record: "Ajouter un enregistrement manuel",
    },
    achievements: {
      title: "Succès",
      earned: "Terminé",
    },
    goals: {
      title: "Objectifs durables",
    },
    tips: {
      title: "Idées écoresponsables",
      all: "Tous",
      categories: {
        reduce: "Réduire",
        reuse: "Réutiliser",
        recycle: "Recycler",
        energy: "Énergie",
      },
      impactLabel: "Impact : {{value}}",
      difficultyLabel: "Difficulté : {{value}}",
      impact: {
        high: "Élevé",
        medium: "Moyen",
        low: "Faible",
      },
      difficulty: {
        easy: "Facile",
        moderate: "Moyenne",
        hard: "Difficile",
      },
    },
    addEntry: {
      // 활동 추가 섹션 제목 문구
      title: "Ajouter une activité",
      modeLabel: "Type d'ajout",
      modeOptions: {
        record: "Enregistrer une activité",
        plan: "Planifier une activité",
      },
      // 카테고리 입력 레이블
      category: "Catégorie",
      // 재질 입력 레이블
      material: "Matériau",
      // 수량 입력 레이블
      amount: "Quantité",
      // 날짜 선택 레이블
      date: "Date",
      time: "Heure",
      // 포인트 미리보기 문구
      pointsPreview: "Points estimés : +{{points}}pt",
    },
  },
  analyze: {
    introTitle: "Classification de recyclage par IA",
    introDescription: "Prenez une photo ou importez une image pour savoir comment la recycler.",
    actions: {
      capture: "Prendre une photo",
      upload: "Importer une image",
      cancel: "Annuler",
    },
    errors: {
      onlyImages: "Seuls les fichiers image sont autorisés.",
      unsupported: "Votre navigateur ne peut pas accéder à la caméra.",
      permission: "Autorisez l'accès à la caméra.",
      playback: "Impossible de lire le flux de la caméra.",
      notReady: "Le flux de la caméra n'est pas encore prêt.",
      stillInitializing: "La caméra s'initialise encore. Réessayez dans un instant.",
      captureFailed: "Impossible de capturer l'image.",
      analysisFailed: "Impossible de contacter le service d'IA. Réessayez dans quelques instants.",
      noPrediction: "Aucun matériau recyclable détecté. Essayez avec un angle plus net.",
    },
    camera: {
      overlay: "Préparation de la caméra...",
    },
    scanning: {
      headline: "Analyse de votre image...",
      subtext: "Cela ne prend qu'un instant.",
    },
    status: {
      recyclable: "Recyclable ♻️",
      notRecyclable: "Non recyclable ❌",
    },
    result: {
      title: "Résultat de la classification",
      confidence: "{{value}} % de confiance",
      material: "Matériau : {{category}}",
      instructionsTitle: "Étapes de traitement",
      retry: "Reprendre",
      logAction: "Enregistrer le recyclage",
      saveSuccess: "✅ Ajouté à votre journal d'activités !",
      defaultInstructions:
        "Retirez les impuretés puis suivez les consignes de tri de votre commune.",
    },
    tips: {
      title: "Conseils de prise de vue",
      items: [
        "Photographiez dans un endroit bien éclairé.",
        "Un fond propre améliore la précision.",
        "Assurez-vous que le symbole de recyclage soit visible.",
        "Cadrez l'objet de face si possible.",
      ],
      bannerMessage: "Astuce photo ✨ Lumière douce et fond net rendent l'IA bien plus précise.",
    },
    captured: {
      alt: "Aperçu de l'image capturée",
      resetAria: "Reprendre la photo",
    },
    mockResults: {
      plasticBottle: {
        item: "Bouteille d'eau en plastique",
        category: "Plastique #1 (PET)",
        instructions: "Retirez l'étiquette et le bouchon, rincez puis recyclez.",
        tips: "Repérez le symbole de recyclage #1 sous la bouteille.",
      },
      pizzaBox: {
        item: "Boîte à pizza",
        category: "Papier souillé",
        instructions: "La graisse et les restes empêchent le recyclage.",
        tips: "Recyclez uniquement les zones propres et jetez le reste.",
      },
      aluminumCan: {
        item: "Canette en aluminium",
        category: "Aluminium",
        instructions: "Rincez à l'eau puis écrasez pour gagner de la place.",
        tips: "Les canettes métalliques ont une forte valeur de recyclage.",
      },
    },
    guides: {
      plastic: {
        item: "Plastiques",
        instructions: "Retirez étiquettes et bouchons, rincez puis écrasez légèrement avant dépôt.",
        tips: "Bien sécher évite les refus de tri.",
      },
      paper: {
        item: "Papiers et cartons",
        instructions:
          "Enlevez rubans ou agrafes, aplatissez les cartons et séparez les parties grasses.",
        tips: "Conservez-les à l'abri de l'humidité avant la collecte.",
      },
      metal: {
        item: "Boîtes métalliques",
        instructions: "Videz, rincez puis écrasez doucement les canettes pour gagner de la place.",
        tips: "Retirez les couvercles plastiques avant tri.",
      },
      glass: {
        item: "Contenants en verre",
        instructions:
          "Retirez les couvercles, rincez et déposez-les délicatement pour éviter la casse.",
        tips: "Emballez le verre cassé séparément selon la consigne locale.",
      },
      textile: {
        item: "Textiles",
        instructions: "Lavez et séchez les vêtements avant de les déposer dans une borne textile.",
        tips: "Nouez-les dans un sac pour faciliter la manutention.",
      },
      electronic: {
        item: "Piles et électroniques",
        instructions: "Retirez les piles et apportez l'appareil dans un point de collecte DEEE.",
        tips: "Isolez les bornes des piles avec du ruban pour plus de sécurité.",
      },
      other: {
        item: "Déchets divers",
        instructions: "Vérifiez la consigne locale lorsque le matériau est incertain.",
        tips: "Repérez les logos de tri ou renseignez-vous auprès de la mairie.",
      },
    },
  },
  calendar: {
    overviewTitle: "Calendrier d'activité de {{month}}",
    stats: {
      records: "Nombre total d'enregistrements",
      items: "Nombre total d'objets",
      points: "Points gagnés",
    },
    legend: {
      title: "Légende des matériaux",
      count: "{{count}} pièces",
      points: "+{{points}} pts",
      empty: "Aucun enregistrement pour ce mois pour l'instant.",
    },
    entries: {
      title: "Enregistrements du {{date}}",
      meta: "{{count}} objets · {{time}}",
      points: "+{{points}} pts",
      empty: "Aucun enregistrement ce jour-là.",
      // 삭제 확인 모달 문구
      confirmDelete: "Voulez-vous vraiment supprimer cet enregistrement ?",
    },
    guide: {
      title: "Guide de suivi",
      items: [
        "Les enregistrements alimentent automatiquement vos statistiques mensuelles.",
        "Les nouveaux scans apparaissent aussitôt sur le calendrier.",
        "Les journées chargées affichent un point sur le calendrier.",
      ],
      bannerMessage:
        "Astuce calendrier 🗓️ Touchez une date pour consulter ou modifier vos entrées.",
    },
  },
  map: {
    mapView: {
      title: "Voir les emplacements sur la carte",
      subtitle: "Nous afficherons {{count}} points de dépôt proches sur la carte.",
      loading: "Chargement de la carte...",
      missingKey: {
        title: "Clé d'API de carte manquante",
        description:
          "Ajoutez la clé NAVER Web Dynamic Map dans la console puis rechargez pour afficher la carte.",
      },
      loadFailed: {
        title: "Impossible de charger la carte",
        description: "Vérifiez la connexion réseau et la liste des domaines autorisés.",
      },
      initFailed: {
        title: "Le moteur de carte n'a pas pu s'initialiser",
        description:
          "Assurez-vous que ce domaine figure dans la liste blanche et dans les autorisations de l'API.",
      },
    },
    filter: {
      title: "Points de dépôt à proximité",
      useLocation: "Utiliser ma position",
      options: {
        all: "Tous les types",
        recycling: "Recyclage",
        general: "Ordinaire",
        electronic: "Électronique",
        compost: "Compost",
      },
    },
    placeholder: {
      title: "Carte en préparation",
      subtitle: "Nous afficherons bientôt {{count}} points de dépôt proches.",
    },
    bins: {
      empty: "Aucun point ne correspond au filtre sélectionné.",
      sectionLabel: "Matériaux acceptés",
      directions: "Itinéraire",
      report: "Signaler l'état",
    },
    availability: {
      available: "Disponible",
      full: "Plein",
      maintenance: "En maintenance",
    },
    centers: {
      title: "Centres de recyclage & points de dépôt",
      sectionTitle: "Centres de recyclage",
      directions: "Itinéraire",
      call: "Appeler",
    },
    errors: {
      title: "Impossible de charger les données de la carte",
      description: "Vérifiez la connexion serveur ou la configuration SSL, puis réessayez.",
      detail: "Message d'erreur : {{message}}",
      action: "Réessayer",
      retrying: "Nouvelle tentative...",
    },
  },
  settings: {
    profile: {
      avatarAlt: "Image de profil par défaut",
      joined: "Inscrit le {{date}}",
      points: "{{points}} pts",
      streak: "{{days}} jours d'affilée",
    },
    impact: {
      title: "Mon impact",
      items: "Objets traités",
      points: "Points cumulés",
    },
    preferences: {
      title: "Préférences de l'application",
      notifications: {
        title: "Notifications",
        description: "Envoyer des rappels de recyclage",
        status: {
          requesting: "Demande d'autorisation au navigateur…",
          granted: "Les notifications sont autorisées.",
          denied: "Les notifications sont bloquées par le navigateur.",
          unsupported: "Ce navigateur ne gère pas les notifications système.",
          error: "Une erreur est survenue pendant la demande d'autorisation.",
        },
      },
      location: {
        title: "Services de localisation",
        description: "Trouver les points de dépôt proches",
        status: {
          requesting: "Demande d'accès à votre position…",
          granted: "L'accès à la position est autorisé.",
          denied: "L'accès à la position est bloqué.",
          unsupported: "Cet appareil ne peut pas partager sa position.",
          error: "Une erreur est survenue pendant la demande de localisation.",
        },
      },
      darkMode: {
        title: "Mode sombre",
        description: "Passer au thème sombre",
      },
      monthlyGoal: {
        title: "Objectif mensuel de points",
        description: "Base de calcul de la progression",
        placeholder: "ex. 200",
        helper: "Saisissez au moins 10 pt pour enregistrer.",
      },
      sounds: {
        title: "Sons",
        description: "Jouer les effets sonores",
      },
    },
    locale: {
      title: "Langue et région",
      languageLabel: "Langue",
      regionLabel: "Région",
      regionHint: "Actuellement seule la région pilote Corée est disponible.",
      regions: {
        kr: "Corée du Sud",
        us: "États-Unis",
        ca: "Canada",
        uk: "Royaume-Uni",
      },
    },
    support: {
      title: "Compte et assistance",
      editProfile: "Modifier le profil",
      privacy: "Paramètres de confidentialité",
      helpCenter: "Centre d'aide",
      about: "À propos de l'application",
      logout: "Se déconnecter",
    },
  },
  profile: {
    card: {
      avatarAlt: "Image de profil de l'utilisateur",
      joined: "Depuis {{date}}",
      points: "{{points}} pts",
      streak: "Série de {{days}} jours",
    },
    impact: {
      title: "Mon Impact",
      items: "Articles Recyclés",
      points: "Points Totaux",
    },
    level: {
      title: "Progression de Niveau",
      currentLevel: "Niveau {{level}}",
      pointsNeeded: "{{points}}pt nécessaires jusqu'au prochain niveau",
      maxLevel: "Niveau maximum atteint !",
    },
    monthlyGoal: {
      title: "Objectif de points mensuels",
      description: "Définissez combien de points atteindre ce mois-ci.",
      placeholder: "ex. 250",
      helper: "Entrez une valeur supérieure à 10 points pour l'enregistrer automatiquement.",
      cta: "Enregistrer l'objectif",
      usage: "Alimente les cartes de progression et le tracker du tableau de bord.",
    },
    categories: {
      title: "Statistiques par Catégorie",
      topCategory: "Le Plus Recyclé",
      noData: "Aucune donnée de catégorie pour le moment.",
      items: "{{count}} articles",
      points: "{{points}}pt",
    },
  },
  notifications: {
    actions: {
      close: "Fermer",
      undo: "Annuler",
    },
    banner: {
      welcome: {
        message: "Bonjour {{name}} ! On ajoute un nouveau geste de tri aujourd'hui ?",
        cta: "Ajouter un enregistrement",
      },
    },
    snackbar: {
      entrySaved: "Activité enregistrée ! +{{points}}pt gagnés",
      entryDeleted: "L'enregistrement a été supprimé",
      entryRestored: "Enregistrement restauré",
    },
  },
  common: {
    // 취소 버튼 공통 문구
    cancel: "Annuler",
    // 저장 버튼 공통 문구
    save: "Enregistrer",
    // 삭제 버튼 공통 문구
    delete: "Supprimer",
    // 편집 버튼 공통 문구
    edit: "Modifier",
    // 확인 버튼 공통 문구
    confirm: "Confirmer",
  },
} as const;
