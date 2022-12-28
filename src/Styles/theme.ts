type ColorScheme = 'dark' | 'light';

const lightMode: ColorScheme = 'light';
const darkMode: ColorScheme = 'dark';

const isColorScheme = (value: string): value is ColorScheme =>
  value === lightMode || value === darkMode;
const getColorScheme = (): ColorScheme | undefined => {
  const colorScheme = document.documentElement.getAttribute('data-theme');
  if (colorScheme && isColorScheme(colorScheme)) return colorScheme;
  return undefined;
};
const getDarkModePreference = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;
const setColorSchmeme = (colorScheme: ColorScheme): void =>
  document.documentElement.setAttribute('data-theme', colorScheme);

export const initColorScheme = (): void => {
  const darkModePreference = getDarkModePreference();
  setColorSchmeme(darkModePreference ? darkMode : lightMode);
};

export const toggleColorScheme = () => {
  const currentColorScheme = getColorScheme();
  setColorSchmeme(!currentColorScheme || currentColorScheme === darkMode ? lightMode : darkMode);
};
