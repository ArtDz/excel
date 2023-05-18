import {CHANGE_NAME, CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLES} from "@/redux/types";

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeTableName(data) {
  return {
    type: CHANGE_NAME,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLES,
    data
  }
}