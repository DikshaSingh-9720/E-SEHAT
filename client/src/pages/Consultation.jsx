import React, { useState } from 'react';

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Preet Kaur',
    specialty: 'General Physician',
    hospital: 'Nabha Civil Hospital',
    languages: ['Punjabi', 'Hindi', 'English'],
    availableAt: 'Today 2:00 PM',
    isAvailable: true,
    rating: 4.8,
    experience: 12,
    fee: 200,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Dr. Harpreet Singh',
    specialty: 'Cardiologist',
    hospital: 'Patiala Heart Center',
    languages: ['Punjabi', 'Hindi', 'English'],
    availableAt: 'Tomorrow 10:00 AM',
    isAvailable: true,
    rating: 4.9,
    experience: 15,
    fee: 500,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Dr. Simran Kaur',
    specialty: 'Dermatologist',
    hospital: 'Skin Wellness Clinic',
    languages: ['Punjabi', 'English'],
    availableAt: 'Today 5:00 PM',
    isAvailable: true,
    rating: 4.7,
    experience: 10,
    fee: 400,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'Dr. Rajeev Sharma',
    specialty: 'Orthopedic',
    hospital: 'City Bone Hospital',
    languages: ['Hindi', 'English'],
    availableAt: 'Tomorrow 9:30 AM',
    isAvailable: true,
    rating: 4.6,
    experience: 18,
    fee: 450,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 5,
    name: 'Dr. Anjali Mehta',
    specialty: 'Gynecologist',
    hospital: 'Womens Care Hospital',
    languages: ['Hindi', 'English'],
    availableAt: 'Today 3:30 PM',
    isAvailable: true,
    rating: 4.5,
    experience: 11,
    fee: 350,
    image: 'https://randomuser.me/api/portraits/women/52.jpg',
  },
];

const Consultation = () => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  const filteredDoctors = mockDoctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialty ? doc.specialty === specialty : true)
  );

  return (
    <div style={styles.page}>
      {/* Search + Filter */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search Doctors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          style={styles.select}
        >
          <option value="">Specialty</option>
          <option value="General Physician">General Physician</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>
        <button style={styles.filterBtn}>⚙️ Filter</button>
      </div>

      {/* Doctor Cards */}
      {filteredDoctors.map((doctor) => (
        <div key={doctor.id} style={styles.card}>
          <img src={doctor.image} alt="Doctor" style={styles.image} />

          <div style={styles.info}>
            <h3>{doctor.name}</h3>
            <p style={styles.specialty}>{doctor.specialty}</p>
            <p style={styles.hospital}>📍 {doctor.hospital}</p>
            <div style={styles.languages}>
              {doctor.languages.map((lang, index) => (
                <span key={index} style={styles.languageBadge}>
                  {lang}
                </span>
              ))}
            </div>
            <div style={styles.statusLine}>
              <span style={styles.available}>🟢 Available</span>
              <span>{doctor.availableAt}</span>
            </div>
          </div>

          <div style={styles.sideBox}>
            <div style={styles.rating}>
              ⭐ {doctor.rating}
              <div style={styles.exp}>{doctor.experience} years</div>
            </div>
            <div style={styles.fee}>₹{doctor.fee}</div>
            <button style={styles.bookBtn}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  page: {
    padding: '20px',
    backgroundColor: '#fafafa',
    fontFamily: 'sans-serif',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  searchInput: {
    flex: 2,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  select: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  filterBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginRight: '16px',
    objectFit: 'cover',
  },
  info: {
    flex: 3,
  },
  specialty: {
    color: '#555',
    margin: '4px 0',
  },
  hospital: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '8px',
  },
  languages: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  languageBadge: {
    backgroundColor: '#e0f2e9',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#137547',
  },
  statusLine: {
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  available: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  sideBox: {
    textAlign: 'right',
    flex: 1,
  },
  rating: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  exp: {
    fontSize: '12px',
    color: '#888',
  },
  fee: {
    fontSize: '18px',
    color: '#333',
    margin: '8px 0',
  },
  bookBtn: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default Consultation;
