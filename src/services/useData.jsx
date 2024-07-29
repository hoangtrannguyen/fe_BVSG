import { useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./useAuth";
import { useSnackBar } from "./useSnackBar";

export function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { refreshToken } = useAuth();
  const { showSnackbar } = useSnackBar();

  const fetchData = useCallback(
    async (page = 1, type = 2, pageSize = 10, searchParams = {}) => {
      setLoading(true);

      const url = type === 1 ? "api/Employees" : "api/users";

      const query = new URLSearchParams({
        ...searchParams,
        PageNumber: page,
        PageSize: pageSize,
      }).toString();

      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${url}?${query}`, {
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
            const response = await axios.get(`${url}?${query}`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            setData(response.data.responseData);
            setTotal(response.data.responseTotal);
          } catch (refreshError) {
            showSnackbar(
              "An error occurred while refreshing the token.",
              "error"
            );
          }
        } else {
          showSnackbar("An error occurred while fetching data.", "error");
        }
      } finally {
        setLoading(false);
      }
    },
    [refreshToken, showSnackbar]
  );

  return { data, loading, total, fetchData };
}
