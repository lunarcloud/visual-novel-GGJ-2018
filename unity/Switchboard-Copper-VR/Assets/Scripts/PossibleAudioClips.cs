using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PossibleAudioClips : MonoBehaviour {

	public List<string> keys = new List<string>(1);

	public List<AudioClip> values = new List<AudioClip>(1);

	void Start () {
		if (keys.Count != values.Count) {
			throw new MissingReferenceException("Must have a key for every value!");
		}
	}

	public bool TryGetValue(string key, out AudioClip clip) {
		var hasKey = this.keys.Contains (key);
		clip = hasKey 
			? values.GetRange (keys.IndexOf (key), 1) [0]
			: null;
		return hasKey;
	}
}
