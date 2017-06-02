'use babel';

import AtomJavascriptWebDomSnippetsView from './atom-javascript-web-dom-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomJavascriptWebDomSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomJavascriptWebDomSnippetsView = new AtomJavascriptWebDomSnippetsView(state.atomJavascriptWebDomSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomJavascriptWebDomSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-javascript-web-dom-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomJavascriptWebDomSnippetsView.destroy();
  },

  serialize() {
    return {
      atomJavascriptWebDomSnippetsViewState: this.atomJavascriptWebDomSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomJavascriptWebDomSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
