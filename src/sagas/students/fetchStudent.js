import { call, put } from "redux-saga/effects";

import getStudent from "./utils/getStudent";
import {setSelectedStudent} from "../../actions/studentsActions";

export default function* fetchStudent({ id }) {
  try {
    const student = (yield call(getStudent, id)).data;
    yield put(setSelectedStudent(student));
  } catch (e) {
    console.error("Error when fetching student", e);
  }
}
