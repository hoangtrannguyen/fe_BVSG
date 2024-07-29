import React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CrudPermissions = ({ tableName, roles, setRoles }) => {
  const permissions = ["CREATE", "READ", "UPDATE", "DELETE"];

  const handleChange = (event) => {
    const { name, checked } = event.target;
    let updatedRoles = [...roles];

    if (checked) {
      const role = `${tableName}_${name}`;
      if (!updatedRoles.includes(role)) {
        updatedRoles.push(role);
      }
    } else {
      updatedRoles = updatedRoles.filter(
        (role) => role !== `${tableName}_${name}`
      );
    }

    setRoles(updatedRoles);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup row>
        {permissions.map((permission) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.includes(`${tableName}_${permission}`)}
                onChange={handleChange}
                name={permission}
              />
            }
            label={`${tableName} ${permission}`}
            key={permission}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CrudPermissions;
