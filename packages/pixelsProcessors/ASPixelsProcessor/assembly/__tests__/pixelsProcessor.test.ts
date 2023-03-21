import { grayscale, hue, inversion, luminosity, saturation } from '../pixelsProcessor';
import {
  grayscale as grayscaleInline,
  hue as hueInline,
  inversion as inversionInline,
  luminosity as luminosityInline,
  saturation as saturationInline,
} from '../pixelsProcessorInline';
import {
  grayscaleSIMD,
  hueSIMD,
  inversionSIMD,
  luminositySIMD,
  saturationSIMD,
} from '../pixelsProcessorSIMD';
import {
  grayscaleOutputStartingIndex,
  grayscaleSIMDOutputStartingIndex,
  hueOutputStartingIndex,
  inversionOutputStartingIndex,
  luminosityOutputStartingIndex,
  numberOfRgbaPixels,
  pixelsProcessorInputArray,
  saturationOutputStartingIndex,
} from './pixelsProcessor.mocks';

const outputStartingIndex = numberOfRgbaPixels;

describe('pixelsProcessor', () => {
  beforeAll(() => {
    pixelsProcessorInputArray.forEach((value, index) => {
      memory.fill(index, value, 1);
    });
  });

  test('it should properly store data in memory', () => {
    expect(grayscaleOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
    expect(grayscaleSIMDOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
    expect(inversionOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
    expect(hueOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
    expect(saturationOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
    expect(luminosityOutputStartingIndex).toBeGreaterThan(numberOfRgbaPixels * 2);
  });

  test('grayscale', () => {
    grayscale(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, grayscaleOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('grayscaleInline', () => {
    grayscaleInline(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, grayscaleOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('grayscaleSIMD', () => {
    grayscaleSIMD(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, grayscaleSIMDOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('inversion', () => {
    inversion(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, inversionOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('inversionInline', () => {
    inversionInline(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, inversionOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('inversionSIMD', () => {
    inversionSIMD(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, inversionOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('hue', () => {
    hue(numberOfRgbaPixels, 50);

    expect(memory.compare(outputStartingIndex, hueOutputStartingIndex, numberOfRgbaPixels)).toBe(0);
  });

  test('hueInline', () => {
    hueInline(numberOfRgbaPixels, 50);

    expect(memory.compare(outputStartingIndex, hueOutputStartingIndex, numberOfRgbaPixels)).toBe(0);
  });

  test('hueSIMD', () => {
    hueSIMD(numberOfRgbaPixels, 50);

    expect(memory.compare(outputStartingIndex, hueOutputStartingIndex, numberOfRgbaPixels)).toBe(0);
  });

  test('saturation', () => {
    saturation(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, saturationOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('saturationInline', () => {
    saturationInline(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, saturationOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('saturationSIMD', () => {
    saturationSIMD(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, saturationOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('luminosity', () => {
    luminosity(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, luminosityOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('luminosityInline', () => {
    luminosityInline(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, luminosityOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('luminositySIMD', () => {
    luminositySIMD(numberOfRgbaPixels, 50);

    expect(
      memory.compare(outputStartingIndex, luminosityOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });
});
