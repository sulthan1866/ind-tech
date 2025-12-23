import { useState, createContext, useEffect, useRef } from "react";
import {
  Home,
  Menu,
  X,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { siInstagram } from "simple-icons";

const Instagram = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 20 20"
      className="h-4 fill-pink-500 inline"
      dangerouslySetInnerHTML={{ __html: siInstagram.svg }}
    />
  );
};

function useBackToCloseModal(isOpen, onClose) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !pushedRef.current) {
      window.history.pushState({ modal: true }, "");
      pushedRef.current = true;
    }

    const onPop = () => {
      if (pushedRef.current) {
        pushedRef.current = false;
        onClose();
      }
    };

    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, [isOpen, onClose]);
}

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Simple Router Hook
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash.slice(1) || "/"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || "/");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
  };

  return { currentPath, navigate };
};

// Products Data
const products = [
  {
    id: "small",
    name: "Small Clock",
    price: 13000,
    description: "Compact and elegant timepiece perfect for any space",
    image: "/assets/images/small/small.jpeg",
    images: Array.from(
      { length: 17 },
      (_, i) => `/assets/images/small/small${i + 1}.jpeg`
    ),
    videos: Array.from(
      { length: 1 },
      (_, i) => `/assets/videos/small/smallv${i + 1}.mp4`
    ),
    features: ["Compact Design", "Easy Installation", "Quality Materials"],
  },
  {
    id: "black",
    name: "Black Clock",
    price: 23000,
    description: "Sophisticated black finish with premium craftsmanship",
    image: "/assets/images/black/black.jpeg",
    images: Array.from(
      { length: 8 },
      (_, i) => `/assets/images/black/black${i + 1}.jpeg`
    ),
    videos: Array.from(
      { length: 2 },
      (_, i) => `/assets/videos/black/blackv${i + 1}.mp4`
    ),
    features: [
      "Premium Black Finish",
      "Modern Aesthetic",
      "Durable Construction",
    ],
  },
  {
    id: "big",
    name: "Big Clock",
    price: 33000,
    description: "Statement piece with impressive presence and detail",
    image: "/assets/images/big/big.jpeg",
    images: Array.from(
      { length: 32 },
      (_, i) => `/assets/images/big/big${i + 1}.jpeg`
    ),
    videos: Array.from(
      { length: 2 },
      (_, i) => `/assets/videos/big/bigv${i + 1}.mp4`
    ),
    features: ["Large Display", "Premium Quality", "Architectural Statement"],
  },
];

// Header Component
const Header = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = currentPath === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/assets/images/logo.png"
              alt="logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span translate="no">IND-TECH</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isHome
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg transition-colors ${
                isHome
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer
      id="contacts"
      className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              <span translate="no">IND-TECH</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium clock solutions for your space
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              Contact
            </h3>
            <a
              href="tel:9842133104"
              className="text-sm text-gray-600 dark:text-gray-400 block"
              translate="no"
            >
              📞 9842133104
            </a>
            <a
              href="tel:9843077896"
              className="text-sm text-gray-600 dark:text-gray-400 block my-5"
              translate="no"
            >
              📞 9843077896
            </a>
            <a
              href="https://instagram.com/ind_tech_digital_electronics_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              translate="no"
            >
              <Instagram />
              {" ind-tech"}
            </a>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              Delivery
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span translate="no">₹1000</span>{" "}
              <span>flat delivery charge</span>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <span>© 2024 </span>
          <span translate="no">IND-TECH</span>
          <span>. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

// Product Card Component
const ProductCard = ({ product, navigate }) => {
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            translate="no"
          >
            ₹{product.price.toLocaleString()}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Home Page
const MyHome = ({ navigate }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Premium Clock Collection
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover timeless elegance for your space
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

// Enhanced Media Modal with Navigation and Swipe Support
const MediaModal = ({ allMedia, currentIndex, onClose, onNavigate }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < allMedia.length - 1) {
      onNavigate(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < allMedia.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, allMedia.length, onNavigate, onClose]);

  if (currentIndex === null || !allMedia.length) return null;

  const current = allMedia[currentIndex];
  const isVideo = current.endsWith(".mp4");

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm z-10"
        translate="no"
      >
        {currentIndex + 1} / {allMedia.length}
      </div>

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 hidden md:block"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
      )}

      {/* Next Button */}
      {currentIndex < allMedia.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 hidden md:block"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next"
        >
          <ChevronRight size={32} className="text-white" />
        </button>
      )}

      {/* Media Content with Swipe Support */}
      <div
        className="w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isVideo ? (
          <video
            src={current}
            controls
            autoPlay
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <img
            src={current}
            alt="Product"
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

// Product Detail Page
const ProductDetail = ({ productId, navigate }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("images");

  const product = products.find((p) => p.id === productId);
  useBackToCloseModal(currentMediaIndex, () => setCurrentMediaIndex(null));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const allMedia = [...product.images, ...product.videos];

  const handleMediaClick = (item) => {
    const index = allMedia.indexOf(item);
    setCurrentMediaIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </button>

      {/* Product Hero */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <span
              className="text-4xl font-bold text-blue-600 dark:text-blue-400"
              translate="no"
            >
              ₹{product.price.toLocaleString()}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>+ </span>
              <span translate="no">₹1,000</span>
              <span> delivery charge</span>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Features:
            </h3>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: document.body.scrollHeight,
              })
            }
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Contact to Order
          </button>
        </div>
      </div>

      {/* Media Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "images"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span>Images </span>
            <span translate="no">({product.images.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "videos"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span>Videos </span>
            <span translate="no">({product.videos.length})</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {(activeTab === "images" ? product.images : product.videos).map(
          (item, i) => (
            <div
              key={i}
              onClick={() => handleMediaClick(item)}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all border border-gray-200 dark:border-gray-800"
            >
              {item.endsWith(".mp4") ? (
                <>
                  <video src={item} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white" size={32} />
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={item}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="text-white" size={32} />
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>

      <MediaModal
        allMedia={allMedia}
        currentIndex={currentMediaIndex}
        onClose={() => setCurrentMediaIndex(null)}
        onNavigate={setCurrentMediaIndex}
      />
    </div>
  );
};

// Main App with Router
export default function App() {
  const { currentPath, navigate } = useRouter();

  // Parse route
  const getRoute = () => {
    if (currentPath === "/" || currentPath === "") {
      return { page: "home" };
    }
    if (currentPath.startsWith("/product/")) {
      const productId = currentPath.split("/")[2];
      return { page: "product", productId };
    }
    return { page: "home" };
  };

  const route = getRoute();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header currentPath={currentPath} navigate={navigate} />

        <main className="flex-1">
          {route.page === "home" ? (
            <MyHome navigate={navigate} />
          ) : (
            <ProductDetail productId={route.productId} navigate={navigate} />
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
