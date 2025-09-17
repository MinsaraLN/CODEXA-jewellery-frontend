import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import kjLogo from '@/assets/kj-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={kjLogo} alt="New Kalyani Jewellers" className="h-8 w-auto" />
              <div>
                <h3 className="text-sm font-cormorant font-bold text-gold">
                  NEW KALYANI JEWELLERS
                </h3>
                <p className="text-xs text-muted-foreground">Crown Yourself</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting beauty since 1987. Experience the finest in luxury jewelry 
              with our heritage of excellence and craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gold" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Gold Jewelry
                </Link>
              </li>
              <li>
                <Link to="/james" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  James Collection
                </Link>
              </li>
              <li>
                <Link to="/angel-collection" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Angel Collection
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/custom-designs" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Custom Designs
                </Link>
              </li>
              <li>
                <Link to="/repairs" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Jewelry Repairs
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Free Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  Lifetime Polishing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-sm text-muted-foreground">
                  95/A, Colombo Road, Kaduwela
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-sm text-muted-foreground">+94 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-sm text-muted-foreground">info@newkalyanijewellers.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 New Kalyani Jewellers. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};