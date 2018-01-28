== Day3 ==  
#portrait:none
#music:hall2
#background:desk

You arrive at the station just as Francis is setting his things down.

#portrait:francis

"Good Morning, Sergeant."
"Good Morning, Francis."
"I see that you are on time, did you get your watch fixed?"
"No, but I did drop it off at the jeweler on my way in.
I made sure that I woke extra early so that wouldn't be late."
"Very good. Maybe this will help you be on time more regularly."
"I hope so. Unfortunately, in my haste this morning, I forgot to pack a lunch."
"That is unfortunate, Sergeant."
"It should be fine. The Black Leaf and Earl is not far. I think I will grab a sandwich today."

#portrait:none
Francis leaves and busies himself around the station.
It is a fairly slow day.
Several hours pass, lunch break is fast approaching.
Francis walks up to you with a note in his hand.
#portrait:francis
"There is another note from Lt. Hughes. It looks like there was another robbery.

*[Open note]-> note

= note
#portrait:note

At 10 this morning, the Black Leaf and Earl was robbed.
The suspect made off with a considerable amount of money.
Sergeant Doherty and Officer Wiley are on the scene.

-> menu

= menu

#portrait:none #dailymenu:day3
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> doherty
* [OffWiley] -> wiley
* [OffCuster] -> custer

= briggs
#portrait:telegraph

"What are you contacting me for? I am no where near the Black Leaf and Earl. I think that was assigned to Sgt. Doherty."
-> menu

= doherty
#portrait:telegraph

"The owner states that a slim man with brown hair and a leather mask robbed the restaurant at gun point.
The restaurant will be closed until the interviews are concluded and the assessor has arrived."
{wiley: -> afterall | -> menu}

= wiley
#portrait:telegraph

"The patrons all stated that the suspect is a shorter, thin man.
He was wielding a gun.
One man stated that it seemed as though he was just trying to scare people and was not actually interested in the money.
Another said that he stole her sandwich."
{doherty: -> afterall | -> menu}

= custer
#portrait:telegraph

"I am not at the Black Leaf and Earl. I think Officer Wiley is there."
-> menu

->afterall

= afterall
#portrait:francis
"That is strange, Francis."
"What is, Sergeant?"
"A similar description for three crimes on three consectutive days.
I wonder if they could be the same person."
"That would seem to make sense. But what could the motive be."
"I am not sure.
Though it is disappointing that I will not be able to go to the Black Leaf and Earl for lunch."
"Here, Sergeant. Have half of my sandwich."
"I couldn't possibly. It is your lunch"
"I insist. I am not overly hungry today."
"Thank you, Francis."
#portrait:none

The rest of the day passes very slowly.
Just before you stand to leave, you hear the telegraph ticker printing out another message.
You stand and retrieve it.
Once again, you are looking at a message addressed to no one.
And it reads,
'It was always for you'
You feel a little uneasy on your walk home and through the night. #background:home

-> Day4
