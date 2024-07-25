import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./useAuth";
import { useSnackBar } from "./useSnackBar";

export function useUser() {
  const [userDetail, setUserDetail] = useState(null);
  const [user, setUser] = useState(null);
  const { refreshToken } = useAuth();
  const { showSnackbar } = useSnackBar();

  const createUser = async (newUser) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post("api/Employees", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        showSnackbar(response.data.responseStatus.responseMessage);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.post("api/Employees", newUser, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          if (response.data.responseStatus.responseCode === 200) {
            showSnackbar(response.data.responseStatus.responseMessage);
          }
        } catch (refreshError) {
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
        showSnackbar("An error occurred while creating the user.", "error");
      }
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.put(`api/Employees/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        showSnackbar(response.data.responseStatus.responseMessage);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.put(`api/Employees/${id}`, updatedUser, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          if (response.data.responseStatus.responseCode === 200) {
            showSnackbar(response.data.responseStatus.responseMessage);
          }
        } catch (refreshError) {
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
        showSnackbar("An error occurred while updating the user.", "error");
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(`api/Employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        showSnackbar(response.data.responseStatus.responseMessage);
      }
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.delete(`api/Employees/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          if (response.data.responseStatus.responseCode === 200) {
            showSnackbar(response.data.responseStatus.responseMessage);
          }
          return response;
        } catch (refreshError) {
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
        showSnackbar("An error occurred while deleting the user.", "error");
      }
    }
  };

  const findById = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`api/Employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetail(response.data.responseData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.get(`api/Employees/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setUserDetail(response.data.responseData);
        } catch (refreshError) {
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
        showSnackbar("An error occurred while fetching user details.", "error");
      }
    }
  };

  return { userDetail, user, createUser, updateUser, deleteUser, findById };
}
