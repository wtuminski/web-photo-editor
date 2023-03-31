import { ImageFiltersValues, ImageFilterType } from './types';

declare global {
  interface Window {
    measureImageFiltersPerformance: (imageFilterType: ImageFilterType, value?: number) => void;
    collectPerformanceMeasures: () => void;
    collectedPerformanceMeasures: { [key: string]: number[] };
  }
}

let canMeasurePerformance = false;
const usedPerformanceNames: string[] = [];

const collectPerformanceMeasures = () => {
  // eslint-disable-next-line immutable/no-mutation
  window.collectedPerformanceMeasures = usedPerformanceNames.reduce(
    (collectedPerformanceMeasures, currentPerformanceName) => {
      const performanceEntries = performance.getEntriesByName(currentPerformanceName);
      return {
        ...collectedPerformanceMeasures,
        [currentPerformanceName]: performanceEntries.map(entry => entry.duration),
      };
    },
    {},
  );
  performance.clearMeasures();
};

export const prepareImageFiltersPerformanceMeasurer = (
  updateImageFilters: (imageFilterValue: Partial<ImageFiltersValues>) => void,
) => {
  const measureImageFiltersPerformance = (imageFilterType: ImageFilterType, value = -100) => {
    if (value > 100) {
      canMeasurePerformance = false;
      return;
    }
    canMeasurePerformance ||= true;
    updateImageFilters({ [imageFilterType]: value });
    // timeout is necessary to allow browser to perform previous filter
    setTimeout(() => measureImageFiltersPerformance(imageFilterType, value + 10), 300);
  };

  /* eslint-disable immutable/no-mutation */
  window.measureImageFiltersPerformance = measureImageFiltersPerformance;
  window.collectPerformanceMeasures = collectPerformanceMeasures;
  /* eslint-enable immutable/no-mutation */
};

export const withPerformanceMeasure = <Params extends any[], CallbackReturnType>(
  performanceName: string,
  callback: (...params: Params) => CallbackReturnType,
): ((...params: Params) => CallbackReturnType) => {
  usedPerformanceNames.push(performanceName);
  return (...params) => {
    if (!canMeasurePerformance) return callback(...params);

    performance.mark('start');
    const returnValue = callback(...params);
    performance.mark('end');
    performance.measure(performanceName, 'start', 'end');
    return returnValue;
  };
};
