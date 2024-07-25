import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [userDetail, setUserDetail] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleError = (error) => {
    let errorMessage = "An unexpected error occurred.";

    if (error.response) {
      const responseStatus = error.response.data?.ResponseStatus || {};
      const responseData = error.response.data?.ResponseData || [];

      if (responseStatus.ResponseMessage) {
        errorMessage = responseStatus.ResponseMessage;
      } else if (responseData.length > 0) {
        errorMessage = responseData.map((item) => item.ErrorMessage).join(", ");
      } else {
        errorMessage =
          error.response.data?.message || error.response.statusText;
      }
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message;
    }

    setSnackbarMessage(errorMessage);
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

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
      handleError(error);
      throw error;
    }
  };

  const fetchData = useCallback(async (page, pageSize, searchParams) => {
    setLoading(true);

    const query = new URLSearchParams({
      ...searchParams,
      PageNumber: page,
      PageSize: pageSize,
    }).toString();

    try {
      const token = Cookies.get("token");
      const response = await axios.get(`api/Employees?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.responseData);
      setTotal(response.data.responseTotal);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.get(`api/Employees?${query}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setData(response.data.responseData);
          setTotal(response.data.responseTotal);
        } catch (refreshError) {
          handleError(refreshError);
        }
      } else {
        handleError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (newUser) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post("api/Employees", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.responseStatus.responseCode === 200) {
        handleSuccess(response.data.responseStatus.responseMessage);
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
            handleSuccess(response.data.responseStatus.responseMessage);
          }
        } catch (refreshError) {
          handleError(refreshError);
        }
      } else {
        handleError(error);
      }
    }
  };

  const exportUser = async (searchParams) => {
    setLoading(true);
    const query = new URLSearchParams(searchParams).toString();
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `api/Employees/export?${query}`,
        {},
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const disposition = response.headers["content-disposition"];
      const filename = disposition
        ? disposition.split(";")[1].trim().split("=")[1].replace(/"/g, "")
        : "download.xlsx";
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          const response = await axios.post(
            `api/Employees/export?${query}`,
            {},
            {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );

          const disposition = response.headers["content-disposition"];
          const filename = disposition
            ? disposition.split(";")[1].trim().split("=")[1].replace(/"/g, "")
            : "download.xlsx";
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        } catch (refreshError) {
          handleError(refreshError);
        }
      } else {
        handleError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const findById = async (id) => {
    setLoading(true);
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
          handleError(refreshError);
        }
      } else {
        handleError(error);
      }
    } finally {
      setLoading(false);
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
        setData((prevData) =>
          prevData.map((user) => (user.id === id ? updatedUser : user))
        );
        handleSuccess(response.data.responseStatus.responseMessage);
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
            setData((prevData) =>
              prevData.map((user) => (user.id === id ? updatedUser : user))
            );
            handleSuccess(response.data.responseStatus.responseMessage);
          }
        } catch (refreshError) {
          handleError(refreshError);
        }
      } else {
        handleError(error);
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
        handleSuccess(response.data.responseStatus.responseMessage);
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
            handleSuccess(response.data.responseStatus.responseMessage);
          }
          return response;
        } catch (refreshError) {
          handleError(refreshError);
        }
      } else {
        handleError(error);
      }
    }
  };

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
        handleSuccess(response.data.responseStatus.responseMessage);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return {
    data,
    loading,
    error,
    total,
    createUser,
    updateUser,
    deleteUser,
    fetchData,
    findById,
    exportUser,
    userDetail,
    loginUser,
    user,
    SnackbarComponent: (
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    ),
  };
}

export default FetchData;
