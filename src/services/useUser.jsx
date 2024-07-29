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

  const apiUrl = (type) => (type === 1 ? "api/Employees" : "api/users");

  const createUser = async (newUser, type = 1) => {
    try {
      let url = apiUrl(type);
      if (url === "api/users") {
        url = "api/accounts/signUp";
      }
      const token = Cookies.get("token");
      const response = await axios.post(url, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        return {
          message: response.data.responseStatus.responseMessage,
          type: "success",
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.post(apiUrl(type), newUser, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          if (response.data.responseStatus.responseCode === 200) {
            return {
              message: response.data.responseStatus.responseMessage,
              type: "success",
            };
          }
        } catch (refreshError) {
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
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
    }
  };

  const updateUser = async (id, updatedUser, type = 1) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.put(`${apiUrl(type)}/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        return {
          message: response.data.responseStatus.responseMessage,
          type: "success",
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.put(
            `${apiUrl(type)}/${id}`,
            updatedUser,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          if (response.data.responseStatus.responseCode === 200) {
            return {
              message: response.data.responseStatus.responseMessage,
              type: "success",
            };
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

  const deleteUser = async (id, type = 1) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(`${apiUrl(type)}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        return {
          message: response.data.responseStatus.responseMessage,
          type: "success",
        };
      }
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.delete(`${apiUrl(type)}/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          if (response.data.responseStatus.responseCode === 200) {
            return {
              message: response.data.responseStatus.responseMessage,
              type: "success",
            };
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

  const findById = async (id, type = 1) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${apiUrl(type)}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetail(response.data.responseData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.get(`${apiUrl(type)}/${id}`, {
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
