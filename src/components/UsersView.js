import React, {useEffect, useState} from 'react';
import UsersTable from "./UsersTable";
import UsersFilters from "./UsersFilters";
import contactsApi from "../api/contactApi";
import {CircularProgress} from "@material-ui/core";

function UsersView() {
  const [users, setUsers] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  useEffect(() => {
    setIsRequestInProgress(true);
    contactsApi(selectedNationality, selectedGender).then(response => {
      setUsers(response.data.results);
      setIsRequestInProgress(false);
    });
  }, [selectedNationality, selectedGender])

  const handleChangeNationality = event => {
    setSelectedNationality(event.target.value);
  }

  const handleChangeGender = event => {
    setSelectedGender(event.target.value);
  }

  return (
    <div>
      <UsersFilters
        selectedNationality={selectedNationality}
        selectedGender={selectedGender}
        handleChangeNationality={handleChangeNationality}
        handleChangeGender={handleChangeGender}
      />
      {isRequestInProgress ? <CircularProgress /> :
        <UsersTable users={users} />
      }
    </div>
  );
}

export default UsersView;
