export const Record = Base => class extends Base {
	get(key) => {
		return this[key];
	}

	set(key, value) => {
		this[key] = value;
		return this
	}
};

export const Map = {};
export const List = [];

export class Stack {
	constructor(props = []) {
		if (Array.isArray(props)) {
			this.arr = props
		}
		throw new Error("new Stack Error: props should be an array");
	}

	peek(){
		return this.arr[this.arr.length - 1]
	}

	get length() {
		return this.arr.length;
	}

	toJSON() {
		return this.arr;
	}

	clear() {
		this.arr = [];
		return this;
	}

	pop() {
		this.arr.pop();
		return this;
	}

	push(it) {
		this.arr.push(it);
		return this
	}

	take(amount) {
		const arr = this.arr;
		const length = this.arr.length;
		if (amount >= length) {
			return this
		} else {
			this.arr.splice(0, length - amount);
			return this
		}
	}
}

