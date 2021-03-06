
/**
 * Prevent circular dependencies.
 */

import './document'

/**
 * Dependencies.
 */

import isPlainObject from 'is-plain-object'
import { List, Map, Record } from './base'

import Node from './node'
import MODEL_TYPES from '../constants/model-types'
import generateKey from '../utils/generate-key'

/**
 * Default properties.
 *
 * @type {Object}
 */

const DEFAULTS = {
  data: {},
  isVoid: false,
  key: undefined,
  nodes: {},
  type: undefined,
}

/**
 * Inline.
 *
 * @type {Inline}
 */

class Inline extends Record(DEFAULTS) {

  /**
   * Create a new `Inline` with `attrs`.
   *
   * @param {Object|String|Inline} attrs
   * @return {Inline}
   */

  static create(attrs = {}) {
    if (Inline.isInline(attrs)) {
      return attrs
    }

    if (typeof attrs == 'string') {
      attrs = { type: attrs }
    }

    if (isPlainObject(attrs)) {
      return Inline.fromJSON(attrs)
    }

    throw new Error(`\`Inline.create\` only accepts objects, strings or inlines, but you passed it: ${attrs}`)
  }

  /**
   * Create a list of `Inlines` from an array.
   *
   * @param {Array<Inline|Object>|List<Inline|Object>} elements
   * @return {List<Inline>}
   */

  static createList(elements = []) {
    if (Array.isArray(elements)) {
      return elements.map(Inline.create)
    }

    throw new Error(`\`Inline.createList\` only accepts arrays or lists, but you passed it: ${elements}`)
  }

  /**
   * Create a `Inline` from a JSON `object`.
   *
   * @param {Object|Inline} object
   * @return {Inline}
   */

  static fromJSON(object) {
    if (Inline.isInline(object)) {
      return object
    }

    const {
      data = {},
      isVoid = false,
      key = generateKey(),
      nodes = [],
      type,
    } = object

    if (typeof type != 'string') {
      throw new Error('`Inline.fromJS` requires a `type` string.')
    }

    const inline = new Inline({
      key,
      type,
      isVoid: !!isVoid,
      data,
      nodes: nodes.map(Node.fromJSON),
    })

    return inline
  }

  /**
   * Alias `fromJS`.
   */

  static fromJS = Inline.fromJSON

  /**
   * Check if a `value` is a `Inline`.
   *
   * @param {Any} value
   * @return {Boolean}
   */

  static isInline(value) {
    return !!(value && value[MODEL_TYPES.INLINE])
  }

  /**
   * Check if a `value` is a list of inlines.
   *
   * @param {Any} value
   * @return {Boolean}
   */

  static isInlineList(value) {
    return Array.isArray(value) && value.every(item => Inline.isInline(item))
  }

  /**
   * Get the node's kind.
   *
   * @return {String}
   */

  get kind() {
    return 'inline'
  }

  /**
   * Check if the inline is empty.
   *
   * @return {Boolean}
   */

  get isEmpty() {
    return this.text == ''
  }

  /**
   * Get the concatenated text of all the inline's children.
   *
   * @return {String}
   */

  get text() {
    return this.getText()
  }

  /**
   * Return a JSON representation of the inline.
   *
   * @param {Object} options
   * @return {Object}
   */

  toJSON(options = {}) {
    const object = {
      data: this.data,
      key: this.key,
      kind: this.kind,
      isVoid: this.isVoid,
      type: this.type,
      nodes: this.nodes.map(n => n.toJSON(options)),
    }

    if (!options.preserveKeys) {
      delete object.key
    }

    return object
  }

  /**
   * Alias `toJS`.
   */

  toJS(options) {
    return this.toJSON(options)
  }

}

/**
 * Attach a pseudo-symbol for type checking.
 */

Inline.prototype[MODEL_TYPES.INLINE] = true

/**
 * Mix in `Node` methods.
 */

Object.getOwnPropertyNames(Node.prototype).forEach((method) => {
  if (method == 'constructor') return
  Inline.prototype[method] = Node.prototype[method]
})

/**
 * Export.
 *
 * @type {Inline}
 */

export default Inline
