
import pysrt
import random
import tts
from pydub import AudioSegment
from ftfy import fix_encoding

def GenSilence(sec):
	return AudioSegment.silent(duration=sec*1000)


videoURL = "d3WiRunOsWY"
subs =  getEng.getShitDone(videoURL)
print subs
random.seed(0)
filenm = random.randint(0,100000)
filenm="files\\"+str(filenm)+".srt"
print filenm
fff = open(filenm,'w')
fff.write(subs)
subs = pysrt.open(filenm)
main_audio = GenSilence(1/100000)
cntr=0
print len(subs)
cntr=0
last=0
for x in subs:
	audio_file = "files\\"+str(random.randint(101,100000000))+".mp3"
	if len(x.text)>0:
		tts.TTS(x.text, audio_file)
		aud = AudioSegment.from_mp3(audio_file)
		#print aud.duration_seconds
		duration = 60*(x.end.minutes-x.start.minutes)+(x.end.seconds-x.start.seconds+1)
		rate = aud.duration_seconds/duration
		rate*=2

		if rate<0.55 or rate>3:
			print "fuck u"

		rate = max(rate,0.55)
		rate = min(rate,3)
		#print duration
		#print rate
		aud.speedup(playback_speed=rate)
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
		startP = 60*(x.start.minutes)+x.start.seconds
		gap=startP-last-1

		last = 60*(x.end.minutes)+x.end.seconds
		# gap=0
		# print x.end.seconds
		if gap<=0:
			main_audio = main_audio + aud
		else:
			main_audio = main_audio + GenSilence(gap) + aud
		cntr = cntr + 1

main_audio.speedup(playback_speed=1.5)
main_audio.export("test.mp3")




# print subs[5]
# os.system("python getEng.py --videoid="+videoURL)
