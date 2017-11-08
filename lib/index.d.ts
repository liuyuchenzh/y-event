export declare type callback = (...args: any[]) => any;
export interface State {
    stalled: boolean;
    args: any[];
    callback: callback;
}
export declare class YEvent {
    list: {
        [type: string]: State;
    };
    getState(type: string): State;
    setState(type: string, val: State): void;
    $on(type: string, cb: callback): any;
    $emit(type: string, ...args: any[]): void;
    $off(type: string): void;
    $always(type: string, ...args: any[]): void;
}
declare const e: YEvent;
export default e;
