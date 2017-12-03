""" Rasowide Server
"""

from flask import Flask, send_from_directory
import os

# Directories
root = os.path.dirname(os.path.abspath(__file__))
cwd = os.getcwd()

# Create flask
app = Flask(__name__)

@app.route('/')
def send_index():
  """ Serve index page
  """
  return send_from_directory(root, 'index.html')

@app.route('/favicon.ico')
def send_favicon():
  return send_from_directory(root, 'favicon.js')

@app.route('/static/<path:path>')
def send_static(path):
  """ Serve static files
  """
  return send_from_directory(root + '/static', path)

if __name__ == "__main__":
  app.run('0.0.0.0', 5000)
