/* eslint no-param-reassign: ["error", { "props": false }]*/

class MyArray {
  constructor(...value) {
    if (value.length === 1 && typeof value[0] === 'string') {
      this[0] = value[0];
      this.length = value.length;
    } else if (value.length === 1) {
      for (let i = 0; i < value[0]; i++) {
        this[i] = undefined;
      }
      this.length = value[0];
    } else {
      for (let i = 0; i < value.length; i++) {
        this[i] = value[i];
      }

      this.length = value.length;
    }
  }

  // -------------------------------------

  static from(value, callback, thisArg) {
    const newArr = new MyArray();

    if (callback === undefined && thisArg === undefined) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(value[i]);
      }
    }

    if (Boolean(callback) && Boolean(thisArg)) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(callback.call(thisArg, value[i], i, value));
      }
    }

    if (Boolean(callback) && !thisArg) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(callback(value[i], i, value));
      }
    }

    return newArr;
  }

  push(...value) {
    for (let i = 0; i < value.length; i++) {
      this[this.length] = value[i];
      this.length += 1;
    }

    return this.length;
  }

  pop() {
    const elem = this[this.length - 1];

    if (this.length === 0) {
      return;
    }

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

    if (this.length === 0) {
      return '';
    }

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${String(this[i])},`;
    }

    newStr += this[this.length - 1];

    return newStr;
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
    let resultArray = new MyArray();
    let start = begin;
    let finish = end;

    if (!start && !finish) {
      return (resultArray = MyArray.from(this));
    }

    if (start && finish) {
      if (start < 0) {
        start = this.length + start;
      }

      if (finish < 0) {
        finish = this.length + finish;
      }

      for (let i = start; i < finish; i++) {
        resultArray.push(this[i]);
      }

      return resultArray;
    }

    if (!start && finish) {
      if (finish < 0) {
        finish = this.length + finish;
      }

      for (let i = 0; i < finish; i++) {
        resultArray.push(this[i]);
      }

      return resultArray;
    }

    if (start && !finish) {
      if (start < 0) {
        start = this.length + start;
      }

      for (let i = start; i < this.length; i++) {
        resultArray.push(this[i]);
      }

      return resultArray;
    }
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


