import * as types from "../constants/actionTypes";

export const setStudents = value => ({
  type: types.setStudents,
  value,
});

export const fetchStudents = () => ({
  type: types.fetchStudents,
});

export const fetchStudent = id => ({
  type: types.fetchStudent,
  id
});

export const updateStudent = (id, data) => ({
  type: types.updateStudent,
  id,
  data
});

export const addStudent = data => ({
  type: types.addStudent,
  data
});

export const setSelectedStudent = selectedStudent => ({
  type: types.setSelectedStudent,
  selectedStudent
});
