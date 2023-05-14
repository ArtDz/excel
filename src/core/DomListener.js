import {capitalize} from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided rof DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
    this.handlers = []
  }
  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.constructor.name} Component`)
      }
      const handler = this[method].bind(this)
      this.handlers.push({event: listener, handler})
      this.$root.on(listener, handler)
    })
  }

  removeDOMListeners() {
    this.handlers.forEach(({event, handler}) => {
      this.$root.off(event, handler)
    })
  }

}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}