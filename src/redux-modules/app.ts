import {User} from '../utils/interfaces';

const SET_USER = 'app/SET_USER' as const;

export const setUser = (arg: User)=> ({ 
    type : SET_USER,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setUser>

type stateType = {
    currentUser: User | null
}

const initState: stateType = {
    currentUser: null
};

function app(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: {...action.payload}
            };
        default:
            return state;
  }
}

export default app;