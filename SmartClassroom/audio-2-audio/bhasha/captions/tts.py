#!/usr/bin/env python
# -*- coding: utf-8 -*-
from googletrans import Translator
from gtts import gTTS
import os

def TTS(subtext, filenm):
	translator = Translator()
	#tt = subtext
	translations = translator.translate(subtext,dest='hi')
	txt = translations.text.encode('utf-8')
	# print txt
	tts = gTTS(text=txt,lang='hi')
	tts.save(filenm)
