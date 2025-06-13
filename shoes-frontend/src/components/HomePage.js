import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [showSearch, setShowSearch] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const searchRef = useRef(null);
  const heroSliderRef = useRef(null);

  // Hero banner slides similar to Puma's main carousel
  const slides = [
    {
      id: 1,
      image:
        "https://t3.ftcdn.net/jpg/02/68/73/80/360_F_268738038_gdiTgLEAejrtc48asKt0rsw0WmIxsBUP.jpg",
      title: "FOREVER FASTER",
      subtitle: "THE NEW SOLEMATE NITRO COLLECTION",
      action: "Shop Now",
      alignment: "left",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1543508282-5c1f427f023f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "SUMMERTIME STYLE",
      subtitle: "HOT DEALS UP TO 50% OFF",
      action: "Shop Sale",
      alignment: "center",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "LIMITED EDITION",
      subtitle: "SOLEMATE x STREET CULTURE COLLAB",
      action: "Explore Collection",
      alignment: "right",
    },
  ];

  // Trending categories with consistent imagery
  const categories = [
    {
      id: 1,
      name: "Running",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      action: "Shop now",
    },
    {
      id: 2,
      name: "Lifestyle",
      image:
        "https://img.freepik.com/free-photo/fashion-shoes-sneakers_1203-7529.jpg?semt=ais_hybrid&w=740",
    },
    {
      id: 3,
      name: "Training",
      image:
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Basketball",
      image:
        "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Featured/trending products
  const trendingProducts = {
    new: [
      {
        id: 1,
        name: "SoleMate Fusion Nitro",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "New",
      },
      {
        id: 2,
        name: "Urban Street Legend",
        price: 99.99,
        image:
          "https://images.unsplash.com/photo-1600181516264-3ea807ff44b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "New",
      },
      {
        id: 3,
        name: "SoleMate Velocity Runner",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "New",
      },
      {
        id: 4,
        name: "Cloud Step Pro",
        price: 119.99,
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "New",
      },
    ],
    trending: [
      {
        id: 5,
        name: "Agile Performance Trainer",
        price: 109.99,
        image:
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Bestseller",
      },
      {
        id: 6,
        name: "Metro Street Classic",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Hot",
      },
      {
        id: 7,
        name: "Ultimate Court Pro",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Trending",
      },
      {
        id: 8,
        name: "Flex Air Cushion",
        price: 139.99,
        image:
          "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Bestseller",
      },
    ],
    sale: [
      {
        id: 9,
        name: "Legacy Classic Trainer",
        originalPrice: 129.99,
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "30% Off",
      },
      {
        id: 10,
        name: "Retro Sport Runner",
        originalPrice: 119.99,
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "40% Off",
      },
      {
        id: 11,
        name: "Feather Light Sprint",
        originalPrice: 149.99,
        price: 99.99,
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Sale",
      },
      {
        id: 12,
        name: "Casual Canvas Low-top",
        originalPrice: 79.99,
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tag: "Clearance",
      },
    ],
  };

  // Collections/large banners
  const collections = [
    {
      id: 1,
      title: "PERFORMANCE COLLECTION",
      description: "Engineered for athletes who demand the best",
      image:
        "https://images.unsplash.com/photo-1628610480665-cea5a85c187a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      link: "/collections/performance",
    },
    {
      id: 2,
      title: "STREETWEAR ESSENTIALS",
      description: "Urban style meets premium comfort",
      image:
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      link: "/collections/streetwear",
    },
  ];

  useEffect(() => {
    // Auto slide carousel with pause on hover
    const interval = setInterval(() => {
      if (heroSliderRef.current && !heroSliderRef.current.matches(":hover")) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
    }, 6000);

    // Scroll to top button visibility
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Fixed navigation on scroll
    const toggleNavbarFixed = () => {
      if (window.pageYOffset > 100) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    // Animation for elements on page load
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        // Only animate when element is fully in viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add("visible");
        }
      });
    };

    // Handle click outside search
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", toggleNavbarFixed);
    window.addEventListener("scroll", animateElements);
    document.addEventListener("mousedown", handleClickOutside);

    // Run animation check on initial load
    animateElements();

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", toggleNavbarFixed);
      window.removeEventListener("scroll", animateElements);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [slides.length]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  if (!auth) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading SoleMate...</p>
      </div>
    );
  }

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="homepage">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-container">
          <p>FREE SHIPPING ON ORDERS OVER $75</p>
          <div className="announcement-links">
            <a href="/store-locator">Find a Store</a>
            <a href="/help">Customer Service</a>
            {user ? (
              <span>Hi, {user.name}!</span>
            ) : (
              <>
                <a href="/signin">Sign In</a>
                <a href="/signup" className="register-link">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`main-header ${navbarFixed ? "fixed" : ""}`}>
        <div className="container header-container">
          <div className="logo">
            <Link to="/">
              <h1>SOLEMATE</h1>
            </Link>
          </div>

          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/products/new">New Arrivals</Link>
              </li>
              <li>
                <Link to="/products/men">Men</Link>
              </li>
              <li>
                <Link to="/products/women">Women</Link>
              </li>
              <li>
                <Link to="/products/kids">Kids</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/sale" className="nav-sale">
                  Sale
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" onClick={handleSearchToggle}>
              <span className="material-icon">search</span>
            </button>
            <Link to="/wishlist" className="icon-btn">
              <span className="material-icon">favorite_border</span>
            </Link>
            <Link to="/cart" className="icon-btn cart-icon">
              <span className="material-icon">shopping_bag</span>
              <span className="cart-count">0</span>
            </Link>
            {user && (
              <button onClick={handleLogout} className="icon-btn">
                <span className="material-icon">logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Search overlay */}
        {showSearch && (
          <div className="search-container" ref={searchRef}>
            <div className="container">
              <input
                type="text"
                placeholder="Search for products, collections, and more"
                className="search-input"
                autoFocus
              />
              <button className="search-btn">
                <span className="material-icon">search</span>
              </button>
              <button className="search-close" onClick={handleSearchToggle}>
                <span className="material-icon">close</span>
              </button>
            </div>
          </div>
        )}
      </header>

     <section className="hero-slider" ref={heroSliderRef}>
  <div className="slider-container">
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`slide ${
          index === currentSlide ? "active" : ""
        } slide-align-${slide.alignment}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="slide-content">
          <h2>{slide.title}</h2>
          <p>{slide.subtitle}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (user) {
                navigate("/products");
              } else {
                alert("Please login first to continue.");
              }
            }}
          >
            {slide.action}
          </button>
        </div>
      </div>
    ))}
    <button className="slider-control prev" onClick={prevSlide}>
      <span className="material-icon">chevron_left</span>
    </button>
    <button className="slider-control next" onClick={nextSlide}>
      <span className="material-icon">chevron_right</span>
    </button>
  </div>
  <div className="slider-progress">
    <div
      className="progress-bar"
      style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
    ></div>
  </div>
</section>

{/* Sign Up Call-to-Action (for non-logged in users) */}
{!user && (
  <div className="signup-cta">
    <div className="container">
      <div className="cta-content">
        <h3>Join SoleMate Rewards</h3>
        <p>
          Get exclusive access to special offers, early product drops, and more.
        </p>
        <div className="cta-buttons">
          <Link to="/signin" className="btn btn-outline">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Category Feature - Grid Layout */}
      <section className="categories-section animate-on-scroll">
        <div className="container">
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="category-overlay">
                    <h3 className="category-name">{category.name}</h3>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - With Tabs */}
      <section className="trending-products animate-on-scroll">
        <div className="container">
          <h2 className="section-title">TRENDING NOW</h2>
          <div className="product-tabs">
            <button
              className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              New Arrivals
            </button>
            <button
              className={`tab-btn ${activeTab === "trending" ? "active" : ""}`}
              onClick={() => setActiveTab("trending")}
            >
              Bestsellers
            </button>
            <button
              className={`tab-btn ${activeTab === "sale" ? "active" : ""}`}
              onClick={() => setActiveTab("sale")}
            >
              On Sale
            </button>
          </div>

          <div className="products-grid">
            {trendingProducts[activeTab].map((product) => (
              <div key={product.id} className="product-card">
                {product.tag && (
                  <span className="product-tag">{product.tag}</span>
                )}
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <div className="product-actions">
                    <button className="product-action-btn">
                      <span className="material-icon">favorite_border</span>
                    </button>
                    <button className="product-action-btn">
                      <span className="material-icon">shopping_bag</span>
                    </button>
                    <button className="product-action-btn">
                      <span className="material-icon">visibility</span>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    {product.originalPrice ? (
                      <>
                        <span className="price-original">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="price-sale">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="product-colors">
                    <span
                      className="color-dot"
                      style={{ backgroundColor: "#000" }}
                    ></span>
                    <span
                      className="color-dot"
                      style={{ backgroundColor: "#c0392b" }}
                    ></span>
                    <span
                      className="color-dot"
                      style={{ backgroundColor: "#3498db" }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to={`/products/${activeTab}`} className="btn btn-outline">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Banners */}
      <section className="collections-section animate-on-scroll">
        <div className="container">
          <div className="collections-grid">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="collection-banner"
                style={{ backgroundImage: `url(${collection.image})` }}
              >
                <div className="collection-content">
                  <h2 className="collection-title">{collection.title}</h2>
                  <p className="collection-description">
                    {collection.description}
                  </p>
                  <Link to={collection.link} className="btn btn-primary">
                    Shop Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="brand-section animate-on-scroll">
        <div className="container">
          <div className="brand-grid">
            <div className="brand-content">
              <h2 className="section-title text-left">THE SOLEMATE STORY</h2>
              <p className="brand-description">
                Founded by Sudeep Kumar with a passion for footwear innovation,
                SoleMate blends cutting-edge technology with timeless style.
                Each pair is designed to provide unparalleled comfort and
                durability without compromising on aesthetics.
              </p>
              <p className="brand-description">
                Our commitment to quality craftsmanship and sustainability has
                made us a trusted name in premium footwear for over a decade.
              </p>
              <Link to="/about" className="btn btn-outline">
                Discover Our Story
              </Link>
            </div>
            <div
              className="brand-image"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section animate-on-scroll">
        <div className="container">
          <h2 className="section-title">#SOLEMATESTYLE</h2>
          <p className="section-subtitle">
            Tag us on Instagram for a chance to be featured
          </p>
          <div className="instagram-grid">
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1543508282-5c1f427f023f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
            <div
              className="instagram-item"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
              }}
            >
              <div className="instagram-overlay">
                <span className="material-icon">favorite</span>
              </div>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Follow Us
          </a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter animate-on-scroll">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="section-title">JOIN THE CLUB</h2>
            <p>
              Sign up for exclusive offers, new product alerts, and 15% off your
              first order
            </p>
            <form className="newsletter-form">
              <div className="form-group">
                <input type="email" placeholder="Your Email Address" required />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
              <div className="newsletter-consent">
                <input type="checkbox" id="consent" required />
                <label htmlFor="consent">
                  I agree to receive marketing emails from SoleMate
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">PRODUCTS</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/products/new">New Arrivals</Link>
                </li>
                <li>
                  <Link to="/products/men">Men's Shoes</Link>
                </li>
                <li>
                  <Link to="/products/women">Women's Shoes</Link>
                </li>
                <li>
                  <Link to="/products/kids">Kids' Shoes</Link>
                </li>
                <li>
                  <Link to="/sale">Sale</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">COLLECTIONS</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/collections/performance">Performance</Link>
                </li>
                <li>
                  <Link to="/collections/lifestyle">Lifestyle</Link>
                </li>
                <li>
                  <Link to="/collections/training">Training</Link>
                </li>
                <li>
                  <Link to="/collections/classics">Classics</Link>
                </li>
                <li>
                  <Link to="/collections/limited">Limited Edition</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">SUPPORT</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/shipping">Shipping Info</Link>
                </li>
                <li>
                  <Link to="/returns">Returns & Exchanges</Link>
                </li>
                <li>
                  <Link to="/size-guide">Size Guide</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">ABOUT SOLEMATE</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/about">Our Story</Link>
                </li>
                <li>
                  <Link to="/sustainability">Sustainability</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/press">Press</Link>
                </li>
                <li>
                  <Link to="/affiliates">Affiliates</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column footer-social">
              <h3 className="footer-title">CONNECT WITH US</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <span className="material-icon">facebook</span>
                </a>
                <a href="#" className="social-icon">
                  <span className="material-icon">alternate_email</span>
                </a>
                <a href="#" className="social-icon">
                  <span className="material-icon">photo_camera</span>
                </a>
                <a href="#" className="social-icon">
                  <span className="material-icon">smart_display</span>
                </a>
              </div>
              <div className="payment-methods">
                <img
                  src="https://via.placeholder.com/200x30"
                  alt="Payment methods"
                />
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              <p>&copy; 2025 SoleMate. All rights reserved.</p>
            </div>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <span className="material-icon">keyboard_arrow_up</span>
        </button>
      )}
    </div>
  );
};

export default HomePage;
