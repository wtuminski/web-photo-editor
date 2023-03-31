# web-photo-editor

## How to use:
1. Prepare dependencies: `yarn`
2. Run
- dev: `yarn dev`
- start:
  1. `yarn build`
  2. `yarn start`

## How to measure performance:
1. Run the app in development or production mode
2. Open the app in your preferred browser
3. Open DevTools in the browser
4. Select an image you want to measure the performance on
5. Select the preferred filter and variant
6. Invoke the `measureImageFiltersPerformance` function in the console, as an argument pass the name of the filter you selected
7. Continue steps 5 and 6 until you have measured all the filters and variants you want
8. In the end, invoke the `collectPerformanceMeasures` function in the console and copy created JSON by invoking `copy(collectedPerformanceMeasures)`