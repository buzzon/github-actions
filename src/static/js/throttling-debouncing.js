function throttle(func, time) {
    return function (args) {
        let prevCall = this.lastCall
        this.lastCall = Date.now()
        if (prevCall === undefined || (this.lastCall - prevCall) > t) {
            func(args)
        }
    }
}


let logger_t = (args) => console.log(`My args are ${args}`);
// throttle: call the logger at most once every two seconds
let throttledLogger = throttle(logger_t, 2000); 

throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);


function debounce(f, t) {
    return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= t)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(args), t);
    }
  }
  
  let logger_d = (args) => console.log(`My args are ${args}`);
   // debounce: call the logger when two seconds have elapsed since the last call
  let debouncedLogger = debounce(logger_d, 500);
  
  debouncedLogger([1, 2, 3]);
  debouncedLogger([4, 5, 6]);
  debouncedLogger([7, 8, 9]);
  
  // "My args are 7, 8, 9" - logged after two seconds