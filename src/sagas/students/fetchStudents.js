import { call, put } from "redux-saga/effects";

import getStudents from "./utils/getStudents";
import {setStudents} from "../../actions/studentsActions";

export default function* fetchStudents() {
  try {
    const students = (yield call(getStudents)).data;
    yield put(setStudents(students));
  } catch (e) {
    console.error("Error when fetching students", e);
  }
}
