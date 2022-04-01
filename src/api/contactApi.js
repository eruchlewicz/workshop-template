import axios from 'axios';

const contactsApiInstance = axios.create({
    baseURL: 'https://randomuser.me/api/',
  });

const contactsApi = (nat='', gender='') =>
contactsApiInstance.get(`?format=json&results=20&inc=name,picture,email,cell,gender,nat&nat=${nat}&gender=${gender}`);

export default contactsApi;
