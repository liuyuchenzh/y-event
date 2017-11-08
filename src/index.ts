export type callback = (...args: any[]) => any

export interface State {
  stalled: boolean
  args: any[]
  callback: callback
}

function generateDefaultState(): State {
  return {
    stalled: false,
    args: [],
    callback() {}
  }
}

export class YEvent {
  list: {
    [type: string]: State
  } = {}

  getState(type: string): State {
    return this.list[type]
  }

  setState(type: string, val: State): void {
    this.list[type] = val
  }

  $on(type: string, cb: callback) {
    if (!this.getState(type)) {
      this.setState(type, generateDefaultState())
    }
    const state: State = this.getState(type)
    state.callback = cb
    if (state.stalled) {
      state.stalled = false
      return cb(...state.args)
    }
  }

  $emit(type: string, ...args: any[]) {
    const state: State = this.getState(type)
    if (!state) return
    state.callback(...args)
  }

  $off(type: string) {
    delete this.list[type]
  }

  $always(type: string, ...args: any[]) {
    const state: State = this.getState(type)
    if (!state) {
      this.list[type] = generateDefaultState()
      const state: State = this.getState(type)
      state.stalled = true
      state.args = args
      return
    }
    if (state.stalled) return
    state.callback(...args)
  }
}

const e = new YEvent()

export default e
