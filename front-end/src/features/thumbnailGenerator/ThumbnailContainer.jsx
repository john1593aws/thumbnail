import React from "react";
import { Container, Box } from "@mui/material";
import { addItem, fetchItems } from "./thumbnailSlice";
import ItemForm from "./ItemForm";
import ItemTable from "./ItemTable";

const ThumbnailContainer = () => {
  return (
    <Container>
      <Box m="auto" maxWidth="sm">
        <ItemForm />
      </Box>

      <Box>
        <ItemTable />
      </Box>
    </Container>
  );
};

export default ThumbnailContainer;
