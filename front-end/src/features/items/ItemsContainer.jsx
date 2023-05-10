import { Container, Box } from '@mui/material';
import { fetchItems } from './itemsSlice';
import ItemsForm from './ItemsForm';
import ItemsTable from './ItemsTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ItemsContainer = () => {
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
        <ItemsForm />
      </Box>
      <Box m="auto" maxWidth="md">
        <ItemsTable />
      </Box>
    </Container>
  );
};

export default ItemsContainer;
