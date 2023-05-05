import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Card,
  CardContent,
  Typography,
  Button,
  FormGroup,
  Divider,
} from "@mui/material";

const ItemForm = () => {
  return (
    <Card sx={{ minWidth: 275, marginTop: "40px" }} raised>
      <CardContent>
        <Typography variant="h5" component="div">
          Add An Item
        </Typography>
        <Divider variant="fullWidth" />
        <FormControl>
          <FormGroup row sx={{ marginTop: "20px" }}>
            <InputLabel
              color="success"
              sx={{ marginTop: "20px" }}
              htmlFor="my-input"
            >
              Name
            </InputLabel>
            <Input sx={{ width: "253px" }} color="success" id="my-input" />
            <Button
              sx={{ marginLeft: "15px", width: "300px" }}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </FormGroup>
          <Button
            sx={{ marginTop: "20px" }}
            variant="contained"
            color="success"
          >
            Add
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
