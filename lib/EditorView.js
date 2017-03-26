'use babel'

export default class EditorView {

  constructor(editor, onCloseCallback) {
    const html = `
    <div class="ajc__editor__close">x</div>
    `
    this.element = document.createElement('div')
    this.element.classList.add('ajc__editor')
    this.element.innerHTML = html

    this.element.querySelector('.ajc__editor__close').addEventListener('click', onCloseCallback)

    // Append editor element
    this.editorElement = atom.views.getView(editor)
    this.element.appendChild(this.editorElement)
  }

  getElement() {
    return this.element
  }

}
