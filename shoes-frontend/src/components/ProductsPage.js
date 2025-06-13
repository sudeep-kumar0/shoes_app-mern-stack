import React, { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      paddingTop: "40px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#666",
      maxWidth: "600px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
      marginBottom: "60px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    imageContainer: {
      height: "240px",
      overflow: "hidden",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    tag: {
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    },
    content: {
      padding: "20px",
    },
    name: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: "8px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    description: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "16px",
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      height: "42px",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    price: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#3b82f6",
    },
    sizeContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
    },
    sizeTag: {
      backgroundColor: "#f3f4f6",
      color: "#4b5563",
      fontSize: "12px",
      padding: "4px 8px",
      borderRadius: "4px",
    },
    loading: {
      textAlign: "center",
      padding: "60px 0",
      color: "#6b7280",
      fontSize: "18px",
    },
    error: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    body: {
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      paddingBottom: "60px",
    },
    empty: {
      textAlign: "center",
      padding: "40px 0",
      color: "#6b7280",
      fontSize: "18px",
    },
    footer: {
      backgroundColor: "#1f2937",
      color: "white",
      padding: "40px 0 20px",
      textAlign: "center",
    },
    footerText: {
      fontSize: "14px",
      opacity: "0.7",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getshoes`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching shoes:", err);
        setError("Failed to load shoes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, styles.cardHover);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = styles.card.boxShadow;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Premium Footwear Collection</h1>
          <p style={styles.subtitle}>
            Discover exceptional comfort and style with our handpicked selection
            of designer shoes.
          </p>
        </header>

        {isLoading && <div style={styles.loading}>Loading...</div>}
        {error && <div style={styles.error}>{error}</div>}
        {!isLoading && !error && products.length === 0 && (
          <div style={styles.empty}>No products available.</div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div style={styles.grid}>
            {products.map((product, index) => (
              <div
                key={index}
                style={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                  />
                  <div style={styles.tag}>New</div>
                </div>
                <div style={styles.content}>
                  <h2 style={styles.name}>{product.name}</h2>
                  <p style={styles.description}>{product.description}</p>
                  <div style={styles.priceRow}>
                    <span style={styles.price}>${product.price}</span>
                  </div>
                  <div style={styles.sizeContainer}>
                    {(product.size?.split(",") || []).map((size, i) => (
                      <span key={i} style={styles.sizeTag}>
                        {size.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          &copy; {new Date().getFullYear()} Premium Footwear. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProductsPage;
