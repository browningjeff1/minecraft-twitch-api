from flask import Flask, request
import os
import socket
import pyttsx3
from time import sleep
from queue import *
import threading 



class _TTS():

    engine = None
    rate = None
    def __init__(self):
        self.engine = pyttsx3.init()
        

    def run(self, _text):
        self.engine.setProperty("rate", 150)
        if self.engine.isBusy():
            self.engine.say(_text)
            sleep(7)
            self.engine.runAndWait()
        else:
            self.engine.say(_text)
            self.engine.runAndWait()

# s = socket.socket()
# host = '10.0.0.171'
# port = 3000

app = Flask(__name__)

# def send(x):
#     with socket.socket() as s:
#         s.connect((host, port))
#         s.sendall(str.encode(str(x)))

@app.route('/postjson', methods = ['POST'])
def postJsonHandler():
    print (request)
    print (request.is_json)
    content = request.get_json()
    
    tts = _TTS()
 
    data = content.get("message")
    tts.run(data)

    

    return 'JSON posted'

app.run()