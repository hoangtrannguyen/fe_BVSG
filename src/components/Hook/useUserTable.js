import { useState, useEffect } from "react";
import FetchData from "../../services/employee/crud";
import { useMediaQuery } from "@mui/material";

const useUserTable = (initialSearchFields, initialNewUser) => {
  const {
    data,
    total,
    fetchData,
    createUser,
    updateUser,
    deleteUser,
    exportUser,
    findById,
    userDetail,
    SnackbarComponent,
  } = FetchData();

  const [openF, setOpenF] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [newUser, setNewUser] = useState(initialNewUser);

  const [isEditMode, setIsEditMode] = useState(false);
  const [searchFields, setSearchFields] = useState(initialSearchFields);

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [triggerFetch, setTriggerFetch] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    findById(user.id);
    setIsEditMode(true);
    setOpen(true);
  };

  useEffect(() => {
    if (userDetail) {
      setNewUser(userDetail);
    }
  }, [userDetail]);

  const handleFindChange = (e, fieldName) => {
    setSearchFields((prevFields) =>
      prevFields.map((field) =>
        field.name === fieldName ? { ...field, value: e.target.value } : field
      )
    );
  };

  const handleCreate = () => {
    createUser(newUser);
    resetUser();
    setOpen(false);
    setTriggerFetch(true);
  };

  const handleUpdate = (id) => {
    updateUser(id, newUser);
    resetUser();
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
    if (triggerFetch) {
      fetchData(page, rowsPerPage, getSearchParams(searchFields));
      setTriggerFetch(false);
    }
  }, [fetchData, page, rowsPerPage, searchFields, triggerFetch]);

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        setTriggerFetch(true);
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
    resetUser();
  };

  const resetUser = () => {
    setNewUser({
      fullName: "",
      nameEnglish: "",
      citizenId: "",
      email: null,
      picture: "",
      dateStartWork: null,
      permanentAddresses: "",
      temporaryAddress: "",
      dateOfBirth: null,
      gender: "",
      bloodGroup: "",
      phone: "",
      phoneOther: "",
      maritalStatus: "",
      militaryClass: "",
      militaryTime: "",
      license: "",
      contact: "",
      academicLevel: "",
      language: "",
      otherExpertise: "",
      familyStatus: "",
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
