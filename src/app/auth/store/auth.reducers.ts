import * as AuthActions from './auth.actions';

export interface UserCredentials {
    email: string;
    password: string;
    isAuthenticated: boolean;
}


const initialState: UserCredentials = {
    email: '',
    password: '',
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions.Actions) {

    switch(action.type) {
        case AuthActions.CONNECT:
            return true;
        case AuthActions.DISCONNECT:
            return false;
        default:
            return false;
    }

}
