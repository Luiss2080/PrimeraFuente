const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const processed = path.join(srcDir, 'processed_svgs');
const mayusculas = path.join(srcDir, 'mayusculas');
const minusculas = path.join(srcDir, 'minusculas');

if (!fs.existsSync(mayusculas)) fs.mkdirSync(mayusculas);
if (!fs.existsSync(minusculas)) fs.mkdirSync(minusculas);

if (fs.existsSync(processed)) {
    const files = fs.readdirSync(processed).filter(f => f.endsWith('.svg'));
    files.forEach(file => {
        const char = file.split('-')[1].replace('.svg', ''); 
        fs.copyFileSync(path.join(processed, file), path.join(mayusculas, file));
        
        const lowerChar = char.toLowerCase();
        const hex = lowerChar.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
        const lowerFile = `u${hex}-${lowerChar}.svg`;
        fs.copyFileSync(path.join(processed, file), path.join(minusculas, lowerFile));
    });
    fs.rmSync(processed, { recursive: true, force: true });
    console.log('Archivos organizados en mayusculas y minusculas.');
} else {
    console.log('processed_svgs no existe, probablemente ya se organizó.');
}
