export const Record = Base => class extends Base {
	get(key) => {
		return this[key];
	}
};

export const Map = {};
export const List = [];

