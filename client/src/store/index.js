import { combineReducers, createStore} from "redux"
import { navigationReducer } from "./navigation_reducer"
import { userInfoReducer } from "./user_info_reducer"
import { composeWithDevTools } from "redux-devtools-extension";
import { chatFrameHeightReducer } from "./chat_frame_height_reducer";
import { langModeReducer } from "./lang_mode_reducer";

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    navigation: navigationReducer,
    chatFrame: chatFrameHeightReducer,
    lang: langModeReducer
})

export const store = createStore(rootReducer, composeWithDevTools())