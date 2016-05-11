const readline = require('readline');
const spawn = require('child_process').spawn;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('=> ');
rl.on('line', (cmd) => {
    if (cmd === ":q" || "quit") {
        console.log('have a good day');
        process.exit(1);
    }
    if (cmd === ":n" ||"next") {
        do_next_10();
    }
    if (cmd === ":p" || "previous") {
        do_prev_10();
    }
    if (cmd === ":h") {
        help_function();
    }
    if (cmd === "new") {

    }
    console.log('what are you talking about?');
    rl.prompt();


});

    

module.exports = rl;

