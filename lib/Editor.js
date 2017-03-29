'use babel'
import Console from './Console'
import vm from 'vm'
import util from 'util'
import EditorView from './EditorView'
import * as babel from 'babel-core'
import path from 'path'

export default class Editor {

  defaultText = 'Write javascript code here'

  constructor() {
    this.console = new Console()

    this.editor = atom.workspace.buildTextEditor()
    this.editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
    this.editor.setPlaceholderText(this.defaultText)

    this.editorView = new EditorView(this.editor, this.onClose)

    this.editorPanel = atom.workspace.addBottomPanel({
      item: this.editorView.getElement(),
      visible: false
    })

    // TODO Listen ESC key to close

    this.editor.onDidStopChanging(this.onChange) // debounce change
  }

  show(selectedText=null) {
    this.editor.setText(selectedText || '')
    // TODO Get focus on this.editor
    this.editorPanel.show()
  }

  onClose = () => {
    this.editorPanel.hide()
    this.console.hide()
  }

  destroy() {
    this.editorPanel.destroy()
    this.console.destroy()
  }

  onEditor = (editor, selectedText) => {
    this.editor = editor
    editor.setPlaceholderText(this.defaultText)
    if (selectedText) editor.setText(selectedText)
    editor.onDidStopChanging(this.onChange) // debounce change
  }

  execute(code) {
    let stdout = []
    // let oldWrite = process.stdout.write
    // process.stdout.write = function(str, encoding, fd) { // start capture
    //   stdout += str
    // }

    const log = console.log
    console.log = (...args) => { // capture console.log
      stdout.push(args[0])
      log(...args)
    }

    let output = null
    let error = null
    let executionTime = 0
    try {
      const start = Date.now()
      const sandbox = { window, ...window }
      code = babel.transform(code, {
        extends: path.resolve(__dirname, '../.babelrc')
      }).code
      output = vm.runInNewContext(code, sandbox)
      output = String(util.inspect(output, {showHidden: false, depth: null}))
      const end = Date.now()
      executionTime = end-start
    }
    catch (e) {
      output = null
      error = e
    }

    // process.stdout.write = oldWrite // end capture
    return { output, error, stdout, executionTime }
  }

  onChange = (e) => {
    const code = this.editor.getText()
    const { output, error, stdout, executionTime } = this.execute(code)
    this.console.render({ code, output, stdout, error, executionTime })
  }

}
