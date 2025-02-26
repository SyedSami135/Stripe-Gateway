import { Star } from 'lucide-react';

const StarRating = ({ rating ,size = 20 ,color="yellow-500"}: { rating: number, size?: number ,color?:string }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const renderStars = () => {
    const stars = [];

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={size} className={`text-${color}`}  fill="currentColor" />
      );
    }

    // Half Star
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={size} className={`text-${color}`} fill="url(#half-gradient)" />
      );
    }

    // Empty Stars
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={size-1} className="text-gray-300 " fill="currentColor"   />
      );
    }

    return stars;
  };

  return (
    <span>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" style={{ stopColor: '#eab308', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex gap-1">
        {renderStars()}
      </span>
    </span>
  );
};

export default StarRating;
