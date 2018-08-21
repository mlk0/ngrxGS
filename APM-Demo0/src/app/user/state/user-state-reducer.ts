export function UserStateReducer(state, action) {
    switch (action.type) {
        case 'MASK_USER_NAME':
            let newState = {
                ...state,
                maskUserName : action.payload
            }
            return newState;
        default:
            return state;
    }
}
