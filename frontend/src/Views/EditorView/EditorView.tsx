import { Unstable_Grid2 as Grid } from '@mui/material';
import { useRef, useState } from 'react';

import { useEditImage } from '~/Hooks';
import { supportedImageFileTypes } from '~/Utils/constants';
import { isSupportedImageFile } from '~/Utils/typeGuards';
import { ImageFile } from '~/Utils/types';

import { ImageConfigPane } from './components/ImageConfigPane';
import { ImageDisplaySpace } from './components/ImageDisplaySpace';

export const EditorView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);

  const {
    imageFilters,
    setImageFilterValue,
    selectedImageFilter,
    setSelectedImageFilter,
    isImageFilterInProgress,
  } = useEditImage({
    canvas: canvasRef.current,
    imageFile,
  });

  return (
    <Grid
      display="grid"
      flex={1}
      gridTemplateColumns="1fr 4fr"
      sx={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <ImageConfigPane
        imageFilters={imageFilters}
        setImageFilterValue={setImageFilterValue}
        selectedImageFilter={selectedImageFilter}
        setSelectedImageFilter={setSelectedImageFilter}
        supportedImageFileTypes={supportedImageFileTypes}
        isSupportedImageFile={isSupportedImageFile}
        loadImage={setImageFile}
        isImageFilterInProgress={isImageFilterInProgress}
      />
      <ImageDisplaySpace canvasRef={canvasRef} />
    </Grid>
  );
};
