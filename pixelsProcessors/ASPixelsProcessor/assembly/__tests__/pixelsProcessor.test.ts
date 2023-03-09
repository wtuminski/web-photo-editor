import { grayscale, hue, inversion, luminosity, saturation } from '../pixelsProcessor';
import {
  grayscaleOutputStartingIndex,
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

  test('inversion', () => {
    inversion(numberOfRgbaPixels, 0);

    expect(
      memory.compare(outputStartingIndex, inversionOutputStartingIndex, numberOfRgbaPixels),
    ).toBe(0);
  });

  test('hue', () => {
    hue(numberOfRgbaPixels, 50);

    expect(memory.compare(outputStartingIndex, hueOutputStartingIndex, numberOfRgbaPixels)).toBe(0);
  });

  test('saturation', () => {
    saturation(numberOfRgbaPixels, 50);

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
});
