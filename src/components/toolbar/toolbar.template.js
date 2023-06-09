function toButton(button) {
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(button.value)}'
  `

  button.icon = button.icon
    .replace('svg', `svg ${meta}`)
    .replace('path', `path ${meta}`)

  return `
    <div ${meta} class="button ${button.active ? 'active' : ''}" >${button.icon}</div>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      format: 'align_left',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 936v-60h720v60H120Zm0-165v-60h472v60H120Zm0-165v-60h720v60H120Zm0-165v-60h472v60H120Zm0-165v-60h720v60H120Z"/></svg>',
      active: s['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      format: 'align_center',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 936v-60h720v60H120Zm164-165v-60h393v60H284ZM120 606v-60h720v60H120Zm164-165v-60h393v60H284ZM120 276v-60h720v60H120Z"/></svg>',
      active: s['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      format: 'align_right',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 936v-60h720v60H120Zm249-165v-60h471v60H369ZM120 606v-60h720v60H120Zm249-165v-60h471v60H369ZM120 276v-60h720v60H120Z"/></svg>',
      active: s['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      format: 'bold',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M275 856V296h228q66 0 114.5 42T666 444q0 38-21 70t-56 49v6q43 14 69.5 50t26.5 81q0 68-52.5 112T510 856H275Zm86-76h144q38 0 66-25t28-63q0-37-28-62t-66-25H361v175Zm0-247h136q35 0 60.5-23t25.5-58q0-35-25.5-58.5T497 370H361v163Z"/></svg>',
      active: s['fontWeight'] === 'bold',
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal': 'bold'}
    },
    {
      format: 'italic',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M224 857v-80h134l139-409H338v-80h380v80H584L445 777h159v80H224Z"/></svg>',
      active: s['fontStyle'] === 'italic',
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      format: 'underlined',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 916v-60h560v60H200Zm280-140q-100 0-156.5-58.5T267 559V216h83v343q0 63 34 101t96 38q62 0 96-38t34-101V216h83v343q0 100-56.5 158.5T480 776Z"/></svg>',
      active: s['textDecoration'] === 'underline',
      value: {textDecoration: s['textDecoration'] === 'underline' ? 'none' : 'underline'}
    },

  ]
  return buttons.map(toButton).join('')
}