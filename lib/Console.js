'use babel';

export default class Console {

  constructor() {
    const html = `
    <div class="stdout"></div>
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

  destroy() {
    this.panel.destroy()
  }

  render({ code, output, error, stdout, executionTime }) {
    this.show()
    this.element.querySelector('.stdout').innerHTML = stdout.join('<br/>')
    this.element.querySelector('.output').textContent =  output
    this.element.querySelector('.error').textContent = error
    this.element.querySelector('.executionTime').textContent = `(executed in ${executionTime} ms)`
  }

  destroy() {
    this.modalPanel.destroy()
  }

}
