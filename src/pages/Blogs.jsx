import { useState } from 'react'
import BlogModal from '../components/BlogModal'

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState(null)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState(null)

  const handleReadMore = (post) => {
    setSelectedBlogPost(post)
    setIsBlogModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBlogModalOpen(false)
    setSelectedBlogPost(null)
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubscribeStatus('error')
      setTimeout(() => setSubscribeStatus(null), 3000)
      return
    }

    setIsSubscribing(true)
    setSubscribeStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Newsletter subscription:', {
        email,
        timestamp: new Date().toISOString(),
      })
      
      setSubscribeStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setSubscribeStatus('error')
    } finally {
      setIsSubscribing(false)
    }
  }

  const blogPosts = [
    {
      id: 1,
      title: 'How to Remove Stubborn Stains from White Clothes',
      excerpt: 'Learn the best techniques and products to remove tough stains from your white garments without damaging the fabric.',
      content: 'White clothes are notorious for attracting stains, but with the right techniques, you can keep them looking pristine. Start by treating stains immediately - the sooner you address them, the easier they are to remove. For common stains like coffee or wine, blot (don\'t rub) the area and apply a mixture of water and white vinegar. For grease stains, sprinkle cornstarch or talcum powder to absorb the oil before washing. Always check the fabric care label and use appropriate detergents. When washing, use cold water to prevent setting the stain, and consider adding a stain remover or oxygen bleach for tough spots. Air dry in sunlight, as UV rays naturally bleach whites. Remember, prevention is key - treat stains immediately and wash white clothes separately.',
      category: 'Laundry Tips',
      date: 'March 15, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
    {
      id: 2,
      title: 'Understanding Dry Cleaning vs Laundry',
      excerpt: 'Discover the differences between dry cleaning and regular laundry, and when to use each method for your garments.',
      content: 'Dry cleaning and regular laundry serve different purposes, and choosing the right method can extend the life of your clothes. Dry cleaning uses chemical solvents instead of water to clean delicate fabrics that can\'t withstand traditional washing. This method is ideal for silk, wool, cashmere, and garments with intricate details like beading or sequins. Regular laundry uses water and detergent, suitable for cotton, polyester, and most everyday fabrics. Dry cleaning preserves fabric texture and prevents shrinking, while regular washing can cause fading and fabric damage in delicate items. At Laundryman, we use eco-friendly Lagoon technology for dry cleaning, ensuring your delicate garments are cleaned safely. Always check care labels - if it says "dry clean only," trust the manufacturer\'s recommendation to maintain your garment\'s quality and appearance.',
      category: 'Educational',
      date: 'March 10, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
    {
      id: 3,
      title: 'Caring for Your Designer Wear',
      excerpt: 'Essential tips to maintain and care for your expensive designer clothing to keep them looking new for longer.',
      content: 'Designer clothing requires special attention to maintain its luxurious look and feel. Always follow the care instructions on the label - designers include these for a reason. Store designer pieces properly: use padded hangers for delicate items, fold knits and sweaters to prevent stretching, and avoid overcrowding your closet. Invest in garment bags for long-term storage to protect from dust and moths. Never attempt to remove stains yourself on expensive pieces - take them to a professional cleaner immediately. Rotate your designer wardrobe to prevent over-wearing specific items. For dry-clean-only pieces, use a reputable service like Laundryman that specializes in haute couture and designer wear. Proper care not only maintains the garment\'s appearance but also preserves its value. Remember, prevention is always better than restoration when it comes to designer clothing.',
      category: 'Fabric Care',
      date: 'March 5, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
    {
      id: 4,
      title: 'Eco-Friendly Cleaning Solutions',
      excerpt: 'Learn about Laundryman\'s commitment to using eco-friendly cleaning solutions that are safe for you and the environment.',
      content: 'At Laundryman, we believe in sustainable practices that protect both your clothes and the environment. Our eco-friendly approach starts with our advanced Lagoon technology, a Woolmark-certified cleaning method that uses significantly less water and energy than traditional cleaning processes. This technology is completely safe for fabrics, colors, and the environment. We avoid harsh chemicals that can damage fabrics and harm the ecosystem. Our cleaning solutions are biodegradable and free from toxic substances, ensuring your family\'s safety and environmental protection. We also implement water recycling systems and energy-efficient equipment to minimize our carbon footprint. By choosing Laundryman, you\'re not just getting clean clothes - you\'re making a responsible choice for the planet. Our commitment extends to sustainable packaging and waste reduction initiatives throughout our operations.',
      category: 'Sustainability',
      date: 'February 28, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
    {
      id: 5,
      title: 'Winter Garment Care Guide',
      excerpt: 'Proper care and storage tips for your woolens, sweaters, and winter coats to keep them in perfect condition.',
      content: 'Winter garments require special care to maintain their warmth and appearance throughout the season and beyond. Before storing winter clothes, ensure they\'re completely clean - stains and odors can set over time and attract moths. Wash woolens and cashmere carefully using cold water and a gentle detergent, or have them professionally cleaned. Never hang heavy winter coats or sweaters; fold them to prevent stretching and shoulder bumps. Store in breathable containers or garment bags, and add cedar blocks or lavender sachets to repel moths naturally. Avoid plastic storage bags as they can trap moisture and cause mildew. For leather and suede winter coats, professional cleaning is essential to maintain the material\'s quality. Check stored items periodically for any signs of damage or pests. When winter returns, air out your garments before wearing to refresh them. Proper winter garment care ensures your favorite pieces will keep you warm and stylish for many seasons to come.',
      category: 'Seasonal Care',
      date: 'February 20, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
    {
      id: 6,
      title: 'Shoe Cleaning and Maintenance',
      excerpt: 'Professional tips on how to clean and maintain different types of shoes, from leather to canvas to sneakers.',
      content: 'Proper shoe care extends the life of your footwear and keeps them looking their best. Different materials require different approaches. For leather shoes, use a quality leather cleaner and conditioner to prevent cracking and maintain suppleness. Always use a shoe tree when not wearing leather shoes to maintain their shape. Canvas shoes should be spot-cleaned with a gentle brush and mild soap, then air-dried away from direct heat. Suede requires special attention - use a suede brush and eraser for stains, and always protect suede shoes with a waterproof spray. Athletic shoes benefit from regular cleaning with appropriate sports shoe cleaners to prevent odor and maintain cushioning. Rotate your shoes to allow them to dry completely between wears, preventing odor and extending their lifespan. For complex cleaning jobs or valuable footwear, professional shoe cleaning services ensure optimal results. Regular maintenance not only keeps your shoes looking great but also provides better foot support and comfort.',
      category: 'Shoe Care',
      date: 'February 15, 2024',
      image: 'https://via.placeholder.com/400x250?text=Blog+Image'
    },
  ]

  const categories = ['All', 'Laundry Tips', 'Educational', 'Fabric Care', 'Sustainability', 'Seasonal Care', 'Shoe Care']

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1879a2] to-[#145e7d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h1>
          <p className="text-xl">Tips, guides, and insights about laundry and dry cleaning</p>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#1879a2] text-white'
                    : 'bg-white text-gray-700 hover:bg-[#e6f4f8] border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Featured Post</h2>
          {(selectedCategory === 'All' || blogPosts[0].category === selectedCategory) && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <span className="bg-[#e6f4f8] text-[#1879a2] px-3 py-1 rounded-full text-sm font-semibold">
                    {blogPosts[0].category}
                  </span>
                  <h3 className="text-3xl font-bold mt-4 mb-4">{blogPosts[0].title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                  <button 
                    onClick={() => handleReadMore(blogPosts[0])}
                    className="bg-[#1879a2] text-white px-6 py-2 rounded-lg hover:bg-[#145e7d] transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .slice(1)
              .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
              .map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="mt-auto">
                  <button 
                      onClick={() => handleReadMore(post)}
                      className="text-[#1879a2] font-semibold hover:text-[#145e7d] transition-colors"
                  >
                    Read More →
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      <BlogModal 
        isOpen={isBlogModalOpen} 
        onClose={handleCloseModal}
        blogPost={selectedBlogPost}
      />
    </div>
  )
}

