import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../config/colors'

export default function BlogModal({ isOpen, onClose, blogPost }) {
  if (!isOpen || !blogPost) return null

  const handleClose = () => {
    onClose()
  }

  // Render different section types
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'intro':
        return (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[#1879a2] first-letter:mr-2 first-letter:float-left whitespace-pre-line">
            {section.content}
          </p>
        )
      
      case 'heading':
        return (
          <h2 key={index} className={`text-2xl font-bold text-[${colors.primary.DEFAULT}] mt-8 mb-4 pb-2 border-b-2 border-[${colors.primary.light}]/30`}>
            {section.content}
          </h2>
        )
      
      case 'subheading':
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {section.content}
          </h3>
        )
      
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
            {section.content}
          </p>
        )
      
      case 'tip':
        return (
          <div key={index} className={`bg-[${colors.bg.light}] border-l-4 border-[${colors.primary.DEFAULT}] p-4 rounded-r-lg my-6`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-[#1879a2] mb-1">Pro Tip</p>
                <p className="text-gray-700">{section.content}</p>
              </div>
            </div>
          </div>
        )
      
      case 'warning':
        return (
          <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg my-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-red-700 mb-1">Important</p>
                <p className="text-red-800">{section.content}</p>
              </div>
            </div>
          </div>
        )
      
      case 'steps':
        return (
          <div key={index} className="my-6">
            <p className="font-semibold text-gray-800 mb-3">{section.title}</p>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-[${colors.primary.DEFAULT}] text-white text-sm font-bold flex items-center justify-center`}>
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-0.5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'checklist':
        return (
          <div key={index} className="my-6 bg-gray-50 rounded-xl p-5">
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-[${colors.primary.light}] text-white flex items-center justify-center`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'timeline':
        return (
          <div key={index} className="my-6">
            <p className="font-semibold text-gray-800 mb-4">{section.title}</p>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-bold ${
                    item.color === 'green' ? 'bg-green-100 text-green-700' :
                    item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    item.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.time}
                  </span>
                  <p className="text-gray-700">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'table':
        return (
          <div key={index} className="my-6 overflow-x-auto">
            <p className="font-semibold text-gray-800 mb-3">{section.title}</p>
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className={`bg-[${colors.primary.DEFAULT}] text-white`}>
                  {section.headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-700 border-t border-gray-200">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      case 'cta':
        return (
          <div key={index} className={`my-8 bg-gradient-to-br from-[${colors.primary.DEFAULT}] to-[${colors.primary.dark}] text-white rounded-2xl p-6 md:p-8`}>
            <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
          </div>
        )
      
      case 'summary':
        return (
          <div key={index} className={`my-6 bg-gradient-to-r from-[${colors.bg.light}] to-white rounded-xl p-6 border border-[${colors.primary.light}]/30`}>
            <p className={`font-bold text-[${colors.primary.DEFAULT}] mb-4 text-lg`}>{section.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`text-[${colors.primary.light}]`}>✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className={`absolute top-4 right-4 z-20 text-white hover:text-gray-200 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Hero Image with Overlay */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[${colors.primary.DEFAULT}] to-[${colors.primary.dark}]`}>
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <span className={`inline-block bg-[${colors.primary.light}] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-3 w-fit`}>
                      {blogPost.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                      {blogPost.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-3 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {blogPost.date}
                      </span>
                      {blogPost.readTime && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {blogPost.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10">
                  {/* Render sections if available, otherwise fallback to simple content */}
                  {blogPost.sections ? (
                    blogPost.sections.map((section, index) => renderSection(section, index))
                  ) : (
                    <>
                      {/* Excerpt */}
                      <p className="text-lg text-gray-600 mb-6 font-medium italic">
                        {blogPost.excerpt}
                      </p>

                      {/* Full Content */}
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {blogPost.content}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Share Section */}
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-gray-600 font-medium">Found this helpful? Share it!</p>
                      <div className="flex gap-3">
                        <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </button>
                        <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </button>
                        <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
