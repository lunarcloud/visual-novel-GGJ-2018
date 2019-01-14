using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainMenuResolution : MonoBehaviour {

	public Dropdown resolutionDropdown;

	private Resolution[] resolutions;

	private int currentResolution;

	void Start() {
		
		resolutionDropdown.ClearOptions ();
		var options = new List<Dropdown.OptionData> ();
		resolutions = Screen.resolutions;
		for (int i = 0; i < resolutions.Length; i++) {
			var option = new Dropdown.OptionData ();
			option.text = resolutions [i].width + "x" + resolutions [i].height;
			options.Add (option);
			if (resolutions[i].width == Screen.width 
				&& resolutions[i].height == Screen.height) {
				currentResolution = i;
			}
		}

		resolutionDropdown.AddOptions (options);
		resolutionDropdown.value = currentResolution;
	}

	public void SetResolution(int index) {
		
		Resolution res = resolutions [index];

		if (resolutionDropdown.value != currentResolution) {
			Screen.SetResolution (res.width, res.height, Screen.fullScreen);
		}
	}
}
