var pull = require('pull-stream');
var paramap = require('pull-paramap');
var ssbclient = require('ssb-client');
var chalk = require('chalk');

var sbot_cont = function(cb) {
  ssbclient(function(err, sbot) {
    if (err) throw err;
      cb(sbot);
  });
};

var list_messages = function() {
  sbot_cont(function(sbot) {
    pull(
      sbot.createLogStream(),
      //////
      paramap(function(item, cb) {
        var cont = item.value.content;
        if (cont.type === 'post') {
            console.log(
              chalk.bold.blue(item.value.author + ':')
            );
            console.log(cont.text);
            console.log();
            cb(null, 'a');
        }
        /*
            var box = boxen(cont.text, {padding: 1});
         */
      }, 1e13),
      /////
      pull.collect(function(err, msgs) {
        if (err) throw err;
        console.log("total: %s messages", msgs.length);
      })
    );
  });
};



list_messages();
