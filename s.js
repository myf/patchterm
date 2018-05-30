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

const s = {};

s.list_messages = (ts, direction, cb)=> {
  // direction is next or prev
  // id is the key id of the reference point
  let query = {limit: 50,
               reverse: true};
  if (direction == "next") {
    query.gt = ts;
  }
  if (direction == "prev") {
    query.lt = ts;
  }
  console.log(query);
  sbot_cont(function(sbot) {
    pull(
      sbot.createLogStream(query),
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
        cb(null, item);
        /*
            var box = boxen(cont.text, {padding: 1});
         */
      }, 1e13),
      /////
      pull.collect(function(err, items) {
        if (err) throw err;
        cb(items);
      })
    );
  });
};

s.query_content = (keyword, cb) => {
  let query = {limit: 50,
               reverse: true};
  sbot_cont((sbot) => {
    pull(
      sbot.createLogStream(),
      pull.collect(function(err, items) {
        if (err) throw err;
        cb(items);
      })
    )
  });
}


module.exports = s;
