import {createStore} from 'redux'
import Reducer from '../Reducer/Reducer'
import {userReducer} from '../ActionReducer/user'



const store = createStore(userReducer)
export default store