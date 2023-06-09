import {ExcelComponent} from "@core/ExcelComponent";
import * as actions from "@/redux/actions";
import {ActiveRoute} from "@core/routes/ActiveRoute";
import {$} from "@core/dom";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      listeners: ['focusout','click'],
      ...options
    });
  }

  onFocusout(event) {
    this.$dispatch(actions.changeTableName(event.target.value))
  }

  onClick(event) {
    const target = $(event.target)

    if (target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if (target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }


  toHTML() {
    const name = this.store.getState().tableName
    return `
      <input type="text" class="input" value="${name}">
  
      <div>
  
          <div data-button="remove" class="button">
              <svg data-button="remove" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path data-button="remove" d="m361 757 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261 936q-24 0-42-18t-18-42V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306Zm-438 0v570-570Z"/></svg>
          </div>
  
          <div data-button="exit" class="button">
              <svg data-button="exit" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path data-button="exit" d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"/></svg>
          </div>
  
      </div>
    `
  }
}