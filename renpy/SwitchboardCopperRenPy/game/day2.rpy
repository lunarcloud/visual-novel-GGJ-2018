#
#
#

label Day2:

    define day2_briggs = False
    define day2_doherty = False
    define day2_wiley = False
    define day2_custer = False

    play music hall2

    scene black with dissolve
    show text "Day 2" with Pause(1.5)
    scene black with dissolve

    scene bg desk
    "The next morning you find your desk just as you had left it the day before."

    show francis
    francis "Good morning, Sergeant."
    you "Good morning, Francis."
    you "And before you say anything, I know I'm late again. I really must do something about my watch. Perhaps I should drop it off to be serviced."
    francis "That would be a smart idea."

    hide francis
    "Francis walks away, but soon returns."

    show francis
    francis "There is another note for you from the lieutenant. He wants you to follow up with the team investigating this crime."

    hide francis
    show note
    menu:
        "Open the Note":
            jump day2_note

label day2_note:
    show note
    if greet_francis:
        note "A flower shop on High Top Road was broken into early this morning. Sergeant Briggs and Officer Wiley are investigating."
    else:
        note "A flower shop on High Top Road was set on fire early this morning. Sergeant Briggs and Officer Wiley are investigating."
    hide note
    jump day2_menu

label day2_menu:
    hide telegraph

    menu:
        "Sergeant Briggs" if not day2_briggs:
            $ day2_briggs = True
            show telegraph
            briggs "The proprietor says that a brick was used to break in the front window. Not sure if anything was taken. There is considerable damage."
            if day2_custer:
                jump after_day2_menu
            else:
                jump day2_menu

        "Sergeant Doherty" if not day2_doherty:
            $ day2_doherty = True
            show telegraph
            doherty "What are you contacting me for? I am no where near the flower shop. I think that was assigned to Sgt. Briggs."
            jump day2_menu

        "Officer Wiley" if not day2_wiley:
            $ day2_wiley = True
            show telegraph
            wiley "I'm allergic to flowers, so they let me off the case. I think Officer Custer is there."
            jump day2_menu

        "Officer Custer" if not day2_custer:
            $ day2_custer = True
            show telegraph

            if greet_francis:
                custer "A witness states that they saw a thin man with short brown hair running away from the scene. He had a bundle of flowers in his hands."
            else:
                custer "A young boy said that he saw a figure, dressed well, throw a bottle through the window to the tea house."
                custer "Shortly afterward, fire started to spread through the house."

            if day2_briggs:
                jump after_day2_menu
            else:
                jump day2_menu

        "Note":
            jump day2_note

label after_day2_menu:
    hide telegraph
    "That seems to be all the facts, then."

    show francis
    you "Well, Francis. Another long day. Are there any other telegraphs?"
    francis "It appears that there is one more..."
    you "Who is it for?"
    francis "There is no name. It just says:"
    francis "'It was always for you'"
    francis "This is the second one now."
    you "Again with the odd one? I wonder who is sending them. It seems a waste to send only that."
    you "Oh, well. I suppose I will head on home now."
    scene bg home
    francis "Have a good night sergeant."
    you "You as well."
    hide francis

    if greet_francis:
        "After a long walk, you arrive at home to find a bundle of flowers on the mat in front of your door."
        you '"How odd," you think aloud.'

    jump Day3
