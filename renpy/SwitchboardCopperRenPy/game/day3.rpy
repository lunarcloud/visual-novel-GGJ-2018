#
#
#

label Day3:

    define day3_briggs = False
    define day3_doherty = False
    define day3_wiley = False
    define day3_custer = False

    play music hall3

    scene black with dissolve
    show text "Day 3" with Pause(1.5)
    scene black with dissolve

    scene bg desk
    "You arrive at the station just as Francis is setting his things down."

    show francis
    francis "Good Morning, Sergeant."
    you "Good Morning, Francis."
    francis "I see that you are on time, did you get your watch fixed?"
    you "No, but I did drop it off at the jeweler on my way in. I made sure that I woke extra early so that wouldn't be late."
    francis "Very good. Maybe this will help you be on time more regularly."
    you "I hope so. Unfortunately, in my haste this morning, I forgot to pack a lunch."
    francis "That is unfortunate, Sergeant."
    you "It should be fine. The 'Black Leaf and Earl' isn't far. I'll probably walk over and grab a sandwich."

    hide francis
    "Francis leaves and busies himself around the station."
    "It is a fairly slow day."
    "Several hours pass, lunch break is fast approaching."

    show francis
    "Francis walks up to you with a note in his hand."
    francis "There's another note from Lt. Hughes. It looks like another robbery."
    hide francis

label day3_note:
    show note
    note "At 10 this morning, the Black Leaf and Earl was robbed. The suspect made off with a considerable amount of money. Sergeant Doherty and Officer Wiley are on the scene."
    hide note
    jump day3_menu

label day3_menu:
    hide telegraph

    menu:
        "Sergeant Briggs" if not day3_briggs:
            $ day3_briggs = True
            show telegraph
            briggs "What are you contacting me for? I am no where near the Black Leaf and Earl. I think that was assigned to Sgt. Doherty."
            jump day3_menu

        "Sergeant Doherty" if not day3_doherty:
            $ day3_doherty = True
            show telegraph
            doherty "The owner states that a slim man with brown hair and a leather mask robbed the restaurant at gun point."
            doherty "The restaurant will be closed until the interviews are concluded and the assessor has arrived."
            if day3_wiley:
                jump after_day3_menu
            else:
                jump day3_menu

        "Officer Wiley" if not day3_wiley:
            $ day3_wiley = True
            show telegraph
            wiley "he patrons all stated that the suspect is a shorter, thin man. He was wielding a gun."
            wiley "One man stated that it seemed as though he was just trying to scare people and was not actually interested in the money."
            wiley "Another said that he stole her sandwich."
            if day3_doherty:
                jump after_day3_menu
            else:
                jump day3_menu

        "Officer Custer" if not day3_custer:
            $ day3_custer = True
            show telegraph
            custer "I am not at the Black Leaf and Earl. I think Officer Wiley is there."
            jump day3_menu

        "Note":
            jump day3_note

label after_day3_menu:
    hide telegraph
    "That seems to be all the facts, then."

    show francis
    you "That is strange, Francis."
    francis "What is, Sergeant?"
    you "A similar description for three crimes on three consectutive days."
    you "I wonder if they could be the same person."
    francis "That would seem to make sense. But what ever could the motive be?"
    you "I'm not sure."
    you "Though it's disappointing that I wont be able to go to the Black Leaf and Earl for lunch."
    francis "Here, Sergeant. Have half of my sandwich."
    you "I couldn't possibly. It's yours..."
    francis "I insist. I'm not overly hungry today."
    you "Thank you, Francis."
    hide francis

    "The rest of the day passes very slowly."
    "Just before you stand to leave, you hear the telegraph ticker printing out another message.
    You stand and retrieve it."
    "Once again, you are looking at a message addressed to no one."
    "And it reads,"
    "'It was always for you'"

    scene bg home
    "You feel a little uneasy on your walk home and through the night."

    jump Day4
