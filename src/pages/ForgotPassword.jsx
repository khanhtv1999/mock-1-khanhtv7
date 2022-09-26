import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/user/userSlice";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(email);
    dispatch(forgotPassword({ email }));
  };
  return (
    <div className="container-forgot">
      <form className="container-form">
        <h1 className="title-large-forgot">Forgot password</h1>
        <div className="container-title-form">
          <div>
            <p className="title-small-forgot">
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </p>
          </div>

          <label className="label-forgot">Please enter email</label>
          <input
            className="input-forgot"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleClick} variant="contained">
            Reset password
          </Button>
          <div className="container-line">
            <hr className="line" />
            <a className="text-footer">Remember your password?</a>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
