import id from 'uuid/v4';
import { defaultState } from './GrudgeContext';
import { GRUDGE_ADD, GRUDGE_FORGIVE, UNDO, REDO } from './actions';

export const reducer = (state = defaultState, action) => {
  const newPresent = [
    {
      id: id(),
      ...action.payload
    },
    ...state.present
  ];
  if (action.type === GRUDGE_ADD) {
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  }

  if (action.type === GRUDGE_FORGIVE) {
    const id = action.payload.id;
    const newPresent = state.present.map((grudge) => {
      if (grudge.id !== id) {
        return grudge;
      }
      return { ...grudge, forgiven: !grudge.forgiven };
    });
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [state.present, ...state.future]
    };
  }

  if (action.type === UNDO) {
    const [newPresent, ...NewPast] = state.past;

    return {
      past: NewPast,
      present: newPresent,
      future: [state.present, ...state.future]
    };
  }

  if (action.type === REDO) {
    const [newPresent, ...newFuture] = state.future;
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: newFuture
    };
  }

  return state;
};
