'''
' Test app for flask socketio for python 2.7
' @author tim.tan
'
' ctrl {
'   id
'   act
'   error
' }
'
' data {
'   id
'   payload
'   error
' }
'
' Server is wrapped in a class per flask
' (my understanding of) guideline
'''

from uuid import uuid4
from flask import Flask, send_from_directory
from flask_socketio import SocketIO

# shell session implementation
from BashSession import BashSession

# flask
app = Flask(__name__)
io = SocketIO(app)

# terminals
terms = {}

# HTML serving
@app.route('/')
def send_default():
  return send_from_directory('', 'console.html')

@app.route('/js/<path:path>')
def send_js(path):
  return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
  return send_from_directory('css', path)

# control requests
@io.on('ctrl')
def handle_ctrl(json):

  if 'act' not in json:
    # ignore
    return

  if json['act'] == 'new':
    json['id'] = str(uuid4())
    json['error'] = 'ok'
    terms[json['id']] = BashSession(
      lambda x: respond_data(json['id'], x))
    io.emit('ctrl', json)

  else:
    json['id'] = ''
    json['error'] = 'unkown operation'
    io.emit('ctrl', json)

# write data back to client
def respond_data(uuid, payload):
  json = {}
  json['id'] = uuid
  json['error'] = 0
  json['payload'] = payload
  io.emit('data', json)

# payload requests
@io.on('data')
def handle_data(json):

  # must have valid id
  if 'id' not in json or json['id'] not in terms:
    json['error'] = 'invalid id'
    json['payload'] = ''
    io.emit('data', json)
    return

  # pass payload to bash session
  terms[json['id']].write(json['payload'])

if __name__ == "__main__":
  io.run(app, '0.0.0.0', 5000)
