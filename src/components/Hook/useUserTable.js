import { useState, useEffect } from "react";
import { useData } from "../../services/useData";
import { useUser } from "../../services/useUser";
import { useExport } from "../../services/useExport";
import { useSnackBar } from "../../services/useSnackBar";
import { useMediaQuery } from "@mui/material";

const useUserTable = (initialSearchFields, initialNewUser, url_des) => {
  const { data, total, fetchData } = useData();
  const { userDetail, createUser, updateUser, deleteUser, findById } =
    useUser();
  const { exportUser } = useExport();
  const { SnackbarComponent, showSnackbar } = useSnackBar();
  const [openF, setOpenF] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState(initialNewUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchFields, setSearchFields] = useState(initialSearchFields);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [triggerFetch, setTriggerFetch] = useState(true);
  const url = url_des;
  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value }, url);
  };

  const handleEdit = (user) => {
    findById(user.id, url);
    setIsEditMode(true);
    setOpen(true);
  };

  useEffect(() => {
    if (userDetail) {
      setNewUser(userDetail, url);
    }
  }, [userDetail]);

  const handleFindChange = (e, fieldName) => {
    setSearchFields((prevFields) =>
      prevFields.map((field) =>
        field.name === fieldName ? { ...field, value: e.target.value } : field
      )
    );
  };

  const handleCreate = async () => {
    try {
      const alert = await createUser(newUser, url);
      showSnackbar(alert.message, alert.type);
    } catch (error) {
      showSnackbar(error.message, error.type);
    }
    resetUser(initialNewUser);
    setOpen(false);
    setTriggerFetch(true);
  };

  const handleUpdate = async (id) => {
    const alert = await updateUser(id, newUser, url);
    showSnackbar(alert.message, alert.type);
    resetUser(initialNewUser);
    setIsEditMode(false);
    setOpen(false);
    setTriggerFetch(true);
  };

  const getSearchParams = (fields) => {
    return fields.reduce((params, field) => {
      if (field.value.trim()) {
        params[field.name] = field.value;
      }
      return params;
    }, {});
  };

  const handleFind = () => {
    setPage(1);
    setTriggerFetch(true);
  };

  const handleResetFindUser = () => {
    resetFindUser();
    setTriggerFetch(true);
  };

  const handleExport = () => {
    exportUser(getSearchParams(searchFields));
  };

  useEffect(() => {
    console.log(url);
    if (triggerFetch) {
      fetchData(page, url, rowsPerPage, getSearchParams(searchFields));
      setTriggerFetch(false);
    }
  }, [fetchData, page, rowsPerPage, searchFields, triggerFetch]);

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const alert = await deleteUser(userToDelete.id, url);
        setTriggerFetch(true);
        showSnackbar(alert.message, alert.type);
        handleCloseF();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClickOpenF = (user) => {
    setUserToDelete(user);
    setOpenF(true);
  };

  const handleCloseF = () => {
    setOpenF(false);
    setUserToDelete(null);
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    resetUser(initialNewUser);
  };

  const resetUser = (initialNewUser) => {
    setNewUser((prevState) => {
      const resetState = Object.keys(initialNewUser).reduce((acc, key) => {
        acc[key] = initialNewUser[key];
        return acc;
      }, {});

      return resetState;
    });
  };

  const resetFindUser = () => {
    setSearchFields((prevFields) =>
      prevFields.map((field) => ({ ...field, value: "" }))
    );
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setTriggerFetch(true);
  };

  const handleSwitchChange = (event) => {
    handleChange({
      target: {
        name: event.target.name,
        value: event.target.checked ? "Married" : "Single",
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
    setTriggerFetch(true);
  };

  return {
    data,
    total,
    page,
    rowsPerPage,
    searchFields,
    newUser,
    isEditMode,
    open,
    openF,
    SnackbarComponent,
    handleCreate,
    handleFindChange,
    handleEdit,
    handleChange,
    isSmallScreen,
    handleClickOpenF,
    handleChangeRowsPerPage,
    handleSwitchChange,
    handleChangePage,
    handleClose,
    handleClickOpen,
    handleDelete,
    handleExport,
    handleResetFindUser,
    handleFind,
    handleUpdate,
    handleCloseF,
  };
};

export default useUserTable;
