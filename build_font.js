const svgtofont = require('svgtofont');
const path = require('path');

const TRACED_DIR = path.resolve(__dirname, 'src', 'processed_svgs');
const OUTPUT_DIR = path.resolve(__dirname, 'fonts');

console.log('Generando fuente con svgtofont...');

svgtofont({
  src: TRACED_DIR,
  dest: OUTPUT_DIR,
  fontName: 'ZoofiBlueprint',
  css: true,
  outSVGReact: false,
  outSVGPath: true,
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  }
}).then(() => {
  console.log('¡Fuente generada exitosamente en "font_output"!');
}).catch(console.error);
