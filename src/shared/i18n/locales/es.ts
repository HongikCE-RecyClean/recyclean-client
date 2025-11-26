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
    tagline: "Haga que reciclar sea sencillo",
    description:
      "Registre pequeños gestos ecológicos diarios.\\nEncuentre puntos de entrega cercanos con facilidad.",
    cta: "Comenzar",
    hint: "Empiece a actuar por el planeta con {{appName}} ahora.",
    nameRequired: "Ingrese un apodo.",
    namePlaceholder: "Ingrese su apodo",
    kakaoLogin: "Continuar con Kakao",
    kakaoNotConfigured: "El inicio de sesión con Kakao no está configurado",
  },
  auth: {
    callback: {
      loading: "Procesando su inicio de sesión...",
      success: "¡Inicio de sesión exitoso!",
      redirecting: "Redirigiendo en breve...",
      error: "Error de inicio de sesión",
      retry: "Reintentar",
    },
    errors: {
      kakaoFailed: "Error en el inicio de sesión con Kakao",
      noCode: "Falta el código de autorización",
      loginFailed: "Error de inicio de sesión. Por favor, inténtelo de nuevo.",
    },
  },
  dashboard: {
    welcome: {
      greeting: "Hola, {{name}}!",
      defaultName: "amigo",
      helper: "Le guiaré en el reciclaje de hoy.",
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
        planned: "Planificados {{count}}",
      },
    },
    materialSearch: {
      title: "Búsqueda de materiales",
      placeholder: "Busque por material o producto",
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
      meta: "{{count}} artículos | {{time}}",
      points: "+{{points}} pts",
      pointsPlanned: "Planificado +{{points}} pts",
      modes: {
        record: "Completado",
        plan: "Planificado",
      },
      empty:
        "Aún no hay actividades registradas.\n¡Comience a registrar su primera actividad de reciclaje!",
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
          "Vacíe, enjuague, retire la etiqueta y la tapa, y luego comprima la botella antes de depositarla en el contenedor exclusivo para PET transparente.",
        tips: "Las botellas incoloras, sin etiqueta y comprimidas producen resina reciclada de mejor calidad.",
      },
      plasticTakeoutContainer: {
        name: "Envase plástico de comida con grasa",
        instructions:
          "Si quedan salsas u aceites difíciles de limpiar, el reciclaje se rechaza; cuando no pueda limpiarlo bien, tírelo como residuo general.",
        tips: "Solo los envases totalmente lavados y secos pueden enviarse al flujo de plásticos.",
      },
      paperCarton: {
        name: "Cartón de leche o jugo",
        instructions:
          "Vacíe, enjuague, abra y seque. Retire pajillas, pegatinas u otros materiales antes de agruparlos.",
        tips: "Incluso los cartonados laminados pueden reciclarse si están limpios; entréguelos en campañas o contenedores especiales.",
      },
      greasyPizzaBox: {
        name: "Caja de pizza con grasa",
        instructions:
          "La grasa contamina otros papeles, así que tire las partes manchadas en bolsas de basura o sacos especiales.",
        tips: "Separe la tapa limpia y recicle solo esa sección para mejorar el rendimiento.",
      },
      aluminumCan: {
        name: "Lata de aluminio",
        instructions:
          "Enjuague para quitar residuos y evite objetos extraños; retire cualquier tapa plástica antes de reciclarla.",
        tips: "Aplastar la parte superior mejora la eficiencia de recolección y el apilado.",
      },
      butaneCan: {
        name: "Lata de butano con gas restante",
        instructions:
          "Si aún queda gas, no se acepta; ventílela por completo al aire libre y depósitela en un saco especial.",
        tips: "Perfore la lata y retire las etiquetas una vez vacía para reciclarla como metal.",
      },
      glassBottle: {
        name: "Botella de vidrio de soju o cerveza",
        instructions:
          "Retire tapas y etiquetas, enjuague y recicle con cuidado o devuélvala mediante el programa de depósito.",
        tips: "Las botellas con depósito pueden devolverse a las tiendas para obtener el reembolso.",
      },
      heatResistantGlass: {
        name: "Utensilio de vidrio resistente al calor",
        instructions:
          "El vidrio templado tiene otro punto de fusión; envuélvalo en papel periódico y deséchelo como residuo general.",
        tips: "Marque claramente los fragmentos afilados para proteger al personal de recolección.",
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
      unsupported: "Su navegador no puede acceder a la cámara.",
      permission: "Permita el acceso a la cámara.",
      playback: "No se puede reproducir la señal de la cámara.",
      notReady: "La vista de la cámara aún no está lista.",
      stillInitializing: "La cámara sigue inicializándose. Inténtelo de nuevo en unos segundos.",
      captureFailed: "No se pudo capturar la imagen.",
      analysisFailed:
        "No pudimos contactar el servicio de IA. Intente nuevamente en unos segundos.",
      noPrediction: "No se detectó material reciclable. Pruebe con otro ángulo más claro.",
    },
    camera: {
      overlay: "Preparando la cámara...",
    },
    scanning: {
      headline: "Analizando su imagen...",
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
      saveSuccess: "✅ ¡Añadido a su registro de actividades!",
      defaultInstructions: "Retire los residuos y siga las normas de reciclaje de su municipio.",
    },
    tips: {
      title: "Consejos de captura",
      items: [
        "Tome la foto en un lugar bien iluminado.",
        "Un fondo limpio mejora la precisión.",
        "Asegúrese de que el símbolo de reciclaje sea visible.",
        "Si puede, tome la imagen de frente.",
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
        instructions: "Quite la etiqueta y la tapa, enjuague bien y recicle.",
        tips: "Busque el símbolo de reciclaje #1 en la base.",
      },
      pizzaBox: {
        item: "Caja de pizza",
        category: "Papel contaminado",
        instructions: "La grasa y los restos impiden reciclarla.",
        tips: "Recicle solo las partes limpias y deseche el resto.",
      },
      aluminumCan: {
        item: "Lata de aluminio",
        category: "Aluminio",
        instructions: "Enjuague y aplaste para ahorrar espacio.",
        tips: "Las latas metálicas tienen alto valor de reciclaje.",
      },
    },
    guides: {
      plastic: {
        item: "Plásticos",
        instructions: "Quite etiquetas y tapas, enjuague a fondo y aplaste antes de entregarlos.",
        tips: "Séquelos bien para evitar contaminación.",
      },
      paper: {
        item: "Papel y cartón",
        instructions: "Retire cinta o grapas, aplane las cajas y separe las partes sucias.",
        tips: "Guárdelos en una bolsa seca hasta la recolección.",
      },
      metal: {
        item: "Latas metálicas",
        instructions:
          "Vacíe y enjuague las latas, luego presiónelas ligeramente para ahorrar espacio.",
        tips: "Quite tapas o sellos plásticos antes de reciclar.",
      },
      glass: {
        item: "Envases de vidrio",
        instructions: "Retire las tapas, enjuague y deposítelos con cuidado para que no se rompan.",
        tips: "El vidrio roto se envuelve aparte según la guía local.",
      },
      textile: {
        item: "Textiles",
        instructions: "Lave y seque las prendas antes de llevarlas al contenedor de ropa.",
        tips: "Agrúpelas en bolsas cerradas para facilitar el manejo.",
      },
      electronic: {
        item: "Baterías y electrónicos",
        instructions:
          "Extraiga las baterías y lleve los aparatos a un punto limpio o centro de e-waste.",
        tips: "Cubra ambos polos de las baterías sueltas con cinta.",
      },
      other: {
        item: "Residuos generales",
        instructions: "Consulte la guía municipal cuando no esté seguro del contenedor correcto.",
        tips: "Busque símbolos de reciclaje o las indicaciones locales.",
      },
    },
  },
  calendar: {
    overviewTitle: "{{month}}",
    stats: {
      records: "Registros totales",
      items: "Artículos totales",
      points: "Puntos obtenidos",
      planned: "Planificados {{count}}",
    },
    legend: {
      title: "Leyenda de materiales",
      count: "{{count}} uds",
      points: "+{{points}} pts",
      empty: "Aún no hay registros este mes.",
    },
    entries: {
      title: "{{date}}",
      meta: "{{count}} artículos | {{time}}",
      points: "+{{points}} pts",
      pointsPlanned: "Planificado +{{points}} pts",
      modes: {
        record: "Completado",
        plan: "Planificado",
      },
      empty: "No hay registros este día.",
      // 삭제 확인 모달 메시지
      confirmDelete: "¿Seguro que quiere eliminar este registro?",
      // 기록 삭제 안내 메시지
      deleteGuide: "Al eliminar también se borran los puntos y no se puede deshacer",
    },
    guide: {
      title: "Guía de registro",
      items: [
        "Los registros se suman automáticamente a sus estadísticas mensuales.",
        "Los nuevos análisis aparecen de inmediato en el calendario.",
        "Los días con más actividad muestran un punto en el calendario.",
      ],
      bannerMessage:
        "Tip del calendario 🗓️\nToque una fecha para ver y eliminar sus registros al instante.",
    },
  },
  map: {
    mapView: {
      title: "Ver ubicaciones en el mapa",
      subtitle:
        'Mostramos los puntos de entrega de su región predeterminada; active "Usar mi ubicación" para ordenarlos por distancia.',
      loading: "Cargando el mapa...",
      missingKey: {
        title: "Falta la clave de la API del mapa",
        description:
          "Agrega la clave Web Dynamic Map de NAVER en la consola y vuelve a cargar para ver el mapa.",
      },
      loadFailed: {
        title: "No pudimos cargar el mapa",
        description: "Compruebe la conexión de red y la lista de dominios autorizados.",
      },
      initFailed: {
        title: "El motor del mapa no se inicializó",
        description:
          "Verifica que este origen esté incluido en los permisos y la lista de dominios de la API.",
      },
    },
    guide: {
      bannerMessage:
        "Tip del mapa 🧭\nUbicación desactivada = vista regional; activada = contenedores más cercanos primero.",
    },
    routePanel: {
      title: "Cómo llegar",
      idle: "Toque el botón de rutas en la lista para ver el recorrido.",
      measuring: "Obteniendo la ruta a pie...",
      failed: "No se pudo cargar la ruta. Inténtelo de nuevo.",
      clear: "Borrar ruta",
      locationRequired: "Active primero su ubicación para usar las indicaciones a pie.",
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
        "Compruebe la conexión del servidor o la configuración SSL y vuelva a intentarlo.",
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
          requesting: "Solicitando acceso a su ubicación…",
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
        helper: "Ingrese al menos 10 pt para guardarlo.",
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
      logoutConfirm: "¿Cerrar sesión?",
      // 로그아웃 안내 메시지
      logoutGuide:
        "Se cerrará tu sesión en este dispositivo. Inicia sesión de nuevo cuando quieras para continuar.",
      logoutSuccess: "Sesión cerrada.",
      logoutFailed: "No se pudo cerrar sesión. Inténtalo de nuevo.",
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
      description: "Defina cuántos puntos desea lograr este mes.",
      placeholder: "ej. 250",
      helper: "Ingrese un valor mayor a 10 puntos para guardarlo automáticamente.",
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
        "Active el permiso de ubicación en Ajustes para mostrar su posición actual.",
      locationUnsupported: "Este dispositivo no puede usar servicios de ubicación.",
      locationPinned: "Su ubicación actual se ha marcado en el mapa.",
      locationPermissionDenied: "El navegador rechazó el acceso a la ubicación.",
      locationError: "No pudimos obtener su ubicación. Inténtelo de nuevo.",
      analysisFailedRetry: "El análisis falló. Toma otra foto con mejor luz o ángulo.",
      analysisLowConfidence: "Confianza baja (≤60%). Vuelve a tomar la foto.",
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
