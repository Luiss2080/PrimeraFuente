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
  const destPath = path.join(__dirname, 'fonts', 'ZoofiBlueprint_Final_V2.ttf');
  fs.writeFileSync(destPath, Buffer.from(ttf.buffer));
  console.log('¡Fuente TTF generada en ' + destPath + '!');
});

const DIR = path.join(__dirname, 'src', 'processed_svgs');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.svg'));

files.forEach(file => {
    // filename: u0041-A.svg
    const char = file.split('-')[1].replace('.svg', ''); // 'A'
    console.log(`Añadiendo letra: ${char} desde ${file}`);
    const glyph = fs.createReadStream(path.join(DIR, file));
    
    const lowerChar = char.toLowerCase();
    
    // Explicitly set the unicode to map it to both uppercase and lowercase standard keyboard
    glyph.metadata = {
      unicode: [char, lowerChar],
      name: char
    };
    
    fontStream.write(glyph);
});

fontStream.end();
