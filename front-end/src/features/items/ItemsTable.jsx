import React, { useState } from 'react';
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
import DocView from './DocView';

const ItemsTable = () => {
  const [items] = useSelector((state) => [state.itemsSlice.items]);
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleOpen = (url) => {
    setOpen(true);
    setCurrentUrl(url);
  };

  const handleClose = () => setOpen(false);

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
                      <TableCell align="left">
                        {row.file.originalname}
                      </TableCell>
                      <TableCell align="right">
                        {row?.file?.imageEncoding ? (
                          <IconButton onClick={() => handleOpen(row.url)}>
                            <img
                              alt={`row-${i}`}
                              src={`data:${row?.file?.mimeType};base64, ${row?.file?.imageEncoding}`}
                            />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => handleOpen(row.url)}>
                            <FindInPageIcon color="disabled" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <DocView open={open} handleClose={handleClose} url={currentUrl} />
    </>
  );
};

export default ItemsTable;
