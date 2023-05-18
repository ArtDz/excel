import {defaultStyles} from "@/constants";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableName: 'Новая таблица',
  currentText: '',
  createDate: new Date().toJSON(),
  openedDate: new Date().toJSON(),
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}