class MyArray<T> {
  length: number;
  [key: number]: T;

  constructor(...values: any[]) {
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

  static from<U>(arg: any, callback: (element?: U, index?: number, pointer?: MyArray<U>) => MyArray<U>, thisArg?: any) {
    const resultMassive = new MyArray();

    if (callback && thisArg || callback && !thisArg) {
      for (let i = 0; i < arg.length; i++) {
        resultMassive[i] = callback.call(thisArg, arg[i], i, arg);
        resultMassive.length += 1;
      }

      return resultMassive;
    }

    for (let i = 0; i < arg.length; i++) {
      resultMassive[i] = arg[i];
      resultMassive.length += 1;
    }

    return resultMassive;
  }

  push(...values: Array<T>): number {
    for (let i = 0; i < values.length; i++) {
      this[this.length] = values[i];
      this.length += 1;
    }

    return this.length;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }

    const elem = this[this.length - 1];
    delete this[this.length - 1];

    this.length -= 1;

    return elem;
  }

  forEach(callback:  (element?: T, index?: number, arr?: MyArray<T>) => any, thisArg?: any): void {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map<U>(callback: (element?: T, index?: number, pointer?: MyArray<T>) => any, thisArg?: any): MyArray<U> {
    const newArr: MyArray<U> = new MyArray();
    newArr.length = this.length;

    for (let i = 0; i < this.length; i++) {
      newArr[i] = callback.call(thisArg, this[i], i, this);
    }

    return newArr;
  }

  filter(callback: (element?: T, index?: number, arr?: MyArray<T>) => boolean, thisArg?: any): MyArray<T> {
    const newArr: MyArray<T> = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newArr[newArr.length] = this[i];
        newArr.length += 1;
      }
    }

    return newArr;
  }

  toString(): string {
    let newStr: string = '';

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${this[i]},`;
    }

    newStr += this[this.length - 1];

    return this.length === 0 ? '' : newStr;
  }

  reduce<U>(callback: (acc?: any, element?: T, index?: number, thisArg?: MyArray<T>) => any, startValue?: any): any {
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

    if (startValue !== undefined) {
      acc = callback(startValue, this[0], 0, this);
    }


    for (let i = 1; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }

    return acc;
  }

  sort(callback?: (a: T, b: T) => number): MyArray<T>  {
    let cb: (a: T, b: T) => number = callback;

    if (!cb) {
      cb = function (a: T, b: T): number {
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

    let swapElem: T = null;
    let lastValue: number = 0;

    for (let i = 0; i < this.length; i++) {
      swapElem = this[i];
      lastValue = i - 1;

      while (lastValue >= 0 && cb(this[lastValue], swapElem) > 0) {
        this[lastValue + 1] = this[lastValue];
        lastValue -= 1;
      }
      this[lastValue + 1] = swapElem;
    }

    return this;
  }

  find(callback: (element?: T, index?: number, arr?: MyArray<T>) => any, thisArg?: any): T | undefined {
    let elemFind = null;

    for (let i = 0; i < this.length; i++) {
      elemFind = this[i];

      if (callback.call(thisArg, this[i], i, this)) {
        return elemFind;
      }
    }
  }

  slice(beginArg?: number, endArg?: number): MyArray<T> {
    const resultArr: MyArray<T> = new MyArray();

    let begin = 0;
    let end = this.length;

    if (beginArg > this.length) {
      return resultArr;
    }

    if (beginArg > 0) {
      begin = beginArg;
    }

    if (beginArg < 0 && Math.abs(beginArg) < this.length) {
      begin = this.length + beginArg;
    }

    if (endArg >= 0 && endArg <= this.length) {
      end = endArg;
    }

    if (endArg < 0) {
      end = this.length + endArg;
    }

    for (let i = begin; i < end; i++) {
      resultArr[resultArr.length] = this[i];
      resultArr.length += 1;
    }

    return resultArr;
  }

  [Symbol.toPrimitive](hint: string): string | T {
    switch (hint) {
    case 'string':
      return `Array element ${this[0]} is string`;

    case 'number':
      return this[0];

    default:
      return this[0];
    }
  }

  * [Symbol.iterator](): object  {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}
  
export default MyArray;