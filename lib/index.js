function generateDefaultState() {
    return {
        stalled: false,
        args: [],
        callback() { }
    };
}
export class YEvent {
    constructor() {
        this.list = {};
    }
    getState(type) {
        return this.list[type];
    }
    setState(type, val) {
        this.list[type] = val;
    }
    $on(type, cb) {
        if (!this.getState(type)) {
            this.setState(type, generateDefaultState());
        }
        const state = this.getState(type);
        state.callback = cb;
        if (state.stalled) {
            state.stalled = false;
            return cb(...state.args);
        }
    }
    $emit(type, ...args) {
        const state = this.getState(type);
        if (!state)
            return;
        state.callback(...args);
    }
    $off(type) {
        delete this.list[type];
    }
    $always(type, ...args) {
        const state = this.getState(type);
        if (!state) {
            this.list[type] = generateDefaultState();
            const state = this.getState(type);
            state.stalled = true;
            state.args = args;
            return;
        }
        if (state.stalled)
            return;
        state.callback(...args);
    }
}
const e = new YEvent();
export default e;
