import axios from 'axios';

const API_BASE = '/api/records';

const recordService = {
  getUserRecords: async () => {
    try {
      const res = await axios.get(`${API_BASE}/user`);
      return res.data;
    } catch (err) {
      console.error('Error fetching user records:', err);
      return [];
    }
  },

  getRecordById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching record ${id}:`, err);
      return null;
    }
  },

  submitRecord: async (recordData) => {
    try {
      const res = await axios.post(`${API_BASE}/submit`, recordData);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Error submitting record:', err);
      return {
        success: false,
        message: err.response?.data?.message || 'Submission failed'
      };
    }
  },

  submitOfflineRecord: async (recordData) => {
    // Used by OfflineSync.jsx when connectivity returns
    return await recordService.submitRecord(recordData);
  }
};

export default recordService;