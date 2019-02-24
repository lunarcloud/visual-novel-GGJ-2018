#
#First Day, big decision
#

label Day1:

    define day1_briggs = False
    define day1_doherty = False
    define day1_wiley = False
    define day1_custer = False

    play music hall1

    scene black with dissolve
    show text "Day 1" with Pause(1.5)
    scene black with dissolve

    scene bg home

    "You wake up, still tired from not having slept well."
    you '"Maybe the police can do without their switchboard officer today," you think briefly.'
    "Slowly, you get out of bed and prepare to set off for work."
    "The long trudge to the police station was made better by the shade cast by a rare cloudy day. Antiford does not get many overcast days."

    scene bg desk

    "The office is almost stiflingly hot. You set your bag down. Your assistant, Francis, is sitting at his desk, filing through some papers."

    show francis
    menu:
        "Greet Francis":
            $ greet_francis = True
            you "Good Morning, Francis. How are you?"
            francis "I am well, Sergeant. You're a little late. Did you have a difficult morning?"
            you "Not too difficult. And, so I am... hrm. My watch has been running behind lately."
            francis "I've brought you a chilled tea from the shop around the corner."
            you "Thank you, Francis. That is my favorite shop."
            francis "Good to know."
            jump after_greet

        "Ignore Francis":
            $ greet_francis = False
            jump after_greet

label after_greet:
    "Francis hands you a note."

    francis "Here is a note for you from Lt. Hughes. It's regarding an incident this morning. I think he wants you to moniter the situation."

    hide francis
    show note
    menu:
        "Open the Note":
            jump day1_note

label day1_note:
    show note
    note "A tea house on Mallory Lane was robbed at gunpoint. Confirm the facts with Sergeant Doherty and Officer Wiley, who are on the scene."
    hide note
    jump day1_menu

label day1_menu:
    hide telegraph

    menu:
        "Sergeant Briggs" if not day1_briggs:
            $ day1_briggs = True
            show telegraph
            briggs "What are you contacting me for? I am no where near the tea house. I think that was assigned to Sgt. Doherty."
            jump day1_menu

        "Sergeant Doherty" if not day1_doherty:
            $ day1_doherty = True
            show telegraph
            doherty "The witnesses report seeing a short, thin individual wearing all black with a hood. None of them saw the suspect's face."
            if day1_wiley:
                jump after_day1_menu
            else:
                jump day1_menu

        "Officer Wiley" if not day1_wiley:
            $ day1_wiley = True
            show telegraph
            wiley "I have taken a statement from the owner. She reports the suspect is slim man with brown hair. She did not see his face due to a leather mask he was wearing."
            if day1_doherty:
                jump after_day1_menu
            else:
                jump day1_menu

        "Officer Custer" if not day1_custer:
            $ day1_custer = True
            show telegraph
            custer "I am not at the tea house. I think Officer Wiley is there."
            jump day1_menu

        "Note":
            jump day1_note

label after_day1_menu:
    hide telegraph
    "That seems to be all the facts, then."
    show francis
    francis "Sergeant, we received one more telegraph."
    you "Who is it for?"
    francis "It's not for anyone. There's no name. It just says:
    you 'It was always for you'."
    francis "Well Francis, that *is* rather odd. But it's been a long day. I'll be heading home now. Have a good night."
    scene bg home
    francis "Good night, Sergeant."

    jump Day2
