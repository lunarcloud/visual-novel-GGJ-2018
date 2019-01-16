using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Ink.Runtime;

public class InkStoryManager : MonoBehaviour {

	[SerializeField]
	public TextAsset InkJsonAsset;

	public DialogView dialogView;

	private Story story;

	private Dictionary<string, System.Action<string>> tagProcessors = new Dictionary<string, System.Action<string>> ();

	public UnityEngine.Events.UnityAction storyEndAction = delegate {};

    private bool m_easyContinue = false;

    public bool easyContinue
    {
        get { return m_easyContinue; }
        set { }
    }

    public string State {
		get {
			return this.story.state.ToJson ();
		}
		set {
			this.story.state.LoadJson (value);
		}
	}

	public void StartStory() {
		story = new Story (InkJsonAsset.text);
		Continue ();
	} 

	public void Continue() {
		dialogView.Clear ();

		string text = story.Continue ().Trim ();
		dialogView.SetText (text);
        m_easyContinue = story.currentChoices.Count == 0 && !isEnded();

        if (story.currentChoices.Count > 0) {
			for (int i = 0; i < story.currentChoices.Count; i++) {
				Choice choice = story.currentChoices [i];
				dialogView.AddChoice (choice.text.Trim (), delegate {
					Continue(choice.index);
				});
			}
		} else if (isEnded ()) {
			dialogView.AddChoice ("●", storyEndAction, TextAnchor.LowerRight);
		} else {
			dialogView.AddChoice ("▼", delegate {
				Continue();
			}, TextAnchor.LowerRight);
		}

		ProcessTags (story.currentTags);
		dialogView.Show ();
	}

	public List<Choice> GetChoices() {
		return story.currentChoices;
	}

	public void Continue(int choiceIndex) {
		story.ChooseChoiceIndex (choiceIndex);
		Continue();
	}

	public bool isEnded () {
		return this.story.currentChoices.Count == 0 && !this.story.canContinue;
	}

	public void AddTagProcessor(string tag, System.Action<string> onTag) {
		tagProcessors.Add (tag, onTag);
	}

	public void ProcessTags(List<string> tags) {
		if (tags == null) return;
		System.Action<string> processor;
		foreach (string tag in tags) {
			string keyOfTag = tag.Split (':')[0];
			if (tagProcessors.TryGetValue(keyOfTag, out processor)) {
				string valueOfTag = tag.Split (':')[1];
				processor.Invoke (valueOfTag);
			}
		}
	}
}
