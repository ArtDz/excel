import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {tableResizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {matrix, nextSelector} from "@/components/table/table.functions";
import * as actions from "@/redux/actions";
import {defaultStyles} from "@/constants";
import {parse} from "@core/utils";

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
    return createTable(Table.TABLE_LENGTH, this.store.getState())
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')

    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current
        .attr('data-value', value)
        .text(parse(value))
      // this.selection.current
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:value', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
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

  async resizeTable(event) {
    try {
      const data = await tableResizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error('Resize error', e)
    }
  }


  onMousedown(event) {
    this.resizeTable(event)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput() {
    this.updateTextInStore(this.selection.current.text())
  }

}

















