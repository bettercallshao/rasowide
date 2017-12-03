""" Rasowide Server
"""

from flask import Flask, send_from_directory
from flask_socketio import SocketIO
import os
from uuid import uuid4

from BashSession import BashSession

# Directories
root = os.path.dirname(os.path.abspath(__file__))
cwd = os.getcwd()

# Create flask
app = Flask("rasowide")
io = SocketIO(app, async_mode='threading')

# Terminals
terms = {}

@app.route('/')
def send_index():
  """ Serve index page
  """
  return send_from_directory(root, 'index.html')

@app.route('/favicon.ico')
def send_favicon():
  return send_from_directory(root, 'favicon.ico')

@app.route('/static/<path:path>')
def send_static(path):
  """ Serve static files
  """
  return send_from_directory(root + '/static', path)

@io.on('ctrl')
def handle_ctrl(json):
  """ Handle requests from client : control
  """
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

def respond_data(uuid, payload):
  """ Respond to the client
  """
  json = {}
  json['id'] = uuid
  json['error'] = 0
  json['payload'] = payload
  io.emit('data', json)

@io.on('data')
def handle_data(json):
  """ Handle requests from client : payload
  """
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
