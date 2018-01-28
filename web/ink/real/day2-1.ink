== Day2Flower ==
#portrait:none
#music:hall2
#background:desk

Day 2#title

The next morning you find your desk just as you had left it the day before.

#portrait:francis
"Good morning, Sergeant."
"Good morning, Francis.
And before you say anything, I know I'm late again. I really must do something about my watch. Perhaps I should drop it off to be serviced."
"That would be a smart idea."

#portrait:none
Francis walks away, but soon returns.

#portrait:francis
"There is another note for you from the lieutenant. He wants you to follow up with the team investigating this crime."

*[Open the note]-> note

= note
#portrait:note

A flower shop on High Top Road was broken into early this morning. Sergeant Briggs and Officer Custer are investigating.

-> menu

= menu

#portrait:none #dailymenu:day2
+ [Note] -> note
* [SgtBriggs] -> briggs
* [SgtDoherty] -> doherty
* [OffWiley] -> wiley
* [OffCuster] -> custer

= briggs
#portrait:telegraph

"The proprietor says that a brick was used to break in the front window. Not sure if anything was taken. There is considerable damage."

{custer: -> afterall | -> menu}

= doherty
#portrait:telegraph

"What are you contacting me for? I am no where near the flower shop. I think that was assigned to Sgt. Briggs."

-> menu

= wiley
#portrait:telegraph

"I am not at the tea house. I think Officer Custer is there."

-> menu

= custer
#portrait:telegraph

"A witness states that they saw a thin man with short brown hair running away from the scene. He had a bundle of flowers in his hands."

{briggs: -> afterall | -> menu}

->afterall

= afterall
#portrait:none
That seems to be all the facts, then.

#portrait:francis
"Well, Francis. Another long day. Are there any other telegraphs?"

"It appears that there is one more..."

"Who is it for?"

"There is no name. It just says 
'It was always for you'
This is the second one now."

"Again with the odd one? I wonder who is sending them. It seems a waste to send only that.

Oh, well. I suppose I will head on home now." #background:home

"Have a good night sergeant."

"You as well."

#portrait:none
After a long walk, you arrive at home to find a bundle of flowers on the mat in front of your door.

"How odd," you think aloud.


-> Day3
