using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class MainMenuAudio : MonoBehaviour {

	public AudioMixer masterMixer;

	public void SetVolumeMaster(float soundLevel)
	{
		masterMixer.SetFloat ("masterVol", soundLevel);
	}

	public void SetVolumeMusic(float soundLevel)
	{
		masterMixer.SetFloat ("musicVol", soundLevel);
	}

	public void SetVolumeSfx(float soundLevel)
	{
		masterMixer.SetFloat ("sfxVol", soundLevel);
	}
}
