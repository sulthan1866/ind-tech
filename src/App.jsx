import React, { useState, createContext, useContext, useEffect } from 'react';
import { Moon, Sun, Home, ShoppingCart, Menu, X, Play, Maximize2, ChevronLeft } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Simple Router Hook
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
    images: Array.from({ length: 17 }, (_, i) => `/assets/images/small/small${i + 1}.jpeg`),
    videos: ["/assets/videos/small/smallv1.mp4"],
    features: ["Compact Design", "Easy Installation", "Quality Materials"]
  },
  {
    id: "black",
    name: "Black Clock",
    price: 23000,
    description: "Sophisticated black finish with premium craftsmanship",
    image: "/assets/images/black/black.jpeg",
    images: Array.from({ length: 8 }, (_, i) => `/assets/images/black/black${i + 1}.jpeg`),
    videos: ["/assets/videos/black/blackv1.mp4", "/assets/videos/black/blackv2.mp4"],
    features: ["Premium Black Finish", "Modern Aesthetic", "Durable Construction"]
  },
  {
    id: "big",
    name: "Big Clock",
    price: 33000,
    description: "Statement piece with impressive presence and detail",
    image: "/assets/images/big/big.jpeg",
    images: Array.from({ length: 29 }, (_, i) => `/assets/images/big/big${i + 1}.jpeg`),
    videos: ["/assets/videos/big/bigv1.mp4", "/assets/videos/big/bigv2.mp4"],
    features: ["Large Display", "Premium Quality", "Architectural Statement"]
  },
];

// Header Component
const Header = ({ currentPath, navigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = currentPath === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/assets/imgs/logow.png" alt="logo" className="h-10 w-10 object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IND-TECH
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isHome
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
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
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg transition-colors ${
                isHome
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>Toggle Theme</span>
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
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">IND-TECH</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium clock solutions for your space
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">📞 9842133104</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">📞 9843077896</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Delivery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Flat ₹1000 delivery charge</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 IND-TECH. All rights reserved.
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
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
};

// Media Modal
const MediaModal = ({ src, type, onClose }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X size={24} className="text-white" />
      </button>
      <div className="max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        {type === "image" ? (
          <img src={src} alt="Product" className="w-full h-full object-contain" />
        ) : (
          <video src={src} controls autoPlay className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

// Product Detail Page
const ProductDetail = ({ productId, navigate }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [activeTab, setActiveTab] = useState('images');

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        Back to Home
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
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              ₹{product.price.toLocaleString()}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              + ₹1,000 delivery charge
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Contact to Order
          </button>
        </div>
      </div>

      {/* Media Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'images'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Images ({product.images.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'videos'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Videos ({product.videos.length})
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {(activeTab === 'images' ? product.images : product.videos).map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedMedia(item);
              setMediaType(item.endsWith('.mp4') ? 'video' : 'image');
            }}
            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all border border-gray-200 dark:border-gray-800"
          >
            {item.endsWith('.mp4') ? (
              <>
                <video src={item} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="text-white" size={32} />
                </div>
              </>
            ) : (
              <>
                <img src={item} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="text-white" size={32} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <MediaModal
        src={selectedMedia}
        type={mediaType}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  );
};

// Main App with Router
export default function App() {
  const { currentPath, navigate } = useRouter();

  // Parse route
  const getRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return { page: 'home' };
    }
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/')[2];
      return { page: 'product', productId };
    }
    return { page: 'home' };
  };

  const route = getRoute();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header currentPath={currentPath} navigate={navigate} />
        
        <main className="flex-1">
          {route.page === 'home' ? (
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