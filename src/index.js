class MyArray {
    
    constructor() {

<<<<<<< HEAD
        if (arguments.length === 1 && typeof arguments[0] === 'string') {
            this[0] = arguments[0];
            this.length = arguments.length;
        } else if (arguments.length === 1) {
            for (let i = 0; i < arguments[0]; i++) {
                this[i] = undefined;
            }
            this.length = arguments[0];
        } else {
            for (let i = 0; i < arguments.length; i++) {
                this[i] = arguments[i];
            }   
        
            this.length = arguments.length;
        }

    }

    // -------------------------------------

    static from (value, callback, thisArg) {
        const newArr = new MyArray();

        if (callback == null && thisArg == null) { 
            for (let i = 0; i < value.length; i++) {
                newArr.push(value[i]);
            }
        }

        if (!!callback && !!thisArg) {
            for (let i = 0; i < value.length; i++) {
                newArr.push(callback.call(thisArg, value[i], i, value));
            }
        }

        if (!!callback && !thisArg) {
            for (let i = 0; i < value.length; i++) {
                newArr.push(callback.call(null, value[i], i, value));
            }
        }
        
        return newArr;
    }

    push() {    
        for (let i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
            this.length += 1;
        }
        
        return this.length;
    };

    pop() {
        let elem = this[this.length - 1];
    
        if (this.length === 0) {
            return;
        }
    
       delete this[this.length - 1];
    
       this.length -= 1;
    
       return elem;
    }

    forEach (callback, thisArg) {
        for (let i = 0 ; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };

   map (callback, thisArg) {
        const newArr = new MyArray();

        for (let i = 0; i < this.length; i++) {
            newArr.push(callback.call(thisArg, this[i], i, this));
        }

        return newArr;
    };

    filter (callback, thisArg) {
        const newArr = new MyArray();
        
        for (let i = 0; i < this.length; i++) {
            if(callback.call(thisArg, this[i], i, this)) {
                newArr.push(this[i]);
            }
        }

        return newArr;
    };

    toString() {
        let newStr = '';

        for (let i = 0; i < this.length; i++) {
            newStr += this[i] + ' ';
        }

        return newStr
    }

    reduce (callback, startValue) {
        let acc = startValue === undefined ?  this[0] : startValue;

        for (let i = 0; i < this.length; i++) {
            if (i === 0) {
                continue;
            } else {
                acc = callback(acc, this[i], i, this);
            }
        }

        return acc;
    }

    sort(callback) {

        if (!callback) {
            callback = (a, b) => {
              if (a > b){ 
                return 1;
              } else if (b > a) {
                return -1;
              } else {
                return 0;
              }
            }
          }

        for (let i = 0; i < this.length; i++) {
            let swapElem = this[i]; 
            let lastValue = i - 1;

            while ( lastValue >= 0 && callback(this[lastValue], swapElem) > 0) {
                this[lastValue + 1] = this[lastValue];  
                lastValue--;
            }
            this[lastValue + 1] = swapElem;
        }

        return this;
    }
    
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }

}

export default MyArray;


=======
export default MyArray;
>>>>>>> 2e0ca2c7824dd64db42245c204dce510f0b9b40f
