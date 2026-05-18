const { SVGIcons2SVGFontStream } = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const fs = require('fs');
const path = require('path');

console.log('Iniciando compilación directa...');

const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'ZoofiBlueprint_Final',
  fontHeight: 2000,
  normalize: true
});

let svgContent = '';
fontStream.on('data', chunk => {
  svgContent += chunk;
});

fontStream.on('end', () => {
  console.log('SVGs combinados. Generando TTF...');
  const ttf = svg2ttf(svgContent, {});
  // Save as V3 to avoid Windows file lock if user has Font Viewer open
  const destPath = path.join(__dirname, 'fonts', 'ZoofiBlueprint_Final_V3.ttf');
  fs.writeFileSync(destPath, Buffer.from(ttf.buffer));
  console.log('¡Fuente TTF generada en ' + destPath + '!');
});

const mayusculasDir = path.join(__dirname, 'src', 'mayusculas');
const minusculasDir = path.join(__dirname, 'src', 'minusculas');

const processDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));
    files.forEach(file => {
        // file: u0041-A.svg
        const char = file.split('-')[1].replace('.svg', '');
        console.log(`Añadiendo letra: ${char} desde ${file}`);
        const glyph = fs.createReadStream(path.join(dir, file));
        
        glyph.metadata = {
          unicode: [char],
          name: char
        };
        
        fontStream.write(glyph);
    });
};

processDir(mayusculasDir);
processDir(minusculasDir);

fontStream.end();
