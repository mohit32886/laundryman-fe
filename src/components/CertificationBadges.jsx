import { motion } from 'framer-motion';

const certifications = [
  {
    id: 1,
    name: 'Woolmark Certified',
    description: 'Approved for safe wool & luxury garment cleaning',
    badgeColor: 'from-amber-500 to-yellow-600',
    icon: (
      <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" opacity="0.15"/>
        <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 8.5a2.5 2.5 0 115 0c0 1.38-1.12 2.5-2.5 3.5-1.38-1-2.5-2.12-2.5-3.5zm2.5 8a1 1 0 100-2 1 1 0 000 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 12c1.5 0 3-1 3-3S8 6 6.5 6 3.5 7 3.5 9s1.5 3 3 3zm11 0c-1.5 0-3-1-3-3s1.5-3 3-3 3 1 3 3-1.5 3-3 3z" opacity="0.5"/>
      </svg>
    )
  },
  {
    id: 2,
    name: 'Hohenstein Certified',
    description: 'German OEKO-TEX® quality & safety standards',
    badgeColor: 'from-blue-600 to-cyan-500',
    icon: (
      <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z" fill="currentColor" opacity="0.15"/>
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    name: 'Udyam Registered',
    description: 'Govt of India MSME Registered Business',
    badgeColor: 'from-orange-500 to-emerald-600',
    icon: (
      <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" />
        <circle cx="12" cy="12" r="9" strokeWidth="2"/>
        <path d="M12 7v10M7 12h10" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 4,
    name: '100% Eco-Friendly',
    description: 'PERC-free, German organic hydrocarbon solutions',
    badgeColor: 'from-emerald-500 to-teal-600',
    icon: (
      <svg className="w-10 h-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="currentColor" opacity="0.15"/>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8a4 4 0 014 4c0 2.5-4 6-4 6s-4-3.5-4-6a4 4 0 014-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const CertificationBadges = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 border border-cyan-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            🏆 Industry Leading Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certified for Quality, Safety & Environmental Standards
          </h2>
          <p className="text-slate-600 mt-2 text-base font-light max-w-xl mx-auto">
            Internationally audited fabric care technology & government registered excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-slate-200/80 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 mb-4 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/60 shadow-inner group-hover:scale-110 transition-transform">
                {cert.icon}
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                {cert.name}
              </h4>
              <p className="text-slate-600 text-xs font-light leading-relaxed">
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
