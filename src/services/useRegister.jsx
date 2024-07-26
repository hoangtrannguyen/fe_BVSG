import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const signUpUser = async (signupData) => {
    try {
      const response = await axios.post("/api/Accounts/SignUp", signupData);
      if (response.data.responseStatus.responseCode === 200) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return {
          message: response.data.responseStatus.responseMessage,
          type: "success",
        };
      } else {
        return {
          message: response.data.responseStatus.responseMessage,
          type: "error",
        };
      }
    } catch (error) {
      return {
        message: error.response
          ? error.response.data.responseStatus.responseMessage
          : "Sign up failed",
        type: "error",
      };
    }
  };

  return { signUpUser };
}
