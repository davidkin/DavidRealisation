class MyArray {
  constructor(...values) {
    if (values.length === 1 && typeof values[0] === 'number') {
      this.length = values[0];
    } else {
      this.length = values.length;

      for (let i = 0; i < values.length; i++) {
        this[i] = values[i];
      }
    }
  }

  // -------------------------------------

  static from(arg, callback, thisArg) {
    const resultMassive = new MyArray();

    if (callback && thisArg || callback && !thisArg) {
      for (let i = 0; i < arg.length; i++) {
        resultMassive.push(callback.call(thisArg, arg[i], i, arg));
      }

      return resultMassive;
    }

    for (let i = 0; i < arg.length; i++) {
      resultMassive.push(arg[i]);
    }

    return resultMassive;
  }


  push(...values) {
    for (let i = 0; i < values.length; i++) {
      this[this.length] = values[i];
      this.length += 1;
    }

    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return;
    }

    const elem = this[this.length - 1];
    delete this[this.length - 1];

    this.length -= 1;

    return elem;
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArr.push(callback.call(thisArg, this[i], i, this));
    }

    return newArr;
  }

  filter(callback, thisArg) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newArr.push(this[i]);
      }
    }

    return newArr;
  }

  toString() {
    let newStr = '';

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${this[i]},`;
    }

    newStr += this[this.length - 1];

    return this.length === 0 ? '' : newStr;
  }

  reduce(callback, startValue) {
    let acc = startValue === undefined ? this[0] : startValue;

    if (this.length === 0 && !startValue) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    if (this.length === 0) {
      return startValue;
    }

    if (this.length === 1 && !startValue) {
      return this[0];
    }

    if (startValue === undefined) {
      acc = this[0];
    } else {
      acc = callback(startValue, this[0], 0, this);
    }


    for (let i = 1; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }

    return acc;
  }

  sort(callback) {
    let cb = callback;

    if (!cb) {
      cb = (a, b) => {
        const a1 = String(a);
        const b1 = String(b);

        if (a1 > b1) {
          return 1;
        } else if (b1 > a1) {
          return -1;
        } else {
          return 0;
        }
      };
    }

    for (let i = 0; i < this.length; i++) {
      const swapElem = this[i];
      let lastValue = i - 1;

      while (lastValue >= 0 && cb(this[lastValue], swapElem) > 0) {
        this[lastValue + 1] = this[lastValue];
        lastValue -= 1;
      }
      this[lastValue + 1] = swapElem;
    }

    return this;
  }

  find(callback, thisArg) {
    let elemFind = null;

    for (let i = 0; i < this.length; i++) {
      elemFind = this[i];

      if (callback.call(thisArg, this[i], i, this)) {
        return elemFind;
      }
    }
  }

  slice(begin, end) {
    const newArr = new MyArray();

    let start = begin ? begin : 0;
    let finish = end ? end : this.length;

    start = begin < 0 ? this.length + begin : start;
    finish = end < 0 ? this.length + end : finish;

    for (let i = start; i < finish; i++) {
      newArr.push(this[i]);
    }
    return newArr;
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
    case 'string':
      return `Array element ${this[0]} is string`;

    case 'number':
      return this[0];

    default:
      return this[0];
    }
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;


