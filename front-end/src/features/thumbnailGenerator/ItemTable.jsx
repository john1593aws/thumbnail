import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

const ItemTable = () => {
  const [items, status] = useSelector((state) => [
    state.thumbnailGenerator.items,
    state.thumbnailGenerator.status,
  ]);

  return (
    <Card
      sx={{
        marginTop: 6,
      }}
      raised
    >
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ItemTable;
