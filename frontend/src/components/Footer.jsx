const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h1 className="text-3xl font-bold text-green-500 mb-4">
            NoBroker
          </h1>

          <p className="text-gray-400">
            Find your dream home without paying
            brokerage charges.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Quick Links
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Properties</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Properties
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li>Flats</li>
            <li>PG</li>
            <li>Villa</li>
            <li>Office</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Contact
          </h2>

          <p className="text-gray-400">
            Mumbai, Maharashtra
          </p>

          <p className="text-gray-400">
            support@nobroker.com
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-gray-400">
        © 2026 NoBroker. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;