import {Action} from '@ngrx/store';

export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export class Connect implements Action {
    readonly type = CONNECT;

    constructor(public payload: {user: string, password: string, isA})
}

export class Disconnect implements Action {
    readonly type = DISCONNECT;
}

export type Actions = Connect | Disconnect;
