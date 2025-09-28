import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { OfflineContext } from "../context/OfflineContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [tab, setTab] = useState("form"); // "form" or "otp"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "patient",
  });

  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
          },
          "expired-callback": () => {
            // reCAPTCHA expired, ask user to refresh
          },
        },
        auth
      );
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnline) return setError(t("register.offlineError"));
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", formData);
      const { token, role } = res.data;

      setSuccess(t("register.success"));
      setError("");

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate(`/${role}-dashboard`);
    } catch (err) {
      setError(t("register.error"));
      setSuccess("");
    }
    setLoading(false);
  };
  const sendOTP = () => {
    if (!formData.phone) return setError(t("register.phoneError"));
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, formData.phone, appVerifier)
      .then((res) => {
        setConfirmationResult(res);
        setError("");
        alert(t("register.otpSent"));
      })
      .catch(() => setError(t("register.otpSendError")));
  };

  const verifyOTP = async () => {
    if (!otp || !confirmationResult) return setError(t("register.otpMissing"));
    try {
      await confirmationResult.confirm(otp);
      setError("");
      alert(t("register.otpVerified"));

      // Call backend to complete OTP login
      const res = await axios.post("/api/auth/otp-login", {
        phone: formData.phone,
      });
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate(`/${role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || t("register.error"));
      setSuccess("");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>{t("register.title")}</h2>

        <div className="tab-buttons">
          <button
            className={tab === "form" ? "active" : ""}
            onClick={() => setTab("form")}
          >
            {t("Register")}
          </button>
          <button
            className={tab === "otp" ? "active" : ""}
            onClick={() => setTab("otp")}
          >
            {t("OTP Sign In")}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {tab === "form" && (
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

            <div id="recaptcha-container"></div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? t("register.loading") : t("register.submit")}
            </button>
          </form>
        )}

        {tab === "otp" && (
          <div className="otp-login">
            <input
              type="text"
              placeholder={t("register.phone")}
              value={formData.phone}
              onChange={handleChange}
            />
            <button className="otp-btn" onClick={sendOTP} disabled={loading}>
              {loading ? t("register.loading") : t("register.otpSend")}
            </button>
            <input
              type="text"
              placeholder={t("register.otpInput")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="otp-btn" onClick={verifyOTP}>
              {t("register.otpVerify")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
