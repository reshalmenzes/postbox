import { CLOSE_MODAL, OPEN_MODAL, ModalProps, ActionTypes } from './types'

const initialState: any = {
  data: {
    open: false
  }
}

export function modalReducer(
  state = initialState,
  action: ActionTypes
): any {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, data: { ...action.data, open: true } };

    case CLOSE_MODAL:
      return { ...state, data: { open: false } };

    default:
      return state;  // ✅ don't touch modal state for unrelated actions
  }
}