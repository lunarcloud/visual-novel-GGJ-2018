using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DialogView : MonoBehaviour
{

    [SerializeField]
    private Text textPrefab;
    [SerializeField]
    private Button buttonPrefab;

    private bool FirstSelectedChosen = false;

    public UnityEngine.EventSystems.EventSystem eventSystem;
    public GameObject m_panel;


    public void Clear()
    {
        int childCount = m_panel.transform.childCount;
        for (int i = childCount; i > 0; i--)
        {
            GameObject.Destroy(m_panel.transform.GetChild(i - 1).gameObject);
        }
        FirstSelectedChosen = false;
        Hide();
    }

    public void Hide()
    {
        m_panel.SetActive(false);
    }

    public void Show()
    {
        m_panel.SetActive(true);
        if (FirstSelectedChosen)
        {
            eventSystem.SetSelectedGameObject(eventSystem.firstSelectedGameObject);
        }
    }

    public void SetText(string text)
    {
        Text storytext = Instantiate(textPrefab) as Text;
        storytext.text = text;
        storytext.transform.SetParent(m_panel.transform, false);
    }

    public void AddChoice(string text, UnityEngine.Events.UnityAction onClick, TextAnchor alignment = TextAnchor.UpperLeft)
    {
        Button choice = Instantiate(buttonPrefab) as Button;
        choice.transform.SetParent(m_panel.transform, false);
        choice.onClick.AddListener(onClick);

        Text choiceText = choice.GetComponentInChildren<Text>();
        choiceText.text = text;
        choiceText.alignment = alignment;

        if (!FirstSelectedChosen)
        {
            eventSystem.firstSelectedGameObject = choice.gameObject;
        }
    }
}
