import id from 'uuid/v4';
import { GRUDGE_ADD, GRUDGE_FORGIVE } from './actions';
import initialState from './initialState';

export default (state = initialState, action) => {
  if (action.type === GRUDGE_ADD) {
    return [
      {
        id: id(),
        ...action.payload
      },
      ...state
    ];
  }

  if (action.type === GRUDGE_FORGIVE) {
    const id = action.payload.id;
    return state.map((grudge) => {
      if (grudge.id !== id) {
        return grudge;
      }
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }

  return state;
};
