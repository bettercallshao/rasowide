'''
' Test app for flask socketio for python 2.7
' @author tim.tan
'''

from flask import Flask, request, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

if __name__ == "__main__":
    socketio.run(app)
