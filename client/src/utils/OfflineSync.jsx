import React, { useEffect, useContext } from 'react';
import { OfflineContext } from '../context/OfflineContext';
import localStorageUtil from './localStorage';
import recordService from '../services/recordService';
import medicineService from '../services/pharmacyService';

const OfflineSync = () => {
  const { isOnline } = useContext(OfflineContext);

  useEffect(() => {
    const syncData = async () => {
      const pendingRecords = localStorageUtil.get('pendingRecords') || [];
      const pendingMedicines = localStorageUtil.get('pendingMedicines') || [];

      if (pendingRecords.length > 0) {
        for (const record of pendingRecords) {
          try {
            await recordService.submitOfflineRecord(record);
          } catch (err) {
            console.error('Failed to sync record:', err);
          }
        }
        localStorageUtil.remove('pendingRecords');
      }

      if (pendingMedicines.length > 0) {
        for (const med of pendingMedicines) {
          try {
            await medicineService.syncOfflineMedicine(med);
          } catch (err) {
            console.error('Failed to sync medicine:', err);
          }
        }
        localStorageUtil.remove('pendingMedicines');
      }
    };

    if (isOnline) {
      syncData();
    }
  }, [isOnline]);

  return null; // No UI needed
};

export default OfflineSync;