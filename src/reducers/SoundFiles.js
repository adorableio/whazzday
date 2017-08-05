import { filter, sample, random } from 'lodash';

import {
  GET_DATE,
  GET_PREFIX,
  LOAD_DAYS_OF_THE_WEEK,
  LOAD_DAYS_OF_THE_MONTH,
  LOAD_MONTHS,
  LOAD_PREFIXES,
} from '../actions/SoundFiles';

const initialState = {
  currentDate: '',
  currentMonth: '',
  currentPrefix: '',
  daysOfTheWeek: [],
  daysOfTheMonth: [],
  months: [],
  prefixes: [],
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

filterFiles = (collection, index) => {
  return filter(collection, (item) => {
    const rx = new RegExp(`^${index}-`)
    return rx.test(item);
  });
}

const getDate = () => {
};


const SoundFiles = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATE: {
      const { dayOfWeek, dayOfMonth, month } = getDateIndexes();

      const GETTER = [
        () => {
          const months = filterFiles(state.months, month);
          const daysOfTheMonth = filterFiles(state.daysOfTheMonth, dayOfMonth);
          return [
            `months/${sample(months)}`,
            `daysOfTheMonth/${sample(daysOfTheMonth)}`
          ]
        },
        () => {
          const daysOfTheWeek = filterFiles(state.daysOfTheWeek, dayOfWeek);
          return [`daysOfTheWeek/${sample(daysOfTheWeek)}`]
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
      return Object.assign({}, state, {
        month: action.i
      })
    }

    case LOAD_DAYS_OF_THE_WEEK: {
      return {
        ...state,
        daysOfTheWeek: action.daysOfTheWeek,
      };
    }

    case LOAD_DAYS_OF_THE_MONTH: {
      return {
        ...state,
        daysOfTheMonth: action.daysOfTheMonth,
      };
    }

    case LOAD_MONTHS: {
      return {
        ...state,
        months: action.months,
      };
    }

    case LOAD_PREFIXES: {
      return {
        ...state,
        prefixes: action.prefixes,
      };
    }

    default: {
      return state
    }
  }
}

export default SoundFiles;
