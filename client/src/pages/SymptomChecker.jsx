import React, { useState, useContext } from "react";
import { OfflineContext } from "../context/OfflineContext";
import "./SymptomChecker.css";

const SymptomChecker = () => {
  const { isOnline } = useContext(OfflineContext);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  
  const getAdvice = (symptoms) => {
    const text = symptoms.toLowerCase();
    const adviceList = [];

    if (text.includes("fever")) {
      adviceList.push("Fever: Stay hydrated, take paracetamol if needed, and rest well. If above 102°F, consult a doctor.");
    }
    if (text.includes("cough")) {
      adviceList.push("Cough: Drink warm fluids, honey water, and avoid dust. If persistent >2 weeks, get medical advice.");
    }
    if (text.includes("cold") || text.includes("runny nose")) {
      adviceList.push("Cold: Take steam inhalation, drink warm fluids, and keep yourself warm.");
    }
    if (text.includes("headache")) {
      adviceList.push("Headache: Rest in a dark quiet room, drink water, and avoid screen time. Severe pain → consult doctor.");
    }
    if (text.includes("stomach") || text.includes("nausea") || text.includes("vomit")) {
      adviceList.push("Stomach issues: Eat light meals, avoid oily/spicy food, and stay hydrated. If vomiting continues, seek care.");
    }
    if (text.includes("fatigue") || text.includes("tired") || text.includes("weak")) {
      adviceList.push("Fatigue: Sleep 7–8 hours, eat iron-rich foods, and reduce stress. If chronic, check with a doctor.");
    }
    if (text.includes("chest pain")) {
      adviceList.push("Chest Pain: Could be serious. Rest immediately and seek urgent medical help.");
    }
    if (text.includes("shortness of breath") || text.includes("breathing")) {
      adviceList.push("Breathing issue: Sit upright, take slow breaths, and consult emergency care immediately.");
    }
    if (text.includes("rash") || text.includes("skin")) {
      adviceList.push("Skin rash: Avoid scratching, apply soothing lotion, and keep skin clean. If spreading, see a dermatologist.");
    }
    if (text.includes("dizzy") || text.includes("dizziness")) {
      adviceList.push("Dizziness: Sit down immediately, drink water, and avoid sudden movements. Persistent → get medical checkup.");
    }

    if (adviceList.length === 0) {
      adviceList.push("No specific match found. Please consult a healthcare professional for accurate guidance.");
    }

    return adviceList.join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOnline) {
      setResult("You are offline. Please check your internet connection.");
      return;
    }

    setLoading(true);
    setResult("");

    setTimeout(() => {
      const advice = getAdvice(input);
      setResult(advice);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="symptom-checker-page animate-fadeIn">
          <h2 className="title">Symptom Checker</h2>
          <p className="subtitle">
            Enter your symptoms and receive quick health advice
          </p>

          <form className="symptom-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <textarea
                id="symptom-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., fever, cough, headache"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Check Symptoms"}
            </button>
          </form>

          {result && (
            <div className="symptom-result animate-slideUp">{result}</div>
          )}
        </div>
      </div>

      
      <footer className="footer animate-fadeInUp">
        <p>© 2025 Symptom Checker | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default SymptomChecker;
