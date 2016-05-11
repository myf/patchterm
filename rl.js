const readline = require('readline');
const spawn = require('child_process').spawn;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('=> ');
rl.on('line', (cmd) => {
    if (cmd === ":q" || 
        cmd === "quit") {
      console.log('have a good day');
      process.exit(1);
    }
    if (cmd === ":n" ||
        cmd === "next") {
      return do_next_10();
    }
    if (cmd === ":p" || 
        cmd === "previous") {
      return do_prev_10();
    }
    if (cmd === ":h" || 
        cmd === "help") {
      return help_function();
    }
    if (cmd === "new") {
        // here we spawn the system editor
    } 
    console.log('command is not correct, please type ":h" for help');
    rl.prompt();


});

const help_function = () => {
  console.log(".".repeat(80));
  console.log("Patchterm: a commandline interface to scuttlebutt");
  console.log(".".repeat(80));
  console.log("commands:");
  console.log(":n ---- show the next 10 messages");
  console.log(":p ---- show the prevous 10 messages");
  console.log("new --- write a new message");
  console.log(":r[n] - reply to message [n]");
  console.log(":h ---- show this message again");
  console.log("-".repeat(80));
  rl.prompt();
}

    

module.exports = rl;

