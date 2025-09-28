// MedicalStockCard.jsx
import React from 'react';

const MedicalStockCard = ({ medicine }) => {
  if (!medicine) return null;

  return (
    <div style={styles.card}>
      <h3>{medicine.name}</h3>
      <p><strong>Category:</strong> {medicine.category}</p>
      <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
      <p><strong>Price:</strong> ₹{medicine.price}</p>
      <p><strong>In Stock:</strong> {medicine.stock > 0 ? `${medicine.stock} units` : 'Out of Stock'}</p>

      <button
        style={medicine.stock > 0 ? styles.buyBtn : styles.disabledBtn}
        disabled={medicine.stock <= 0}
      >
        {medicine.stock > 0 ? 'Buy Now' : 'Unavailable'}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 16,
    margin: 12,
    width: 240,
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  buyBtn: {
    marginTop: 10,
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  disabledBtn: {
    marginTop: 10,
    padding: '8px 12px',
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    borderRadius: 4,
    cursor: 'not-allowed',
  },
};

export default MedicalStockCard;
