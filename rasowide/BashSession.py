from subprocess import Popen, PIPE, STDOUT
from threading import Thread

class BashSession(object):
  def __init__(s, read_cb):
    # pipe to bash
    s.p = Popen('bash', stdin=PIPE, stdout=PIPE,
                stderr=STDOUT, shell=True)
    # call back for reading
    s.cb = read_cb
    # start reading thread
    s.thd = Thread(target = s.poll_async)
    s.thd.start()

  # close / clean up after use
  def close(s):
    # first close stdin file so polling stops
    s.p.stdin.close()
    # second kill the subprocess
    s.p.kill()
    # wait for the thread to finish
    s.thd.join()

  # poll stdout asynchronously
  def poll_async(s):
    while True:
      line = s.p.stdout.readline()
      if line:
        if s.cb:
          s.cb(line)
      else:
        # quit if read nothing (file closed)
        break

  def write(s, payload):
    s.p.stdin.write(payload)

if __name__ == '__main__':
  import sys
  from time import sleep
  b = BashSession(sys.stdout.write)
  b.write('gcc --version\n')
  sleep(0.1)
  b.close()
