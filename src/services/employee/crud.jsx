import React, { useState, useCallback } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [userDetail, setUserDetail] = useState(null);

  const handleError = (error) => {
    console.log(error);
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

  const fetchData = useCallback(
    async (page, pageSize, fullName, nameEnglish, citizenId) => {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (fullName) queryParams.append("FullName", fullName);
      if (nameEnglish) queryParams.append("NameEnglish", nameEnglish);
      if (citizenId) queryParams.append("CitizenId", citizenId);

      queryParams.append("PageNumber", page);
      queryParams.append("PageSize", pageSize);

      try {
        const response = await axios.get(
          `api/Employees?${queryParams.toString()}`
        );
        setData(response.data.responseData);
        setTotal(response.data.responseTotal);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createUser = async (newUser) => {
    try {
      const response = await axios.post("api/Employees", newUser);
      if (response.data.responseStatus.responseCode === 200) {
        setData((prevData) => [...prevData, response.data.responseData]);
        handleSuccess(response.data.responseStatus.responseMessage);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const findById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`api/Employees/${id}`);
      setUserDetail(response.data.responseData);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`api/Employees/${id}`, updatedUser);
      if (response.data.responseStatus.responseCode === 200) {
        setData((prevData) =>
          prevData.map((user) => (user.id === id ? updatedUser : user))
        );
        handleSuccess(response.data.responseStatus.responseMessage);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`api/Employees/${id}`);
      if (response.data.responseStatus.responseCode === 200) {
        handleSuccess(response.data.responseStatus.responseMessage);
      }
      return response;
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
    userDetail,
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
