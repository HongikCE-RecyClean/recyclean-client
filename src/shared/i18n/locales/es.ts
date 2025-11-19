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
    nameRequired: "Ingresa un apodo.",
    namePlaceholder: "Ingresa tu apodo",
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
    hero: {
      subtitle: "Progreso de este mes",
      currentPoints: "Puntos actuales",
      today: "Hoy",
      total: "Total",
    },
    tracker: {
      title: "Seguimiento de actividad",
      monthlyPoints: "Puntos acumulados este mes",
      goal: "Meta {{goal}}pt",
      percent: "{{percent}}% completado",
      highlight: "¡Meta alcanzada!",
      logAction: "Agregar actividad",
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
      showMore: "Ver más",
      showLess: "Ver menos",
    },
    recentActivity: {
      title: "Actividad reciente",
      meta: "{{count}} artículos · {{time}}",
      points: "+{{points}} pts",
      empty:
        "Aún no hay actividades registradas.\n¡Comienza a registrar tu primera actividad de reciclaje!",
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
    addEntry: {
      // 활동 추가 섹션 제목 문구
      title: "Agregar actividad",
      modeLabel: "Tipo de entrada",
      modeOptions: {
        record: "Registrar actividad",
        plan: "Planificar actividad",
      },
      // 카테고리 필드 레이블
      category: "Categoría",
      // 재질(품목) 입력 레이블
      material: "Material",
      // 수량 입력 레이블
      amount: "Cantidad",
      // 날짜 선택 레이블
      date: "Fecha",
      time: "Hora",
      // 포인트 미리보기 문구
      pointsPreview: "Puntos estimados: +{{points}}pt",
    },
    materials: {
      plasticPetBottle: {
        name: "Botellas PET transparentes (agua y bebidas)",
        instructions:
          "Vacía, enjuaga, retira la etiqueta y la tapa, y luego comprime la botella antes de depositarla en el contenedor exclusivo para PET transparente.",
        tips: "Las botellas incoloras, sin etiqueta y comprimidas producen resina reciclada de mejor calidad.",
      },
      plasticTakeoutContainer: {
        name: "Envase plástico de comida con grasa",
        instructions:
          "Si quedan salsas u aceites difíciles de limpiar, el reciclaje se rechaza; cuando no puedas limpiarlo bien, tíralo como residuo general.",
        tips: "Solo los envases totalmente lavados y secos pueden enviarse al flujo de plásticos.",
      },
      paperCarton: {
        name: "Cartón de leche o jugo",
        instructions:
          "Vacía, enjuaga, abre y seca. Retira pajillas, pegatinas u otros materiales antes de agruparlos.",
        tips: "Incluso los cartonados laminados pueden reciclarse si están limpios; entrégalos en campañas o contenedores especiales.",
      },
      greasyPizzaBox: {
        name: "Caja de pizza con grasa",
        instructions:
          "La grasa contamina otros papeles, así que tira las partes manchadas en bolsas de basura o sacos especiales.",
        tips: "Separa la tapa limpia y recicla solo esa sección para mejorar el rendimiento.",
      },
      aluminumCan: {
        name: "Lata de aluminio",
        instructions:
          "Enjuaga para quitar residuos y evita objetos extraños; retira cualquier tapa plástica antes de reciclarla.",
        tips: "Aplastar la parte superior mejora la eficiencia de recolección y el apilado.",
      },
      butaneCan: {
        name: "Lata de butano con gas restante",
        instructions:
          "Si aún queda gas, no se acepta; ventílala por completo al aire libre y deposítala en un saco especial.",
        tips: "Perfora la lata y retira las etiquetas una vez vacía para reciclarla como metal.",
      },
      glassBottle: {
        name: "Botella de vidrio de soju o cerveza",
        instructions:
          "Retira tapas y etiquetas, enjuaga y recicla con cuidado o devuélvela mediante el programa de depósito.",
        tips: "Las botellas con depósito pueden devolverse a las tiendas para obtener el reembolso.",
      },
      heatResistantGlass: {
        name: "Utensilio de vidrio resistente al calor",
        instructions:
          "El vidrio templado tiene otro punto de fusión; envuélvelo en papel periódico y deséchalo como residuo general.",
        tips: "Marca claramente los fragmentos afilados para proteger al personal de recolección.",
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
      analysisFailed:
        "No pudimos contactar el servicio de IA. Intenta nuevamente en unos segundos.",
      noPrediction: "No se detectó material reciclable. Prueba con otro ángulo más claro.",
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
      defaultInstructions: "Retira los residuos y sigue las normas de reciclaje de tu municipio.",
    },
    tips: {
      title: "Consejos de captura",
      items: [
        "Toma la foto en un lugar bien iluminado.",
        "Un fondo limpio mejora la precisión.",
        "Asegura que el símbolo de reciclaje sea visible.",
        "Si puedes, toma la imagen de frente.",
      ],
      bannerMessage: "Tip de foto ✨\nBuena luz y fondo limpio ayudan a que la IA acierte más.",
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
    guides: {
      plastic: {
        item: "Plásticos",
        instructions: "Quita etiquetas y tapas, enjuaga a fondo y aplasta antes de entregarlos.",
        tips: "Sécalos bien para evitar contaminación.",
      },
      paper: {
        item: "Papel y cartón",
        instructions: "Retira cinta o grapas, aplana las cajas y separa las partes sucias.",
        tips: "Guárdalos en una bolsa seca hasta la recolección.",
      },
      metal: {
        item: "Latas metálicas",
        instructions:
          "Vacía y enjuaga las latas, luego presiónalas ligeramente para ahorrar espacio.",
        tips: "Quita tapas o sellos plásticos antes de reciclar.",
      },
      glass: {
        item: "Envases de vidrio",
        instructions: "Retira las tapas, enjuaga y deposita con cuidado para que no se rompan.",
        tips: "El vidrio roto se envuelve aparte según la guía local.",
      },
      textile: {
        item: "Textiles",
        instructions: "Lava y seca las prendas antes de llevarlas al contenedor de ropa.",
        tips: "Agrúpalas en bolsas cerradas para facilitar el manejo.",
      },
      electronic: {
        item: "Baterías y electrónicos",
        instructions:
          "Extrae las baterías y lleva los aparatos a un punto limpio o centro de e-waste.",
        tips: "Cubre ambos polos de las baterías sueltas con cinta.",
      },
      other: {
        item: "Residuos generales",
        instructions: "Consulta la guía municipal cuando no estés seguro del contenedor correcto.",
        tips: "Busca símbolos de reciclaje o las indicaciones locales.",
      },
    },
  },
  calendar: {
    overviewTitle: "{{month}}",
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
      title: "{{date}}",
      meta: "{{count}} artículos · {{time}}",
      points: "+{{points}} pts",
      empty: "No hay registros este día.",
      // 삭제 확인 모달 메시지
      confirmDelete: "¿Seguro que quieres eliminar este registro?",
    },
    guide: {
      title: "Guía de registro",
      items: [
        "Los registros se suman automáticamente a tus estadísticas mensuales.",
        "Los nuevos análisis aparecen de inmediato en el calendario.",
        "Los días con más actividad muestran un punto en el calendario.",
      ],
      bannerMessage:
        "Tip del calendario 🗓️\nToca una fecha para ver y eliminar sus registros al instante.",
    },
  },
  map: {
    mapView: {
      title: "Ver ubicaciones en el mapa",
      subtitle: "Mostramos {{count}} contenedores cercanos en el mapa.",
      loading: "Cargando el mapa...",
      missingKey: {
        title: "Falta la clave de la API del mapa",
        description:
          "Agrega la clave Web Dynamic Map de NAVER en la consola y vuelve a cargar para ver el mapa.",
      },
      loadFailed: {
        title: "No pudimos cargar el mapa",
        description: "Comprueba la conexión de red y la lista de dominios autorizados.",
      },
      initFailed: {
        title: "El motor del mapa no se inicializó",
        description:
          "Verifica que este origen esté incluido en los permisos y la lista de dominios de la API.",
      },
    },
    guide: {
      bannerMessage:
        'Tip del mapa 🧭\nActiva "Usar mi ubicación" para ver primero los puntos de entrega cercanos.',
    },
    routePanel: {
      title: "Indicaciones a pie",
      idle: "Toca el botón de rutas en la lista para ver el recorrido.",
      measuring: "Obteniendo la ruta a pie...",
      failed: "No se pudo cargar la ruta. Inténtalo de nuevo.",
      clear: "Borrar ruta",
      locationRequired: "Activa primero tu ubicación para usar las indicaciones a pie.",
    },
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
      updatedAt: "Actualizado {{time}}",
    },
    availability: {
      available: "Disponible",
      full: "Lleno",
      maintenance: "En mantenimiento",
    },
    centers: {
      title: "Centros de reciclaje",
      sectionTitle: "Centros de reciclaje",
      directions: "Cómo llegar",
      call: "Llamar",
    },
    errors: {
      title: "No se pudieron cargar los datos del mapa",
      description:
        "Comprueba la conexión del servidor o la configuración SSL y vuelve a intentarlo.",
      detail: "Mensaje de error: {{message}}",
      action: "Reintentar",
      retrying: "Reintentando...",
    },
  },
  settings: {
    profile: {
      avatarAlt: "Imagen de perfil predeterminada",
      joined: "Se unió el {{date}}",
      nickname: "Apodo",
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
      monthlyGoal: {
        title: "Meta mensual de puntos",
        description: "Base de cálculo del progreso",
        placeholder: "p. ej. 200",
        helper: "Ingresa al menos 10 pt para guardarlo.",
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
      languages: {
        ko: "Coreano",
        en: "Inglés",
        es: "Español",
        fr: "Francés",
      },
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
      resetConfirm: "Todos los datos almacenados localmente se eliminarán. ¿Continuar?",
      resetData: "Restablecer datos",
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
      pointsNeeded: "{{points}}pt necesarios para el siguiente nivel",
      maxLevel: "¡Nivel máximo alcanzado!",
    },
    monthlyGoal: {
      title: "Meta de puntos mensuales",
      description: "Define cuántos puntos quieres lograr este mes.",
      placeholder: "ej. 250",
      helper: "Ingresa un valor mayor a 10 puntos para guardarlo automáticamente.",
      cta: "Guardar meta",
      usage: "Se refleja en las tarjetas de progreso y el tracker del panel.",
    },
    categories: {
      title: "Estadísticas por Categoría",
      topCategory: "Más Reciclado",
      noData: "Aún no hay datos de categorías.",
      items: "{{count}} artículos",
      points: "{{points}}pt",
    },
  },
  materials: {
    categories: {
      plastic: "Plástico",
      paper: "Papel",
      metal: "Metal",
      glass: "Vidrio",
      textile: "Textiles",
      electronic: "Electrónica",
      other: "Otros",
    },
    items: {
      plasticBottle: "Botella de plástico",
      petBottle: "Botella PET",
      plasticContainer: "Envase plástico",
      vinyl: "Bolsa/película plástica",
      styrofoam: "Espuma de poliestireno",
      paper: "Papel",
      cardboard: "Cartón",
      newspaper: "Periódico",
      milkCarton: "Cartón de leche",
      can: "Lata",
      aluminumCan: "Lata de aluminio",
      steelCan: "Lata de acero",
      glassBottle: "Botella de vidrio",
      sojuBottle: "Botella de soju",
      clothes: "Ropa",
      oldClothes: "Ropa usada",
      textile: "Textil",
      battery: "Batería",
      electronics: "Electrónicos",
      fluorescentLamp: "Tubo fluorescente",
      other: "Otro",
    },
  },
  notifications: {
    actions: {
      close: "Cerrar",
      undo: "Deshacer",
    },
    banner: {
      welcome: {
        message: "¡Hola {{name}}!\n¿Registramos otra acción de reciclaje hoy?",
        cta: "Registrar actividad",
      },
    },
    snackbar: {
      entrySaved: "¡Actividad registrada! +{{points}}pt obtenidos",
      entryDeleted: "El registro de actividad se eliminó",
      entryRestored: "El registro se restauró",
      profileUpdated: "El nombre de perfil se actualizó",
      languageChanged: "El idioma cambió a {{language}}",
      regionChanged: "La región se configuró en {{region}}",
      darkModeEnabled: "Modo oscuro activado",
      darkModeDisabled: "Modo claro activado",
      locationPermissionRequired:
        "Activa el permiso de ubicación en Ajustes para mostrar tu posición actual.",
      locationUnsupported: "Este dispositivo no puede usar servicios de ubicación.",
      locationPinned: "Tu ubicación actual se ha marcado en el mapa.",
      locationPermissionDenied: "El navegador rechazó el acceso a la ubicación.",
      locationError: "No pudimos obtener tu ubicación. Inténtalo de nuevo.",
    },
  },
  common: {
    // 취소 버튼 공통 문구
    cancel: "Cancelar",
    // 저장 버튼 공통 문구
    save: "Guardar",
    // 삭제 버튼 공통 문구
    delete: "Eliminar",
    // 편집 버튼 공통 문구
    edit: "Editar",
    // 확인 버튼 공통 문구
    confirm: "Confirmar",
  },
} as const;
