var pull = require('pull-stream');
var ssbclient = require('ssb-client');
var chalk = require('chalk');
var boxen = require('boxen');

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
                pull.collect(function(err, msgs) {
                    msgs.map(function(item) {
                        var cont = item.value.content;
                        if (cont.type === 'post') {
                            console.log(
                                    chalk.bold.blue(item.value.author + ':')
                            );
                            try{
                                console.log(boxen(cont.text, {padding: 1}));
                            } catch(e) {
                                console.log(e);
                            }
                        }
                    });
                })
            );
        });
};



list_messages();
