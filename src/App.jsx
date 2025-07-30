import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Typography, CssBaseline } from '@mui/material';

import AccessoryList from './components/AccessoryList';
import AddAccessoryForm from './components/AddAccessoryForm';

// This is our default data, used only if localStorage is empty.
const defaultAccessories = [
  { id: 1, name: 'Classic Watch', price: '150.00', description: 'A timeless piece for everyday wear.' },
  { id: 2, name: 'Aviator Sunglasses', price: '80.00', description: 'Stylish and protective eyewear.' },
  { id: 3, name: 'Leather Wallet', price: '60.00', description: 'Crafted from genuine leather.' },
];

function App() {
  // NEW: Initialize state from localStorage or use default data
  const [accessories, setAccessories] = useState(() => {
    const savedAccessories = localStorage.getItem('accessories');
    return savedAccessories ? JSON.parse(savedAccessories) : defaultAccessories;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccessory, setCurrentAccessory] = useState(null);

  // NEW: useEffect to save accessories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessories', JSON.stringify(accessories));
  }, [accessories]); // The effect runs only when the 'accessories' state changes

  const handleAddAccessory = (newAccessory) => {
    const accessoryToAdd = {
      id: Date.now(),
      ...newAccessory,
      price: parseFloat(newAccessory.price).toFixed(2)
    };
    setAccessories([...accessories, accessoryToAdd]);
  };

  const handleDeleteAccessory = (id) => {
    setAccessories(accessories.filter(accessory => accessory.id !== id));
  };

  const handleEditAccessory = (id, updatedAccessory) => {
    setAccessories(accessories.map(accessory => 
      accessory.id === id ? { ...accessory, ...updatedAccessory } : accessory
    ));
    setIsEditing(false);
    setCurrentAccessory(null);
  };

  const handleSelectForEdit = (accessory) => {
    setIsEditing(true);
    setCurrentAccessory(accessory);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAccessory(null);
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h3" component="h1" gutterBottom align="center" style={{ margin: '20px 0' }}>
          Accessory Shop
        </Typography>
        
        <AddAccessoryForm 
          onAddAccessory={handleAddAccessory} 
          onEditAccessory={handleEditAccessory}
          isEditing={isEditing}
          currentAccessory={currentAccessory}
          onCancelEdit={handleCancelEdit}
        />
        <AccessoryList 
          accessories={accessories} 
          onDeleteAccessory={handleDeleteAccessory} 
          onEditAccessory={handleSelectForEdit}
        />

      </Container>
    </>
  );
}

export default App;