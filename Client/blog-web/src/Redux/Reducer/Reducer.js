import { combineReducers } from 'redux'

import {userReducer} from '../ActionReducer/user'

const CombineReducer = combineReducers({userReducer})
export default CombineReducer