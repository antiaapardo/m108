async function iniciar() {
  const codigo = localStorage.getItem(CODIGO_KEY);
  if (!codigo) {
    mostrarBienvenida();
    return;
  }
  const estado = await api(`/api/v1/estudiante/${codigo}/estado`);
  if (!estado.tiene_basal) {
    mostrarConsentimiento();
    return;
  }

  const mesa = parametrosUrl();
  if (mesa.aula) {
    const sesion = await api(`/api/v1/sesion/activa?aula=${mesa.aula}`);
    if (sesion.error) {
      appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('entrada.espera_sesion')}</p>`;
      activarSelectorIdioma(iniciar);
      return;
    }
    mostrarEleccionEncuesta(mesa);
    return;
  }

  appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('common.has_baseline')}</p>`;
  activarSelectorIdioma(iniciar);
}

function mostrarEleccionEncuesta(mesa) {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('eleccion.titulo')}</h1>
    <button id="btn-elegir-entrada">${t('eleccion.boton_entrada')}</button>
    <button id="btn-elegir-salida" style="margin-top: 0.75rem;">${t('eleccion.boton_salida')}</button>
  `;

  activarSelectorIdioma(() => mostrarEleccionEncuesta(mesa));
  document.getElementById('btn-elegir-entrada').addEventListener('click', () => mostrarEntrada(mesa));
  document.getElementById('btn-elegir-salida').addEventListener('click', async () => {
    const sesion = await api(`/api/v1/sesion/activa?aula=${mesa.aula}`);
    if (sesion.error) {
      appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('common.no_active_session')}</p>`;
      activarSelectorIdioma(() => mostrarEleccionEncuesta(mesa));
      return;
    }
    sesionActualId = sesion.id;
    mostrarSalida();
  });
}

iniciar();
