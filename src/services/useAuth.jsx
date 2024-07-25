import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export function useAuth() {
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refresh_token");
      const response = await axios.post("api/Accounts/Refresh", {
        refreshToken,
      });
      const newToken = response.data.responseData.token;
      Cookies.set("token", newToken);
      return newToken;
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      Cookies.remove("user");
      navigate("/login");
      throw error;
    }
  };

  return { refreshToken };
}
