import { Unstable_Grid2 as Grid } from '@mui/material';
import { useState } from 'react';

import { supportedImageFileTypes } from '~/Utils/constants';
import { isSupportedImageFile } from '~/Utils/typeGuards';

import { ImageConfigPane } from './components/ImageConfigPane';
import { ImageDisplaySpace } from './components/ImageDisplaySpace';

export const EditorView: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile>();

  return (
    <Grid display="grid" flex={1} gridTemplateColumns="1fr 4fr">
      <ImageConfigPane
        supportedImageFileTypes={supportedImageFileTypes}
        loadImage={setImageFile}
        isSupportedImageFile={isSupportedImageFile}
      />
      <ImageDisplaySpace imageFile={imageFile} />
    </Grid>
  );
};
