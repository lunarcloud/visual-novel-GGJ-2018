== Day5 ==  
#portrait:none
#music:hall4
#background:home

Day 5#title

You woke up at a reasonable time, watch ticking nicely, but you found it hard to pull yourself out of bed after the stress this week's work has put you under.
{Day1.greet_francis: At least you could look forward to your conversations with your assistant. }
Francis was the most overly-helpful employee at the station you'd ever seen.
{not Day1.greet_francis: It was often a bit overkill. Nice kid, but misguided. }

When you made it to the office, the building was unusually dead. The lieutenant wasn't there, 
Not even Francis was in at work today.
"Where is everyone?" you say to yourself.

#background:desk
A note was left on your desk...

-> menu

= note
#portrait:note

Officer Custer was shot, taken to the hospital. I am personally looking after him. Check in with everybody.

-> menu

= menu

#portrait:none #dailymenu:day5
+ {note} [Note] -> note
* {note} [SgtBriggs] -> briggs
* {note} [SgtDoherty] -> doherty
* {note} [OffWiley] -> wiley
* {note} [LtHughes] -> hughes
* {note and CHOICE_COUNT() == 1} [Continue] -> afterall
* {not note} [Note] -> note

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
 
 
