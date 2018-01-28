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
#portrait:francis

“Good Morning, Francis. How are you?”
“I am well, sir. You are a little late. Did you have a difficult morning?
“Not too difficult. My watch has been running behind lately.
“I have brought you a chilled tea from the shop around the corner.”
“Thank you, Francis. That is my favorite shop.”
“Good to know, sir.”
#portrait:none
-> after_greet

= after_greet

You are handed a note from Lieutenant Hughes

*[Open note]-> note

= note
A tea house on Mallory Lane was robbed at gunpoint. Sergeant Briggs and Officer Custer are on the scene.

-> menu

= menu

#dailymenu:day1
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> doherty
* [OffWiley] -> wiley
* [OffCuster] -> custer

= briggs

"What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Doherty."
-> menu

= doherty

"The witnesses report seeing a short, thin individual wearing all black with a hood. None of them saw the suspect's face."

{wiley: -> afterall | -> menu}

= wiley

"I have taken a statement from the owner. She reports the suspect is slim man with brown hair. She did not see his face due to a leather mask he was wearing."

{doherty: -> afterall | -> menu}

= custer

"I am not at the tea house. I think Officer Wiley is there."
-> menu

->afterall

= afterall

"Well Francis, It was a long day. I will be heading home now."
"Good night, sir."

{not greet_francis: -> Day2Flower | -> Day2Fire}
