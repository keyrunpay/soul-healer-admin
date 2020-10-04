import { createStore, combineReducers, compose } from "redux";
import { makeReducer } from "redux-helper-np";

const allReducer = combineReducers({
  system: makeReducer("system", { token: null, accessibleRoutes: null, operations: null, name: null }),
  admin: makeReducer("admin"),
  list: makeReducer("list"),
  subList: makeReducer("subList"),
  sales: makeReducer("sales"),
  bot_pending: makeReducer("bot_pending"),
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const store = createStore(allReducer, enhancer);

export default store;
