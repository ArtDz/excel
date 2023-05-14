const CODES = {
  A: 65,
  Z: 90
}

function createRow(content, number = '') {
  return `
    <div class="row">
         <div class="row-info">${number}</div>
         <div class="row-data">${content}</div> 
    </div> 
  `
}

function toColumn(col) {
  return `
      <div class="column">${col}</div>
  `
}

function toCell() {
  return `
      <div class="cell" contenteditable></div>
  `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
  // return `
  //   <div class="row">
  //         <div class="row-info"></div>
  //         <div class="row-data">
  //             <div class="column">A</div>
  //             <div class="column">B</div>
  //             <div class="column">C</div>
  //         </div>
  //     </div>
  //
  //     <div class="row">
  //         <div class="row-info">1</div>
  //         <div class="row-data">
  //             <div class="cell selected" contenteditable>A1</div>
  //             <div class="cell" contenteditable>B1</div>
  //             <div class="cell" contenteditable>C1</div>
  //         </div>
  //     </div>
  // `
}