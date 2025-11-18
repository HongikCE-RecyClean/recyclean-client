export const esTranslation = {
  app: {
    name: "RecyClean",
  },
  header: {
    logoAlt: "Logotipo de {{appName}}",
    profileButton: "Abrir menú de usuario",
  },
  navigation: {
    home: "Inicio",
    analyze: "Analizar",
    calendar: "Calendario",
    map: "Mapa",
    settings: "Ajustes",
  },
  onboarding: {
    tagline: "Haz que reciclar sea sencillo",
    description:
      "Registra pequeños gestos ecológicos diarios.\\nEncuentra puntos de entrega cercanos con facilidad.",
    cta: "Comenzar",
    hint: "Empieza a actuar por el planeta con {{appName}} ahora.",
  },
  dashboard: {
    welcome: {
      greeting: "Hola, {{name}}!",
      defaultName: "amigo",
      helper: "Te guiaré en el reciclaje de hoy.",
      stats: {
        items: "Artículos gestionados hoy",
        points: "Puntos obtenidos",
        streak: "Racha de días",
      },
    },
    tracker: {
      title: "Seguimiento de actividad",
      monthlyPoints: "Puntos acumulados este mes",
      goal: "Meta {{goal}}pt",
      percent: "{{percent}}% completado",
      highlight: "¡Meta alcanzada!",
      logAction: "Registrar actividad",
      stats: {
        entries: "Registros",
        items: "Artículos",
        categories: "Categorías",
      },
    },
    materialSearch: {
      title: "Búsqueda de materiales",
      placeholder: "Busca por material o producto",
      filters: {
        all: "Todos",
        Plastic: "Plástico",
        Glass: "Vidrio",
        Metal: "Metal",
        Paper: "Papel",
      },
      recyclable: "Reciclable",
      notRecyclable: "No permitido",
      empty: "No hay coincidencias para los filtros.",
    },
    recentActivity: {
      title: "Actividad reciente",
      meta: "{{count}} artículos · {{time}}",
      points: "+{{points}} pts",
      empty:
        "Aún no hay actividades registradas. ¡Comienza a registrar tu primera actividad de reciclaje!",
    },
    monthlyProgress: {
      title: "Progreso de la meta mensual",
      value: "{{current}} / {{goal}} puntos",
      subtitle: "Actualizado en enero de 2025",
      percent: "{{percent}}% completado",
    },
    quickActions: {
      title: "Accesos rápidos",
      analyze: "Analizar con IA",
      map: "Buscar contenedores",
      record: "Agregar registro manual",
    },
    achievements: {
      title: "Logros",
      earned: "Completado",
    },
    goals: {
      title: "Objetivos de sostenibilidad",
    },
    tips: {
      title: "Ideas ecológicas",
      all: "Todos",
      categories: {
        reduce: "Reducir",
        reuse: "Reutilizar",
        recycle: "Reciclar",
        energy: "Energía",
      },
      impactLabel: "Impacto: {{value}}",
      difficultyLabel: "Dificultad: {{value}}",
      impact: {
        high: "Alto",
        medium: "Medio",
        low: "Bajo",
      },
      difficulty: {
        easy: "Fácil",
        moderate: "Media",
        hard: "Difícil",
      },
    },
  },
  analyze: {
    introTitle: "Clasificación de reciclaje con IA",
    introDescription: "Toma una foto o sube una imagen para saber cómo reciclarla.",
    actions: {
      capture: "Tomar foto",
      upload: "Subir imagen",
      cancel: "Cancelar",
    },
    errors: {
      onlyImages: "Solo se pueden subir archivos de imagen.",
      unsupported: "Tu navegador no puede acceder a la cámara.",
      permission: "Permite el acceso a la cámara.",
      playback: "No se puede reproducir la señal de la cámara.",
      notReady: "La vista de la cámara aún no está lista.",
      stillInitializing: "La cámara sigue inicializándose. Inténtalo de nuevo en unos segundos.",
      captureFailed: "No se pudo capturar la imagen.",
    },
    camera: {
      overlay: "Preparando la cámara...",
    },
    scanning: {
      headline: "Analizando tu imagen...",
      subtext: "Será solo un momento.",
    },
    status: {
      recyclable: "Reciclable ♻️",
      notRecyclable: "No reciclable ❌",
    },
    result: {
      title: "Resultado de la clasificación",
      confidence: "{{value}}% de confianza",
      material: "Material: {{category}}",
      instructionsTitle: "Pasos de manejo",
      retry: "Volver a tomar",
      logAction: "Registrar reciclaje",
      saveSuccess: "✅ ¡Añadido a tu registro de actividades!",
    },
    tips: {
      title: "Consejos de captura",
      items: [
        "Toma la foto en un lugar bien iluminado.",
        "Un fondo limpio mejora la precisión.",
        "Asegura que el símbolo de reciclaje sea visible.",
        "Si puedes, toma la imagen de frente.",
      ],
    },
    captured: {
      alt: "Vista previa de la imagen capturada",
      resetAria: "Volver a tomar la foto",
    },
    mockResults: {
      plasticBottle: {
        item: "Botella de agua de plástico",
        category: "Plástico #1 (PET)",
        instructions: "Quita la etiqueta y la tapa, enjuaga bien y recicla.",
        tips: "Busca el símbolo de reciclaje #1 en la base.",
      },
      pizzaBox: {
        item: "Caja de pizza",
        category: "Papel contaminado",
        instructions: "La grasa y los restos impiden reciclarla.",
        tips: "Recicla solo las partes limpias y desecha el resto.",
      },
      aluminumCan: {
        item: "Lata de aluminio",
        category: "Aluminio",
        instructions: "Enjuaga y aplasta para ahorrar espacio.",
        tips: "Las latas metálicas tienen alto valor de reciclaje.",
      },
    },
  },
  calendar: {
    overviewTitle: "Calendario de actividad de {{month}}",
    stats: {
      records: "Registros totales",
      items: "Artículos totales",
      points: "Puntos obtenidos",
    },
    legend: {
      title: "Leyenda de materiales",
      count: "{{count}} uds",
      points: "+{{points}} pts",
      empty: "Aún no hay registros este mes.",
    },
    entries: {
      title: "Registros del {{date}}",
      meta: "{{count}} artículos · {{time}}",
      points: "+{{points}} pts",
      empty: "No hay registros este día.",
    },
    guide: {
      title: "Guía de registro",
      items: [
        "Los registros se suman automáticamente a tus estadísticas mensuales.",
        "Los nuevos análisis aparecen de inmediato en el calendario.",
        "Los días con más actividad muestran un punto en el calendario.",
      ],
    },
  },
  map: {
    filter: {
      title: "Contenedores cercanos",
      useLocation: "Usar mi ubicación",
      options: {
        all: "Todos los tipos",
        recycling: "Reciclaje",
        general: "General",
        electronic: "Electrónicos",
        compost: "Composta",
      },
    },
    placeholder: {
      title: "Mapa en preparación",
      subtitle: "Pronto mostraremos {{count}} contenedores cercanos.",
    },
    bins: {
      empty: "No hay contenedores para el filtro seleccionado.",
      sectionLabel: "Materiales aceptados",
      directions: "Cómo llegar",
      report: "Reportar estado",
    },
    availability: {
      available: "Disponible",
      full: "Lleno",
      maintenance: "En mantenimiento",
    },
    centers: {
      title: "Centros de reciclaje",
      directions: "Cómo llegar",
      call: "Llamar",
    },
  },
  settings: {
    profile: {
      avatarAlt: "Imagen de perfil predeterminada",
      joined: "Se unió el {{date}}",
      points: "{{points}} pts",
      streak: "Racha de {{days}} días",
    },
    impact: {
      title: "Mi impacto",
      items: "Artículos procesados",
      points: "Puntos totales",
    },
    preferences: {
      title: "Preferencias de la app",
      notifications: {
        title: "Notificaciones",
        status: {
          requesting: "Solicitando permiso al navegador…",
          granted: "Las notificaciones están permitidas.",
          denied: "El navegador bloqueó las notificaciones.",
          unsupported: "Este navegador no admite notificaciones del sistema.",
          error: "Ocurrió un error al solicitar el permiso.",
        },
        description: "Enviar recordatorios de reciclaje",
      },
      location: {
        title: "Servicios de ubicación",
        status: {
          requesting: "Solicitando acceso a tu ubicación…",
          granted: "El acceso a la ubicación está permitido.",
          denied: "El acceso a la ubicación está bloqueado.",
          unsupported: "Este dispositivo no puede compartir la ubicación.",
          error: "Ocurrió un error al solicitar la ubicación.",
        },
        description: "Encontrar contenedores cercanos",
      },
      darkMode: {
        title: "Modo oscuro",
        description: "Usar el tema oscuro",
      },
      sounds: {
        title: "Sonidos",
        description: "Reproducir efectos de sonido",
      },
    },
    locale: {
      title: "Idioma y región",
      languageLabel: "Idioma",
      regionLabel: "Región",
      regionHint: "Por ahora solo está disponible la región piloto de Corea.",
      regions: {
        kr: "Corea del Sur",
        us: "Estados Unidos",
        ca: "Canadá",
        uk: "Reino Unido",
      },
    },
    support: {
      title: "Cuenta y soporte",
      editProfile: "Editar perfil",
      privacy: "Configuración de privacidad",
      helpCenter: "Centro de ayuda",
      about: "Acerca de la app",
      logout: "Cerrar sesión",
    },
  },
  profile: {
    card: {
      avatarAlt: "Imagen de perfil del usuario",
      joined: "Desde {{date}}",
      points: "{{points}} pts",
      streak: "Racha de {{days}} días",
    },
    impact: {
      title: "Mi Impacto",
      items: "Artículos Reciclados",
      points: "Puntos Totales",
    },
    level: {
      title: "Progreso de Nivel",
      currentLevel: "Nivel {{level}}",
      nextLevel: "Al siguiente nivel",
      pointsNeeded: "{{points}}pt necesarios",
      maxLevel: "¡Nivel máximo alcanzado!",
    },
    categories: {
      title: "Estadísticas por Categoría",
      topCategory: "Más Reciclado",
      noData: "Aún no hay datos de categorías.",
      items: "{{count}} artículos",
      points: "{{points}}pt",
    },
  },
  notifications: {
    actions: {
      close: "Cerrar",
      undo: "Deshacer",
    },
    banner: {
      welcome: {
        message: "¡Bienvenido, {{name}}! Registra tu primera actividad de reciclaje.",
        cta: "Comenzar",
      },
    },
    snackbar: {
      entrySaved: "¡Actividad registrada! +{{points}}pt obtenidos",
      entryDeleted: "El registro de actividad se eliminó",
      entryRestored: "El registro se restauró",
    },
  },
} as const;
