import { describe, expect, test } from 'vitest';

import { grayscale, hue, inversion, luminosity, saturation } from '../pixelsProcessor';
import {
  grayscale as grayscaleInline,
  hue as hueInline,
  inversion as inversionInline,
  luminosity as luminosityInline,
  saturation as saturationInline,
} from '../pixelsProcessorInline';
import {
  grayscaleOutputArray,
  hueOutputArray,
  inversionOutputArray,
  luminosityOutputArray,
  pixelsProcessorInputArray,
  saturationOutputArray,
} from './pixelsProcessor.mocks';

describe('pixelsProcessor', () => {
  test('grayscale', () => {
    const outputArray = grayscale(pixelsProcessorInputArray, 0);

    expect(outputArray).toStrictEqual(grayscaleOutputArray);
  });

  test('grayscaleInline', () => {
    const outputArray = grayscaleInline(pixelsProcessorInputArray, 0);

    expect(outputArray).toStrictEqual(grayscaleOutputArray);
  });

  test('inversion', () => {
    const outputArray = inversion(pixelsProcessorInputArray, 0);

    expect(outputArray).toStrictEqual(inversionOutputArray);
  });

  test('inversionInline', () => {
    const outputArray = inversionInline(pixelsProcessorInputArray, 0);

    expect(outputArray).toStrictEqual(inversionOutputArray);
  });

  test('hue', () => {
    const outputArray = hue(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(hueOutputArray);
  });

  test('hueInline', () => {
    const outputArray = hueInline(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(hueOutputArray);
  });

  test('saturation', () => {
    const outputArray = saturation(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(saturationOutputArray);
  });

  test('saturationInline', () => {
    const outputArray = saturationInline(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(saturationOutputArray);
  });

  test('luminosity', () => {
    const outputArray = luminosity(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(luminosityOutputArray);
  });

  test('luminosityInline', () => {
    const outputArray = luminosityInline(pixelsProcessorInputArray, 50);

    expect(outputArray).toStrictEqual(luminosityOutputArray);
  });
});
