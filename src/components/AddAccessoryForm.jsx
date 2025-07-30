import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box
} from '@mui/material';

// This component receives functions 'onAddAccessory', 'onEditAccessory' and a boolean 'isEditing' as props
function AddAccessoryForm({ onAddAccessory, onEditAccessory, isEditing, currentAccessory, onCancelEdit }) {
  // State to hold the form values, managed inside this component
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // This useEffect hook will run when `currentAccessory` changes.
  // If we are in editing mode, it populates the form fields.
  useEffect(() => {
    if (isEditing && currentAccessory) {
      setName(currentAccessory.name);
      setPrice(currentAccessory.price);
      setDescription(currentAccessory.description);
    } else {
      // Clear form if not editing
      setName('');
      setPrice('');
      setDescription('');
    }
  }, [isEditing, currentAccessory]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return; // Basic validation

    if (isEditing) {
      onEditAccessory(currentAccessory.id, { name, price, description });
    } else {
      onAddAccessory({ name, price, description });
    }
    // Clear form fields after submission
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {isEditing ? 'Edit Accessory' : 'Add New Accessory'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField label="Accessory Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" multiline rows={3} />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Update Accessory' : 'Add Accessory'}
            </Button>
            {isEditing && (
              <Button onClick={onCancelEdit} variant="outlined" sx={{ ml: 2 }}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AddAccessoryForm;