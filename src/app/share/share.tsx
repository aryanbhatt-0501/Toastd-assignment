import React from 'react';

interface ShareButtonProps {
  shareUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 text-white transition duration-200"
    >
      🔗 Share
    </button>
  );
};

export default ShareButton;
