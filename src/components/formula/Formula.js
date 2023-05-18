import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      listeners: ['input', 'keydown'],
      subscribeOnStore: ['currentText'],
      ...options
    })
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('table:value', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    // console.log(typeof $(event.target).text())
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}

