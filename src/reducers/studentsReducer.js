import { fromJS } from "immutable";
import * as types from "../constants/actionTypes";

const initialState = fromJS({
  studentsData: [],
  selectedStudent: {},
});

export default function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.setStudents:
      return state.set('studentsData', fromJS(action.value));
    case types.setSelectedStudent:
      return state.set('selectedStudent', fromJS(action.selectedStudent)).set(
        'studentsData', state.get('studentsData').map(student => {
          if (student.get('id') === action.selectedStudent.id) {
            return fromJS(action.selectedStudent);
          }
          return student;
        })
      );
    default:
      return state;
  }
}
