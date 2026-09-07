function mostrarBienvenida() {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('bienvenida.titulo')}</h1>
    <p>${t('bienvenida.texto')}</p>
    <button id="btn-nuevo">${t('bienvenida.boton_nuevo')}</button>
    <button id="btn-existente">${t('bienvenida.boton_existente')}</button>
  `;

  activarSelectorIdioma(mostrarBienvenida);
  document.getElementById('btn-nuevo').addEventListener('click', mostrarConsentimiento);
  document.getElementById('btn-existente').addEventListener('click', mostrarRecuperarCodigo);
}

function mostrarCodigo(codigo) {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <div class="codigo-pantalla">
      <h1>${t('codigo.titulo')}</h1>
      <div class="codigo-numero">${codigo}</div>
      <div class="qr-marco"><canvas id="qr-canvas"></canvas></div>
      <p>${t('codigo.ayuda')}</p>
      <button id="btn-continuar-codigo">${t('codigo.boton_continuar')}</button>
    </div>
  `;
  QRCode.toCanvas(document.getElementById('qr-canvas'), codigo, { width: 200 }, (error) => {
    if (error) console.error('Error generando QR:', error);
  });

  activarSelectorIdioma(() => mostrarCodigo(codigo));
  document.getElementById('btn-continuar-codigo').addEventListener('click', mostrarBasal);
}
function mostrarConsentimiento() {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('consentimiento.titulo')}</h1>
    <p>${t('consentimiento.texto1')}</p>
    <p>${t('consentimiento.texto2')}</p>
    <label>
      <input type="checkbox" id="check-aceptar" />
      ${t('consentimiento.checkbox')}
    </label>
    <button id="btn-aceptar">${t('consentimiento.boton')}</button>
  `;

  activarSelectorIdioma(mostrarConsentimiento);
  document.getElementById('btn-aceptar').addEventListener('click', async () => {
    const aceptado = document.getElementById('check-aceptar').checked;
    if (!aceptado) {
      mostrarAviso(t('consentimiento.aviso_checkbox'));
      return;
    }

    let codigo = localStorage.getItem(CODIGO_KEY);
    const codigoNuevo = !codigo;
    if (!codigo) {
      const datos = await api('/api/v1/estudiante/token', { method: 'POST' });
      codigo = datos.codigo;
      localStorage.setItem(CODIGO_KEY, codigo);
    }
    if (codigoNuevo) {
      mostrarCodigo(codigo);
    } else {
      mostrarBasal();
    }
  });
}
function mostrarRecuperarCodigo() {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <h1>${t('recuperar.titulo')}</h1>
    <input type="text" id="input-codigo" placeholder="${t('recuperar.placeholder')}" />
    <button id="btn-validar-codigo">${t('recuperar.boton')}</button>
  `;

  activarSelectorIdioma(mostrarRecuperarCodigo);
  document.getElementById('btn-validar-codigo').addEventListener('click', async () => {
    const codigo = document.getElementById('input-codigo').value.trim();
    if (!codigo) {
      mostrarAviso(t('recuperar.aviso_vacio'));
      return;
    }

    const estado = await api(`/api/v1/estudiante/${codigo}/estado`);
    if (estado.error) {
      mostrarAviso(t('recuperar.aviso_invalido'));
      return;
    }

    localStorage.setItem(CODIGO_KEY, codigo);
    if (!estado.tiene_basal) {
      mostrarConsentimiento();
    } else {
      appEl.innerHTML = `${selectorIdiomaHtml()}<p>${t('common.has_baseline')}</p>`;
      activarSelectorIdioma(mostrarRecuperarCodigo);
    }
  });
}
