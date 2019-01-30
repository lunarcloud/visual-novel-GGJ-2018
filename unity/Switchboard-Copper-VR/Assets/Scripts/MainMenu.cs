using System;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour {

    public PanelFade m_BlackoutCover;

    private bool quitting = false;

    private GvrControllerInputDevice DaydreamController;

    void Awake()
    {
        Input.backButtonLeavesApp = true;
        GetDaydreamController();
    }

    private void GetDaydreamController()
    {
        DaydreamController = GvrControllerInput.GetDevice(GvrControllerHand.Dominant);
        if (DaydreamController == null)
        {
            DaydreamController = GvrControllerInput.GetDevice(GvrControllerHand.NonDominant);
        }
    }

    private void Start()
    {
        m_BlackoutCover.FadeOut();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Application.Quit();
        }

        if (DaydreamController == null) {
            GetDaydreamController();
        }
        else if (DaydreamController.GetButton(GvrControllerButton.App))
        {
            FadeAndQuit();
        }
    }

    public void FadeToByIndex(int sceneIndex) {
        StartCoroutine(FadeToByIndexImpl(sceneIndex));
    }

    private IEnumerator FadeToByIndexImpl(int sceneIndex)
    {
        m_BlackoutCover.FadeIn();
        yield return new WaitForSeconds(2);
        LoadByIndex(sceneIndex);
    }

    public void LoadByIndex(int sceneIndex) {
		SceneManager.LoadScene (sceneIndex);
	}

	public void FadeAndQuit() {

        if (!quitting)
        {
            quitting = true;
            StartCoroutine(FadeAndQuitImpl());
        }
    }

    private IEnumerator FadeAndQuitImpl()
    {   
        if (GvrIntent.IsLaunchedFromVr())
        {
            GvrDaydreamApi.LaunchVrHomeAsync((success) => {
                quitting = false;
                if (!success) Debug.LogError("Couldn't switch to VR home!");
            });
        }
        else
        {
            m_BlackoutCover.FadeIn();
            yield return new WaitForSeconds(2);

#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit();
#endif
        }
        yield break;
    }

}
