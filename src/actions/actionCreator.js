export function createActionCreator(type, actionCreator, metaCreator) {
  return function(...args) {
    return {
      type,
      payload: actionCreator ? actionCreator(...args) : args[0],
      meta: metaCreator ? metaCreator(...args) : null,
    };
  };
}

export function createErrorCreator(type) {
  return function(errorMessage) {
    return { type, error: true, payload: new Error(errorMessage) };
  };
}
