#
# Last day, consequences culminate
#

label Day5:

    define day5_briggs = False
    define day5_doherty = False
    define day5_wiley = False
    define day5_hughes = False

    play music hall4

    scene black with dissolve
    show text "Day 5" with Pause(1.5)
    scene black with dissolve

    scene bg home

    "You woke up at a reasonable time, watch ticking nicely, but you found it hard to pull yourself out of bed after the stress this week's work has put you under."
    if greet_francis:
        "At least you could look forward to your conversations with your assistant."
    "Francis was the most overly-helpful employee at the station you'd ever seen."
    if not greet_francis:
        "It was often a bit overkill. Nice kid, but misguided."

    scene bg desk
    "When you made it to the office, the building was unusually dead. The lieutenant wasn't there,"
    "Not even Francis was in at work today."
    you '"Where is everyone?" you say to yourself.'

    "A note was left on your desk..."

label day5_note:
    show note
    note "Officer Custer was shot, taken to the hospital. I am personally looking after him. Check in with everybody."
    hide note
    jump day5_menu

label day5_menu:
    hide telegraph

    menu:
        "Sergeant Briggs" if not day5_briggs:
            $ day5_briggs = True
            show telegraph

            if day5_doherty:
                briggs "I know you already heard some of this, but..."

            briggs "I'm here with Sergeant Doherty, and it's pretty crazy to think that one of our own did this."
            if day5_doherty:
                briggs "We've got Francis locked up in the back of the paddy wagon."
            else:
                briggs "Francis attacked Officer Custer."
                briggs "We've got him locked up in the back of the paddy wagon."

            jump day5_menu

        "Sergeant Doherty" if not day5_doherty:
            $ day5_doherty = True
            show telegraph

            if day5_briggs:
                doherty "I know you already heard some of this, but..."

            doherty "I'm here with Sergeant Briggs trying to process this."
            if day5_briggs:
                doherty "If it were up to me, we'd send Francis to pleasantville, let him rot in the desert."
            else:
                doherty "Your assistant... Francis... he attacked Officer Custer."
                doherty "If it were up to me, we'd send him to pleasantville, let him rot in the desert."

            jump day5_menu

        "Officer Wiley" if not day5_wiley:
            $ day5_wiley = True
            show telegraph

            if not day5_briggs and not day5_briggs:
                wiley "So, Doherty and Briggs have the real details, but... well Francis is in big trouble."
            wiley "Witnesses say that the young lad jumped Officer Custer as he was leaving his home this morning."
            wiley "The boy woke up pretty darn early for this."
            wiley "This was not his first rodeo; I suspect he had something to do with some of our recent unsolved crimes."

            jump day5_menu

        "Lieutenant Hughes" if not day5_hughes:
            $ day5_hughes = True
            show telegraph
            hughes "Just looking after Officer Custer. He's been cut up and blugeoned. Very graphic."
            hughes "I'm going to have the... culprit — dry world — taken to the station for some serious interrogation."
            jump day5_menu

        "Note" if not day5_hughes or not day5_wiley or not day5_doherty or not day5_briggs:
            jump day5_note

        "Continue" if day5_hughes and day5_wiley and day5_doherty and day5_briggs:
            jump after_day5_menu

label after_day5_menu:
    hide telegraph
    "That seems to be all the facts, then."

    "The facts don't lie."
    "You wonder why Francis did all this."

    play music hall5
    show francis
    "Francis burts into the office screaming:"
    francis "IT WAS ALWAYS FOR YOU!"

    if greet_francis:
        francis "You were the sunshine of my day!"
    else:
        francis "WHY WON'T YOU NOTICE ME!!"

    hide francis

    "Doherty, Wiley, and Briggs burst in and tackle Francis to the ground."
    "Lieutenant Gerald Hughes walks in holding his gun."
    hughes "You're going away for a very long time, kid."

    scene bg home

    "You take the rest of the day off, not sure how to feel about all this."
    "As you walk home, you find a piece of paper in your pocket. It read:"
    "It was always for you."

    scene black with dissolve
    show text "The End" with Pause(1.5)
    scene black with dissolve
    return
