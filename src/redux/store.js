import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
const initialState={};


const devTools = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose



const middleware = [thunk];
 const store = createStore(
     rootReducer,
     initialState,
     compose(
         applyMiddleware(...middleware),
         devTools
     ))

export default store;