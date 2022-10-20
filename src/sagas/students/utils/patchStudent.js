import studentAPI from "../../../api/studentAPI";


export default function patchStudent(id, data) {
  return studentAPI.patch(`student/${id}`, data);
}
