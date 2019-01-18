export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;

export const Colors = {
  DEFAULT: 0,
  AQUA: 1752220,
  GREEN: 3066993,
  BLUE: 3447003,
  PURPLE: 10181046,
  GOLD: 15844367,
  ORANGE: 15105570,
  RED: 15158332,
  GREY: 9807270,
  DARKER_GREY: 8359053,
  NAVY: 3426654,
  DARK_AQUA: 1146986,
  DARK_GREEN: 2067276,
  DARK_BLUE: 2123412,
  DARK_PURPLE: 7419530,
  DARK_GOLD: 12745742,
  DARK_ORANGE: 11027200,
  DARK_RED: 10038562,
  DARK_GREY: 9936031,
  LIGHT_GREY: 12370112,
  DARK_NAVY: 2899536,
};

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * max - min) + min;
}

export function file_ext(filename): string {
  if (!filename) return '';
  const ext = (/[^./\\]*$/.exec(filename) || [''])[0];
  return ext.toLowerCase();
}

// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

/**
 * Split a string by its latest space character in a range from the character 0 to the selected one.
 * @param {string} str    The text to split.
 * @param {number} length The length of the desired string.
 * @returns {string}
 * @static
 */
export function splitText(str, length) {
  const x = str.substring(0, length).lastIndexOf(' ');
  const pos = x === -1 ? length : x;
  return str.substring(0, pos);
}

/**
 * Show time duration in an un-trimmed h:mm:ss format.
 * @param {number} duration Duration in milliseconds.
 * @returns {string}
 */
export function showSeconds(duration) {
  const seconds = Math.floor(duration / SECOND) % 60;
  if (duration < MINUTE) return seconds === 1 ? 'a second' : `${seconds} seconds`;

  const minutes = Math.floor(duration / MINUTE) % 60;
  let output = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (duration >= HOUR) {
    const hours = Math.floor(duration / HOUR);
    output = `${hours.toString().padStart(2, '0')}:${output}`;
  }

  return output;
}
