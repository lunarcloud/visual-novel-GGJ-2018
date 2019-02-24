# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.

define you = Character("You")
define francis = Character("Francis")

define briggs = Character("Sergeant Briggs")
define doherty = Character("Sergeant Doherty")
define wiley = Character("Officer Wiley")
define custer = Character("Officer Custer")
define hughes = Character("Lieutenant Hughes")

define note = Character("Note")

define greet_francis = False

define hall1 = 'music/Kevin MacLeod - Hall of the Mountain King - 1.ogg'
define hall2 = 'music/Kevin MacLeod - Hall of the Mountain King - 2.ogg'
define hall3 = 'music/Kevin MacLeod - Hall of the Mountain King - 3.ogg'
define hall4 = 'music/Kevin MacLeod - Hall of the Mountain King - 4.ogg'
define hall5 = 'music/Kevin MacLeod - Hall of the Mountain King - 5.ogg'


define briggs_option = "Sergeant Briggs\n{image=images/desk/briggs.png}"
define doherty_option = "Sergeant Dohrety\n{image=images/desk/doherty.png}"
define wiley_option = "Officer Wiley\n{image=images/desk/wiley.png}"
define custer_option = "Officer Custer\n{image=images/desk/custer.png}"
define hughes_option = "Lieutenant Hughes\n{image=images/desk/hughes.png}"
define note_option = "Note\n{image=images/desk/note.png}"

# The game starts here.

label start:
    jump Day1
