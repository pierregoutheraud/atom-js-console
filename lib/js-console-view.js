'use babel';

export default class JsConsoleView {

  constructor(serializedState) {
    const html = `
      <div class="close-icon"></div>
      <p class="output"></p>
      <p class="executionTime"></p>
    `
    this.element = document.createElement('div')
    this.element.classList.add('js-console')
    this.element.innerHTML = html
  }

  render(text, executionTime) {
    this.element.querySelector('.output').textContent = text
    this.element.querySelector('.executionTime').textContent = `executed in ${executionTime} ms`
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
