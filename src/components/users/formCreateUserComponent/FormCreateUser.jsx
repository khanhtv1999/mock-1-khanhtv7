import styled from "styled-components";
import { useState } from "react";
import { Input, Button, Cascader } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../features/user/addUserSlice";
const validationSchema = yup.object({
  email: yup.string("Enter your phone").required("Email is required"),
  name: yup.string("Enter your name").required("Your name is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Roles = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];
const FormCreateUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [creatRole, setCreatRole] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
  });
  const handleAdd = (values) => {
    let roleSubmit = [];
    if (creatRole.length < 1) {
      toast.warning("please enter role");
      return;
    }
    if (creatRole.length === 1) {
      roleSubmit = [...creatRole[0]];
    } else {
      creatRole.forEach((item) => {
        roleSubmit.push(item[0]);
      });
    }

    dispatch(
      createUser({
        token: user.access_token,
        email: values.email,
        name: values.name,
        password: values.password,
        roles: roleSubmit,
      })
    );
    setTimeout(() => {
      formik.resetForm();
    }, 1500);
  };
  const myHandleChange = (event) => {
    formik.handleChange(event);
  };
  const onChange = (value) => {
    console.log(value);
    setCreatRole(value);
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>Create User</h3>
        <div form-center>
          <h5>Email</h5>
          <Input
            value={formik.values.email}
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={myHandleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography style={{ color: "red" }}>
              {formik.errors.email}
            </Typography>
          )}
          <h5>Name</h5>
          <Input
            value={formik.values.name}
            id="name"
            name="name"
            placeholder="Enter name"
            onChange={myHandleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <Typography style={{ color: "red" }}>
              {formik.errors.name}
            </Typography>
          )}
          <h5>Password</h5>
          <Input.Password
            value={formik.values.password}
            onChange={myHandleChange}
            id="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password && (
            <Typography style={{ color: "red" }}>
              {formik.errors.password}
            </Typography>
          )}
          <h5>Roles</h5>
          <Cascader
            name="roles"
            placeholder="Roles"
            options={Roles}
            onChange={onChange}
            multiple
            maxTagCount="responsive"
          />
          <br />
          <Button
            onClick={formik.handleSubmit}
            style={{ marginTop: "20px" }}
            type="primary"
          >
            Create Question
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};
export default FormCreateUser;
const Wrapper = styled.section`
  .form {
    width: 80%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
    grid-column-gap: 2rem;
  }
  h5 {
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 3rem;
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
