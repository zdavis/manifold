const errorDispatcher = store => next => action => {  
  let result = next(action);
  if(action.error == true) {
    if(action.payload instanceof Response) {
      store.dispatch({
        type: 'API_ERROR',
        payload: action.payload,
        meta: {
          action: action.type
        }
      });
    }
  }
  return result;
};

export default errorDispatcher;