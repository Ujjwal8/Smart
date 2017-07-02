#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from flask import Flask, request
from flask_cors import CORS, cross_origin

import capProcess
import os.path

app = Flask(__name__, static_url_path='/')


# Check existence of file

app = Flask(__name__)
CORS(app)

@app.route('/audio', methods=['POST'])
def static_file():
	id = str(request.form['id'])
	if os.path.isfile("static/".decode('utf-8')+str(id).decode('utf-8')+".mp3"):
		return str(1)
	else:
		capProcess.processVid(id)
		print "Accepted Request"
		return str(0)
@app.route('/files/<path:path>')
def serve_file(path):
	if os.path.isfile("static/".decode('utf-8')+path+".mp3".decode('utf-8')):
		print "GGGGG"
	return app.send_static_file(path)



if __name__ == '__main__':
    app.run(host='0.0.0.0')

			