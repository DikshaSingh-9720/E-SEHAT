import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const HistoryViewer = ({ history }) => {
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expand/collapse for a history item
  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (!history || history.length === 0) {
    return <p className="text-gray-500">No history available</p>;
  }

  return (
    <div className="space-y-3">
      {history.map((h, idx) => (
        <div key={idx} className="border rounded-xl shadow-sm p-4 bg-white">
          {/* Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(idx)}
          >
            <div>
              <p className="font-semibold text-gray-800">{h.date}</p>
              <p className="text-gray-600 text-sm">{h.diagnosis}</p>
            </div>
            <div>
              {expandedItems[idx] ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          </div>

          {/* Expanded Details */}
          {expandedItems[idx] && (
            <div className="mt-2 text-gray-700 space-y-1">
              {h.notes && <p><strong>Notes:</strong> {h.notes}</p>}
              {h.prescription && <p><strong>Prescription:</strong> {h.prescription}</p>}
              {h.doctor && <p><strong>Doctor:</strong> {h.doctor}</p>}
              {h.visitType && <p><strong>Visit Type:</strong> {h.visitType}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryViewer;
