import {storage} from "@core/utils";

export function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]

  return `
  <li class="db__record">
    <a href="#excel/${id}">${model.tableName}</a>
    <div>
      <strong>
        ${new Date(model.createDate).toLocaleDateString()}
      </strong>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
      
    </div>
    
  </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  console.log(keys)
  if (!keys.length) {
    return `<p class="db__notable">Нет созданных таблиц</p>`
  }

  return `
  <div class="db__list-header">
    <span>Название</span>
    <div>
      <span>Дата создания ||</span>
      <span>Дата открытия</span>
    </div>
  </div>

  <ul class="db__list">
  ${keys.map(toHTML).join('')}
  </ul>
  `
}