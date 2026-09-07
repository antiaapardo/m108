const preguntasSalida = [
  { id: 'PB1', tipo: 'escala', min: 1, max: 9 },
  { id: 'PB2', tipo: 'pvt' },
  { id: 'PB3', tipo: 'radio', valores: ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'] },
  { id: 'PB4', tipo: 'radio', valores: ['Nada fatigada/o', 'Poco fatigada/o', 'Moderadamente fatigada/o', 'Bastante fatigada/o', 'Muy fatigada/o'] },
  { id: 'PC1', tipo: 'escala', min: -3, max: 3 },
  { id: 'PC2', tipo: 'radio', valores: ['Más baja', 'Sin cambios', 'Más elevada'] },
  { id: 'PC3', tipo: 'escala', min: -2, max: 2 },
  { id: 'PC4', tipo: 'radio', valores: ['Sí', 'No'] },
  { id: 'PD1', tipo: 'radio', valores: ['Nada', 'Poco', 'Moderadamente', 'Bastante', 'Mucho'] },
];

const respuestasSalida = {};
let pasoSalida = 0;

function mostrarSalida() {
  pasoSalida = 0;
  renderPasoSalida();
}

function renderPasoSalida() {
  const pregunta = preguntasSalida[pasoSalida];
  const clave = `salida.preguntas.${pregunta.id}`;
  const progreso = t('common.progress', { n: pasoSalida + 1, total: preguntasSalida.length });
  const respuestaPrevia = respuestasSalida[pregunta.id];

  let camposHtml = '';
  if (pregunta.tipo === 'escala') {
    const traduccion = t(clave);
    let botones = '';
    for (let valor = pregunta.min; valor <= pregunta.max; valor += 1) {
      const seleccionado = String(valor) === respuestaPrevia ? ' seleccionado' : '';
      botones += `<button type="button" class="escala-boton${seleccionado}" data-valor="${valor}">${valor}</button>`;
    }
    camposHtml = `
      <div class="escala-fila" id="escala-${pregunta.id}">${botones}</div>
      <div class="escala-etiquetas"><span>${traduccion.etiquetaMin}</span><span>${traduccion.etiquetaMax}</span></div>
      <input type="hidden" id="valor-${pregunta.id}" value="${respuestaPrevia ?? ''}" />
    `;
  } else if (pregunta.tipo === 'radio') {
    const etiquetas = t(`${clave}.opciones`);
    camposHtml = pregunta.valores.map((valor, i) => `
      <label class="opcion"><input type="radio" name="campo-${pregunta.id}" value="${valor}" ${valor === respuestaPrevia ? 'checked' : ''} /> ${etiquetas[i]}</label>
    `).join('');
  } else if (pregunta.tipo === 'pvt') {
    camposHtml = `
      <p>${t('salida.pvt_instrucciones')}</p>
      <div class="pvt-caja" id="pvt-caja">${t('salida.pvt_preparate')}</div>
      <input type="hidden" id="valor-${pregunta.id}" value="${respuestaPrevia ?? ''}" />
    `;
  }

  const bloquearSiguiente = pregunta.tipo === 'pvt' && !respuestaPrevia;

  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <p>${progreso}</p>
    <h2>${t(`${clave}.titulo`)}</h2>
    <div class="pregunta-wrap">${camposHtml}</div>
    <button id="btn-siguiente-salida" ${bloquearSiguiente ? 'disabled' : ''}>${pasoSalida === preguntasSalida.length - 1 ? t('common.submit') : t('common.next')}</button>
    ${pasoSalida > 0 ? `<button id="btn-atras-salida" class="boton-secundario">${t('common.back')}</button>` : ''}
  `;

  activarSelectorIdioma(renderPasoSalida);

  if (pasoSalida > 0) {
    document.getElementById('btn-atras-salida').addEventListener('click', () => {
      pasoSalida -= 1;
      renderPasoSalida();
    });
  }

  if (pregunta.tipo === 'escala') {
    document.querySelectorAll(`#escala-${pregunta.id} .escala-boton`).forEach((boton) => {
      boton.addEventListener('click', () => {
        document.querySelectorAll(`#escala-${pregunta.id} .escala-boton`).forEach((b) => b.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');
        document.getElementById(`valor-${pregunta.id}`).value = boton.dataset.valor;
      });
    });
  }

  if (pregunta.tipo === 'pvt') {
    ejecutarPVT(document.getElementById('pvt-caja'), (resultado) => {
      document.getElementById(`valor-${pregunta.id}`).value = JSON.stringify(resultado);
      document.getElementById('btn-siguiente-salida').disabled = false;
    });
  }

  document.getElementById('btn-siguiente-salida').addEventListener('click', async () => {
    let valor;
    if (pregunta.tipo === 'radio') {
      const elegido = document.querySelector(`input[name="campo-${pregunta.id}"]:checked`);
      valor = elegido ? elegido.value : null;
    } else {
      valor = document.getElementById(`valor-${pregunta.id}`).value;
    }

    if (!valor) {
      mostrarAviso(t('common.answer_required'));
      return;
    }
    respuestasSalida[pregunta.id] = valor;

    if (pasoSalida < preguntasSalida.length - 1) {
      pasoSalida += 1;
      renderPasoSalida();
    } else {
      await enviarSalida();
    }
  });
}

function ejecutarPVT(caja, alTerminar) {
  const tiempos = [];
  let ensayo = 0;
  let momentoEstimulo = null;

  function siguienteEnsayo() {
    if (ensayo >= 6) {
      const ordenados = [...tiempos].sort((a, b) => a - b);
      const mediana = ordenados[Math.floor(ordenados.length / 2)];
      const lapsos = tiempos.filter((valor) => valor > 500).length;
      caja.textContent = t('salida.pvt_completada');
      alTerminar({ pvt_mediana_ms: mediana, pvt_lapsos: lapsos });
      return;
    }

    caja.textContent = t('salida.pvt_espera');
    caja.classList.remove('activa');
    const espera = 2000 + Math.random() * 4000; // entre 2 y 6 segundos

    setTimeout(() => {
      momentoEstimulo = performance.now();
      caja.textContent = t('salida.pvt_ahora');
      caja.classList.add('activa');

      caja.onclick = () => {
        const reaccion = performance.now() - momentoEstimulo;
        tiempos.push(reaccion);
        ensayo += 1;
        siguienteEnsayo();
      };
    }, espera);
  }

  siguienteEnsayo();
}

async function enviarSalida() {
  const codigo = localStorage.getItem(CODIGO_KEY);
  const pvt = JSON.parse(respuestasSalida.PB2);

  const resultado = await api('/api/v1/sesion/salida', {
    method: 'POST',
    body: {
      sesion_id: sesionActualId,
      codigo,
      kss_salida: Number(respuestasSalida.PB1),
      pvt_mediana_ms: pvt.pvt_mediana_ms,
      pvt_lapsos: pvt.pvt_lapsos,
      concentracion: respuestasSalida.PB3,
      fatiga: respuestasSalida.PB4,
      sensacion_termica: Number(respuestasSalida.PC1),
      preferencia_temp: respuestasSalida.PC2,
      frescor_aire: Number(respuestasSalida.PC3),
      aire_cargado: respuestasSalida.PC4 === 'Sí',
      aprovechamiento: respuestasSalida.PD1,
    },
  });
  mostrarGraciasSalida(resultado.id);
}

function mostrarGraciasSalida(id) {
  mostrarPantallaGracias('salida.gracias_titulo', 'salida.gracias', { id });
}
