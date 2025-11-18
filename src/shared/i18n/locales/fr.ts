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
    },
    recentActivity: {
      title: "Activité récente",
      meta: "{{count}} objets · {{time}}",
      points: "+{{points}} pts",
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
    },
    tips: {
      title: "Conseils de prise de vue",
      items: [
        "Photographiez dans un endroit bien éclairé.",
        "Un fond propre améliore la précision.",
        "Assurez-vous que le symbole de recyclage soit visible.",
        "Cadrez l'objet de face si possible.",
      ],
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
    },
    guide: {
      title: "Guide de suivi",
      items: [
        "Les enregistrements alimentent automatiquement vos statistiques mensuelles.",
        "Les nouveaux scans apparaissent aussitôt sur le calendrier.",
        "Les journées chargées affichent un point sur le calendrier.",
      ],
    },
  },
  map: {
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
      title: "Centres de recyclage",
      directions: "Itinéraire",
      call: "Appeler",
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
      joined: "Inscrit {{date}}",
      points: "{{points}} pts",
      streak: "Série de {{days}} jours",
    },
    impact: {
      title: "Mon Impact",
      items: "Articles Recyclés",
      points: "Points Totaux",
    },
  },
  notifications: {
    actions: {
      close: "Fermer",
      undo: "Annuler",
    },
    banner: {
      welcome: {
        message: "Bienvenue, {{name}} ! Enregistrez votre première activité de recyclage.",
        cta: "Commencer",
      },
    },
    snackbar: {
      entrySaved: "Activité enregistrée ! +{{points}}pt gagnés",
      entryDeleted: "L'enregistrement a été supprimé",
      entryRestored: "Enregistrement restauré",
    },
  },
} as const;
