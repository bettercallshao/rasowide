// logic for rasowide console
console.Make = function (element) {
  // init modules
  var banner = '' +
    '####################\n' +
    '# rasowide console #\n' +
    '####################\n';
  var prompt_ = '$ ';
  var jqconsole = element.jqconsole(banner, prompt_);
  var socket = io();

  // init cli session via socketio
  var id = '';
  socket.emit('ctrl', { 'act': 'new' });
  socket.on('ctrl', function(msg) {
    id = msg.id;
  });

  // response printing
  socket.on('data', function(msg) {
    if (msg.error == 0) {
      jqconsole.Write(msg.payload, 'jqconsole-output');
    } else {
      jqconsole.Write(JSON.stringify(msg, null, 2), 'jqconsole-error');
    }
  });

  // start jq console
  var startPrompt = function () {
    // history enabled
    jqconsole.Prompt(true, function (input) {
      socket.emit('data', {
        'id': id,
        'payload': input + '\n'
      });
      // restart prompt
      startPrompt();
    });
  };
  startPrompt();
}
