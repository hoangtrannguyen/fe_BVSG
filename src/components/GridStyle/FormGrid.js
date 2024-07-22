import React from "react";
import { Grid } from "@mui/material";

const FormRow = ({ children, xs = 12, sm = 6, ...props }) => (
  <Grid item xs={xs} sm={sm} {...props}>
    <Grid
      container
      alignItems={{ xs: "right", sm: "center" }}
      spacing={1}
      direction={{ xs: "column", sm: "row" }}
    >
      {children}
    </Grid>
  </Grid>
);

export default FormRow;
