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
    return text.lower()

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
    event_mat = [['Co-Curricular Workshop 1', datetime(2021,2,1,0,0,0,tzinfo=pytz.utc), datetime(2021,2,1,0,0,0,tzinfo=pytz.utc), 'By this date all students must have had a conversation with Dr. Barr on their potential research projects.'],
                 ['Honors Project Proposal Due', datetime(2021,2,7,0,0,0,tzinfo=pytz.utc), datetime(2021,2,7,0,0,0,tzinfo=pytz.utc), ''],
                 ['Dr. Barr Meeting', datetime(2021,2,8,0,0,0,tzinfo=pytz.utc), datetime(2021,2,8,0,0,0,tzinfo=pytz.utc), 'Must have meet with Dr. Barr at or before this day.'],
                 ['Reflective Paper Due', datetime(2021,2,19,0,0,0,tzinfo=pytz.utc), datetime(2021,2,19,0,0,0,tzinfo=pytz.utc), ''],
                 ['Working Annotated Bibliography Due', datetime(2021,3,26,0,0,0,tzinfo=pytz.utc), datetime(2021,3,26,0,0,0,tzinfo=pytz.utc), ''],
                 ['Last day to drop course', datetime(2021,4,2,0,0,0,tzinfo=pytz.utc), datetime(2021,4,2,0,0,0,tzinfo=pytz.utc), ''],
                 ['Rough Draft Reading', datetime(2021,4,19,0,0,0,tzinfo=pytz.utc), datetime(2021,4,19,0,0,0,tzinfo=pytz.utc), ''],
                 ['RESEARCH PAPER DUE', datetime(2021,5,2,0,0,0,tzinfo=pytz.utc), datetime(2021,5,2,0,0,0,tzinfo=pytz.utc), ''],
                 ['FINAL EXAM', datetime(2021,5,7,11,0,0,tzinfo=pytz.utc), datetime(2021,5,7,12,50,0,tzinfo=pytz.utc), '']]
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
    for c in event_mat:
        for e in c:
            event = Event()
            event.add('summary', e[0])
            event.add('dtstart', e[1])
            event.add('dtend', e[2])
            event.add('description', e[3])
            cal.add_component(event)
        cal = cal.to_ical().decode('utf-8')

    return cal # this is a string
