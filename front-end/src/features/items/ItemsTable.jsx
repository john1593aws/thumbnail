import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useSelector } from 'react-redux';

const ItemsTable = () => {
  const [items] = useSelector((state) => [state.itemsSlice.items]);

  return (
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">File Name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.file.originalname}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => {}}>
                        <FindInPageIcon color="warning" />
                      </IconButton>
                    </TableCell>
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

export default ItemsTable;
