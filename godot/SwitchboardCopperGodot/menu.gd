extends Control

# Declare member variables here. Examples:
# var a = 2
# var b = "text"

# Called when the node enters the scene tree for the first time.
func _ready():
	$PlayButton.grab_focus()
	$PlayButton.connect("pressed", self, "_play")
	$QuitButton.connect("pressed", self, "_quit")
	
	if OS.get_name() == "HTML5":
		$QuitButton.visible = false;
	else:
		$QuitButton.connect("pressed", self, "_quit")

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

func _play():
	get_tree().change_scene("res://main.tscn")
	
func _quit():
	get_tree().quit()