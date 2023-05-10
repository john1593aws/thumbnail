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

const ItemForm = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  function add() {
    dispatch(addItem({ name, file }));
    setName('');
    setFile();
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
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
            <Button
              fullWidth
              variant="contained"
              color="info"
              component="label"
            >
              Upload
              <input hidden multiple type="file" onChange={handleFileChange} />
            </Button>
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
