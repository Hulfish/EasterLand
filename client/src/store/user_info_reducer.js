const defaultState = {
    username: "",
    user_school: "",
    user_country: "",
    user_city: "",
    user_relationships: ""
}

const SET_USER_SCHOOL = "SET_USER_SCHOOL" 
const SET_USER_NAME = "SET_USER_NAME" 
const SET_USER_COUNTRY = "SET_USER_COUNTRY" 
const SET_USER_CITY = "SET_USER_CITY" 
const SET_USER_RELATIONSHIPS = "SET_USER_RELATIONSHIPS" 
const SET_ALL_PARAMS = "SET_ALL_PARAMS"

export function userInfoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER_NAME: 
            return {...state, username: action.payload}
        case SET_USER_SCHOOL: 
            return {...state, user_school: action.payload}
        case SET_USER_COUNTRY:
            return {...state, user_country: action.payload }
        case SET_USER_CITY:
            return {...state, user_city: action.payload }
        case SET_USER_RELATIONSHIPS:
            return {...state, user_relationships: action.payload }
        case SET_ALL_PARAMS: 
            const {school, city, country, relationships} = action.payload
            // console.log("ACTION_PAYLOAD: ", action.payload)
            return {
                ...state, 
                user_country: country,
                user_city: city,
                user_school: school,
                user_relationships: relationships,
            }
        default: return state
    }
}

export function setUserNameAction(payload) {
    return {type: SET_USER_NAME, payload}
}
export function setUserCountryAction(payload) {
    return {type: SET_USER_COUNTRY, payload}
}
export function setUserCityAction(payload) {
    return {type: SET_USER_CITY, payload}
}
export function setUserRelationshipsAction(payload) {
    return {type: SET_USER_RELATIONSHIPS, payload}
}

export function setUserSchoolAction (payload) {
    return {type: SET_USER_SCHOOL, payload}
}

export function setAllParamsAction (payload) {
    return {type: SET_ALL_PARAMS, payload}
}