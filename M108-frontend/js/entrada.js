const preguntasEntrada = [
  { id: 'PA1', tipo: 'radio', valores: ['Sí', 'No'] },
  { id: 'PA2', tipo: 'radio', valores: ['Menos de 1 h', '1-2 h', '2-4 h', 'Más de 4 h'] },
  { id: 'PA3', tipo: 'radio', valores: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'] },
  { id: 'PA4', tipo: 'radio', valores: ['No', 'Sí, café', 'Sí, té', 'Sí, bebida energética', 'Sí, otros'] },
  { id: 'PA5', tipo: 'escala', min: 1, max: 9 },
  { id: 'PA6', tipo: 'radio', valores: ['Sentada/o, en reposo (clase anterior, estudiando, esperando)', 'Caminando de forma tranquila (desplazamiento entre aulas)', 'Caminando con prisa o subiendo escaleras', 'Actividad física más intensa (deporte, gimnasio)'] },
  { id: 'PA7', tipo: 'radio', valores: ['Ligera (camiseta de manga corta, sin capas adicionales)', 'Media (manga larga o una capa adicional ligera, ej: sudadera)', 'Abrigada (varias capas, jersey gordo, chaqueta puesta en el aula)'] },
];

const respuestasEntrada = {};
let pasoEntrada = 0;
let sesionActualId = null;
let mesaActual = null;

async function mostrarEntrada(mesa) {
  mesaActual = mesa;
  const sesion = await api(`/api/v1/sesion/activa?aula=${mesa.aula}`);

  if (sesion.error) {
    appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('entrada.espera_sesion')}</p>`;
    activarSelectorIdioma(() => mostrarEntrada(mesa));
    return;
  }

  sesionActualId = sesion.id;
  pasoEntrada = 0;
  renderPasoEntrada();
}

function renderPasoEntrada() {
  const pregunta = preguntasEntrada[pasoEntrada];
  const clave = `entrada.preguntas.${pregunta.id}`;
  const progreso = t('common.progress', { n: pasoEntrada + 1, total: preguntasEntrada.length });

  let camposHtml = '';
  if (pregunta.tipo === 'escala') {
    const traduccion = t(clave);
    let botones = '';
    for (let valor = pregunta.min; valor <= pregunta.max; valor += 1) {
      botones += `<button type="button" class="escala-boton" data-valor="${valor}">${valor}</button>`;
    }
    camposHtml = `
      <div class="escala-fila" id="escala-${pregunta.id}">${botones}</div>
      <div class="escala-etiquetas"><span>${traduccion.etiquetaMin}</span><span>${traduccion.etiquetaMax}</span></div>
      <input type="hidden" id="valor-${pregunta.id}" />
    `;
  } else {
    const etiquetas = t(`${clave}.opciones`);
    camposHtml = pregunta.valores.map((valor, i) => `
      <label class="opcion"><input type="radio" name="campo-${pregunta.id}" value="${valor}" /> ${etiquetas[i]}</label>
    `).join('');
  }

  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <p>${progreso}</p>
    <h2>${t(`${clave}.titulo`)}</h2>
    <div class="pregunta-wrap">${camposHtml}</div>
    <button id="btn-siguiente-entrada">${pasoEntrada === preguntasEntrada.length - 1 ? t('common.submit') : t('common.next')}</button>
  `;

  activarSelectorIdioma(renderPasoEntrada);

  if (pregunta.tipo === 'escala') {
    document.querySelectorAll(`#escala-${pregunta.id} .escala-boton`).forEach((boton) => {
      boton.addEventListener('click', () => {
        document.querySelectorAll(`#escala-${pregunta.id} .escala-boton`).forEach((b) => b.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');
        document.getElementById(`valor-${pregunta.id}`).value = boton.dataset.valor;
      });
    });
  }

  document.getElementById('btn-siguiente-entrada').addEventListener('click', async () => {
    let valor;
    if (pregunta.tipo === 'escala') {
      valor = document.getElementById(`valor-${pregunta.id}`).value;
    } else {
      const elegido = document.querySelector(`input[name="campo-${pregunta.id}"]:checked`);
      valor = elegido ? elegido.value : null;
    }

    if (!valor) {
      mostrarAviso(t('common.answer_required'));
      return;
    }
    respuestasEntrada[pregunta.id] = valor;

    if (pasoEntrada < preguntasEntrada.length - 1) {
      pasoEntrada += 1;
      renderPasoEntrada();
    } else {
      await enviarEntrada();
    }
  });
}

async function enviarEntrada() {
  const codigo = localStorage.getItem(CODIGO_KEY);
  const resultado = await api('/api/v1/sesion/entrada', {
    method: 'POST',
    body: {
      sesion_id: sesionActualId,
      codigo,
      aula: mesaActual.aula,
      fila: Number(mesaActual.fila),
      asiento: Number(mesaActual.asiento),
      primera_clase_dia: respuestasEntrada.PA1 === 'Sí',
      tiempo_en_uni: respuestasEntrada.PA2,
      calidad_sueno_noche: respuestasEntrada.PA3,
      cafeina_3h: respuestasEntrada.PA4,
      kss_entrada: Number(respuestasEntrada.PA5),
      actividad_reciente: respuestasEntrada.PA6,
      nivel_vestimenta: respuestasEntrada.PA7,
    },
  });
  mostrarGraciasEntrada(resultado.id);
}

function mostrarGraciasEntrada(id) {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <div class="pantalla-gracias">
      <div class="icono">✓</div>
      <h1>${t('entrada.gracias_titulo')}</h1>
      <p>${t('entrada.gracias', { id })}</p>
      <button id="btn-ir-salida">${t('entrada.boton_ir_salida')}</button>
    </div>
  `;
  activarSelectorIdioma(() => mostrarGraciasEntrada(id));
  document.getElementById('btn-ir-salida').addEventListener('click', mostrarSalida);
}
