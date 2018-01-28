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

{doherty: I know you already heard some of this, but <>}
I'm here with Sergeant Doherty, and it's pretty crazy to think that one of our own did this.
{not doherty: Francis attacked Officer Custer.}
We've got {doherty: Francis | him} locked up in the back of the paddy wagon.

-> menu

= doherty

{briggs: I know you already heard some of this, but <>}
I'm here with Sergeant Briggs trying to process this.
{not briggs: Your assistant... Francis... he attacked Officer Custer.}
If it were up to me, we'd send {briggs: Francis | him} to pleasantville, let him rot in the desert.

-> menu

= wiley

{not doherty: {not briggs: So, Doherty and Briggs have the real details, but... well Francis is in big trouble.}}
Witnesses say that the young lad jumped Officer Custer as he was leaving his home this morning.
The boy woke up pretty darn early for this.
This was not his first rodeo; I suspect he had something to do with some of our recent unsolved crimes.

-> menu

= hughes

Just looking after Officer Custer. He's been cut up and blugeoned. Very graphic.
I'm going to have the... culprit — dry world — taken to the station for some serious interrogation.

-> menu

= afterall
#portrait:none

The facts don't lie.
You wonder why Francis did all this.

#music:hall5
Francis burts into the office screaming: #portrait:francis
"IT WAS ALWAYS FOR YOU!"

{Day1.greet_francis: "You were the sunshine of my day!" | "WHY WON'T YOU NOTICE ME!!"}

#portrait:none

Doherty, Wiley, and Briggs burst in and tackle Francis to the ground.
Lieutenant Gerald Hughes walks in holding his gun.
"You're going away for a very long time, kid."

#background:home

You take the rest of the day off, not sure how to feel about all this.
As you walk home, you find a piece of paper in your pocket. It read:

"It was always for you."

-> END
 
 
