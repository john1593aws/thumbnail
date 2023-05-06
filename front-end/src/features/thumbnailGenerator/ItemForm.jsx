import React, { useState } from 'react';
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
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from './thumbnailSlice';

const ItemForm = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  function add() {
    dispatch(addItem({ name }));
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: '40px', textAlign: 'center' }} raised>
      <CardContent>
        <Grid container flex rowSpacing={2}>
          <Grid item xs={12} justifyContent={'space-betweenß'}>
            <Typography variant="h5" component="div">
              Add An Item
            </Typography>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              onChange={(e) => setName(e.target.value)}
              color="success"
              placeholder="Name"
            />
          </Grid>
          <Grid item xs={'12'}>
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
