import { combineReducers } from "redux-immutable";

import students from "./studentsReducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    students,
  });

export default createRootReducer;
