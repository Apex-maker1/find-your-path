{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function startQuiz() \{\
    let math = confirm("Do you enjoy math and problem solving?");\
    let science = confirm("Do you enjoy biology or science?");\
    let tech = confirm("Do you enjoy computers or coding?");\
    let art = confirm("Do you enjoy creativity or design?");\
\
    let output = "";\
\
    // Simple scoring system\
    if (math && tech) \{\
        output = "You might enjoy Computer Science, Engineering, or AI!";\
    \}\
    else if (science && math) \{\
        output = "You might enjoy Medicine, Biology, or Research!";\
    \}\
    else if (tech) \{\
        output = "You might enjoy Software Engineering or App Development!";\
    \}\
    else if (art) \{\
        output = "You might enjoy Design, Animation, or Architecture!";\
    \}\
    else if (science) \{\
        output = "You might enjoy Biology, Healthcare, or Environmental Science!";\
    \}\
    else \{\
        output = "Keep exploring different subjects\'97your path will become clearer over time!";\
    \}\
\
    document.getElementById("output").innerText = output;\
\}}