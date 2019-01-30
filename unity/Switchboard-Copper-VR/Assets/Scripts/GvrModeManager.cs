using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GvrModeManager : MonoBehaviour
{
    public enum PlatformType
    {
        AutoDetect,
        Cardboard,
        Daydream
    }

    public PlatformType Platform = PlatformType.AutoDetect;

    void Awake()
    {
        var launchedVR = GvrIntent.IsLaunchedFromVr();
        var internalPlatform = GvrSettings.ViewerPlatform;

        if (Platform == PlatformType.AutoDetect) {
            Platform = launchedVR || internalPlatform == GvrSettings.ViewerPlatformType.Daydream ? PlatformType.Daydream : PlatformType.Cardboard;
        }
        var wrongSDKObjects = GameObject.FindGameObjectsWithTag((Platform == PlatformType.Daydream ? "Cardboard" : "Daydream") + "Only");

        foreach (var gameObject in wrongSDKObjects) Destroy(gameObject);

        DontDestroyOnLoad(this);
    }
    
}
