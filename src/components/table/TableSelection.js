export class TableSelection {
  static attrName = 'data-select'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().attr(TableSelection.attrName)
  }

  clear() {
    this.group.forEach(el => el.removeAttr(TableSelection.attrName))
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup(elemsArray = []) {
    this.clear()
    this.group = elemsArray
    this.group.forEach($el => $el.attr(TableSelection.attrName))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}