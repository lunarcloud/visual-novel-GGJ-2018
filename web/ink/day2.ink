== Day2 ==
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

  * {Day1.greet_francis} [Open the note] -> normalnote 
  * {not Day1.greet_francis} [Open the note] -> firenote

= normalnote
#portrait:note

A flower shop on High Top Road was broken into early this morning. Sergeant Briggs and Officer Wiley are investigating.

-> menu

= firenote
#portrait:note

A flower shop on High Top Road was broken into early this morning. Sergeant Briggs and Officer Wiley are investigating.

-> menu

= menu

#portrait:none #dailymenu:day2
  + {Day1.greet_francis} [Note] -> normalnote
  + {not Day1.greet_francis} [Note] -> firenote
  * [SgtBriggs] -> briggs
  * [SgtDoherty] -> doherty
  * [OffWiley] -> wiley
  * {Day1.greet_francis} [OffCuster] -> normalcuster
  * {not Day1.greet_francis} [OffCuster] -> firecuster

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

"I'm allergic to flowers, so they let me off the case. I think Officer Custer is there."

-> menu

= normalcuster
#portrait:telegraph

"A witness states that they saw a thin man with short brown hair running away from the scene. He had a bundle of flowers in his hands."

-> custer

= firecuster
#portrait:telegraph

"A young boy said that he saw a figure, dressed well, throw a bottle through the window to the tea house.
Shortly afterward, fire started to spread through the house."

-> custer

= custer
{briggs: -> afterall | -> menu}

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

{Day1.greet_francis: -> givenflowers | -> Day3}

= givenflowers

#portrait:none
After a long walk, you arrive at home to find a bundle of flowers on the mat in front of your door.

"How odd," you think aloud.

-> Day3
