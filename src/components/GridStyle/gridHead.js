import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const GridTitle = ({ children, required, xs = 4, sm = 2, ...props }) => (
  <Grid item xs={xs} sm={sm} {...props}>
    <Box display="flex" alignItems="center">
      <Typography>{children}</Typography>
      {required && (
        <Typography color="red" ml={0.5}>
          *
        </Typography>
      )}
    </Box>
  </Grid>
);

export default GridTitle;
