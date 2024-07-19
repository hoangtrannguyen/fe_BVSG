import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(
    (page, pageSize, fullName, nameEnglish, citizenId) => {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (fullName) queryParams.append("FullName", fullName);
      if (nameEnglish) queryParams.append("NameEnglish", nameEnglish);
      if (citizenId) queryParams.append("CitizenId", citizenId);

      queryParams.append("PageNumber", page);
      queryParams.append("PageSize", pageSize);

      axios
        .get(`api/Employees?${queryParams.toString()}`)
        .then((response) => {
          setData(response.data.responseData);
          setTotal(response.data.responseTotal);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    },
    []
  );

  const createUser = (newUser) => {
    axios
      .post("api/Employees", newUser)
      .then((response) => {
        setData([...data, response.data.responseData]);
      })
      .catch((error) => setError(error));
  };

  const updateUser = (id, updatedUser) => {
    axios
      .put(`api/Employees/${id}`, updatedUser)
      .then((response) => {
        console.log("aaaaa");
        setData(data.map((user) => (user.id === id ? updatedUser : user)));
      })
      .catch((error) => setError(error));
  };

  const deleteUser = (id) => {
    axios
      .delete(`api/Employees/${id}`)
      .then(() => {
        setData(data.filter((user) => user.id !== id));
      })
      .catch((error) => setError(error));
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
  };
}

export default FetchData;
