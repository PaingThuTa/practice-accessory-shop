import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box
} from '@mui/material';

// MODIFIED: Receive the onEditAccessory function as a prop
function AccessoryList({ accessories, onDeleteAccessory, onEditAccessory }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price ($)</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accessories.map((accessory) => (
            <TableRow key={accessory.id}>
              <TableCell>{accessory.name}</TableCell>
              <TableCell>{accessory.price}</TableCell>
              <TableCell>{accessory.description}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mr: 1 }}
                    onClick={() => onEditAccessory(accessory)}
                  >
                    Edit
                  </Button>
                  {/* MODIFIED: Add the onClick handler to the Delete button */}
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => onDeleteAccessory(accessory.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccessoryList;