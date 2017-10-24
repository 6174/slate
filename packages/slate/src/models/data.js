
import isPlainObject from 'is-plain-object'
import MODEL_TYPES from "./types";
/**
 * Data.
 *
 * This isn't an immutable record, it's just a thin wrapper around `Map` so that
 * we can allow for more convenient creation.
 *
 * @type {Object}
 */

class Data {
  constructor(props) {
    for (let attr in props) {
      this[attr] = props[attr];
    }  
  }

  /**
   * Create a new `Data` with `attrs`.
   *
   * @param {Object|Data|Map} attrs
   * @return {Data} data
   */

  static create(attrs = {}) {
    if (Data.isData(attrs)) {
      return attrs;
    }

    if (isPlainObject(attrs)) {
      return new Data(attrs)
    }

    throw new Error(`\`Data.create\` only accepts objects or maps, but you passed it: ${attrs}`)
  }

  /**
   * Create a `Data` from a JSON `object`.
   *
   * @param {Object} object
   * @return {Data}
   */

  static fromJSON(object) {
    return new Data(object)
  }

  /**
   * Check if a `value` is `Data`
   *
   * @param {Object|Data} value
   * @return {Boolean}
   */

  static isData(value) {
    return !!(value && value[MODEL_TYPES.DATA])
  }

  /**
   * Alias `fromJS`.
   */

  static fromJS = Data.fromJSON

}

Data.prototype[MODEL_TYPES.DATA] = true


/**
 * Export.
 *
 * @type {Object}
 */

export default Data
