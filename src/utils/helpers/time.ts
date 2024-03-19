/**
 * @param {number} n - number of weeks
 * @returns {number}
 * @returns The number of milliseconds in n weeks
 * @example weeks(1) // 604800000
 */

export const weeks = (n: number) => days(n * 7);

/**
 * @param {number} n - number of days
 * @returns {number}
 * @returns The number of milliseconds in n days
 * @example days(1) // 86400000
 *
 */

export const days = (n: number) => hours(n * 24);

/**
 * @param {number} n - number of hours
 * @returns {number}
 * @returns The number of milliseconds in n hours
 * @example hours(1) // 3600000
 */

export const hours = (n: number) => minutes(n * 60);

/**
 * @param {number} n - number of minutes
 * @returns {number}
 * @returns The number of milliseconds in n minutes
 * @example minutes(1) // 60000
 */

export const minutes = (n: number) => seconds(n * 60);

/**
 * @param {number} n - number of seconds
 * @returns {number}
 * @returns The number of milliseconds in n seconds
 * @example seconds(1) // 1000
 */

export const seconds = (n: number) => n * 1000;

export const checkIfTimeIsLessThan90Seconds = (date: Date) => {
  const now = new Date();

  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  return diffInSeconds < 90;
};
