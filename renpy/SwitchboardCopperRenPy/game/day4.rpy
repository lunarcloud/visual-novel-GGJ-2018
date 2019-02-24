#
#
#

label Day4:

    define day4_briggs = False
    define day4_doherty = False
    define day4_wiley = False
    define day4_custer = False

    play music hall4

    scene black with dissolve
    show text "Day 4" with Pause(1.5)
    scene black with dissolve

    scene bg home

    "You arrive at the station extra late."
    "Officer Custer knocks you to the street bumbling his way out of the station."
    custer '"Sorry!" he says as he fades into the distance.'
    "You stand up and brush yourself off. You can see Francis looking out the window gasping."

    scene bg desk
    "By the time you get inside, Francis is already quite busy."

    show francis
    francis "Good Morning, Sergeant."
    you "Good Morning, Francis."
    you "Watch still out of commission?"
    francis "Yes, They seem to be taking a while. I'm not really sure how long these things are supposed to take."
    you "Well, I'm sure they make good time."
    francis "Sir?"
    you "Yes?"
    francis "That was a terrible pun."
    you "Sorry, Francis."
    "Francis rummages through a stack of papers and hands one to you."
    francis "There's another note from Lt. Hughes."

label day4_note:
    show note
    note "A jewelry store is robbed. Sergeant Briggs and Officer Custer are on the scene."
    hide note
    jump day4_menu

label day4_menu:
    hide telegraph

    menu:
        "Sergeant Briggs" if not day4_briggs:
            $ day4_briggs = True
            show telegraph
            briggs "Been talking to witnesses. No perp sightings, but we've found an out-of-place handkerchief on the window sill, deep blue."
            if day4_custer:
                jump after_day4_menu
            else:
                jump day4_menu

        "Sergeant Doherty" if not day4_doherty:
            $ day4_doherty = True
            show telegraph
            doherty "I'm not on that case, Sergeant. I'm doing patrols."
            jump day4_menu

        "Officer Wiley" if not day4_wiley:
            $ day4_wiley = True
            show telegraph
            wiley "No, no. Sergeant *Doherty* and Officer Custer are down at the jewelers', not I."
            jump day4_menu

        "Officer Custer" if not day4_custer:
            $ day4_custer = True
            show telegraph
            custer "I just spoke with the proprietor. They're still cleaning up, not sure if anything was stolen. Many of the glass cases were broken, so it's likely."
            if day4_briggs:
                jump after_day4_menu
            else:
                jump day4_menu

        "Note":
            jump day4_note

label after_day4_menu:
    hide telegraph
    "That seems to be all the facts, then."

    show francis
    francis "Hey, Sergeant, they wanted me to give you this. They found this at the scene."
    you "My watch!"
    francis "Looks to be in working order, sir."
    you "But wait, wouldn't procedure dictate this be in the evidence—"
    "Francis sneezes and pats his pockets, looking for a hankercheif."
    you "Here, take mine."
    francis "Thanks, sir."
    you "This is heavy, concerning stuff. These crimes are cutting very close to home."
    francis "I quite agree with you. Oh!"
    you "That telegraph again?"
    francis "Yes."
    "You look at the message, no address or name, just:"
    "'It was always for you'"

    you "Thank you, Francis."

    hide francis
    scene bg home
    "You watch your back on the way home."
    show shadow
    "You could swear you saw a waifish shadow follow you."
    hide shadow
    "What does one do? When you are the police and you feel unsafe?"

    jump Day5
