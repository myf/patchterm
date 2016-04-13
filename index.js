var pull = require('pull-stream');
var ssbclient = require('ssb-client');

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
                            console.log(item.value.author + ':');
                            console.log(cont.text);
                        }
                    });
                })
            );
        });
};

list_messages();
