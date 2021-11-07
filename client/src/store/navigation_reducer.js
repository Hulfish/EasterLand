const defaultState = {
    isHome: false
}

const SET_IS_HOME = "SET_IS_HOME"

export function navigationReducer (state = defaultState, action) {
    switch (action.type) {
        case SET_IS_HOME:
            return {...state, isHome: action.payload}

        default: return state
    }
}

export function setIsHomeAction (payload) {
    return ({type: SET_IS_HOME, payload})
}