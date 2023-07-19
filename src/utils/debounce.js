export function debounce(fn,wait){
  let timer = null;
  return function(){
      if(timer !== null){
          clearTimeout(timer);
      }
      timer = setTimeout(fn,wait);
  }
}
export function debounces(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, wait);
  };
}