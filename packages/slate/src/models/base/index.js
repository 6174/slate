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

