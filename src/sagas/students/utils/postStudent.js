import studentAPI from "../../../api/studentAPI";


export default function postStudent(data) {
  return studentAPI.post(`student`, data);
}
