'use babel';

export default class JsConsoleView {

  constructor(serializedState) {
    const html = `
      <iframe src="http://jsbin.com/?js,console" />
    `
    this.element = document.createElement('div')
    this.element.classList.add('js-console')
    this.element.innerHTML = html
    // const cm = codemirror(this.element)

    atom.workspace.open().then((editor) => {
      editor.insertText('Hello, World!')
    })
  }

  render({ code, output, executionTime }) {
    // this.element.querySelector('.code').textContent = code
    // this.element.querySelector('.output').textContent = output
    // this.element.querySelector('.executionTime').textContent = `(executed in ${executionTime} ms)`
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
