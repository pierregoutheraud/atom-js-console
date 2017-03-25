'use babel';
import Console from './Console';
import vm from 'vm'

export default class Editor {

  defaultText = '// Write javascript code here'

  constructor() {
    this.console = new Console()
  }

  show(selectedText=null) {
    atom.workspace.open('editor.js', { split: 'down' }).then((editor) => {
      this.onEditor(editor, selectedText)
    })
    this.console.show()
  }

  onEditor = (editor, selectedText) => {
    this.editor = editor
    editor.setText(selectedText || this.defaultText)
    editor.onDidStopChanging(this.onChange) // debounce change
    editor.onDidDestroy(this.onDestroy)
  }

  onDestroy = () => {
    this.console.hide()
  }

  onChange = (e) => {
    const code = this.editor.getText()
    let output = null
    let error = null
    let executionTime = 0
    try {
      const start = Date.now()
      output = String(vm.runInThisContext(code))
      const end = Date.now()
      executionTime = end-start
    }
    catch (e) {
      output = null
      error = e
    }
    this.console.render({ code, output, error, executionTime })
  }

}
