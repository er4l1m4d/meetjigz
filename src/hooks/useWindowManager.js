import { useCallback, useReducer } from 'react'

const INITIAL_Z_INDEX = 20

function windowReducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const nextZIndex = state.topZIndex + 1
      return {
        ...state,
        topZIndex: nextZIndex,
        windows: {
          ...state.windows,
          [action.id]: { open: true, zIndex: nextZIndex },
        },
      }
    }
    case 'CLOSE':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], open: false },
        },
      }
    case 'FOCUS': {
      const nextZIndex = state.topZIndex + 1
      return {
        ...state,
        topZIndex: nextZIndex,
        windows: {
          ...state.windows,
          [action.id]: { ...state.windows[action.id], zIndex: nextZIndex },
        },
      }
    }
    default:
      return state
  }
}

function getInitialState(initialOpen) {
  const windows = {}
  let zIndex = INITIAL_Z_INDEX
  for (const id of initialOpen) {
    zIndex += 1
    windows[id] = { open: true, zIndex }
  }
  return { windows, topZIndex: zIndex }
}

export function useWindowManager(initialOpen = []) {
  const [state, dispatch] = useReducer(windowReducer, initialOpen, getInitialState)

  const openWindow = useCallback((id) => dispatch({ type: 'OPEN', id }), [])
  const closeWindow = useCallback((id) => dispatch({ type: 'CLOSE', id }), [])
  const focusWindow = useCallback((id) => dispatch({ type: 'FOCUS', id }), [])

  const getWindow = useCallback(
    (id) => state.windows[id] ?? { open: false, zIndex: INITIAL_Z_INDEX },
    [state.windows],
  )

  return { openWindow, closeWindow, focusWindow, getWindow }
}
