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
      className="p-2 text-white transition duration-200"
    >
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
