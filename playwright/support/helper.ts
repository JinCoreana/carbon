import type { Locator, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/experimental-ct-react17";

const OPEN_MODAL = '[data-state="open"]';
const CLOSED_MODAL = '[data-state="closed"]';

/**
 * Retrieve a computed style for an element.
 * @param locator The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param cssProp The CSS property for the style to retrieve
 * @returns a Promise for the style value
 * @example await getStyle(locator, "width");
 */
export const getStyle = async (
  locator: Locator,
  cssProp: string
): Promise<string> => {
  return locator.evaluate(
    (el, property) => window.getComputedStyle(el).getPropertyValue(property),
    cssProp
  );
};

/**
 * Check the accessibility rules for an element.
 * @param {Page} page
 * @example await checkAccessibility(page);
 */
export const checkAccessibility = async (page: Page) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
      "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
      "wcag21a", // WCAG 2.1 Level A
      "wcag21aa", // WCAG 2.1 Level AA
      "best-practice", // Best practices endorsed by Deque
    ])
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
};

type OutlineType =
  | "outline"
  | "border"
  | "border-top"
  | "border-bottom"
  | "border-left"
  | "border-right";

/**
 * Asserts if an element has the correct golden outline used as a focus indicator
 * @param element Target element as a Playwright locator
 * @param outlinePixelWidth
 * @param outline
 * @example await checkGoldenOutline(locator);
 */
export const checkGoldenOutline = async (
  element: Locator,
  outlinePixelWidth = "3px",
  outline: OutlineType = "outline"
) => {
  const outlineWidth = await getStyle(element, `${outline}-width`);
  const outlineColor = await getStyle(element, `${outline}-color`);
  const outlineStyle = await getStyle(element, `${outline}-style`);

  expect(outlineWidth).toEqual(outlinePixelWidth);
  expect(outlineColor).toEqual("rgb(255, 188, 25)");
  expect(outlineStyle).toEqual("solid");
};

export const checkElementIsInDOM = async (page: Page, locatorStr: string) => {
  expect(await page.$$(locatorStr)).toHaveLength(1);
};

export const checkElementIsNotInDOM = async (
  page: Page,
  locatorStr: string
) => {
  expect(await page.$$(locatorStr)).toHaveLength(0);
};

export const checkDialogIsInDOM = async (page: Page) => {
  await checkElementIsInDOM(page, OPEN_MODAL);
  await checkElementIsNotInDOM(page, CLOSED_MODAL);
};

export const checkDialogIsNotInDOM = async (page: Page) => {
  await checkElementIsNotInDOM(page, OPEN_MODAL);
  await checkElementIsInDOM(page, CLOSED_MODAL);
};

/**
 * Asserts if an element has event was calledOnce
 * @param callbackData an array with callback data
 * @param eventName {string} event name
 * @example await expectEventWasCalledOnce(messages, "onClick");
 */
export const expectEventWasCalledOnce = async (
  callbackData: string[],
  eventName: string
) => {
  const count = JSON.stringify(callbackData.length);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const callbackName = JSON.stringify(callbackData[0]._reactName);
  expect(count).toBe("1");
  expect(callbackName).toBe(`"${eventName}"`);
};

/**
 * Asserts that event was NOT called
 * @param callbackData an array with callback data
 * @example await expectEventWasNotCalled(messages);
 */
export const expectEventWasNotCalled = async (callbackData: string[]) => {
  const count = JSON.stringify(callbackData.length);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(count).toBe("0");
  expect(callbackData).toEqual([]);
};

/**
 * Creates a safe regExp and uses the .toHaveClass() assertion
 * As there is not a "contains" assertion for the .toHaveClass() assertion
 * @param locatorFunc the locator you'd like to use
 * @param className a className string you'd like to assert against
 * @example await containsClass(exampleLocator(page), "foo");
 */
export const containsClass = async (
  locatorFunc: Locator,
  className: string
) => {
  const escapedClassName = className.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    "\\$&"
  );

  const classNameRegEx = new RegExp(escapedClassName);

  await expect(locatorFunc).toHaveClass(classNameRegEx);
};

const positions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
  eighth: 7,
  ninth: 8,
  tenth: 9,
  eleventh: 10,
  thirteenth: 12,
};

export function positionOfElement(type: keyof typeof positions): number {
  return positions[type];
}

/**
 * Converts from a "matrix(a, b, c, d, e, f)" string output from a CSS transform: rotate
 * to the actual rotation angle, while accounting for rounding errors in the calculation.
 * Adapted from https://css-tricks.com/get-value-of-css-rotation-through-javascript/ */
export function getRotationAngle(cssTransformString: string) {
  const matrixValues = cssTransformString
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map(Number);
  const [a, b] = matrixValues;
  const angleInRadians = Math.atan2(b, a);
  const angleInDegrees = angleInRadians * (180 / Math.PI);
  return Math.round(angleInDegrees);
}

export const assertCssValueIsApproximately = async (
  element: Locator,
  cssProp: string,
  value: number
) => {
  const val = await getStyle(element, cssProp);
  expect(parseInt(val)).toBeGreaterThanOrEqual(value - 2);
  expect(parseInt(val)).toBeLessThanOrEqual(value + 2);
};