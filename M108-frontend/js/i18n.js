const LANG_KEY = 'lsef_lang';
const idiomasDisponibles = ['es', 'en', 'gl'];
const nombresIdiomas = { es: 'ES', en: 'EN', gl: 'GL' };

const traducciones = {
  es: {
    common: {
      loading: 'Cargando…',
      next: 'Siguiente',
      back: 'Atrás',
      submit: 'Enviar',
      progress: 'Pregunta {n} de {total}',
      answer_required: 'Por favor, responde antes de continuar.',
      no_active_session: 'Todavía no hay ninguna sesión activa en esta aula.',
      has_baseline: 'Ya tienes código y encuesta basal completa.',
    },
    bienvenida: {
      titulo: 'Antes de empezar',
      texto: 'Si es tu primera vez, tienes que crear tu código anónimo. Si ya participaste antes, puedes introducir tu código.',
      boton_nuevo: 'Es mi primera vez',
      boton_existente: 'Ya tengo un código',
    },
    codigo: {
      titulo: 'Tu código es',
      ayuda: 'Guarda una captura de pantalla o anota este código.',
      boton_continuar: 'Ya lo he guardado, continuar',
    },
    consentimiento: {
      titulo: 'Consentimiento informado',
      texto1: 'Este estudio recoge datos ambientales del aula junto con respuestas breves sobre tu percepción térmica, tu nivel de alerta y algunos hábitos. La participación es voluntaria y no afecta a tu evaluación académica.',
      texto2: 'Tus respuestas se asocian a un código anónimo, no a tu nombre.',
      checkbox: 'He leído y entiendo la información anterior y acepto participar.',
      boton: 'Continuar',
      aviso_checkbox: 'Tienes que marcar la casilla para continuar.',
    },
    recuperar: {
      titulo: 'Introduce tu código',
      placeholder: 'Tu código personal',
      boton: 'Validar código',
      aviso_vacio: 'Introduce tu código.',
      aviso_invalido: 'Ese código no existe. Comprueba que lo escribiste bien.',
    },
    eleccion: {
      titulo: '¿Qué encuesta vas a rellenar?',
      boton_entrada: 'Encuesta de entrada',
      boton_salida: 'Encuesta de salida',
    },
    basal: {
      gracias_titulo: '¡Listo!',
      gracias: 'Gracias, encuesta registrada (id {id}).',
      preguntas: {
        PA1: { titulo: 'Edad' },
        PB1: { titulo: '¿Cuántas horas duermes habitualmente durante los días lectivos?',
          opciones: ['Menos de 5 h', '5-6 h', '6-7 h', '7-8 h', 'Más de 8 h'] },
        PB2: { titulo: 'En general, ¿cómo valorarías la calidad de tu sueño?',
          opciones: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'] },
        PC1: { titulo: '¿Con qué frecuencia consumes bebidas con cafeína?',
          opciones: ['Nunca o casi nunca', '1-2 días por semana', '3-4 días por semana', '5-7 días por semana'] },
        PD1: { titulo: 'En general, cuando estás en espacios interiores...',
          opciones: ['Sueles tener frío', 'Sueles estar confortable', 'Sueles tener calor', 'Tu percepción varía mucho'] },
        PE1: { titulo: '¿Qué factores suelen influir en dónde te sientas?',
          opciones: ['Proximidad al/a la docente', 'Buena visibilidad de la pantalla/pizarra', 'Proximidad a una ventana', 'Disponer de más espacio personal', 'Disponibilidad de enchufe'] },
        PF1: { titulo: '¿Cómo valorarías tu capacidad para mantener la atención?',
          opciones: ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'] },
      },
    },
    entrada: {
      espera_sesion: 'Todavía no hay ninguna sesión activa en esta aula. Espera a que el/la docente la inicie.',
      gracias_titulo: '¡Listo!',
      gracias: 'Gracias, encuesta de entrada registrada (id {id}).',
      boton_ir_salida: 'Continuar a la encuesta de salida',
      preguntas: {
        PA1: { titulo: '¿Es esta tu primera clase del día?', opciones: ['Sí', 'No'] },
        PA2: { titulo: 'Antes de esta sesión, ¿cuánto tiempo llevabas en la universidad?',
          opciones: ['Menos de 1 h', '1-2 h', '2-4 h', 'Más de 4 h'] },
        PA3: { titulo: '¿Cómo valorarías la calidad de tu sueño la pasada noche?',
          opciones: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'] },
        PA4: { titulo: '¿Has consumido alguna bebida con cafeína en las últimas 3 horas?',
          opciones: ['No', 'Sí, café', 'Sí, té', 'Sí, bebida energética', 'Sí, otros'] },
        PA5: { titulo: '¿Cuál era tu nivel de somnolencia al entrar al aula?',
          etiquetaMin: 'Máxima alerta', etiquetaMax: 'Gran somnolencia' },
        PA6: { titulo: '¿Qué tipo de actividad realizaste en los 15-20 minutos antes de esta sesión?',
          opciones: ['Sentada/o, en reposo (clase anterior, estudiando, esperando)', 'Caminando de forma tranquila (desplazamiento entre aulas)', 'Caminando con prisa o subiendo escaleras', 'Actividad física más intensa (deporte, gimnasio)'] },
        PA7: { titulo: '¿Cómo describirías tu vestimenta en este momento?',
          opciones: ['Ligera (camiseta de manga corta, sin capas adicionales)', 'Media (manga larga o una capa adicional ligera, ej: sudadera)', 'Abrigada (varias capas, jersey gordo, chaqueta puesta en el aula)'] },
      },
    },
    salida: {
      pvt_instrucciones: 'Toca la caja en cuanto cambie de color. 6 intentos.',
      pvt_preparate: 'Prepárate…',
      pvt_ahora: '¡Ahora!',
      pvt_completada: 'Tarea completada',
      pvt_espera: 'Espera…',
      gracias_titulo: '¡Gracias!',
      gracias: 'Gracias por tu participación hoy (id {id}).',
      preguntas: {
        PB1: { titulo: '¿Cuál es tu nivel de somnolencia en este momento?',
          etiquetaMin: 'Máxima alerta', etiquetaMax: 'Gran somnolencia' },
        PB2: { titulo: 'Prueba breve de tiempo de reacción' },
        PB3: { titulo: '¿Cómo valorarías tu capacidad para concentrarte durante esta sesión?',
          opciones: ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'] },
        PB4: { titulo: '¿Cómo de fatigada/o mentalmente te sientes al finalizar la sesión?',
          opciones: ['Nada fatigada/o', 'Poco fatigada/o', 'Moderadamente fatigada/o', 'Bastante fatigada/o', 'Muy fatigada/o'] },
        PC1: { titulo: '¿Cómo has percibido la temperatura del aula durante la sesión?',
          etiquetaMin: 'Muy fría', etiquetaMax: 'Muy cálida' },
        PC2: { titulo: 'Preferirías que la temperatura fuese...',
          opciones: ['Más baja', 'Sin cambios', 'Más elevada'] },
        PC3: { titulo: '¿Cómo has percibido el frescor del aire durante la sesión?',
          etiquetaMin: 'Muy cargado', etiquetaMax: 'Muy fresco' },
        PC4: { titulo: '¿Has percibido el aire cargado?', opciones: ['Sí', 'No'] },
        PD1: { titulo: '¿En qué medida consideras que has aprovechado esta sesión?',
          opciones: ['Nada', 'Poco', 'Moderadamente', 'Bastante', 'Mucho'] },
      },
    },
    docente: {
      falta_aula: 'Falta el parámetro de aula en la URL.',
      quien_eres_titulo: '¿Quién eres?',
      quien_eres_texto: 'Se recordará en este dispositivo para las próximas sesiones.',
      confirmar: 'Confirmar',
      aviso_elige: 'Elige quién eres.',
      sesion_titulo: 'Sesión — {aula}',
      sesion_texto: '{docente}, pulsa para iniciar la sesión en esta aula.',
      iniciar_sesion: 'Iniciar sesión',
      materia_label: 'Materia/asignatura',
      materia_placeholder: 'Ej. Programación II',
      aviso_campos_inicio: 'Rellena todos los campos antes de iniciar la sesión.',
      aviso_salir: '¿Seguro que quieres salir sin cerrar la sesión? Se cerrará sin los datos de la clase.',
      campos_titulo: '{aula} — sesión iniciada',
      campos_texto: 'Rellena esto al finalizar la sesión.',
      tipo_sesion_label: 'Tipo de sesión',
      tipo_sesion_opciones: ['Magistral/expositiva', 'Resolución de problemas', 'Combinada'],
      estructura_descanso_label: 'Estructura de descanso',
      estructura_descanso_opciones: ['Descanso a mitad de sesión', 'Sin descanso'],
      num_estudiantes_label: 'Número de estudiantes presentes',
      asistencia_label: '¿La asistencia de hoy es la habitual?',
      asistencia_opciones: ['Asistencia habitual', 'Asistencia notablemente menor', 'Asistencia notablemente mayor'],
      incidencias_label: 'Incidencias (opcional)',
      incidencias_placeholder: 'Ej. obras cercanas, avería de climatización...',
      marcar_fin: 'Guardar y finalizar sesión',
      aviso_campos: 'Rellena todos los campos antes de finalizar la sesión.',
      aviso_guardado: 'Guardado.',
      sesion_finalizada: 'Sesión finalizada. Gracias.',
    },
  },
  en: {
    common: {
      loading: 'Loading…',
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      progress: 'Question {n} of {total}',
      answer_required: 'Please answer before continuing.',
      no_active_session: 'There is no active session in this classroom yet.',
      has_baseline: 'You already have a code and your baseline survey is complete.',
    },
    bienvenida: {
      titulo: 'Before you start',
      texto: 'If this is your first time, you need to create your anonymous code. If you have taken part before, you can enter your code.',
      boton_nuevo: 'It’s my first time',
      boton_existente: 'I already have a code',
    },
    codigo: {
      titulo: 'Your code is',
      ayuda: 'Save a screenshot or write down this code.',
      boton_continuar: 'I have saved it, continue',
    },
    consentimiento: {
      titulo: 'Informed consent',
      texto1: 'This study collects environmental data from the classroom together with brief answers about your thermal perception, your alertness level and some habits. Participation is voluntary and does not affect your academic assessment.',
      texto2: 'Your answers are linked to an anonymous code, not to your name.',
      checkbox: 'I have read and understand the information above and agree to take part.',
      boton: 'Continue',
      aviso_checkbox: 'You must check the box to continue.',
    },
    recuperar: {
      titulo: 'Enter your code',
      placeholder: 'Your personal code',
      boton: 'Validate code',
      aviso_vacio: 'Enter your code.',
      aviso_invalido: 'That code does not exist. Check that you typed it correctly.',
    },
    eleccion: {
      titulo: 'Which survey are you going to fill in?',
      boton_entrada: 'Entry survey',
      boton_salida: 'Exit survey',
    },
    basal: {
      gracias_titulo: 'All done!',
      gracias: 'Thank you, survey recorded (id {id}).',
      preguntas: {
        PA1: { titulo: 'Age' },
        PB1: { titulo: 'How many hours do you usually sleep on class days?',
          opciones: ['Less than 5 h', '5-6 h', '6-7 h', '7-8 h', 'More than 8 h'] },
        PB2: { titulo: 'Overall, how would you rate the quality of your sleep?',
          opciones: ['Very poor', 'Poor', 'Fair', 'Good', 'Very good'] },
        PC1: { titulo: 'How often do you consume caffeinated drinks?',
          opciones: ['Never or almost never', '1-2 days a week', '3-4 days a week', '5-7 days a week'] },
        PD1: { titulo: 'In general, when you are indoors...',
          opciones: ['You tend to feel cold', 'You tend to feel comfortable', 'You tend to feel hot', 'Your perception varies a lot'] },
        PE1: { titulo: 'Which factors usually influence where you sit?',
          opciones: ['Proximity to the teacher', 'Good visibility of the screen/whiteboard', 'Proximity to a window', 'Having more personal space', 'Availability of a power outlet'] },
        PF1: { titulo: 'How would you rate your ability to maintain attention?',
          opciones: ['Very low', 'Low', 'Moderate', 'High', 'Very high'] },
      },
    },
    entrada: {
      espera_sesion: 'There is no active session in this classroom yet. Wait for the teacher to start it.',
      gracias_titulo: 'All done!',
      gracias: 'Thank you, entry survey recorded (id {id}).',
      boton_ir_salida: 'Continue to the exit survey',
      preguntas: {
        PA1: { titulo: 'Is this your first class of the day?', opciones: ['Yes', 'No'] },
        PA2: { titulo: 'Before this session, how long had you been at university?',
          opciones: ['Less than 1 h', '1-2 h', '2-4 h', 'More than 4 h'] },
        PA3: { titulo: 'How would you rate the quality of your sleep last night?',
          opciones: ['Very poor', 'Poor', 'Fair', 'Good', 'Very good'] },
        PA4: { titulo: 'Have you had any caffeinated drink in the last 3 hours?',
          opciones: ['No', 'Yes, coffee', 'Yes, tea', 'Yes, energy drink', 'Yes, other'] },
        PA5: { titulo: 'What was your sleepiness level when you entered the classroom?',
          etiquetaMin: 'Maximum alertness', etiquetaMax: 'Extreme sleepiness' },
        PA6: { titulo: 'What type of activity did you do in the 15-20 minutes before this session?',
          opciones: ['Sitting, at rest (previous class, studying, waiting)', 'Walking calmly (moving between classrooms)', 'Walking hurriedly or climbing stairs', 'More intense physical activity (sport, gym)'] },
        PA7: { titulo: 'How would you describe your clothing right now?',
          opciones: ['Light (short-sleeved t-shirt, no extra layers)', 'Medium (long sleeves or one light extra layer, e.g. a hoodie)', 'Warm (several layers, a thick jumper, jacket worn in the classroom)'] },
      },
    },
    salida: {
      pvt_instrucciones: 'Tap the box as soon as it changes color. 6 attempts.',
      pvt_preparate: 'Get ready…',
      pvt_ahora: 'Now!',
      pvt_completada: 'Task completed',
      pvt_espera: 'Wait…',
      gracias_titulo: 'Thank you!',
      gracias: 'Thank you for your participation today (id {id}).',
      preguntas: {
        PB1: { titulo: 'What is your sleepiness level right now?',
          etiquetaMin: 'Maximum alertness', etiquetaMax: 'Extreme sleepiness' },
        PB2: { titulo: 'Brief reaction-time test' },
        PB3: { titulo: 'How would you rate your ability to concentrate during this session?',
          opciones: ['Very low', 'Low', 'Moderate', 'High', 'Very high'] },
        PB4: { titulo: 'How mentally fatigued do you feel at the end of the session?',
          opciones: ['Not fatigued at all', 'A little fatigued', 'Moderately fatigued', 'Quite fatigued', 'Very fatigued'] },
        PC1: { titulo: 'How did you perceive the classroom temperature during the session?',
          etiquetaMin: 'Very cold', etiquetaMax: 'Very warm' },
        PC2: { titulo: 'Would you prefer the temperature to be...',
          opciones: ['Lower', 'No change', 'Higher'] },
        PC3: { titulo: 'How did you perceive the freshness of the air during the session?',
          etiquetaMin: 'Very stuffy', etiquetaMax: 'Very fresh' },
        PC4: { titulo: 'Did you perceive the air as stuffy?', opciones: ['Yes', 'No'] },
        PD1: { titulo: 'To what extent do you feel you made the most of this session?',
          opciones: ['Not at all', 'A little', 'Moderately', 'Quite a lot', 'A lot'] },
      },
    },
    docente: {
      falta_aula: 'The classroom parameter is missing from the URL.',
      quien_eres_titulo: 'Who are you?',
      quien_eres_texto: 'This will be remembered on this device for future sessions.',
      confirmar: 'Confirm',
      aviso_elige: 'Choose who you are.',
      sesion_titulo: 'Session — {aula}',
      sesion_texto: '{docente}, tap to start the session in this classroom.',
      iniciar_sesion: 'Start session',
      materia_label: 'Subject/course',
      materia_placeholder: 'E.g. Programming II',
      aviso_campos_inicio: 'Fill in all the fields before starting the session.',
      aviso_salir: 'Are you sure you want to leave without ending the session? It will be closed without the class details.',
      campos_titulo: '{aula} — session started',
      campos_texto: 'Fill this in at the end of the session.',
      tipo_sesion_label: 'Session type',
      tipo_sesion_opciones: ['Lecture-based', 'Problem-solving', 'Combined'],
      estructura_descanso_label: 'Break structure',
      estructura_descanso_opciones: ['Break halfway through the session', 'No break'],
      num_estudiantes_label: 'Number of students present',
      asistencia_label: 'Is today’s attendance the usual one?',
      asistencia_opciones: ['Usual attendance', 'Noticeably lower attendance', 'Noticeably higher attendance'],
      incidencias_label: 'Incidents (optional)',
      incidencias_placeholder: 'E.g. nearby construction work, air conditioning failure...',
      marcar_fin: 'Save and end session',
      aviso_campos: 'Fill in all the fields before ending the session.',
      aviso_guardado: 'Saved.',
      sesion_finalizada: 'Session finished. Thank you.',
    },
  },
  gl: {
    common: {
      loading: 'Cargando…',
      next: 'Seguinte',
      back: 'Atrás',
      submit: 'Enviar',
      progress: 'Pregunta {n} de {total}',
      answer_required: 'Por favor, responde antes de continuar.',
      no_active_session: 'Aínda non hai ningunha sesión activa nesta aula.',
      has_baseline: 'Xa tes código e a enquisa basal completa.',
    },
    bienvenida: {
      titulo: 'Antes de empezar',
      texto: 'Se é a túa primeira vez, tes que crear o teu código anónimo. Se xa participaches antes, podes introducir o teu código.',
      boton_nuevo: 'É a miña primeira vez',
      boton_existente: 'Xa teño un código',
    },
    codigo: {
      titulo: 'O teu código é',
      ayuda: 'Garda unha captura de pantalla ou anota este código.',
      boton_continuar: 'Xa o gardei, continuar',
    },
    consentimiento: {
      titulo: 'Consentimento informado',
      texto1: 'Este estudo recolle datos ambientais da aula xunto con respostas breves sobre a túa percepción térmica, o teu nivel de alerta e algúns hábitos. A participación é voluntaria e non afecta á túa avaliación académica.',
      texto2: 'As túas respostas asócianse a un código anónimo, non ao teu nome.',
      checkbox: 'Lin e entendo a información anterior e acepto participar.',
      boton: 'Continuar',
      aviso_checkbox: 'Tes que marcar a caixa para continuar.',
    },
    recuperar: {
      titulo: 'Introduce o teu código',
      placeholder: 'O teu código persoal',
      boton: 'Validar código',
      aviso_vacio: 'Introduce o teu código.',
      aviso_invalido: 'Ese código non existe. Comproba que o escribiches ben.',
    },
    eleccion: {
      titulo: 'Que enquisa vas cubrir?',
      boton_entrada: 'Enquisa de entrada',
      boton_salida: 'Enquisa de saída',
    },
    basal: {
      gracias_titulo: 'Feito!',
      gracias: 'Grazas, enquisa rexistrada (id {id}).',
      preguntas: {
        PA1: { titulo: 'Idade' },
        PB1: { titulo: 'Cantas horas durmes habitualmente durante os días lectivos?',
          opciones: ['Menos de 5 h', '5-6 h', '6-7 h', '7-8 h', 'Máis de 8 h'] },
        PB2: { titulo: 'En xeral, como valorarías a calidade do teu sono?',
          opciones: ['Moi mala', 'Mala', 'Regular', 'Boa', 'Moi boa'] },
        PC1: { titulo: 'Con que frecuencia consumes bebidas con cafeína?',
          opciones: ['Nunca ou case nunca', '1-2 días á semana', '3-4 días á semana', '5-7 días á semana'] },
        PD1: { titulo: 'En xeral, cando estás en espazos interiores...',
          opciones: ['Adoitas ter frío', 'Adoitas estar confortable', 'Adoitas ter calor', 'A túa percepción varía moito'] },
        PE1: { titulo: 'Que factores adoitan influír en onde te sentas?',
          opciones: ['Proximidade ao/á docente', 'Boa visibilidade da pantalla/encerado', 'Proximidade a unha ventá', 'Dispoñer de máis espazo persoal', 'Dispoñibilidade de enchufe'] },
        PF1: { titulo: 'Como valorarías a túa capacidade para manter a atención?',
          opciones: ['Moi baixa', 'Baixa', 'Moderada', 'Alta', 'Moi alta'] },
      },
    },
    entrada: {
      espera_sesion: 'Aínda non hai ningunha sesión activa nesta aula. Agarda a que o/a docente a inicie.',
      gracias_titulo: 'Feito!',
      gracias: 'Grazas, enquisa de entrada rexistrada (id {id}).',
      boton_ir_salida: 'Continuar á enquisa de saída',
      preguntas: {
        PA1: { titulo: 'É esta a túa primeira clase do día?', opciones: ['Si', 'Non'] },
        PA2: { titulo: 'Antes desta sesión, canto tempo levabas na universidade?',
          opciones: ['Menos de 1 h', '1-2 h', '2-4 h', 'Máis de 4 h'] },
        PA3: { titulo: 'Como valorarías a calidade do teu sono a pasada noite?',
          opciones: ['Moi mala', 'Mala', 'Regular', 'Boa', 'Moi boa'] },
        PA4: { titulo: 'Consumiches algunha bebida con cafeína nas últimas 3 horas?',
          opciones: ['Non', 'Si, café', 'Si, té', 'Si, bebida enerxética', 'Si, outros'] },
        PA5: { titulo: 'Cal era o teu nivel de somnolencia ao entrar na aula?',
          etiquetaMin: 'Máxima alerta', etiquetaMax: 'Gran somnolencia' },
        PA6: { titulo: 'Que tipo de actividade realizaches nos 15-20 minutos antes desta sesión?',
          opciones: ['Sentada/o, en repouso (clase anterior, estudando, agardando)', 'Camiñando de forma tranquila (desprazamento entre aulas)', 'Camiñando con présa ou subindo escaleiras', 'Actividade física máis intensa (deporte, ximnasio)'] },
        PA7: { titulo: 'Como describirías a túa roupa neste momento?',
          opciones: ['Lixeira (camiseta de manga curta, sen capas adicionais)', 'Media (manga longa ou unha capa adicional lixeira, p.ex.: sudadeira)', 'Abrigada (varias capas, xersei groso, chaqueta posta na aula)'] },
      },
    },
    salida: {
      pvt_instrucciones: 'Toca a caixa en canto cambie de cor. 6 intentos.',
      pvt_preparate: 'Prepárate…',
      pvt_ahora: 'Agora!',
      pvt_completada: 'Tarefa completada',
      pvt_espera: 'Agarda…',
      gracias_titulo: 'Grazas!',
      gracias: 'Grazas pola túa participación hoxe (id {id}).',
      preguntas: {
        PB1: { titulo: 'Cal é o teu nivel de somnolencia neste momento?',
          etiquetaMin: 'Máxima alerta', etiquetaMax: 'Gran somnolencia' },
        PB2: { titulo: 'Proba breve de tempo de reacción' },
        PB3: { titulo: 'Como valorarías a túa capacidade para concentrarte durante esta sesión?',
          opciones: ['Moi baixa', 'Baixa', 'Moderada', 'Alta', 'Moi alta'] },
        PB4: { titulo: 'Como de fatigada/o mentalmente te sentes ao rematar a sesión?',
          opciones: ['Nada fatigada/o', 'Pouco fatigada/o', 'Moderadamente fatigada/o', 'Bastante fatigada/o', 'Moi fatigada/o'] },
        PC1: { titulo: 'Como percibiches a temperatura da aula durante a sesión?',
          etiquetaMin: 'Moi fría', etiquetaMax: 'Moi cálida' },
        PC2: { titulo: 'Preferirías que a temperatura fose...',
          opciones: ['Máis baixa', 'Sen cambios', 'Máis elevada'] },
        PC3: { titulo: 'Como percibiches o frescor do aire durante a sesión?',
          etiquetaMin: 'Moi cargado', etiquetaMax: 'Moi fresco' },
        PC4: { titulo: 'Percibiches o aire cargado?', opciones: ['Si', 'Non'] },
        PD1: { titulo: 'En que medida consideras que aproveitaches esta sesión?',
          opciones: ['Nada', 'Pouco', 'Moderadamente', 'Bastante', 'Moito'] },
      },
    },
    docente: {
      falta_aula: 'Falta o parámetro de aula na URL.',
      quien_eres_titulo: 'Quen es?',
      quien_eres_texto: 'Lembrarase neste dispositivo para as próximas sesións.',
      confirmar: 'Confirmar',
      aviso_elige: 'Escolle quen es.',
      sesion_titulo: 'Sesión — {aula}',
      sesion_texto: '{docente}, preme para iniciar a sesión nesta aula.',
      iniciar_sesion: 'Iniciar sesión',
      materia_label: 'Materia/asignatura',
      materia_placeholder: 'Ex. Programación II',
      aviso_campos_inicio: 'Cobre todos os campos antes de iniciar a sesión.',
      aviso_salir: 'Seguro que queres saír sen pechar a sesión? Pecharase sen os datos da clase.',
      campos_titulo: '{aula} — sesión iniciada',
      campos_texto: 'Cobre isto ao rematar a sesión.',
      tipo_sesion_label: 'Tipo de sesión',
      tipo_sesion_opciones: ['Maxistral/expositiva', 'Resolución de problemas', 'Combinada'],
      estructura_descanso_label: 'Estrutura de descanso',
      estructura_descanso_opciones: ['Descanso a metade da sesión', 'Sen descanso'],
      num_estudiantes_label: 'Número de estudantes presentes',
      asistencia_label: 'A asistencia de hoxe é a habitual?',
      asistencia_opciones: ['Asistencia habitual', 'Asistencia notablemente menor', 'Asistencia notablemente maior'],
      incidencias_label: 'Incidencias (opcional)',
      incidencias_placeholder: 'Ex. obras próximas, avaría da climatización...',
      marcar_fin: 'Gardar e rematar a sesión',
      aviso_campos: 'Cobre todos os campos antes de rematar a sesión.',
      aviso_guardado: 'Gardado.',
      sesion_finalizada: 'Sesión finalizada. Grazas.',
    },
  },
};

function obtenerIdioma() {
  const guardado = localStorage.getItem(LANG_KEY);
  if (guardado && idiomasDisponibles.includes(guardado)) return guardado;
  const navegador = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return idiomasDisponibles.includes(navegador) ? navegador : 'es';
}

let idiomaActual = obtenerIdioma();
document.documentElement.lang = idiomaActual;

function establecerIdioma(lang) {
  if (!idiomasDisponibles.includes(lang)) return;
  idiomaActual = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
}

function buscarClave(diccionario, clave) {
  return clave.split('.').reduce((valor, parte) => (valor ? valor[parte] : undefined), diccionario);
}

function t(clave, variables) {
  let valor = buscarClave(traducciones[idiomaActual], clave);
  if (valor === undefined) {
    valor = buscarClave(traducciones.es, clave);
  }
  if (typeof valor === 'string' && variables) {
    return Object.keys(variables).reduce(
      (acc, k) => acc.replaceAll(`{${k}}`, variables[k]),
      valor,
    );
  }
  return valor;
}

function selectorIdiomaHtml() {
  return `<div class="selector-idioma">${idiomasDisponibles.map((lang) => `
    <button type="button" class="idioma-boton${lang === idiomaActual ? ' activo' : ''}" data-lang="${lang}">${nombresIdiomas[lang]}</button>
  `).join('')}</div>`;
}

function activarSelectorIdioma(alCambiar) {
  document.querySelectorAll('.idioma-boton').forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.dataset.lang === idiomaActual) return;
      establecerIdioma(boton.dataset.lang);
      alCambiar();
    });
  });
}
