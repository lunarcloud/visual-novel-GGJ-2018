using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class GameStoryManager : MonoBehaviour {

	public InkStoryManager inkManager;

	public GameObject dialogCanvas;
	public GameObject dailyMenuCanvas;

	public GameObject backgroundsParent;
	public GameObject portraitsParent;

	public AudioSource musicPlayer;
	public PossibleAudioClips clips;

	public UnityEngine.EventSystems.EventSystem eventSystem;

	void Awake () {
		inkManager.storyEndAction = delegate {
			BackToMenu ();
		};
		inkManager.AddTagProcessor ("background", delegate(string value) {
			SwitchToBackground(value);
		});
		inkManager.AddTagProcessor ("portrait", delegate(string value) {
			SwitchToPortrait(value);
		});
		inkManager.AddTagProcessor ("music", delegate(string value) {
			SwitchToSong(value);
		});
		inkManager.AddTagProcessor ("dailymenu", delegate(string value) {
			DailyMenu();
		});
		dailyMenuCanvas.SetActive (false);
		dialogCanvas.SetActive (true);
		inkManager.StartStory();
	}

	public void BackToMenu() {
		SceneManager.LoadScene (0);
	}

	void SwitchToBackground (string text)
	{
		int childCount = backgroundsParent.transform.childCount;
		for (int i = childCount; i > 0; i--) {
			var background = backgroundsParent.transform.GetChild (i - 1).gameObject;
			background.SetActive (background.name == text);
		}
	}

	void SwitchToPortrait (string text)
	{
		int childCount = portraitsParent.transform.childCount;
		for (int i = childCount; i > 0; i--) {
			var portrait = portraitsParent.transform.GetChild (i - 1).gameObject;
			portrait.SetActive (portrait.name == text);
		}
	}

	void SwitchToSong (string text)
	{
		musicPlayer.Stop ();
		musicPlayer.clip = null;
		var newClip = new AudioClip();
		var gotClip = clips.TryGetValue (text, out newClip);
		if (gotClip) {
			musicPlayer.clip = newClip;
			musicPlayer.Play ();
		}
	}

	public void DailyMenu() {
		dialogCanvas.SetActive (false);

		var choices = inkManager.GetChoices ();
		var choiceNames = new List<string> ();
		foreach (var choice in choices) {
			choiceNames.Add (choice.text);
			if (choice.text.ToLower ().Equals ("continue")) {
				inkManager.Continue (choice.index);
				dialogCanvas.SetActive (true);
				return;
			}
		}

		int childCount = dailyMenuCanvas.transform.childCount;
		for (int i = childCount; i > 0; i--) {
			var button = dailyMenuCanvas.transform.GetChild (i - 1).gameObject;
			button.SetActive (choiceNames.Contains(button.name));
			if (button.name.Equals ("Note")) {
				eventSystem.firstSelectedGameObject = button.gameObject;
			}
		}

		dailyMenuCanvas.SetActive (true);
		eventSystem.SetSelectedGameObject (eventSystem.firstSelectedGameObject);
	}

	public void DailyMenuChoice(GameObject buttonSelf) {
		
		var choices = inkManager.GetChoices ();
		foreach (var choice in choices) {
			if (choice.text == buttonSelf.name) {
				dailyMenuCanvas.SetActive (false);
				inkManager.Continue (choice.index);
				dialogCanvas.SetActive (true);
			}
		}
	}
}
