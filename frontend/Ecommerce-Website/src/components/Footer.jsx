import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Investor Relations", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Order Status", href: "#" },
      { name: "Shipping Info", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Returns & Refunds", href: "#" },
    ],
    categories: [
      { name: "Electronics", href: "#" },
      { name: "Fashion", href: "#" },
      { name: "Home & Garden", href: "#" },
      { name: "Sports & Fitness", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      ariaLabel: "Follow us on Facebook",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      ariaLabel: "Follow us on Instagram",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      ariaLabel: "Follow us on LinkedIn",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Footer - Full Layout */}
        <div className="hidden md:block py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info - Desktop: 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                ShopZone
              </h3>
              <p className="text-gray-500 mb-4 max-w-md leading-relaxed">
                Your trusted destination for quality products at unbeatable
                prices. Shop with confidence and enjoy fast, reliable delivery
                worldwide.
              </p>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">support@shopzone.com</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">
                    123 Commerce St, City, State 12345
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-50"
                      aria-label={social.ariaLabel}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Categories
              </h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Footer - Ultra Minimalist */}
        <div className="md:hidden py-2">
          {/* Company Name and Copyright - Ultra Compact */}
          <div className="text-center mb-2">
            <div className="text-xs font-semibold text-blue-700">ShopZone</div>
            <div className="text-xs text-gray-500">© 2025</div>
          </div>

          {/* Essential Links - Single Row */}
          <div className="flex justify-center items-center space-x-3 mb-2 text-xs">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
            >
              About
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
            >
              Contact
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
            >
              Privacy
            </a>
          </div>

          {/* Social Media Icons - Ultra Compact */}
          <div className="flex justify-center space-x-2">
            {socialLinks.slice(0, 3).map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-blue-700 transition-colors duration-200 p-1"
                  aria-label={social.ariaLabel}
                >
                  <IconComponent className="h-3 w-3" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Desktop Bottom Section */}
        <div className="hidden md:block border-t border-gray-200 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center md:text-left">
              © 2025 ShopZone. All rights reserved.
            </div>

            {/* Payment Methods & Trust Badges */}
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <span>Secure Payment</span>
              <span>•</span>
              <span>Free Shipping</span>
              <span>•</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
