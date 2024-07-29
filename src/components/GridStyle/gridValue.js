import React from "react";
import { Grid } from "@mui/material";

const GridValue = ({ children, xs = 8, sm = 10, ...props }) => (
  <Grid item xs={xs} sm={sm} {...props}>
    {children}
  </Grid>
);
export default GridValue;
