import { motion } from 'framer-motion';
import { headingClasses, bodyTextClasses } from '../utils/fonts';
import { textColor } from '../utils/classNames';

const certifications = [
  {
    id: 1,
    name: 'Woolmark Certified',
    icon: '/certifications/woolmark-logo.svg',
    description: 'Approved for safe wool cleaning'
  },
  {
    id: 2,
    name: 'Hohenstein Certified',
    icon: '/certifications/hohenstein-logo.svg',
    description: 'Quality & safety standards'
  },
  {
    id: 3,
    name: 'Udyam Registered',
    icon: '/certifications/udyam-logo.svg',
    description: 'Government certified business'
  },
  {
    id: 4,
    name: 'Eco-Friendly',
    icon: '/certifications/eco-logo.svg',
    description: 'PERC-free, German solutions'
  }
];

const CertificationBadges = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h3 className={`${headingClasses('h3')} text-center mb-8`}>
          Certified for Quality, Safety, and Environmental Standards
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img
                  src={cert.icon}
                  alt={cert.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center"><span class="text-gray-400 text-xs">${cert.name}</span></div>`;
                  }}
                />
              </div>
              <h4 className={`${bodyTextClasses()} font-bold mb-1`}>
                {cert.name}
              </h4>
              <p className={`${bodyTextClasses()} text-gray-600 text-xs`}>
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationBadges;
