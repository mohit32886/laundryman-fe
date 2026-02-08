import { bodyTextClasses } from '../../utils/fonts';

const RatingBadge = ({ rating = 4.9, count = 2400, theme = 'light' }) => {
  const themeClasses = {
    light: 'bg-white/20 border-white/30 text-white',
    dark: 'bg-white border-gray-200 text-gray-900'
  };

  return (
    <div className={`inline-flex flex-col md:flex-row items-center gap-4 backdrop-blur-md rounded-xl px-8 py-4 border ${themeClasses[theme]}`}>
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
        <span className={`${bodyTextClasses()} font-bold text-xl`}>{rating}/5</span>
      </div>
      <div className={`w-px h-8 ${theme === 'light' ? 'bg-white/30' : 'bg-gray-300'} hidden md:block`} />
      <span className={bodyTextClasses()}>
        from {count.toLocaleString()}+ Happy Customers
      </span>
    </div>
  );
};

export default RatingBadge;
