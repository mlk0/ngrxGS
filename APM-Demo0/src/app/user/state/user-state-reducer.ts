import { User } from "../user";
import * as fromUserActions from './user-actions'


export interface UserState {
    maskUserName: boolean,
    currentUser: User
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
}

export function UserStateReducer(state: UserState = initialState, action: fromUserActions.UserActions): UserState {

    console.log(`UserStateReducer - responding to action : ${JSON.stringify(action)}`);
    console.log(`UserStateReducer - the original state : ${JSON.stringify(state)}`);

    switch (action.type) {
        // case 'MASK_USER_NAME':
        //     let newState = {
        //         ...state,
        //         maskUserName : action.payload
        //     }

        //     console.log(`UserStateReducer - the newState state : ${JSON.stringify(newState)}`);

        //     return newState;


        case fromUserActions.UserActionTypes.MaskUserName: {
            return {
                ...state,
                maskUserName: action.payload
            }
        }
        default:
            return state;
    }
}
