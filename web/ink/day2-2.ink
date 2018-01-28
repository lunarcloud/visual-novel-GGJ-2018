== Day2Fire ==
#portrait:none
#music:hall2
#background:desk

Day 2#title

The next morning you find your desk just as you had left it the day before.

#portrait:francis
"Good morning, Sergeant."
"Good morning, Francis.
And before you say anything, I know that I am late again. I really must do something about my watch. Perhaps I will drop it off to be serviced."
"That would be a smart idea."

#portrait:none
Francis walks away, but soon returns.
#portrait:francis
"There is another note for you from the Lt. He wants you to follow up with the team investigating this crime."

*[Open the note]-> note

= note
#portrait:note

Before dawn this morning, the tea house on Mallory Lane was burned down. Sgt. Briggs and Officer Custer are investigating.

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

"The owner states that she heard a crash of glass late in the night. She came downstairs to the front room of the shop to find it alight. She did not see who had done it."
{custer: -> afterall | -> menu}

= doherty
#portrait:telegraph

"What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Briggs."
-> menu

= wiley
#portrait:telegraph

"I am not at the tea house. I think Officer Custer is there."
-> menu

= custer
#portrait:telegraph

"A young boy said that he saw a figure, dressed well, throw a bottle through the window to the tea house.
Shortly afterward, fire started to spread through the house."
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

-> Day3
