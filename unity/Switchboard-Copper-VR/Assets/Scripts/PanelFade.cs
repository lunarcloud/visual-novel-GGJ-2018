/*
  Screen fader for Google Daydream.

  HOW TO USE:
  Create Canvas inside MainCamera
  Create Panel inside Canvas
  Attach this script to Panel
  Add new material to Panel, set RenderingMode to Fade
  To Load from outside script, use this:

  PanelFade pf = GameObject.Find("PanelFadeObject").GetComponent<PanelFade>();
  pf.loadLevel(levelName);


*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PanelFade : MonoBehaviour {

    public Material m;
    public float _colorSpeed = 0.01f;
    private Color c;
    private bool runFadeOut = false;
    private bool runFadeIn = false;
    private string levelName = "";

    // Use this for initialization
    void Start () {
        FadeOut();
    }

    void Update()
    {
        if (runFadeIn)
        {
            if (c.a < 1.0f)
            {
                c.a = c.a + _colorSpeed;
            } else
            {
                runFadeIn = false;
                if (levelName != "")
                {
                    SceneManager.LoadScene(levelName);
                }
            }
                
            m.color = c;
        }
        if (runFadeOut)
        {
            if (c.a > 0.0f)
            {
                c.a = c.a - _colorSpeed;
            } else
            {
                runFadeOut = false;
            }
                
            m.color = c;
        }
    }

    public void FadeIn()
    {
        c = m.color;
        c.a = 0.0f;
        runFadeIn = true;
    }

    public void FadeOut()
    {
        c = m.color;
        c.a = 1.0f;
        runFadeOut = true;
    }

    public void loadLevel(string _levelName)
    {
        levelName = _levelName;
        FadeIn();
    }
}
