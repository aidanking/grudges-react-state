import React, { useReducer, createContext, useCallback } from 'react';
import id from 'uuid/v4';
import initialState from './initialState';
import { reducer } from './grudgeReducer';
import { GRUDGE_ADD, GRUDGE_FORGIVE, UNDO, REDO } from './actions';

export const GrudgeContext = createContext();

export const defaultState = {
  past: [],
  present: initialState,
  future: []
};

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const grudges = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id
        }
      });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  const redo = useCallback(() => {
    console.log('REDO');
    dispatch({ type: REDO });
  }, [dispatch]);

  const value = {
    grudges,
    addGrudge,
    toggleForgiveness,
    undo,
    redo,
    isPast,
    isFuture
  };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
