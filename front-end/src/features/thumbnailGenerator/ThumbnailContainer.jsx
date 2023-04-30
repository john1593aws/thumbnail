import React from "react";
import { Container, Box } from "@mui/material";
import { addItem, fetchItems } from "./thumbnailSlice";
import ItemForm from "./ItemForm";
import ItemTable from "./ItemTable";

const ThumbnailContainer = () => {
  return (
    <Container maxWidth="sm">
      <Box m="auto">
        <ItemForm />
        <ItemTable />
      </Box>
    </Container>
  );
};

export default ThumbnailContainer;
