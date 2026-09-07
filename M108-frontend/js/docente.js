const DOCENTE_KEY = 'lsef_docente';
const docentesDisponibles = ['Raquel', 'Pablo'];

const valoresTipoSesion = ['Magistral/expositiva', 'Resolución de problemas', 'Combinada'];
const valoresEstructuraDescanso = ['Descanso a mitad de sesión', 'Sin descanso'];
const valoresAsistencia = ['Asistencia habitual', 'Asistencia notablemente menor', 'Asistencia notablemente mayor'];

function iniciarPantallaDocente() {
  const { aula } = parametrosUrl();

  if (!aula) {
    appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('docente.falta_aula')}</p>`;
    activarSelectorIdioma(iniciarPantallaDocente);
    return;
  }

  const docenteGuardado = localStorage.getItem(DOCENTE_KEY);
  if (!docenteGuardado) {
    mostrarSelectorDocente(aula);
  } else {
    mostrarInicioSesion(aula, docenteGuardado);
  }
}

function mostrarSelectorDocente(aula) {
  const opcionesHtml = docentesDisponibles.map((nombre) => `
    <label class="opcion"><input type="radio" name="docente" value="${nombre}" /> ${nombre}</label>
  `).join('');

  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('docente.quien_eres_titulo')}</h1>
    <p>${t('docente.quien_eres_texto')}</p>
    <div class="pregunta-wrap">${opcionesHtml}</div>
    <button id="btn-confirmar-docente">${t('docente.confirmar')}</button>
  `;

  activarSelectorIdioma(() => mostrarSelectorDocente(aula));
  document.getElementById('btn-confirmar-docente').addEventListener('click', () => {
    const elegido = document.querySelector('input[name="docente"]:checked');
    if (!elegido) {
      mostrarAviso(t('docente.aviso_elige'));
      return;
    }
    localStorage.setItem(DOCENTE_KEY, elegido.value);
    mostrarInicioSesion(aula, elegido.value);
  });
}

function mostrarInicioSesion(aula, docente) {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('docente.sesion_titulo', { aula })}</h1>
    <p>${t('docente.sesion_texto', { docente })}</p>
    <button id="btn-iniciar-sesion">${t('docente.iniciar_sesion')}</button>
  `;

  activarSelectorIdioma(() => mostrarInicioSesion(aula, docente));
  document.getElementById('btn-iniciar-sesion').addEventListener('click', async () => {
    const resultado = await api('/api/v1/sesion/docente', {
      method: 'POST',
      body: { aula, docente, accion: 'inicio' },
    });
    mostrarCamposManuales(resultado);
  });
}

function mostrarCamposManuales(sesion) {
  const etiquetasTipoSesion = t('docente.tipo_sesion_opciones');
  const etiquetasEstructuraDescanso = t('docente.estructura_descanso_opciones');
  const etiquetasAsistencia = t('docente.asistencia_opciones');

  const tipoSesionHtml = valoresTipoSesion.map((valor, i) => `
    <label class="opcion"><input type="radio" name="tipo_sesion" value="${valor}" /> ${etiquetasTipoSesion[i]}</label>
  `).join('');
  const estructuraDescansoHtml = valoresEstructuraDescanso.map((valor, i) => `
    <label class="opcion"><input type="radio" name="estructura_descanso" value="${valor}" /> ${etiquetasEstructuraDescanso[i]}</label>
  `).join('');
  const asistenciaHtml = valoresAsistencia.map((valor, i) => `
    <label class="opcion"><input type="radio" name="asistencia_tipica" value="${valor}" /> ${etiquetasAsistencia[i]}</label>
  `).join('');

  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('docente.campos_titulo', { aula: sesion.aula })}</h1>
    <p>${t('docente.campos_texto')}</p>

    <p><strong>${t('docente.tipo_sesion_label')}</strong></p>
    ${tipoSesionHtml}

    <p><strong>${t('docente.estructura_descanso_label')}</strong></p>
    ${estructuraDescansoHtml}

    <p><strong>${t('docente.num_estudiantes_label')}</strong></p>
    <input type="number" id="num_estudiantes" />

    <p><strong>${t('docente.asistencia_label')}</strong></p>
    ${asistenciaHtml}

    <p><strong>${t('docente.incidencias_label')}</strong></p>
    <input type="text" id="incidencias" placeholder="${t('docente.incidencias_placeholder')}" />

    <button id="btn-guardar-campos">${t('docente.guardar')}</button>
    <button id="btn-marcar-fin" class="boton-secundario" style="margin-top: 0.75rem;">${t('docente.marcar_fin')}</button>  `;

  activarSelectorIdioma(() => mostrarCamposManuales(sesion));

  document.getElementById('btn-guardar-campos').addEventListener('click', async () => {
    const elegidoTipo = document.querySelector('input[name="tipo_sesion"]:checked');
    const elegidoDescanso = document.querySelector('input[name="estructura_descanso"]:checked');
    const elegidoAsistencia = document.querySelector('input[name="asistencia_tipica"]:checked');

    await api('/api/v1/sesion/docente', {
      method: 'POST',
      body: {
        aula: sesion.aula,
        accion: 'actualizar',
        sesion_id: sesion.id,
        tipo_sesion: elegidoTipo ? elegidoTipo.value : null,
        estructura_descanso: elegidoDescanso ? elegidoDescanso.value : null,
        num_estudiantes: Number(document.getElementById('num_estudiantes').value) || null,
        asistencia_tipica: elegidoAsistencia ? elegidoAsistencia.value : null,
        incidencias: document.getElementById('incidencias').value.trim() || null,
      },
    });
    mostrarAviso(t('docente.aviso_guardado'));
  });

  document.getElementById('btn-marcar-fin').addEventListener('click', async () => {
    await api('/api/v1/sesion/docente', {
      method: 'POST',
      body: { aula: sesion.aula, accion: 'actualizar', sesion_id: sesion.id, marcar_fin: true },
    });
    mostrarFinSesion();
  });
}

function mostrarFinSesion() {
  appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('docente.sesion_finalizada')}</p>`;
  activarSelectorIdioma(mostrarFinSesion);
}

iniciarPantallaDocente();
