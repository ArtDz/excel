import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {tableResizeHandler} from "@/components/table/table.resize";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(15)
  }

  onMousedown(event) {
    tableResizeHandler(this.$root, event)
  }

}