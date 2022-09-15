const readline = require('node:readline')

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
  if (key && key.name == 'q') {
  process.exit();
  } else if (key && key.name == 'up') {
    console.log("up was pressed")
  }
});