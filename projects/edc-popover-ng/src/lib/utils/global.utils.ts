/**
 * Returns true if a value is null or undefined
 *
 * Obs: worth remembering that null is of type 'object' while undefined is of type 'undefined'
 * And null is only loosely equal to itself and undefined, not to the other falsy values
 *
 * @param value the value to check against null or undefined
 */

export const isNil = value => value === undefined || value === null;
// Note: could also use v == null, since null is loosely equal to undefined

/**
 * Copies the defined source properties into the given object,
 * skipping any null or undefined values in the source object.
 *
 * Does not modify target, create a new shallow copy of the target
 * If source is null or a primitive, returns a shallow copy of target
 * If target is null or a primitive, returns null even if source is defined
 *
 * @param target the target object
 * @param src the object containing the source values
 */
export const copyDefinedProperties = <T>(target: T, src: T): T => {
  if (!isObject(target)) {
    return null;
  }
  // Create a shallow copy of the target
  const newTarget = Object.assign({}, target);
  if (!isObject(src)) {
    return newTarget;
  }
  // Copying the defined ones into the new target object
  return Object.keys(src)
    .reduce<T>((memo: T, key: string) => {
      // Copy values from src into target only if they are defined
      if (src.hasOwnProperty(key) && !isNil(src[key])) {
        memo[key] = src[key];
      }
      return memo;
    }, newTarget);
};

/**
 * Check if value is defined and false
 *
 * @param value true if value is defined and equals false
 */
export const isFalse = (value: boolean): boolean => !isNil(value) && !value;

/**
 * Returns true if value is an object not null
 *
 * @param obj to object to check
 */
export const isObject = (obj: any): boolean => typeof obj === 'object' && obj !== null;
