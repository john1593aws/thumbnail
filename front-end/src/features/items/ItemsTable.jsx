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

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  function debugBase64(base64URL) {
    const fileWindow = window.open();
    fileWindow.document.write(
      '<title>Visualisation</title>' +
        '<body style="overflow: hidden; margin: 0">' +
        '<object width="100%" width="-webkit-fill-available" height="100%" height="-webkit-fill-available" type="application/pdf" data="' +
        encodeURI(base64URL) +
        '"></object>' +
        '</body>'
    );
  }

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
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, i) => {
                const fileStr = arrayBufferToBase64(row.file.buffer);
                console.log(fileStr);
                return (
                  <TableRow key={i}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          debugBase64(`data:application/pdf;base64,${fileStr}`);
                        }}
                      >
                        <FindInPageIcon color="disabled" />
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
