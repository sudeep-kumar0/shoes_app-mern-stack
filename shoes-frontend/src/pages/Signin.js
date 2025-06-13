import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Signin failed");
      }

      const data = await response.json();

      if (data.user && data.token) {
        login(data.user, data.token);
        navigate("/homepage");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert(error.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1429&auto=format&fit=crop")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: '"Poppins", sans-serif',
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1,
    },
    formCard: {
      width: "100%",
      maxWidth: "420px",
      padding: "30px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "10px",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(5px)",
      position: "relative",
      zIndex: 2,
    },
    logo: {
      display: "block",
      margin: "0 auto 20px",
      maxWidth: "180px",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#333",
      margin: "10px 0",
    },
    subtitle: {
      fontSize: "16px",
      color: "#666",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "14px",
      transition: "border-color 0.3s",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#FF6B35",
      border: "none",
      borderRadius: "6px",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    forgotPassword: {
      textAlign: "right",
      fontSize: "14px",
      marginBottom: "8px",
    },
    forgotLink: {
      color: "#FF6B35",
      textDecoration: "none",
    },
    footer: {
      textAlign: "center",
      marginTop: "25px",
      fontSize: "14px",
      color: "#666",
    },
    link: {
      color: "#FF6B35",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <img
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
            alt="SoleMate Logo"
            style={styles.logo}
          />
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue your shoe journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.forgotPassword}>
              <a href="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Don't have an account?{" "}
            <a href="/signup" style={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
