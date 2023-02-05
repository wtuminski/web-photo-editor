import { isString } from './typeGuards';

const isHTMLCanvasElement = (element: unknown): element is HTMLCanvasElement =>
  element instanceof HTMLCanvasElement;

export function get2dContext(selector?: string): CanvasRenderingContext2D | null;
export function get2dContext(element: HTMLCanvasElement): CanvasRenderingContext2D | null;
export function get2dContext(
  selectorOrElement?: string | HTMLCanvasElement,
): CanvasRenderingContext2D | null {
  const selector = isString(selectorOrElement) ? selectorOrElement : 'canvas';
  const element = isHTMLCanvasElement(selectorOrElement)
    ? selectorOrElement
    : document.querySelector(selector);
  return (isHTMLCanvasElement(element) && element.getContext('2d')) || null;
}
