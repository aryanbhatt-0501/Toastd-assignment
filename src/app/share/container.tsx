import React from 'react';
import LikeButton from './like';
import ShareButton from './share';

interface ReelControlsProps {
  shareUrl: string;
}

const ReelControls: React.FC<ReelControlsProps> = ({ shareUrl }) => {
  return (
    <div className="absolute top-8 right-8 flex flex-col space-y-2">
      <LikeButton />
      <ShareButton shareUrl={shareUrl} />
    </div>
  );
};

export default ReelControls;
