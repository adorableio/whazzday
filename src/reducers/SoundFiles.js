import { filter, flatten, sample, random } from 'lodash';

import {
  GET_DATE,
  SET_PHRASE,
  GET_PREFIX,
} from '../actions/SoundFiles';

import daysOfTheWeek from '../data/daysOfTheWeek';
import daysOfTheMonth from '../data/daysOfTheMonth';
import months from '../data/months';

const initialState = {
  currentDate: [],
  currentPrefix: {},
  currentPhrase: [],
  daysOfTheWeek: daysOfTheWeek,
  daysOfTheMonth: daysOfTheMonth,
  months: months,
  prefixes: [{
    text: { en: `It's` }, uri: 'sounds/prefixes/its-sb.mp3',
  }],
};

const padWithZero = (num) => {
  if (num < 10) return '0' + num;
  return num.toString();
};

const getDateIndexes = () => {
  const date = new Date();
  const dayOfWeek = padWithZero(date.getDay());
  const dayOfMonth = padWithZero(date.getDate());
  const month = padWithZero(date.getMonth());

  return {
    dayOfWeek,
    dayOfMonth,
    month
  };
};

const filterFiles = (collection, index) => {
  return filter(collection, (item) => {
    const rx = new RegExp(`\/${index}-`)
    return rx.test(item.uri);
  });
};

const SoundFiles = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHRASE: {
      const currentPhrase = flatten([ state.currentPrefix, state.currentDate ])
      return {
        ...state,
        currentPhrase,
      };
    }

    case GET_DATE: {
      const { dayOfWeek, dayOfMonth, month } = getDateIndexes();

      const GETTER = [
        () => {
          const months = filterFiles(state.months, month);
          const daysOfTheMonth = filterFiles(state.daysOfTheMonth, dayOfMonth);
          return [
            sample(months),
            sample(daysOfTheMonth),
          ]
        },
        () => {
          const daysOfTheWeek = filterFiles(state.daysOfTheWeek, dayOfWeek);
          return [sample(daysOfTheWeek)]
        },
      ];

      const fnIndex = random(0, 1);
      const currentDate = GETTER[fnIndex]();

      return {
        ...state,
        currentDate,
      };
    }

    case GET_PREFIX: {
      const currentPrefix = sample(state.prefixes);
      return {
        ...state,
        currentPrefix,
      };
    }

    default: {
      return state
    }
  }
}

export default SoundFiles;
