const defaultState = {
    height: 700
}

const CHANGE_FRAME_HEIGHT = "CHANGE_INPUT_VALUE"

export function chatFrameHeightReducer (state = defaultState, action) {
    switch (action.type) {
        case CHANGE_FRAME_HEIGHT:
            return {...state, height: action.payload}
        default: return state
    }
}

export function changeChatFrameHeightAction (payload) {
    return ({type: CHANGE_FRAME_HEIGHT, payload})
}
