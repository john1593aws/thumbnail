import React, { useState } from 'react';
import {
  Input,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from './itemsSlice';
import FileDropzone from '../common/FileDropzone';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [fileData, setFileData] = useState(null);

  const dispatch = useDispatch();

  function add() {
    dispatch(addItem({ name, fileData }));
    setName('');
    setFileData(null);
  }

  return (
    <Card
      sx={{ margin: '60px auto', textAlign: 'center', maxWidth: '30rem' }}
      raised
    >
      <CardContent>
        <Grid container flex rowSpacing={2}>
          <Grid item xs={12} justifyContent={'space-between'}>
            <Typography variant="h5" color={'grey'}>
              Add An Item
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
              color="info"
              placeholder="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <FileDropzone setFile={setFileData} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="success" onClick={add}>
              Add
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
