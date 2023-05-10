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
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  function add() {
    dispatch(addItem({ name, file }));
    setName('');
    setFile(null);
  }

  return (
    <Card sx={{ marginTop: '40px', textAlign: 'center' }} raised>
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
            <FileDropzone setFile={setFile} />
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
