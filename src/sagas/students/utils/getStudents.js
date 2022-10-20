import studentAPI from "../../../api/studentAPI";


export default function getStudents() {
  return studentAPI.get("students");
}
