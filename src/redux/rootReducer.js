import {APPLY_STYLES, CHANGE_NAME, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE} from "@/redux/types";
import {toInlineStyles} from "@core/utils";

export function rootReducer(state, action) {
  let prevState
  let field

  switch (action.type) {

    case TABLE_RESIZE:
      field = action.data.type + 'State'
      return {...state, [field]: value(state, field, action)}

    case CHANGE_TEXT:
      field = 'dataState'
      return {...state, currentText: action.data.value, [field]: value(state, field, action)}

    case CHANGE_NAME:
      return {...state, tableName: action.data}

    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}

    case APPLY_STYLES:
      field = 'stylesState'
      const val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value} }

    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}