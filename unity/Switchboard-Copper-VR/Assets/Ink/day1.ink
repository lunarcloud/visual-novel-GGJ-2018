/*
First Day, big decision
*/

 == Day1 ==
#music:hall1
#background:home
#portrait:none

Day 1#title

You wake up, still tired from not having slept well.
“Maybe the police can do without their switchboard officer today,” you think briefly.
Slowly, you get out of bed and prepare to set off for work.

The long trudge to the police station was made better by the shade cast by a rare cloudy day. Antiford does not get many overcast days.

The office is almost stiflingly hot. You set your bag down. Your assistant, Francis, is sitting at his desk, filing through some papers.#background:desk

* [Greet Francis] -> greet_francis
* [Ignore Francis] -> after_greet

= greet_francis
#portrait:francis

“Good Morning, Francis. How are you?”
“I am well, Sergeant. You're a little late. Did you have a difficult morning?
“Not too difficult. And, so I am... hrm. My watch has been running behind lately."
“I've brought you a chilled tea from the shop around the corner.”
“Thank you, Francis. That is my favorite shop.”
“Good to know.”
-> after_greet

= after_greet
#background:desk
Francis hands you a note.

#portrait:francis
"Here is a note for you from Lt. Hughes. It's regarding an incident this morning. I think he wants you to moniter the situation."

*[Open the note]-> note

= note
#portrait:note

A tea house on Mallory Lane was robbed at gunpoint. Confirm the facts with Sergeant Doherty and Officer Wiley, who are on the scene.

-> menu

= menu

#background:desk #portrait:none #dailymenu:day1
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> doherty
* [OffWiley] -> wiley
* [OffCuster] -> custer

= briggs
#portrait:telegraph

"What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Doherty."
-> menu

= doherty
#portrait:telegraph

"The witnesses report seeing a short, thin individual wearing all black with a hood. None of them saw the suspect's face."

{wiley: -> afterall | -> menu}

= wiley
#portrait:telegraph

"I have taken a statement from the owner. She reports the suspect is slim man with brown hair. She did not see his face due to a leather mask he was wearing."

{doherty: -> afterall | -> menu}

= custer
#portrait:telegraph

"I am not at the tea house. I think Officer Wiley is there."
-> menu

->afterall

= afterall
#portrait:none
That seems to be all the facts, then.

#portrait:francis

"Sergeant, we received one more telegraph."
"Who is it for?"
"It's not for anyone. There's no name. It just says:
'It was always for you'."
"Well Francis, that *is* rather odd. But it's been a long day. I'll be heading home now. Have a good night." #background:home
"Good night, Sergeant."

->Day2
