const defaultState = {
    lang: "RU"
}

const SET_LANG_RU = "SET_LANG_RU"
const SET_LANG_EN = "SET_LANG_EN"
const SET_LANG_TURN = "SET_LANG_TURN"

export function langModeReducer (state = defaultState, action) {
    switch (action.type) {
        case SET_LANG_RU:
            return {...state, lang: "RU"}
        case SET_LANG_EN: 
            return {...state, lang: "EN"}
        case SET_LANG_TURN:
            return {...state, lang: state.lang === "EN" ?  "RU" : "EN"}
        default: return state
    }
}

export function setTurnLangAction (payload) {
    return ({type: SET_LANG_TURN, payload})
}

