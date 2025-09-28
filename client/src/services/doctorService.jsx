import axios from 'axios';

const API_BASE = '/api/doctors';

const doctorService = {
  getAllDoctors: async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      return res.data;
    } catch (err) {
      console.error('Error fetching all doctors:', err);
      return [];
    }
  },

  getDoctorsBySpecialty: async (specialty) => {
    try {
      const res = await axios.get(`${API_BASE}/specialty/${specialty}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching doctors for ${specialty}:`, err);
      return [];
    }
  },

  getDoctorById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching doctor ${id}:`, err);
      return null;
    }
  },

  getAvailableDoctors: async () => {
    try {
      const res = await axios.get(`${API_BASE}/available`);
      return res.data;
    } catch (err) {
      console.error('Error fetching available doctors:', err);
      return [];
    }
  }
};

export default doctorService;