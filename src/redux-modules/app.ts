import {User, Alert} from '../utils/interfaces';

const SET_USER = 'app/SET_USER' as const;
const SET_CURRENT_PATH = 'app/SET_CURRENT_PATH' as const;
const SET_ALERTS = 'app/SET_ALERTS' as const;

export const setUser = (arg: User)=> ({ 
    type : SET_USER,
    payload : arg
});
export const setCurrentPath = (arg: string)=> ({ 
    type : SET_CURRENT_PATH,
    payload : arg
});
export const setAlerts = (arg: Alert[])=> ({ 
    type : SET_ALERTS,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setUser>
    | ReturnType<typeof setCurrentPath>
    | ReturnType<typeof setAlerts>

type stateType = {
    currentUser: User | null
    currentPath: string
    alerts: Alert[]
}

const initState: stateType = {
    currentUser: null,
    currentPath: '',
    alerts: []
};

function app(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: {...action.payload}
            };
        case SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.payload
            };
        case SET_ALERTS:
            return {
                ...state,
                alerts: action.payload.slice()
            };
        default:
            return state;
  }
}

export default app;