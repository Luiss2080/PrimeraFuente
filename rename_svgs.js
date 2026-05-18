const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src', 'processed_svgs');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.svg'));

files.forEach(file => {
    // If it already has the uXXXX prefix, skip
    if (file.match(/^u[0-9A-F]{4}-/)) return;
    
    // The filename should be something like "A.svg"
    const char = file.replace('.svg', '');
    if (char.length === 1 && char >= 'A' && char <= 'Z') {
        const hex = char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
        const newName = `u${hex}-${file}`;
        fs.renameSync(path.join(DIR, file), path.join(DIR, newName));
        console.log(`Renamed ${file} to ${newName}`);
    }
});
