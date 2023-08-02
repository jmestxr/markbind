const DARKMODE_JS_URL = 'https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js';

function insertDarkModeCustomCss() {
  return `<script>
    const style = document.createElement('style');
    style.innerHTML = ".darkmode-layer, .darkmode-toggle { z-index: 500; }";
    document.getElementsByTagName('head')[0].appendChild(style);
  </script>`;
}

function addDarkModeToggleButton() {
  return `<script>
    function addDarkmodeWidget() {
      new Darkmode().showWidget();
    }
    
    window.addEventListener('load', addDarkmodeWidget);
  </script>`;
}

module.exports = {
  getScripts: () => [
    `<script src="${DARKMODE_JS_URL}"></script>`,
    insertDarkModeCustomCss(),
    addDarkModeToggleButton(),
  ],
};
