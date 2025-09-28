// MedicalStockPage.jsx
import React from 'react';
import MedicalStockCard from '../components/MedicalStockCard';

const MedicalStockPage = () => {
  const medicineStock = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      manufacturer: 'Cipla',
      price: 25,
      stock: 120,
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      manufacturer: 'Sun Pharma',
      price: 60,
      stock: 0,
    },
    {
      id: 3,
      name: 'Cetirizine 10mg',
      category: 'Allergy',
      manufacturer: 'Dr. Reddy’s',
      price: 15,
      stock: 80,
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      category: 'Anti-inflammatory',
      manufacturer: 'Glenmark',
      price: 35,
      stock: 50,
    },
    {
      id: 5,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      manufacturer: 'Zydus',
      price: 40,
      stock: 90,
    },
    {
      id: 6,
      name: 'Amlodipine 5mg',
      category: 'Blood Pressure',
      manufacturer: 'Torrent Pharma',
      price: 30,
      stock: 20,
    },
  ];

  return (
    <div style={styles.page}>
      <h2>Medicine Stock</h2>
      <div style={styles.grid}>
        {medicineStock.map((med) => (
          <MedicalStockCard key={med.id} medicine={med} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
};

export default MedicalStockPage;
