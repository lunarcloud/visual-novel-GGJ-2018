/*
First Day, big decision
*/

 == Day1 ==
 
You wake up, still tired from not having slept well.
“Maybe the police can do without their switchboard today,” you think briefly.
Slowly, you get out of bed and prepare to set off for work.

The long trudge to the police station was made better by the shade cast by a rare cloudy day. Antiford does not get many overcast days.

The office is almost stiflingly hot. You set your bag down.

* Greet Francis [] -> greet_francis
* Ignore Francis [] -> after_greet

= greet_francis
-> after_greet

= after_greet

Lt. Gerald Hughes hands you a note.
-> note

= note

Blardy blah.

-> menu

= menu

#dailymenu:day1
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> dohrety
* [OffWiley] -> wiley
* [OffCuster] -> custer

= briggs

aoeu
-> menu

= dohrety

aoeu

{wiley: -> afterall | -> menu}

= wiley

aoeu

{dohrety: -> afterall | -> menu}

= custer

aoeu
-> menu

= afterall

{not greet_francis: -> Day2Flower | -> Day2Fire}
