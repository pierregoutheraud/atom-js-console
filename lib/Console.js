'use babel';

export default class Console {

  constructor() {
    const html = `
    <div class="output"></div>
    <div class="error"></div>
    <div class="executionTime"></div>
    `
    this.element = document.createElement('div')
    this.element.classList.add('js-console')
    this.element.innerHTML = html

    this.panel = atom.workspace.addBottomPanel({
      item: this.element,
      visible: false
    })
  }

  show() {
    this.panel.show()
  }

  hide() {
    this.panel.hide()
  }

  render({ code, output, error, executionTime }) {
    this.element.querySelector('.output').textContent = output
    this.element.querySelector('.error').textContent = error
    this.element.querySelector('.executionTime').textContent = `(executed in ${executionTime} ms)`
  }

  destroy() {
    this.modalPanel.destroy()
  }

}
