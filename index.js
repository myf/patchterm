const s = require('./s');
const rl = require('./rl');
const chalk = require('chalk'); // nice colors
let state = {};

s.list_messages(null, null, (keys) => {
    console.log(chalk.bold.green("command: (:h for help)"));
    state = keys;
    rl.prompt();
});

rl.on('line', (cmd) => {
    if (cmd === ":q" || 
        cmd === "quit") {
      console.log('have a good day');
      process.exit(1);
    }
    if (cmd === ":n" ||
        cmd === "next") {
      return s.list_messages(state[0].timestamp,
                             "next", (items) => {
                                state = items;
                                rl.prompt();
                              });
    }
    if (cmd === ":p" || 
        cmd === "previous") {
      return s.list_messages(state[state.length-1].timestamp,
                             "prev", (items) => {
                                state = items;
                                rl.prompt();
                              });
    }
    if (cmd === ":s") {
        return s.query_content("", (items) => {
                                rl.prompt();
                              });
    }
    if (/\:r([0-9]+)/.exec(cmd)) {
      var num = /\:r([0-9]+)/.exec(cmd)[1];
      console.log(num);
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
};
    


