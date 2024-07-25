import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./useAuth";
import { useSnackBar } from "./useSnackBar";

export function useExport() {
  const [loading, setLoading] = useState(false);
  const { refreshToken } = useAuth();
  const { showSnackbar } = useSnackBar();

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
          showSnackbar(
            "An error occurred while refreshing the token.",
            "error"
          );
        }
      } else {
        showSnackbar("An error occurred while exporting data.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, exportUser };
}
