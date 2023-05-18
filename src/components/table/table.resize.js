import {$} from "@core/dom";

export function tableResizeHandler($root, event) {
  return new Promise(resolve => {
    if (event.target.dataset.resize) {

      const $resizer = $(event.target),
        $parent = $resizer.closest('[data-type="resizable"]'),
        coords = $parent.getCoords(),
        type = $resizer.data.resize


      let value, delta

      if (type === 'col') {
        $resizer.css({opacity: 1, height: '100vh'})

        document.onmousemove = e => {
          delta = e.pageX - coords.right
          value = coords.width + delta
          $resizer.css({right: -delta + 'px'})
        }

        document.onmouseup = () => {
          $parent.css({width: value + 'px'})
          $resizer.css({opacity: 0, height: '', right: 0})

          $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')

          removeDocumentEvents()

          resolve({
            value,
            type,
            id: $parent.data.col
          })
        }
      } else {
        $resizer.css({opacity: 1, width: '100vw'})

        document.onmousemove = e => {
          delta = e.pageY - coords.bottom
          value = coords.height + delta
          $resizer.css({bottom: -delta + 'px'})
        }

        document.onmouseup = () => {
          $parent.css({height: value + 'px'})
          $resizer.css({opacity: 0, width: '', bottom: 0})

          removeDocumentEvents()

          resolve({
            value,
            type,
            id: $parent.data.row
          })
        }
      }
    }
  })
}

function removeDocumentEvents() {
  document.onmouseup = null
  document.onmousemove = null
}
