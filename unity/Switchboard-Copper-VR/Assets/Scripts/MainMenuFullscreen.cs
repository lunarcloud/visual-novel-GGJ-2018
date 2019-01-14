using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainMenuFullscreen : MonoBehaviour {

	public Toggle fullscreenToggle;

	void Start() {
		fullscreenToggle.isOn = Screen.fullScreen;
	}

	public void SetFullScreen(bool fullscreen) {
		Screen.fullScreen = fullscreen;
	}
}
