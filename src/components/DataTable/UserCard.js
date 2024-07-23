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

const colors = ["#e9efff", "#fafbff"];

function UserCard({ user, handleEdit, handleDelete, index }) {
  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: "15px",
        marginTop: "15px",
        backgroundColor: colors[index % colors.length],
        "&:hover": {
          backgroundColor: "#dae4ff",
        },
      }}
    >
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
            onClick={() => handleDelete(user)}
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
              Mã nhân viên
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.code}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Ngày vào
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {format(new Date(user.date), "dd/MM/yyyy")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Họ tên
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.fullName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              CCCD
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.citizenId}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Điện thoại
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Email
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
