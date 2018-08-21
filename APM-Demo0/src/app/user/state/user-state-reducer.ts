export function UserStateReducer(state, action) {

    console.log(`UserStateReducer - responding to action : ${JSON.stringify(action)}`);
    console.log(`UserStateReducer - the original state : ${JSON.stringify(state)}`);

    switch (action.type) {
        case 'MASK_USER_NAME':
            let newState = {
                ...state,
                maskUserName : action.payload
            }

            console.log(`UserStateReducer - the newState state : ${JSON.stringify(newState)}`);

            return newState;
        default:
            return state;
    }
}
