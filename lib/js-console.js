'use babel';

import JsConsoleView from './js-console-view';
import { CompositeDisposable } from 'atom';
import vm from 'vm'

export default {

  jsConsoleView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsConsoleView = new JsConsoleView(state.jsConsoleViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.jsConsoleView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'js-console:toggle': () => this.run(),
      "mousedown": () => this.hide()
    }))
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsConsoleView.destroy();
  },

  serialize() {
    return {
      jsConsoleViewState: this.jsConsoleView.serialize()
    };
  },

  hide() {
    this.modalPanel.hide()
  },

  run() {
    if (!this.modalPanel.isVisible()) {
      this.modalPanel.show()
    }
    const code = atom.workspace.getActiveTextEditor().getSelectedText()
    const start = Date.now()
    const output = String(vm.runInThisContext(code))
    const end = Date.now()
    const executionTime = end-start
    this.jsConsoleView.render(output, executionTime)
  }

};
