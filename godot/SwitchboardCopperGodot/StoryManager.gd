extends Node2D

onready var ink_manager = get_node("InkRuntimeManager")
onready var label = get_node("TextCanvas/TextPanel/Vert/StoryText")
onready var continueButton = get_node("TextCanvas/TextPanel/Vert/ContinueButton")
onready var choicesContainer = get_node("TextCanvas/TextPanel/Vert/ChoicesContainer")
onready var speechBubble = get_node("TextCanvas/TextPanel")
onready var title = get_node("TitleContainer/Title/TitleText")
onready var titleContinueButton = get_node("TitleContainer/Title/ContinueButton2")
onready var dailyMenu = get_node("DailyMenu/desk")
onready var button_note = get_node("DailyMenu/desk/note")
onready var button_briggs = get_node("DailyMenu/desk/coworkers/briggs")
onready var button_wiley = get_node("DailyMenu/desk/coworkers/wiley")
onready var button_doherty = get_node("DailyMenu/desk/coworkers/doherty")
onready var button_custer = get_node("DailyMenu/desk/coworkers/custer")
onready var button_hughes = get_node("DailyMenu/desk/coworkers/hughes")
onready var background = get_node("Background")
onready var music = get_node("MusicPlayer")
onready var portraits = get_node("Portraits");

var end_cursor = preload("res://media/end-cursor.png")
var atEnd = false

# Must be in same index numbers as ordered in the ink file
var choices

func _ready():
	ink_manager.connect("ink_ready", self, "start_story")
	ink_manager.connect("ink_done", self, "end_of_story")
	ink_manager.connect("ink_update_text", self, "_on_story_continued")
	ink_manager.connect("ink_update_tags", self, "_process_tags")
	ink_manager.connect("ink_update_choices", self, "_on_choices")
	
	continueButton.connect("pressed", self, "_continue")
	titleContinueButton.connect("pressed", self, "_title_continue")
	var index = 0
	for choice in choicesContainer.get_children():
		choice.connect("pressed", self, "_select_choice", [index])
		index += 1
		
	button_note.connect("pressed", self, "_daily_menu_choose", ["Note"])
	button_briggs.connect("pressed", self, "_daily_menu_choose", ["SgtBriggs"])
	button_wiley.connect("pressed", self, "_daily_menu_choose", ["OffWiley"])
	button_doherty.connect("pressed", self, "_daily_menu_choose", ["SgtDoherty"])
	button_custer.connect("pressed", self, "_daily_menu_choose", ["OffCuster"])
	button_hughes.connect("pressed", self, "_daily_menu_choose", ["LtHughes"])

func start_story():
	label.set_text("loading story...")
	print("loading story...")
	ink_manager.load_story()
	_continue()

func _quit_to_menu():
	# warning-ignore:return_value_discarded
	get_tree().change_scene("res://menu.tscn")

func _input(event):
	if event.is_action_pressed("menu"):
		_quit_to_menu()

func _continue():
	if atEnd:
		_quit_to_menu()
	else:
		ink_manager.continue()

func _select_choice(index: int):
	ink_manager.continue(index)

func _daily_menu_choose(name: String):
	var index = 0
	for choice in choices:
		print(choice.text)
		if choice.text == name:
			_hide_daily_menu()
			_select_choice(index)
			return
		index += 1
	print("Couldn't find " + name + " in current choices")
	
func end_of_story():
	atEnd = true
	continueButton.icon = end_cursor

func _process_tags(tags: PoolStringArray):
	for tag in tags:
		if (tag.begins_with("music:")):
			play_music(tag.trim_prefix("music:"))
		elif (tag.begins_with("background:")):
			set_background(tag.trim_prefix("background:"))
		elif (tag.begins_with("portrait:")):
			set_portrait(tag.trim_prefix("portrait:"))
		elif (tag.begins_with("dailymenu:")):
			_show_daily_menu()
		elif (tag == "title"):
			_show_as_title()
		else:
			# TODO More tags, game specific tags
			print("Unknown tag " + tag)

func _on_story_continued(currentText: String):
	label.set_text("")
	choicesContainer.visible = false
	continueButton.visible = false
	_reset_bubble_size()
	label.set_text(currentText)
	
func _reset_bubble_size():
	speechBubble.margin_top = 620
	speechBubble.margin_bottom = -10
	
func _on_choices(currentChoices):
	#clear choices
	choicesContainer.visible = false
	for choice in choicesContainer.get_children():
		choice.visible = false
		
	if currentChoices.size() == 0:
		continueButton.visible = true
		if dailyMenu.visible:
			button_note.grab_focus()
		elif !title.get_parent().visible:
			continueButton.grab_focus()
	else:
		choices = currentChoices
		var index = 0
		continueButton.visible = false
		choicesContainer.visible = true
		for choice in currentChoices:
			if dailyMenu.visible:
				match choice.text:
					"SgtBriggs": button_briggs.visible = true
					"OffWiley": button_wiley.visible = true
					"SgtDoherty": button_doherty.visible = true
					"OffCuster": button_custer.visible = true
					"LtHughes": button_hughes.visible = true
			elif index < 6:
				choicesContainer.get_child(index).visible = true
				choicesContainer.get_child(index).set_text(choice.text)
			index += 1
			
		if dailyMenu.visible:
			button_note.grab_focus()
		else:
			choicesContainer.get_child(0).grab_focus()

		
func play_music(song: String):
	music.stream = load("res://media/music/" + song + ".ogg")
	music.play(0)

func set_background(name: String):
	background.texture = load("res://media/background/" + name + ".jpg")

func set_portrait(name: String):
	for potrait in portraits.get_children():
		potrait.visible = false
	if (name != "none"):
		get_node("Portraits/" + name).visible = true

func _show_daily_menu():
	dailyMenu.visible = true
	speechBubble.visible = false

func _hide_daily_menu():
	dailyMenu.visible = false
	speechBubble.visible = true
	button_briggs.visible = false
	button_custer.visible = false
	button_doherty.visible = false
	button_hughes.visible = false
	button_wiley.visible = false
			
func _show_as_title():
	title.text = ink_manager.story.current_text
	speechBubble.visible = false
	title.get_parent().visible = true
	titleContinueButton.grab_focus()
	titleContinueButton.grab_click_focus()

func _title_continue():
	title.get_parent().visible = false
	speechBubble.visible = true
	_continue()
	