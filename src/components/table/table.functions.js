import {range} from "@core/utils";

export function matrix($current, $target) {
  const current = $current.id(true)
  const target = $target.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col,row}) {
  const MIN_VALUE = 0
  const TABLE_COLS = 25
  const TABLE_ROWS = 14

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > TABLE_ROWS - 1 ?  MIN_VALUE : row + 1
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > TABLE_COLS ? MIN_VALUE : col + 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? TABLE_COLS : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? TABLE_ROWS : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}