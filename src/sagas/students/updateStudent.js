import { call, put } from "redux-saga/effects";

import patchStudent from "./utils/patchStudent";
import {setSelectedStudent} from "../../actions/studentsActions";

export default function* updateStudent({ id, data }) {
  try {
    const student = (yield call(patchStudent, id, data)).data;
    yield put(setSelectedStudent(student));
  } catch (e) {
    console.error("Error when updating student", e);
  }
}
