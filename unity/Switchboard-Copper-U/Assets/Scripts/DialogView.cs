using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DialogView : MonoBehaviour {

	[SerializeField]
	private Text textPrefab;
	[SerializeField]
	private Button buttonPrefab;

	public UnityEngine.EventSystems.EventSystem eventSystem;
	public GameObject m_panel;

	public void Clear () {
		int childCount = m_panel.transform.childCount;
		for (int i = childCount; i > 0; i--) {
			GameObject.Destroy (m_panel.transform.GetChild(i-1).gameObject);
		}
		eventSystem.firstSelectedGameObject = null;
		Hide ();
	}

	public void Hide () {
		m_panel.SetActive (false);
	}

	public void Show () {
		m_panel.SetActive (true);
		if (eventSystem.firstSelectedGameObject != null) {
			eventSystem.SetSelectedGameObject (eventSystem.firstSelectedGameObject);
		}
	}

	public void SetText (string text) {
		Text storytext = Instantiate (textPrefab) as Text;
		storytext.text = text;
		storytext.transform.SetParent (m_panel.transform, false);
	}

	public void AddChoice (string text, UnityEngine.Events.UnityAction onClick, TextAnchor alignment = TextAnchor.UpperLeft)
	{
		Button choice = Instantiate (buttonPrefab) as Button;
		choice.transform.SetParent (m_panel.transform, false);
		choice.onClick.AddListener (onClick);

		Text choiceText = choice.GetComponentInChildren<Text> ();
		choiceText.text = text;
		choiceText.alignment = alignment;

		if (eventSystem.firstSelectedGameObject == null) {
			eventSystem.firstSelectedGameObject = choice.gameObject;
		}
	}
}
