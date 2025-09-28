import React, { useState } from 'react';

const MedicineStock = () => {
  const [search, setSearch] = useState('');

  const pharmacies = [
    'Nabha Medical Store',
    'Punjab Pharmacy',
    'Healthy Life Pharmacy',
    'Care Plus Medical',
    'LifeCare Pharmacy',
    'Medico Point',
    'Wellness Hub',
    'City Health Mart',
    'Green Cross Pharmacy',
    'Guardian Meds',
  ];

  const medicines = [
    { name: 'Paracetamol 500mg', description: 'Acetaminophen', price: 25 },
    { name: 'Ibuprofen 200mg', description: 'Pain Reliever', price: 30 },
    { name: 'Amoxicillin 250mg', description: 'Antibiotic', price: 60 },
    { name: 'Cetirizine 10mg', description: 'Allergy Relief', price: 15 },
    { name: 'Metformin 500mg', description: 'Diabetes Control', price: 40 },
    { name: 'Aspirin 75mg', description: 'Blood Thinner', price: 20 },
    { name: 'Omeprazole 20mg', description: 'Acidity Reducer', price: 35 },
    { name: 'Dolo 650', description: 'Fever & Pain Relief', price: 28 },
    { name: 'Azithromycin 500mg', description: 'Antibiotic', price: 75 },
    { name: 'Vitamin C Tablets', description: 'Immunity Booster', price: 50 },
  ];

  const getAvailability = () =>
    pharmacies
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((pharmacy) => ({
        name: pharmacy,
        status: Math.random() > 0.2 ? 'Available' : 'Limited Stock',
      }));

  const filteredMedicines = medicines
    .filter((med) => med.name.toLowerCase().includes(search.toLowerCase()))
    .map((med) => ({ ...med, availability: getAvailability() }));

  return (
    <div style={styles.container}>
      {/* Left Section - Medicines */}
      <div style={styles.left}>
        <div style={styles.searchBox}>
          <h3>🔍 Search Medicine</h3>
          <input
            type="text"
            placeholder="Search for medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </div>

        {filteredMedicines.map((medicine, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.header}>
              <div>
                <h3>{medicine.name}</h3>
                <p style={styles.description}>{medicine.description}</p>
                <p style={styles.price}>₹{medicine.price}</p>
              </div>
              <button style={styles.reserve}>🛒 Reserve</button>
            </div>

            <p style={styles.subTitle}>Available at:</p>
            <div style={styles.grid}>
              {medicine.availability.map((pharm, idx) => (
                <div key={idx} style={styles.row}>
                  <span>{pharm.name}</span>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        pharm.status === 'Available' ? '#28a745' : '#ffc107',
                    }}
                  >
                    {pharm.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Pharmacy List */}
      <div style={styles.right}>
        <h3 style={{ marginBottom: '12px' }}>🏥 Pharmacies</h3>
        <ul style={styles.pharmacyList}>
          {pharmacies.map((pharmacy, index) => (
            <li key={index} style={styles.pharmacyItem}>
              {pharmacy}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    gap: '20px',
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    height: 'fit-content',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  searchBox: {
    backgroundColor: '#fff',
    padding: '16px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  description: {
    color: '#888',
    margin: '4px 0',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#2cae74',
  },
  reserve: {
    border: '1px solid #ccc',
    padding: '8px 12px',
    borderRadius: '8px',
    background: '#f5f5f5',
    cursor: 'pointer',
  },
  subTitle: {
    marginTop: '16px',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  status: {
    color: '#fff',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '12px',
  },
  pharmacyList: {
    listStyle: 'none',
    padding: 0,
  },
  pharmacyItem: {
    padding: '8px',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
  },
};

export default MedicineStock;
