import axios from 'axios';

const API_BASE = '/api/symptoms';

const symptomService = {
  checkSymptoms: async (description) => {
    try {
      const res = await axios.post(`${API_BASE}/check`, { description });
      return res.data;
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      return {
        advice: null,
        error: err.response?.data?.message || 'Symptom analysis failed'
      };
    }
  },

  getCommonSymptoms: async () => {
    try {
      const res = await axios.get(`${API_BASE}/common`);
      return res.data;
    } catch (err) {
      console.error('Error fetching common symptoms:', err);
      return [];
    }
  }
};

export default symptomService;