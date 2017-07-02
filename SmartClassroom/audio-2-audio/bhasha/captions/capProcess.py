#!/usr/bin/env python
# -*- coding: utf-8 -*-
import srt
import random
import tts
import time
from pydub import AudioSegment
from ftfy import fix_encoding

def GenSilence(sec):
	return AudioSegment.silent(duration=sec*1000)

def speed_change(sound, speed=1.0):
    # Manually override the frame_rate. This tells the computer how many
    # samples to play per second
    sound_with_altered_frame_rate = sound._spawn(sound.raw_data, overrides={
        "frame_rate": int(sound.frame_rate * speed)
    })

    # convert the sound with altered frame rate to a standard frame rate
    # so that regular playback programs will work right. They often only
    # know how to play audio at standard frame rate (like 44.1k)
    return sound_with_altered_frame_rate.set_frame_rate(sound.frame_rate)

def processVid(videoURL):
	subs =  getEng.getShitDone(videoURL)
	print subs

	random.seed(0)
	# filenm = random.randint(0,100000)
	# filenm="files\\"+str(filenm)+".srt"
	# print filenm
	# fff = open(filenm,'w')
	# fff.write(subs)
	subs = srt.parse(subs)
	subs = list(subs)
	print subs[0].content
	main_audio = GenSilence(1/100000)
	cntr=0
	cntr=0
	last=0
	for x in subs:
		audio_file = "/files114382.mp3"
		if len(x.content)>0:
			tts.TTS(x.content.encode('utf-8'), audio_file)
			aud = AudioSegment.from_mp3(audio_file)
			#print aud.duration_seconds
			duration = x.end-x.start
			duration = duration.total_seconds()
			rate = aud.duration_seconds/duration
			# rate*=2
			# rate*=2

			# if rate<0.55 or rate>3:
			# 	print "fuck u"
			# rate = max(rate,0.55)
			# rate = min(rate,3)

			#print duration
			#print rate
			# aud.speedup(playback_speed=rate)
			#print aud.duration_seconds
			# dur2 = aud.duration_seconds*1000
			# curr = start.minutes*60+start.sec
			# curr=curr*1000
			# if curr<=last+minGap:
			# 	curr=last+minGap+1
			gap = 0
			# if cntr<len(subs)-2:
			# 	gap=(subs[cntr+2].start.minutes-x.end.minutes)*60 + subs[cntr+2].start.seconds-x.end.seconds
			# 	print gap
			startP = x.start
			startP = startP.total_seconds()
			gap=startP-last

			last = x.end
			last = last.total_seconds()
			# gap=0
			# print x.end.seconds
			if gap<=0:
				main_audio = main_audio + aud
			else:
				main_audio = main_audio + GenSilence(gap) + aud
			cntr = cntr + 1
	# main_audio.speedup(playback_speed=1.5)
	last_sub_time = subs[-1].end

	dur = last_sub_time.total_seconds()*1000
	print "ls sub time in sec"

	main_audio = main_audio[:dur]
	# main_audio.export("/static/"+videoURL+".mp3")
	main_audio.export("static/34825.mp3")


	# print subs[5]
	# os.system("python getEng.py --videoid="+videoURL)
