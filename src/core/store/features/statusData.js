export const setRejected = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

export const setPending = ( state ) => {
  state.status = 'pending'
  state.error = null
}