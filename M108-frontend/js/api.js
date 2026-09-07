const CODIGO_KEY = 'lsef_codigo';
const appEl = document.getElementById('app');

async function api(ruta, opciones = {}) {
  const respuesta = await fetch(ruta, {
    method: opciones.method || 'GET',
    headers: opciones.body ? { 'Content-Type': 'application/json' } : undefined,
    body: opciones.body ? JSON.stringify(opciones.body) : undefined,
  });
  return respuesta.json();
}

function mostrarAviso(texto) {
  const anterior = document.querySelector('.aviso');
  if (anterior) anterior.remove();

  const aviso = document.createElement('div');
  aviso.className = 'aviso';
  aviso.textContent = texto;
  appEl.appendChild(aviso);
}

function parametrosUrl() {
  const params = new URLSearchParams(window.location.search);
  return {
    aula: params.get('aula'),
    fila: params.get('fila'),
    asiento: params.get('asiento'),
  };
}

// claveTitulo y claveTexto son claves de traducción (no texto ya resuelto),
// para poder volver a traducirlas si se cambia de idioma en esta misma pantalla.
function mostrarPantallaGracias(claveTitulo, claveTexto, variables) {
  appEl.innerHTML = `
    ${selectorIdiomaHtml()}
    <div class="pantalla-gracias">
      <div class="icono">✓</div>
      <h1>${t(claveTitulo)}</h1>
      <p>${t(claveTexto, variables)}</p>
    </div>
  `;
  activarSelectorIdioma(() => mostrarPantallaGracias(claveTitulo, claveTexto, variables));
}