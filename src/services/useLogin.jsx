import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("api/Accounts/SignIn", {
        email,
        password,
      });
      if (response.data.responseStatus.responseCode === 200) {
        const token = response.data.responseData.token;
        const refreshToken = response.data.responseData.refreshToken;
        Cookies.set("token", token);
        Cookies.set("refresh_token", refreshToken);
        Cookies.set("user", response.data.responseData.fullName);
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
          type: "success",
        };
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.responseStatus
      ) {
        return {
          message: error.response.data.responseStatus.responseMessage,
          type: "error",
        };
      }
    }
  };

  return { loginUser };
}
