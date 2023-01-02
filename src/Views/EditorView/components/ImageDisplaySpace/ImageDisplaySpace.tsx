import { useRef } from 'react';

interface Props {
  // TODO - who can know that we use canvas?
  //   drawImage: (image: ImageFile) => void;
}

export const ImageDisplaySpace: React.FC<Props> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
