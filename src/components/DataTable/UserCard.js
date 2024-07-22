import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

function UserCard({ user, handleEdit, handleDelete }) {
  return (
    <Card variant="outlined" sx={{ marginBottom: "15px", marginTop: "15px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "5px",
          marginBottom: "-8px",
          width: "auto",
        }}
      >
        <CardActions sx={{ padding: "0" }}>
          <IconButton
            onClick={() => handleEdit(user)}
            color="primary"
            sx={{ fontSize: ".5rem", padding: "0", paddingRight: "5px" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(user.id)}
            color="error"
            sx={{ fontSize: ".5rem", padding: "0", paddingRight: "10px" }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Box>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              ID :
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.id}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Date work:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {format(new Date(user.date), "dd/MM/yyyy")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Full Name:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.fullName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Citizen Id:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.citizenId}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Phone:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Email:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserCard;
