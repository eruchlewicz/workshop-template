import { call, put } from "redux-saga/effects";

import postStudent from "./utils/postStudent";
import {setSelectedStudent} from "../../actions/studentsActions";

export default function* addStudent({ data }) {
  try {
    const student = (yield call(postStudent, data)).data;
    yield put(setSelectedStudent(student));
  } catch (e) {
    console.error("Error when adding student", e);
  }
}
