using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainMenuGraphicQuality : MonoBehaviour {

	public Dropdown qualityDropdown;

	void Start() {		
		qualityDropdown.ClearOptions ();
		var options = new List<Dropdown.OptionData> ();
		var qualityLevel = QualitySettings.GetQualityLevel();
		string[] names = QualitySettings.names;
		int currentQuality = 0;
		for (int i = 0; i < names.Length; i++) {
			var option = new Dropdown.OptionData ();
			option.text = names [i];
			options.Add (option);
			if (i == qualityLevel) {
				currentQuality = i;
			}
		}
		qualityDropdown.AddOptions(options);
		qualityDropdown.value = currentQuality;
	}

	public void SetQualityLevel(int level) {
		QualitySettings.SetQualityLevel (level);
	}
}
