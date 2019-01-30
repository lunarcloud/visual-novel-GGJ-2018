using UnityEngine;

public class GvrModeManager : MonoBehaviour
{
    public bool IsDaydream
    {
        get
        {
#if UNITY_EDITOR || !UNITY_ANDROID
            return true;
#else
            return GvrIntent.IsLaunchedFromVr() || GvrSettings.ViewerPlatform == GvrSettings.ViewerPlatformType.Daydream;
#endif
        }
    }

    public GameObject[] DestroyOnCardboard;
    public GameObject[] DestroyOnDaydream;
    public GameObject[] HideOnCardboard;
    public GameObject[] HideOnDaydream;

    void Awake()
    {
        if (IsDaydream)
        {
            Destroy(DestroyOnDaydream);
            Hide(HideOnDaydream);
        }
        else
        {
            Destroy(DestroyOnCardboard);
            Hide(HideOnCardboard);
        }
    }

    private void Destroy(GameObject[] list)
    {

        if (list != null) foreach (var gameObject in list)
            {
                Debug.Log("Deleting " + gameObject.name);
                Destroy(gameObject);
            }
    }

    private void Hide(GameObject[] list)
    {
        if (list != null) foreach (var gameObject in list)
            {
                Debug.Log("Hiding " + gameObject.name);
                gameObject.SetActive(false);
            }
    }
}
