const pull = require('pull-stream');
const paramap = require('pull-paramap');
const ssbclient = require('ssb-client');
const chalk = require('chalk');
const rl= require('./rl');

const sbot_cont = function(cb) {
  ssbclient(function(err, sbot) {
    if (err) throw err;
      cb(sbot);
  });
};

const list_messages = ()=> {
  sbot_cont(function(sbot) {
    pull(
      sbot.createLogStream({reverse: true,
                            limit: 10}),
      //////
      paramap(function(item, cb) {
        var cont = item.value.content;
        if (cont.type === 'post') {
          console.log(
            chalk.bold.blue(item.value.author + ':')
          );
          console.log(cont.text);
          console.log();
        }
        cb(null, item.key);
        /*
            var box = boxen(cont.text, {padding: 1});
         */
      }, 1e13),
      /////
      pull.collect(function(err, key) {
        if (err) throw err;
        rl.prompt();
      })
    );
  });
};



list_messages();
