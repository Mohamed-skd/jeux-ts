// VARIABLES
export const html: HTMLElement = document.documentElement,
  body: HTMLElement = document.body,
  head: HTMLElement = document.head;

// FUNCTIONS
/**
 * Select an element from the DOM
 * @param {string} tag  Element's css tag
 * @returns {HTMLElement | null}
 */
export function select(tag: string): HTMLElement | null {
  return document.querySelector(tag);
}

/**
 *  Select a group of elements from the DOM
 * @param {string} tag Elements css tag
 * @returns {HTMLElement[]}
 */
export function selectAll(tag: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(tag));
}

/**
 * Create an HTML element
 * @param {string} tag Element's css tag
 * @param {object} attribs List of attributes to add
 * @returns {HTMLElement}
 */
export function create(tag: string, attribs: object = {}): HTMLElement {
  const elem = document.createElement(tag);

  for (const [attr, value] of Object.entries(attribs)) {
    elem.setAttribute(attr, value);
  }
  return elem;
}

/**
 * Modify the class of an HTML element
 * @param {HTMLElement} elem Selected element
 * @param {string} mod Modification - add, delete (del), toggle (tog)
 * @param {string} className Modifier class
 * @return {void}
 */
export function modClass(
  elem: HTMLElement,
  mod: string,
  className: string
): void {
  const modTab: string[] = ["add", "del", "tog"];

  if (mod === modTab[0]) {
    elem.classList.add(className);
  } else if (mod === modTab[1]) {
    elem.classList.remove(className);
  } else if (mod === modTab[2]) {
    elem.classList.toggle(className);
  }
}

/**
 * Scroll to an element in the viewport
 * @param {HTMLElement} elem Selected element
 * @param {HTMLElement} frame Scroll frame (Closest positioned parent, default: window)
 * @param {number} margeX (Optional) Horizontal margin from left (pixels)
 * @param {number} margeY (Optional) Vertical margin from top (pixels)
 * @return {void}
 */
export function goTo(
  elem: HTMLElement,
  frame: (Window & typeof globalThis) | HTMLElement = window,
  margeX: number = 0,
  margeY: number = 0
): void {
  frame.scroll(elem.offsetLeft - margeX, elem.offsetTop - margeY);
}

/**
 * Shuffles string characters
 * @param {string} string String to shuffle
 * @returns {string}
 */
export function shuffle(string: string): string {
  let base: string = "";
  for (let i = 0; i < string.length; i++) {
    const random = Math.floor(Math.random() * string.length);
    base += string[random];
  }
  return base;
}

/**
 * Return a formated string (first letter in uppercase and spaces between words instead of hyphens)
 * @param string Initial string
 * @returns {string}
 */
export function formatText(string: string): string {
  let base = "";
  const uc = string[0].toUpperCase();
  const remainder = string.substring(1);
  base = `${uc}${remainder}`;

  return base.replaceAll("-", " ").trim();
}

/**
 * Return a random integer number
 * @param {number} max Maximum (exclude)
 * @param {number} min Minimum (include, default: 0)
 * @returns {number}
 */
export function random(max: number, min: number = 0): number {
  return Math.floor(Math.random() * max + min);
}
