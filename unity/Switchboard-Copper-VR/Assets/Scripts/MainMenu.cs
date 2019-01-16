using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour {

    public PanelFade m_BlackoutCover;

    private bool quitting = false;

    void Awake()
    {
        m_BlackoutCover.FadeOut();
    }

    private void Update()
    {
        if (GvrControllerInput.AppButton) {
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
        GvrDaydreamApi.LaunchVrHomeAsync((success) => {
            //Application.Quit(); // This results in dropping to android home before going back into daydream home.
        });
#endif
    }
}
