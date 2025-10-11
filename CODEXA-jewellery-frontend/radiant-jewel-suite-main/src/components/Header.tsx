import { useState } from "react";
import { Menu, Search, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isJewelleryOpen, setIsJewelleryOpen] = useState(false);

  const jewelleryCategories = [
    { label: "Rings", href: "/category/rings" },
    { label: "Necklaces", href: "/category/necklaces" },
    { label: "Bracelets", href: "/category/bracelets" },
    { label: "Earrings", href: "/category/earrings" },
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Jewellery", href: "/collections", hasDropdown: true },
    { label: "Bridal", href: "/bridal" },
    { label: "Custom Design", href: "/custom-design" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border elegant-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
            <Link to="/" className="text-2xl lg:text-3xl font-display font-bold text-primary tracking-wider">
              New Kalyani Jewellers
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsJewelleryOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsJewelleryOpen(false)}
              >
                <Link
                  to={item.href}
                  className="text-sm font-body font-medium text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left flex items-center gap-1"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.hasDropdown && isJewelleryOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50 animate-fade-in">
                    {jewelleryCategories.map((category) => (
                      <Link
                        key={category.label}
                        to={category.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-smooth"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/admin/login">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Admin Login"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-fade-in">
            <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); window.location.href = `/search?q=${formData.get('q')}`; }} className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="text-base font-body font-medium text-foreground hover:text-primary transition-smooth py-2 block"
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {jewelleryCategories.map((category) => (
                        <Link
                          key={category.label}
                          to={category.href}
                          className="block text-sm text-muted-foreground hover:text-primary py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
