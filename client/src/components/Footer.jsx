import { NavLink } from "react-router-dom";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
          <NavLink
            to="/"
            className={`text-2xl font-bold text-gray-800 drop-shadow-sm`}
          >
            Grocery App
          </NavLink>
          <p className={`max-w-[410px] mt-8 text-gray-500`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 px-6 md:px-16 lg:px-24 xl:px-32">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3
                className={`font-semibold text-base text-gray-800 md:mb-5 mb-2`}
              >
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className={`text-gray-500 hover:underline transition`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className={`py-4 text-center text-sm md:text-base text-gray-800`}>
        Copyright 2025 © PrebuiltUI All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
