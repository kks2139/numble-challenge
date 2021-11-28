import {User, Alert, MessageInfo} from '../utils/interfaces';

const SET_USER = 'app/SET_USER' as const;
const SET_CURRENT_PATH = 'app/SET_CURRENT_PATH' as const;
const SET_ALERTS = 'app/SET_ALERTS' as const;
const PUSH_MSG = 'app/PUSH_MSG' as const;
const SHIFT_MSG = 'app/SHIFT_MSG' as const;

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
export const pushMsg = (arg: JSX.Element)=> ({ 
    type : PUSH_MSG,
    payload: arg
});
export const shiftMsg = ()=> ({ 
    type : SHIFT_MSG,
});

type actionType = 
    | ReturnType<typeof setUser>
    | ReturnType<typeof setCurrentPath>
    | ReturnType<typeof setAlerts>
    | ReturnType<typeof pushMsg>
    | ReturnType<typeof shiftMsg>

type stateType = {
    currentUser: User | null
    currentPath: string
    alerts: Alert[]
    messageList: JSX.Element[]
}

const initState: stateType = {
    currentUser: null,
    currentPath: '',
    alerts: [],
    messageList: []
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
        case PUSH_MSG:
            const newList = state.messageList.slice().map(el => ({...el}));
            newList.shift();
            newList.push(action.payload);
            return {
                ...state,
                messageList: newList
            };
        case SHIFT_MSG:
            const temp = state.messageList.slice().map(el => ({...el}));
            temp.shift();
            return {
                ...state,
                messageList: temp
            };
        default:
            return state;
  }
}

export default app;