const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css'));

const replacements = {
  '—': '—',
  '”': '”',
  '”˜': '‘',
  '”™': '’',
  '”œ': '“',
  '” ': '”',
  '·': '·',
  '←': '←',
  '🇮🇳': '🇮🇳',
  '🔹': '🔹',
  '👨‍💻': '👨‍💻',
  '👨‍💻': '👨‍💻',
  '©': '©',
  '⌘': '⌘',
  '”¢': '•',
  '🕰': '🕰',
  '💡': '💡',
  '🌍': '🌍',
  '═': '═',
  '▼': '▼',
  '🚀': '🚀',
  '🎬': '🎬',
  '📚': '📚',
  '🎮': '🎮',
  '✨': '✨',
  '✨': '✨',
  '⚙️': '⚙️',
  '💡»': '💻',
  '⚡': '⚡',
  '❤️': '❤️',
  'Ã¢â‚¬” ': '—',
  '←': '←',
  'Ã‚·': '·'
};

files.forEach(f => {
  let txt = fs.readFileSync(f, 'utf-8');
  let orig = txt;
  for (const [bad, good] of Object.entries(replacements)) {
    txt = txt.split(bad).join(good);
  }
  // Let's also do a blanket fix for any string that looks like utf-8 mojibake
  // by simply re-encoding if we notice characteristic characters, but manual replacement is safer.
  if (orig !== txt) {
    fs.writeFileSync(f, txt, 'utf-8');
    console.log('Fixed', f);
  }
});
