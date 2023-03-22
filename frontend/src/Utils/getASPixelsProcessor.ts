import { simd } from 'wasm-feature-detect';

type ASPixelsProcessor = typeof import('@web-photo-editor/as-pixels-processor');

export const getASPixelsProcessor = async (): Promise<ASPixelsProcessor> => {
  // Check if SIMD is supported by the browser - currently Safari doesn't support it
  const isSimdSupported = await simd();
  if (isSimdSupported) {
    const asPixelsProcessor = await import('@web-photo-editor/as-pixels-processor');
    return asPixelsProcessor;
  }
  const asPixelsProcessorInline = await import('@web-photo-editor/as-pixels-processor/inline');

  return {
    ...asPixelsProcessorInline,
    grayscaleSIMD: asPixelsProcessorInline.grayscale,
    inversionSIMD: asPixelsProcessorInline.inversion,
    hueSIMD: asPixelsProcessorInline.hue,
    saturationSIMD: asPixelsProcessorInline.saturation,
    luminositySIMD: asPixelsProcessorInline.luminosity,
  };
};
