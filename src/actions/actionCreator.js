export function createActionCreator(type, actionCreator, metaCreator) {
  return function(...args) {
    return {
      type,
      payload: actionCreator ? actionCreator(...args) : args[0],
      meta: metaCreator ? metaCreator(...args) : null,
    };
  };
}

export function createErrorCreator(type, metaCreator) {
  return function(errorMessage, ...args) {
    return {
      type,
      error: true,
      payload: new Error(errorMessage),
      meta: metaCreator ? metaCreator(...args) : null,
    };
  };
}
