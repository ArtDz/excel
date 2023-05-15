import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {tableResizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {matrix, nextSelector} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static TABLE_LENGTH = 15

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection
  }

  toHTML() {
    return createTable(Table.TABLE_LENGTH)
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')

    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:value', $cell.text())
  }

  onClick(event) {
    if (event.target.dataset.id) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)

      } else {
        this.selectCell($target)
      }
    }
  }


  onMousedown(event) {
    tableResizeHandler(this.$root, event)
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)

    }
  }

  onInput() {
    this.$emit('table:value', this.selection.current.text())
  }

}

















