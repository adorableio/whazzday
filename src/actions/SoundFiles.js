var fs = require('react-native-fs');

const loadFiles = async (dir) => {
   const files = await fs.readdir(`${fs.MainBundlePath}/sounds/${dir}/`);
   return files;
};

export const GET_DATE = 'GET_DATE';
export function getDate () {
  return { type: GET_DATE }
}

export const GET_PREFIX = 'GET_PREFIX';
export function getPrefix () {
  return { type: GET_PREFIX }
}

export const LOAD_DAYS_OF_THE_WEEK = 'LOAD_DAYS_OF_THE_WEEK';
export const loadDaysOfTheWeek = async () => {
  const daysOfTheWeek = await loadFiles('daysOfTheWeek');

  return { type: LOAD_DAYS_OF_THE_WEEK, daysOfTheWeek };
};

export const LOAD_DAYS_OF_THE_MONTH = 'LOAD_DAYS_OF_THE_MONTH';
export const loadDaysOfTheMonth = async () => {
  const daysOfTheMonth = await loadFiles('daysOfTheMonth');

  return { type: LOAD_DAYS_OF_THE_MONTH, daysOfTheMonth };
};

export const LOAD_MONTHS = 'LOAD_MONTHS';
export const loadMonths = async () => {
  const months = await loadFiles('months');

  return { type: LOAD_MONTHS, months };
};
export const LOAD_PREFIXES = 'LOAD_PREFIXES';
export const loadPrefixes = async () => {
  const prefixes = await loadFiles('prefixes');

  return { type: LOAD_PREFIXES, prefixes };
};
