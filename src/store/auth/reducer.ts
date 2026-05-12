import {
  ActionTypes,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS
} from './types';

/**
 * Temporary mock data to maintain app session
 */
function checkLocalStorage(){
  let user = {};
  try {
    // ✅ Fixed: use getItem to match setItem in api.ts
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      user = JSON.parse(stored);
    }
  } catch(e) {}
  return user;
}

const initialState = {
  currentUser: checkLocalStorage()
}

export function authReducer(
  state = initialState,
  action: ActionTypes
): any {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, currentUser: action.currentUser }
    case SIGNOUT_SUCCESS:
      return { ...state, currentUser: {} }
    default:
      return state
  }
}