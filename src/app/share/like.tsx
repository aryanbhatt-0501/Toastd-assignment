import React, { useState } from 'react';

interface LikeButtonProps {
  initialLikes?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 0 }) => {
  const [likes, setLikes] = useState<number>(initialLikes);

  const handleLike = () => setLikes((prev) => prev + 1);

  return (
    <button
      onClick={handleLike}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
    >
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
