== Day5 ==  
#portrait:none
#music:hall4
#background:desk

Day 5#title

Lt. Gerald Hughes hands you a note.
*[Open the note]-> note

= note
#portrait:note

Officer Custer was shot, taken to the hospital. I am personally looking after him. Check in with everybody.

-> menu

= menu

#portrait:none #dailymenu:day5
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> doherty
* [OffWiley] -> wiley
* [LtHughes] -> hughes
* {CHOICE_COUNT() == 1} [Continue] -> afterall

= briggs

aoeu
-> menu

= doherty

aoeu
-> menu

= wiley

Witnesses say...

-> menu

= hughes

aoeu

-> menu

= afterall
#portrait:none
That seems to be all the facts, then.

#background:home
 
#music:hall5
{Day1.greet_francis: -> obsessed | -> snubbed}

= obsessed

test


-> END

= snubbed

test

-> END
 
 
