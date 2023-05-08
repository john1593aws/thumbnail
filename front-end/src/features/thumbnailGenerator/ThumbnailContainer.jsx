import { Container, Box } from '@mui/material';
import { fetchItems } from './thumbnailSlice';
import ItemForm from './ItemForm';
import ItemTable from './ItemTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ThumbnailContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchItemsEffect() {
      dispatch(fetchItems());
    }

    fetchItemsEffect();
  }, [dispatch]);

  return (
    <Container>
      <Box m="auto" maxWidth="sm">
        <ItemForm />
      </Box>
      <Box m="auto" maxWidth="md">
        <ItemTable />
      </Box>
    </Container>
  );
};

export default ThumbnailContainer;
