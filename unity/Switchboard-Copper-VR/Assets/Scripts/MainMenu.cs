using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour {

    public PanelFade m_BlackoutCover;

    private bool quitting = false;

    void Awake()
    {
        Input.backButtonLeavesApp = true;
        m_BlackoutCover.FadeOut();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape) || GvrControllerInput.AppButton) {
            Quit();
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

	public void Quit() {

        if (!quitting)
        {
            quitting = true;
            StartCoroutine(QuitImpl());
        }
    }

    private IEnumerator QuitImpl()
    {
        m_BlackoutCover.FadeIn();
        yield return new WaitForSeconds(2);
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#else
        if (GvrIntent.IsLaunchedFromVr()) {
            GvrDaydreamApi.LaunchVrHomeAsync((success) => {
                if (!success) {
                    Application.Quit();
                }
            });
        } else {
            Application.Quit();
        }
#endif
    }
}
