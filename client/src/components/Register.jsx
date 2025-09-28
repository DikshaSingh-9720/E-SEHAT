import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { OfflineContext } from "../context/OfflineContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnline) return setError(t("register.offlineError"));

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", formData);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", formData.email);

      setSuccess(t("register.success"));
      setError("");

      navigate(`/${role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || t("register.error"));
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>{t("register.title")}</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("register.name")}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("register.email")}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t("register.password")}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={t("register.phone")}
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder={t("register.address")}
            value={formData.address}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="patient">{t("register.roles.patient")}</option>
            <option value="doctor">{t("register.roles.doctor")}</option>
            <option value="admin">{t("register.roles.admin")}</option>
          </select>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? t("register.loading") : t("register.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
