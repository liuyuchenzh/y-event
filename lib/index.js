function generateDefaultState() {
    return {
        stalled: false,
        args: [],
        callbacks: []
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
        state.callbacks.push(cb);
        if (state.stalled) {
            state.stalled = false;
            return cb(...state.args);
        }
    }
    $emit(type, ...args) {
        const state = this.getState(type);
        if (!state)
            return;
        state.callbacks.forEach(cb => cb(...args));
    }
    $off(type, cb) {
        if (!cb) {
            delete this.list[type];
        }
        else {
            const cbs = this.list[type].callbacks;
            this.list[type].callbacks = cbs.filter(callback => callback !== cb);
        }
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
        state.callbacks.forEach(cb => cb(...args));
    }
    $once(type, cb) {
        let called = false;
        let fn = function (...args) {
            !called && cb(...args);
            called = true;
        };
        this.$on(type, fn);
    }
}
const e = new YEvent();
export default e;
