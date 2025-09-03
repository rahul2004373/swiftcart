import React from "react";

const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

      {/* Company Intro */}
      <p className="text-gray-600 text-center max-w-2xl mb-8">
        Welcome to <span className="font-semibold text-blue-600">ShopEase</span>{" "}
        – your one-stop destination for quality products at unbeatable prices.
        We aim to make online shopping seamless, convenient, and enjoyable for
        everyone.
      </p>

      {/* Mission Section */}
      <div className="max-w-4xl w-full bg-gray-50 shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-600">
          Our mission is to provide a platform where customers can find a wide
          range of products, enjoy secure transactions, and receive fast,
          reliable delivery – all while maintaining top-notch customer service.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-4xl w-full bg-gray-50 shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>High-quality products at affordable prices.</li>
          <li>Secure and fast checkout process.</li>
          <li>Dedicated customer support available 24/7.</li>
          <li>Quick and reliable delivery services.</li>
        </ul>
      </div>

      {/* Footer Text */}
      <p className="text-gray-500 mt-4 text-sm">
        Thank you for choosing ShopEase – we value your trust and support.
      </p>
    </div>
  );
};

export default AboutUsPage;
