import { createSelector } from "reselect";

export const getStudents = state => state.get("students");

export const getStudentsData = createSelector(getStudents, students => students.get('studentsData'));
export const getSelectedStudent = createSelector(getStudents, students => students.get('selectedStudent'));
