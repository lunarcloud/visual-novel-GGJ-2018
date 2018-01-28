var storyContent = {"inkVersion":17,"root":["\n","\n","\n","\n","\n","\n",{"->":"Day1"},"done",{"Day1":[{"#":"music:hall1"},{"#":"background:home"},{"#":"portrait:none"},"^Day 1",{"#":"title"},"\n","^You wake up, still tired from not having slept well.","\n","^“Maybe the police can do without their switchboard officer today,” you think briefly.","\n","^Slowly, you get out of bed and prepare to set off for work.","\n","^The long trudge to the police station was made better by the shade cast by a rare cloudy day. Antiford does not get many overcast days.","\n","^The office is almost stiflingly hot. You set your bag down. Your assistant, Francis, is sitting at his desk, filing through some papers.","\n",["ev","str","^Greet Francis","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.greet_francis"},"\n",{"#f":7}]}],["ev","str","^Ignore Francis","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.after_greet"},"\n",{"#f":7}]}],{"greet_francis":[{"#":"portrait:francis"},"^“Good Morning, Francis. How are you?”","\n","^“I am well, Sergeant. You're a little late. Did you have a difficult morning?","\n","^“Not too difficult. And, so I am... hrm. My watch has been running behind lately.\"","\n","^“I've brought you a chilled tea from the shop around the corner.”","\n","^“Thank you, Francis. That is my favorite shop.”","\n","^“Good to know.”","\n",{"->":"Day1.after_greet"},{"#f":3}],"after_greet":[{"#":"background:desk"},"^Francis hands you a note.","\n",{"#":"portrait:francis"},"^\"Here is a note for you from Lt. Hughes. It's regarding an incident this morning. I think he wants you to moniter the situation.\"","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.note"},"\n",{"#f":7}]}],{"#f":3}],"note":[{"#":"portrait:note"},"^A tea house on Mallory Lane was robbed at gunpoint. Confirm the facts with Sergeant Doherty and Officer Wiley, who are on the scene.","\n",{"->":"Day1.menu"},{"#f":3}],"menu":[{"#":"background:desk"},{"#":"portrait:none"},{"#":"dailymenu:day1"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":"Day1.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.wiley"},"\n",{"#f":7}]}],["ev","str","^OffCuster","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day1.custer"},"\n",{"#f":7}]}],{"#f":3}],"briggs":[{"#":"portrait:telegraph"},"^\"What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Doherty.\"","\n",{"->":"Day1.menu"},{"#f":3}],"doherty":[{"#":"portrait:telegraph"},"^\"The witnesses report seeing a short, thin individual wearing all black with a hood. None of them saw the suspect's face.\"","\n",["G>","ev",{"CNT?":"Day1.wiley"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day1.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day1.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"wiley":[{"#":"portrait:telegraph"},"^\"I have taken a statement from the owner. She reports the suspect is slim man with brown hair. She did not see his face due to a leather mask he was wearing.\"","\n",["G>","ev",{"CNT?":"Day1.doherty"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day1.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day1.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"custer":[{"#":"portrait:telegraph"},"^\"I am not at the tea house. I think Officer Wiley is there.\"","\n",{"->":"Day1.menu"},{"->":"Day1.afterall"},{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n",{"#":"portrait:francis"},"^\"Sergeant, we received one more telegraph.\"","\n","^\"Who is it for?\"","\n","^\"It's not for anyone. There's no name. It just says:","\n","^'It was always for you'.\"","\n","^\"Well Francis, that *is* rather odd. But it's been a long day. I'll be heading home now. Have a good night.\" ",{"#":"background:home"},"\n","^\"Good night, Sergeant.\"","\n",["G>","ev",{"CNT?":"Day1.greet_francis"},"!","/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day2Fire"},{"->":".^.^.^.7"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day2Flower"},{"->":".^.^.^.7"},null]}],"nop","G<",null],"\n",{"#f":3}],"#f":3}],"Day2Flower":[{"#":"portrait:none"},{"#":"music:hall2"},{"#":"background:desk"},"^Day 2",{"#":"title"},"\n","^The next morning you find your desk just as you had left it the day before.","\n",{"#":"portrait:francis"},"^\"Good morning, Sergeant.\"","\n","^\"Good morning, Francis.","\n","^And before you say anything, I know I'm late again. I really must do something about my watch. Perhaps I should drop it off to be serviced.\"","\n","^\"That would be a smart idea.\"","\n",{"#":"portrait:none"},"^Francis walks away, but soon returns.","\n",{"#":"portrait:francis"},"^\"There is another note for you from the lieutenant. He wants you to follow up with the team investigating this crime.\"","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.note"},"\n",{"#f":7}]}],{"note":[{"#":"portrait:note"},"^A flower shop on High Top Road was broken into early this morning. Sergeant Briggs and Officer Custer are investigating.","\n",{"->":".^.^.menu"},{"#f":3}],"menu":[{"#":"portrait:none"},{"#":"dailymenu:day2"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":".^.^.^.^.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.^.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.^.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.^.wiley"},"\n",{"#f":7}]}],["ev","str","^OffCuster","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.^.custer"},"\n",{"#f":7}]}],{"#f":3}],"briggs":[{"#":"portrait:telegraph"},"^\"The proprietor says that a brick was used to break in the front window. Not sure if anything was taken. There is considerable damage.\"","\n",["G>","ev",{"CNT?":".^.^.^.custer"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day2Flower.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day2Flower.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"doherty":[{"#":"portrait:telegraph"},"^\"What are you contacting me for? I am no where near the flower shop. I think that was assigned to Sgt. Briggs.\"","\n",{"->":".^.^.menu"},{"#f":3}],"wiley":[{"#":"portrait:telegraph"},"^\"I am not at the tea house. I think Officer Custer is there.\"","\n",{"->":".^.^.menu"},{"#f":3}],"custer":[{"#":"portrait:telegraph"},"^\"A witness states that they saw a thin man with short brown hair running away from the scene. He had a bundle of flowers in his hands.\"","\n",["G>","ev",{"CNT?":".^.^.^.briggs"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day2Flower.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day2Flower.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"->":".^.^.afterall"},{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n",{"#":"portrait:francis"},"^\"Well, Francis. Another long day. Are there any other telegraphs?\"","\n","^\"It appears that there is one more...\"","\n","^\"Who is it for?\"","\n","^\"There is no name. It just says","\n","^'It was always for you'","\n","^This is the second one now.\"","\n","^\"Again with the odd one? I wonder who is sending them. It seems a waste to send only that.","\n","^Oh, well. I suppose I will head on home now.\" ",{"#":"background:home"},"\n","^\"Have a good night sergeant.\"","\n","^\"You as well.\"","\n",{"#":"portrait:none"},"^After a long walk, you arrive at home to find a bundle of flowers on the mat in front of your door.","\n","^\"How odd,\" you think aloud.","\n",{"->":"Day3"},{"#f":3}],"#f":3}],"Day2Fire":[{"#":"portrait:none"},{"#":"music:hall2"},{"#":"background:desk"},"^Day 2",{"#":"title"},"\n","^The next morning you find your desk just as you had left it the day before.","\n",{"#":"portrait:francis"},"^\"Good morning, Sergeant.\"","\n","^\"Good morning, Francis.","\n","^And before you say anything, I know that I am late again. I really must do something about my watch. Perhaps I will drop it off to be serviced.\"","\n","^\"That would be a smart idea.\"","\n",{"#":"portrait:none"},"^Francis walks away, but soon returns.","\n",{"#":"portrait:francis"},"^\"There is another note for you from the Lt. He wants you to follow up with the team investigating this crime.\"","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":".^.^.^.note"},"\n",{"#f":7}]}],{"note":[{"#":"portrait:note"},"^Before dawn this morning, the tea house on Mallory Lane was burned down. Sgt. Briggs and Officer Custer are investigating.","\n",{"->":".^.^.menu"},{"#f":3}],"menu":[{"#":"portrait:none"},{"#":"dailymenu:day2"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":"Day2Fire.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day2Fire.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day2Fire.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day2Fire.wiley"},"\n",{"#f":7}]}],["ev","str","^OffCuster","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day2Fire.custer"},"\n",{"#f":7}]}],{"#f":3}],"briggs":[{"#":"portrait:telegraph"},"^\"The owner states that she heard a crash of glass late in the night. She came downstairs to the front room of the shop to find it alight. She did not see who had done it.\"","\n",["G>","ev",{"CNT?":".^.^.^.custer"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day2Fire.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day2Fire.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"doherty":[{"#":"portrait:telegraph"},"^\"What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Briggs.\"","\n",{"->":".^.^.menu"},{"#f":3}],"wiley":[{"#":"portrait:telegraph"},"^\"I am not at the tea house. I think Officer Custer is there.\"","\n",{"->":".^.^.menu"},{"#f":3}],"custer":[{"#":"portrait:telegraph"},"^\"A young boy said that he saw a figure, dressed well, throw a bottle through the window to the tea house.","\n","^Shortly afterward, fire started to spread through the house.\"","\n",["G>","ev",{"CNT?":".^.^.^.briggs"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day2Fire.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day2Fire.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"->":".^.^.afterall"},{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n",{"#":"portrait:francis"},"^\"Well, Francis. Another long day. Are there any other telegraphs?\"","\n","^\"It appears that there is one more...\"","\n","^\"Who is it for?\"","\n","^\"There is no name. It just says","\n","^'It was always for you'","\n","^This is the second one now.\"","\n","^\"Again with the odd one? I wonder who is sending them. It seems a waste to send only that.","\n","^Oh, well. I suppose I will head on home now.\" ",{"#":"background:home"},"\n","^\"Have a good night sergeant.\"","\n","^\"You as well.\"","\n",{"->":"Day3"},{"#f":3}],"#f":3}],"Day3":[{"#":"portrait:none"},{"#":"music:hall2"},{"#":"background:desk"},"^Day 3",{"#":"title"},"\n","^You arrive at the station just as Francis is setting his things down.","\n",{"#":"portrait:francis"},"^\"Good Morning, Sergeant.\"","\n","^\"Good Morning, Francis.\"","\n","^\"I see that you are on time, did you get your watch fixed?\"","\n","^\"No, but I did drop it off at the jeweler on my way in. I made sure that I woke extra early so that wouldn't be late.\"","\n","^\"Very good. Maybe this will help you be on time more regularly.\"","\n","^\"I hope so. Unfortunately, in my haste this morning, I forgot to pack a lunch.\"","\n","^\"That is unfortunate, Sergeant.\"","\n","^\"It should be fine. The 'Black Leaf and Earl' isn't far. I'll probably walk over and grab a sandwich.\"","\n",{"#":"portrait:none"},"^Francis leaves and busies himself around the station.","\n","^It is a fairly slow day.","\n","^Several hours pass, lunch break is fast approaching.","\n","^Francis walks up to you with a note in his hand.","\n",{"#":"portrait:francis"},"^\"There's another note from Lt. Hughes. It looks like another robbery.","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day3.note"},"\n",{"#f":7}]}],{"note":[{"#":"portrait:note"},"^At 10 this morning, the Black Leaf and Earl was robbed. The suspect made off with a considerable amount of money. Sergeant Doherty and Officer Wiley are on the scene.","\n",{"->":"Day3.menu"},{"#f":3}],"menu":[{"#":"portrait:none"},{"#":"dailymenu:day3"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":"Day3.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day3.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day3.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day3.wiley"},"\n",{"#f":7}]}],["ev","str","^OffCuster","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day3.custer"},"\n",{"#f":7}]}],{"#f":3}],"briggs":[{"#":"portrait:telegraph"},"^\"What are you contacting me for? I am no where near the Black Leaf and Earl. I think that was assigned to Sgt. Doherty.\"","\n",{"->":"Day3.menu"},{"#f":3}],"doherty":[{"#":"portrait:telegraph"},"^\"The owner states that a slim man with brown hair and a leather mask robbed the restaurant at gun point.","\n","^The restaurant will be closed until the interviews are concluded and the assessor has arrived.\"","\n",["G>","ev",{"CNT?":"Day3.wiley"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day3.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day3.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"wiley":[{"#":"portrait:telegraph"},"^\"The patrons all stated that the suspect is a shorter, thin man.","\n","^He was wielding a gun.","\n","^One man stated that it seemed as though he was just trying to scare people and was not actually interested in the money.","\n","^Another said that he stole her sandwich.\"","\n",["G>","ev",{"CNT?":"Day3.doherty"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day3.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day3.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"custer":[{"#":"portrait:telegraph"},"^\"I am not at the Black Leaf and Earl. I think Officer Wiley is there.\"","\n",{"->":"Day3.menu"},{"->":"Day3.afterall"},{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n",{"#":"portrait:francis"},"^\"That is strange, Francis.\"","\n","^\"What is, Sergeant?\"","\n","^\"A similar description for three crimes on three consectutive days.","\n","^I wonder if they could be the same person.\"","\n","^\"That would seem to make sense. But what ever could the motive be?\"","\n","^\"I'm not sure.","\n","^Though it's disappointing that I wont be able to go to the Black Leaf and Earl for lunch.\"","\n","^\"Here, Sergeant. Have half of my sandwich.\"","\n","^\"I couldn't possibly. It's yours...\"","\n","^\"I insist. I'm not overly hungry today.\"","\n","^\"Thank you, Francis.\"","\n",{"#":"portrait:none"},"^The rest of the day passes very slowly.","\n","^Just before you stand to leave, you hear the telegraph ticker printing out another message.","\n","^You stand and retrieve it.","\n","^Once again, you are looking at a message addressed to no one.","\n","^And it reads,","\n","^'It was always for you'","\n","^You feel a little uneasy on your walk home and through the night. ",{"#":"background:home"},"\n",{"->":"Day4"},{"#f":3}],"#f":3}],"Day4":[{"#":"portrait:none"},{"#":"music:hall3"},{"#":"background:desk"},"^Day 4",{"#":"title"},"\n","^Talk...","\n","^Francis walks up to you with a note in his hand.","\n",{"#":"portrait:francis"},"^\"There's another note from Lt. Hughes.","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day4.note"},"\n",{"#f":7}]}],{"note":[{"#":"portrait:note"},"^A jewelry store is robbed. Sergeant Briggs and Officer Custer are on the scene.","\n",{"->":"Day4.menu"},{"#f":3}],"menu":[{"#":"portrait:none"},{"#":"dailymenu:day4"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":"Day4.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day4.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day4.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day4.wiley"},"\n",{"#f":7}]}],["ev","str","^OffCuster","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day4.custer"},"\n",{"#f":7}]}],{"#f":3}],"briggs":[{"#":"portrait:telegraph"},"^Been talking to witnesses. No perp sightings, but we've found an out-of-place handkerchief on the window sill, deep blue.","\n",["G>","ev",{"CNT?":"Day4.custer"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day4.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day4.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"doherty":[{"#":"portrait:telegraph"},"^“I'm not on that case, Sergeant. I'm doing patrols.”","\n",{"->":"Day4.menu"},{"#f":3}],"wiley":[{"#":"portrait:telegraph"},"^“No, no. Sergeant *Doherty* and Officer Custer are down at the jewelers', not I.”","\n",{"->":"Day4.menu"},{"#f":3}],"custer":[{"#":"portrait:telegraph"},"^I just spoke with the proprietor. They're still cleaning up, not sure if anything was stolen. Many of the glass cases were broken, so it's likely.","\n",["G>","ev",{"CNT?":"Day4.briggs"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day4.afterall"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day4.menu"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n","^Telegraph received. “It is all for you”. It is address to nobody.","\n",{"#":"background:home"},"\n",{"->":"Day5"},{"#f":3}],"#f":3}],"Day5":[{"#":"portrait:none"},{"#":"music:hall4"},{"#":"background:desk"},"^Day 5",{"#":"title"},"\n","^Lt. Gerald Hughes hands you a note.","\n",["ev","str","^Open the note","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day5.note"},"\n",{"#f":7}]}],{"note":[{"#":"portrait:note"},"^Officer Custer was shot, taken to the hospital. I am personally looking after him. Check in with everybody.","\n",{"->":"Day5.menu"},{"#f":3}],"menu":[{"#":"portrait:none"},{"#":"dailymenu:day5"},["ev","str","^Note","/str","/ev",{"*":".^.c","flg":4},{"c":["\n",{"->":"Day5.note"},"\n",{"#f":7}]}],["ev","str","^SgtBriggs","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day5.briggs"},"\n",{"#f":7}]}],["ev","str","^SgtDoherty","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day5.doherty"},"\n",{"#f":7}]}],["ev","str","^OffWiley","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day5.wiley"},"\n",{"#f":7}]}],["ev","str","^LtHughes","/str","/ev",{"*":".^.c","flg":20},{"c":["\n",{"->":"Day5.hughes"},"\n",{"#f":7}]}],["ev","str","^Continue","/str","choiceCnt",1,"==","/ev",{"*":".^.c","flg":21},{"c":["\n",{"->":"Day5.afterall"},"\n",{"#f":7}]}],{"#f":3}],"briggs":["^aoeu","\n",{"->":"Day5.menu"},{"#f":3}],"doherty":["^aoeu","\n",{"->":"Day5.menu"},{"#f":3}],"wiley":["^Witnesses say...","\n",{"->":"Day5.menu"},{"#f":3}],"hughes":["^aoeu","\n",{"->":"Day5.menu"},{"#f":3}],"afterall":[{"#":"portrait:none"},"^That seems to be all the facts, then.","\n",{"#":"background:home"},{"#":"music:hall5"},["G>","ev",{"CNT?":"Day1.greet_francis"},"/ev",[{"->":".^.b","c":true},{"b":[{"->":"Day5.obsessed"},{"->":".^.^.^.6"},null]}],[{"->":".^.b"},{"b":["^ ",{"->":"Day5.snubbed"},{"->":".^.^.^.6"},null]}],"nop","G<",null],"\n",{"#f":3}],"obsessed":["^test","\n","end",{"#f":3}],"snubbed":["^test","\n","end",{"#f":3}],"#f":3}],"#f":3}],"listDefs":{}};
