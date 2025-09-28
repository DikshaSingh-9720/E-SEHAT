import axios from 'axios';

const API_BASE = '/api/medicine';

const medicineService = {
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

  syncOfflineMedicine: async (medicineData) => {
    try {
      const res = await axios.post(`${API_BASE}/sync`, medicineData);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Error syncing offline medicine:', err);
      return {
        success: false,
        message: err.response?.data?.message || 'Sync failed'
      };
    }
  }
};

export default medicineService;