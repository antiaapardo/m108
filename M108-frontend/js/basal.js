const preguntasBasal = [
  { id: 'PA1', tipo: 'numero' },
  { id: 'PB1', tipo: 'radio', valores: ['Menos de 5 h', '5-6 h', '6-7 h', '7-8 h', 'Más de 8 h'] },
  { id: 'PB2', tipo: 'radio', valores: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'] },
  { id: 'PC1', tipo: 'radio', valores: ['Nunca o casi nunca', '1-2 días por semana', '3-4 días por semana', '5-7 días por semana'] },
  { id: 'PD1', tipo: 'radio', valores: ['Sueles tener frío', 'Sueles estar confortable', 'Sueles tener calor', 'Tu percepción varía mucho'] },
  { id: 'PE1', tipo: 'checkbox', valores: ['Proximidad al/a la docente', 'Buena visibilidad de la pantalla/pizarra', 'Proximidad a una ventana', 'Disponer de más espacio personal', 'Disponibilidad de enchufe'] },
  { id: 'PF1', tipo: 'radio', valores: ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'] },
];

const respuestasBasal = {};
let pasoActual = 0;

function mostrarBasal() {
  pasoActual = 0;
  respuestasBasal.length = undefined;
  renderPasoBasal();
}

function renderPasoBasal() {
  const pregunta = preguntasBasal[pasoActual];
  const clave = `basal.preguntas.${pregunta.id}`;
  const progreso = t('common.progress', { n: pasoActual + 1, total: preguntasBasal.length });
  const etiquetas = pregunta.valores ? t(`${clave}.opciones`) : null;
  const respuestaPrevia = respuestasBasal[pregunta.id];

  let camposHtml = '';
  if (pregunta.tipo === 'numero') {
    camposHtml = `<input type="number" id="campo-${pregunta.id}" value="${respuestaPrevia ?? ''}" />`;
  } else if (pregunta.tipo === 'radio') {
    camposHtml = pregunta.valores.map((valor, i) => `
      <label class="opcion"><input type="radio" name="campo-${pregunta.id}" value="${valor}" ${valor === respuestaPrevia ? 'checked' : ''} /> ${etiquetas[i]}</label>
    `).join('');
  } else if (pregunta.tipo === 'checkbox') {
    const previasArray = Array.isArray(respuestaPrevia) ? respuestaPrevia : [];
    camposHtml = pregunta.valores.map((valor, i) => `
      <label class="opcion"><input type="checkbox" name="campo-${pregunta.id}" value="${valor}" ${previasArray.includes(valor) ? 'checked' : ''} /> ${etiquetas[i]}</label>
    `).join('');
  }

  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <p>${progreso}</p>
    <h2>${t(`${clave}.titulo`)}</h2>
    ${camposHtml}
    <button id="btn-siguiente">${pasoActual === preguntasBasal.length - 1 ? t('common.submit') : t('common.next')}</button>
    ${pasoActual > 0 ? `<button id="btn-atras" class="boton-secundario">${t('common.back')}</button>` : ''}
  `;

  activarSelectorIdioma(renderPasoBasal);

  if (pasoActual > 0) {
    document.getElementById('btn-atras').addEventListener('click', () => {
      pasoActual -= 1;
      renderPasoBasal();
    });
  }

  document.getElementById('btn-siguiente').addEventListener('click', async () => {
    if (!respuestaCompletada(pregunta)) {
      mostrarAviso(t('common.answer_required'));
      return;
    }
    guardarRespuestaActual(pregunta);
    if (pasoActual < preguntasBasal.length - 1) {
      pasoActual += 1;
      renderPasoBasal();
    } else {
      await enviarBasal();
    }
  });
}

function respuestaCompletada(pregunta) {
  if (pregunta.tipo === 'numero') {
    const valor = document.getElementById(`campo-${pregunta.id}`).value;
    return valor !== '';
  }
  if (pregunta.tipo === 'radio') {
    return document.querySelector(`input[name="campo-${pregunta.id}"]:checked`) !== null;
  }
  if (pregunta.tipo === 'checkbox') {
    return document.querySelectorAll(`input[name="campo-${pregunta.id}"]:checked`).length > 0;
  }
  return true;
}

function guardarRespuestaActual(pregunta) {
  if (pregunta.tipo === 'numero') {
    respuestasBasal[pregunta.id] = Number(document.getElementById(`campo-${pregunta.id}`).value) || null;
  } else if (pregunta.tipo === 'radio') {
    respuestasBasal[pregunta.id] = valorRadio(`campo-${pregunta.id}`);
  } else if (pregunta.tipo === 'checkbox') {
    respuestasBasal[pregunta.id] = valoresCheckbox(`campo-${pregunta.id}`);
  }
}

function valorRadio(name) {
  const elegido = document.querySelector(`input[name="${name}"]:checked`);
  return elegido ? elegido.value : null;
}

function valoresCheckbox(name) {
  const elegidos = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(elegidos).map((el) => el.value);
}

async function enviarBasal() {
  const codigo = localStorage.getItem(CODIGO_KEY);
  const resultado = await api('/api/v1/estudiante/basal', {
    method: 'POST',
    body: {
      codigo,
      consentimiento: true,
      edad: respuestasBasal.PA1,
      genero: respuestasBasal.PA2,
      horas_sueno: respuestasBasal.PB1,
      calidad_sueno: respuestasBasal.PB2,
      frecuencia_cafeina: respuestasBasal.PC1,
      sensibilidad_termica: respuestasBasal.PD1,
      factores_ubicacion: respuestasBasal.PE1,
      nivel_atencion: respuestasBasal.PF1,
    },
  });

  const mesa = parametrosUrl();
  if (mesa.aula) {
    mostrarEntrada(mesa);
  } else {
    mostrarGraciasBasal(resultado.id);
  }
}

function mostrarGraciasBasal(id) {
  mostrarPantallaGracias('basal.gracias_titulo', 'basal.gracias', { id });
}
