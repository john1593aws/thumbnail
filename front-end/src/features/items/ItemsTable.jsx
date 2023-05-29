import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from '@mui/material';

import { useSelector } from 'react-redux';

const ItemsTable = () => {
  const [items] = useSelector((state) => [state.itemsSlice.items]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Card
        sx={{
          margin: '60px auto',
          maxWidth: '30rem',
        }}
        raised
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemsTable;
