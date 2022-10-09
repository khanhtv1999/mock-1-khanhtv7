import { Cascader, Image, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRoles,
  setName,
  setEmail,
  updateUser,
} from "../../features/user/userSlice";

const ModalUpdateUser = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { userById, user } = useSelector((store) => store.user);
  const optionsRole = [
    {
      label: "User",
      value: "user",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];
  const handleCancel = () => {
    setOpen(false);
  };
  const myHandleChangeName = (e) => {
    dispatch(setName(e.target.value));
  };
  const myHandleChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };
  const onChange = (value) => {
    let role = [];
    if (value.length === 1) {
      role = [...value[0]];
    } else {
      value.forEach((el) => {
        role.push(el[0]);
      });
    }
    console.log(role);
    dispatch(setRoles(role));
  };
  const handleOk = () => {
    console.log(
      user.access_token,
      userById.email,
      userById.name,
      userById.roles,
      userById.id
    );
    dispatch(
      updateUser({
        token: user.access_token,
        email: userById.email,
        name: userById.name,
        roles: userById.roles,
        id: userById.id,
      })
    );
  };
  return (
    <>
      <Modal
        title="Update User Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        // confirmLoading={statusUpdateUser}
      >
        <>
          <Input
            id="email"
            name="email"
            label="Email"
            placeholder="Enter email"
            onChange={myHandleChangeEmail}
            value={userById.email}
          />
          <Input
            id="name"
            name="name"
            label="Name"
            placeholder="Enter name"
            style={{ marginTop: "10px" }}
            value={userById.name}
            onChange={myHandleChangeName}
          />

          <Cascader
            name="roles"
            placeholder="Roles"
            options={optionsRole}
            onChange={onChange}
            multiple
            maxTagCount="responsive"
            defaultValue={userById.roles.map((item) => [item])}
            style={{ marginTop: "10px", width: "100%" }}
          />
        </>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
