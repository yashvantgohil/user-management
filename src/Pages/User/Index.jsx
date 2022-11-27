import React, { useEffect, useState } from "react";
import AddEditUser from "./AddEditUser";
import { UserListing } from "./UserListing";
import { Modal } from "../../Components/Modal";
import { userTableColumns } from "../../Utils/users";
import usersData from "../../Data/users.json";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    let usersList = localStorage.getItem("users");
    if (usersList) usersList = JSON.parse(usersList);
    if (usersList && usersList.length > 0) {
      setUsers(usersList);
    } else {
      setUsers(usersData);
      localStorage.setItem("users", JSON.stringify(usersData));
    }
  }, []);

  const setUsersLocally = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    const newUsers = [...users];
    if (id) {
      const updateUser = newUsers.find((x) => x.id === id);
      updateUser.name = name;
      updateUser.phone = phone;
      updateUser.gender = gender;
      updateUser.newsletter = newsletter;
    } else {
      newUsers.push({
        id: Math.random().toString(16).slice(2),
        name,
        phone,
        gender,
        newsletter,
      });
    }
    setUsers(newUsers);
    setUsersLocally(newUsers);
  };

  const handleAddUser = () => {
    setId("");
    setName("");
    setPhone("");
    setNewsletter("");
    setGender("");
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const editUser = users.find((x) => x.id === id);
    if (editUser) {
      setId(editUser.id);
      setName(editUser.name);
      setPhone(editUser.phone);
      setNewsletter(editUser.newsletter);
      setGender(editUser.gender);
      setModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((x) => x.id !== id);
    setUsers(updatedUsers);
    setUsersLocally(updatedUsers);
  };

  return (
    <>
      <div className="title">
        <p>User Management</p>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <UserListing
        columns={userTableColumns}
        rows={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isModalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <AddEditUser
          onSubmit={handleSubmit}
          {...{
            id,
            name,
            phone,
            gender,
            newsletter,
            setId,
            setName,
            setPhone,
            setGender,
            setNewsletter,
          }}
        />
      </Modal>
    </>
  );
};

export default Index;
