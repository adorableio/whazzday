export const SET_PHRASE = 'SET_PHRASE';
export const GET_PHRASE = 'GET_PHRASE';
export function getPhrase () {
  return (dispatch) => {
    dispatch({ type: GET_PREFIX });
    dispatch({ type: GET_DATE });
    dispatch({ type: SET_PHRASE });
  }
}

export const GET_DATE = 'GET_DATE';
export function getDate () {
  return { type: GET_DATE }
}

export const GET_PREFIX = 'GET_PREFIX';
export function getPrefix () {
  return { type: GET_PREFIX }
}
