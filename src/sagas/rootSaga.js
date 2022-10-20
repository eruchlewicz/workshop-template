import { all, takeEvery } from "redux-saga/effects";

import * as types from "../constants/actionTypes";
import fetchStudents from "./students/fetchStudents";
import fetchStudent from "./students/fetchStudent";
import updateStudent from "./students/updateStudent";
import addStudent from "./students/addStudent";

export default function* rootSaga() {
  yield all([takeEvery(types.fetchStudents, fetchStudents)]);
  yield all([takeEvery(types.fetchStudent, fetchStudent)]);
  yield all([takeEvery(types.updateStudent, updateStudent)]);
  yield all([takeEvery(types.addStudent, addStudent)]);
}
