import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useSnackBar } from "./useSnackBar";

export function useLogin() {
  const navigate = useNavigate();
  const { refreshToken } = useAuth();
  const { showSnackbar } = useSnackBar();

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
        showSnackbar(response.data.responseStatus.responseMessage);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      showSnackbar("An error occurred while logging in.", "error");
    }
  };

  return { loginUser };
}
