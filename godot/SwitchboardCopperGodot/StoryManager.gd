extends Node2D

onready var story = get_node("Story")
onready var label = get_node("SpeechBubble/ColorRect/StoryText")
onready var continueButton = get_node("SpeechBubble/ColorRect/ContinueButton")
onready var choicesContainer = get_node("SpeechBubble/ColorRect/ChoicesContainer")
onready var background = get_node("Background")
onready var music = get_node("MusicPlayer")
onready var portraits = get_node("Portraits");

var choiceIndex = 0

# Called when the node enters the scene tree for the first time.
func _ready():
	story.LoadStory("ink/main.json")
	label.set_text("loading story...")
	print("loading story...")
	
	story.connect("InkContinued", self, "_on_story_continued")
	story.connect("InkChoices", self, "_on_choices")
	story.Continue()
	
	continueButton.grab_focus()
	continueButton.connect("pressed", self, "_continue")
	
	var index = 0
	for choice in choicesContainer.get_children():
		choice.connect("pressed", self, "_select_choice", [index])
		index += 1

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

func _continue():
	if (story.CanContinue || story.HasChoices):
		if (story.HasChoices):
			story.ChooseChoiceIndex(choiceIndex)
		else:
			story.Continue()
		if (!story.CanContinue && !story.HasChoices):
			continueButton.set_text("End")
	else:
		get_tree().change_scene("res://title.tscn")

func _on_story_continued(currentText, currentTags):
	label.set_text(currentText)
	continueButton.disabled = false
	for choice in choicesContainer.get_children():
		choice.visible = false;
	_process_tags(currentTags)
	
func _process_tags(tags):
	for tag in tags:
		if (tag.begins_with("music:")):
			play_music(tag.trim_prefix("music:"))
		if (tag.begins_with("background:")):
			set_background(tag.trim_prefix("background:"))
		if (tag.begins_with("portrait:")):
			set_portrait(tag.trim_prefix("portrait:"))
		else:
			# TODO More tags, game specific tags
			print("Unknown tag " + tag)

func _on_choices(currentChoices):
	var index = 0
	for choice in currentChoices:
		choicesContainer.get_child(index).visible = true
		choicesContainer.get_child(index).set_text(choice)
		index += 1
		continueButton.disabled = true
	if (index == 1):
		_select_choice(0)
		
func play_music(song):
	music.stream = load("res://media/music/" + song + ".ogg")
	music.play(0)
	
func _select_choice(index):
	choiceIndex = index
	continueButton.disabled = false

func set_background(name):
	background.texture = load("res://media/background/" + name + ".jpg")

func set_portrait(name):
	for potrait in portraits.get_children():
		potrait.visible = false
	if (name != "none"):
		get_node("Portraits/" + name).visible = true

