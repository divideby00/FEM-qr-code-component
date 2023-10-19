const debounce = function (func, threshold, execAsap) {
  let timeout;

  return function debounced() {
    const obj = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    function delayed() {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, args);
    }
    timeout = setTimeout(delayed, threshold || 100);
  };
};

export default debounce;
