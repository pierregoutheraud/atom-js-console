'use babel'
import Editor from './Editor'
import { CompositeDisposable } from 'atom'

export default {

  jsConsoleView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.editor = new Editor()

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'js-console:toggle': () => this.run(),
      // "mousedown": () => this.hide()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
    this.editor.destroy()
  },

  serialize() {
    return {
      // jsConsoleViewState: this.jsConsoleView.serialize()
    }
  },

  run() {
    const selectedText = atom.workspace.getActiveTextEditor().getSelectedText()
    this.editor.show(selectedText)
  }

}
