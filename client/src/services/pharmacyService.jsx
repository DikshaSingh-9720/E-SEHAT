import axios from 'axios';

const API_BASE = '/api/pharmacy';

const pharmacyService = {
  getAvailableMedicines: async () => {
    try {
      const res = await axios.get(`${API_BASE}/stock`);
      return res.data;
    } catch (err) {
      console.error('Error fetching medicine stock:', err);
      return [];
    }
  },

  getMedicineByName: async (name) => {
    try {
      const res = await axios.get(`${API_BASE}/search`, {
        params: { name }
      });
      return res.data;
    } catch (err) {
      console.error(`Error searching for medicine "${name}":`, err);
      return null;
    }
  },

  getExpiringSoon: async () => {
    try {
      const res = await axios.get(`${API_BASE}/expiring`);
      return res.data;
    } catch (err) {
      console.error('Error fetching expiring medicines:', err);
      return [];
    }
  }
};

export default pharmacyService;