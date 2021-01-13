from PyPDF4 import PdfFileReader
from icalendar import Calendar, Event
from datetime import datetime
from io import StringIO
import os.path
import docx
import pytz

# to_text functions
def pdf_to_txt(file):
    text = ''
    pdfReader = PdfFileReader(file)
    for i in range(pdfReader.numPages):
        page = pdfReader.getPage(i)
        text += page.extractText()
    return text

def docx_to_txt(file):
    print(type(file))
    doc = docx.Document(file)
    out_txt = StringIO() 
    for para in doc.paragraphs:
        out_txt.write(para.text)
    text = out_txt.getvalue()
    out_txt.close()
    return text.lower()

# prof_cal functions, will add more as we get more profs
def get_barr_events():
    # hardcoding events 
    # summary, start, end, description 
    event_mat = ['testing', datetime(2021,1,10,15,0,0,tzinfo=pytz.utc), datetime(2021,1,10,17,0,0,tzinfo=pytz.utc), 'a description']
    return event_mat

def get_newton_events():
    # hardcoding events 
    # summary, start, end, description 
    event_mat = ['testing', datetime(2021,1,10,18,0,0,tzinfo=pytz.utc), datetime(2021,1,10,19,0,0,tzinfo=pytz.utc), 'a description']
    return event_mat

def get_xu_events():
    # hardcoding events 
    # summary, start, end, description 
    event_mat = ['testing', datetime(2021,1,10,18,0,0,tzinfo=pytz.utc), datetime(2021,1,10,19,0,0,tzinfo=pytz.utc), 'a description']
    return event_mat

# returns a cal file
def merge_into_cal(event_mat):
    # Create calander
    cal = Calendar()
    for e in event_mat:
        event = Event()
        event.add('summary', e[0])
        event.add('dtstart', e[1])
        event.add('dtend', e[2])
        event.add('description', e[3])
        cal.add_component(event)
    cal = cal.to_ical().decode('utf-8')

    return cal # this is a string
