import studentAPI from "../../../api/studentAPI";


export default function getStudent(id) {
  return studentAPI.get(`students/${id}`);
}
