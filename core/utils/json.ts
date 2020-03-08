import isEmpty from 'lodash/isEmpty';
/**
 * Add keys and values from source object to target object
 * Will log warning (optional) if target and source have the same key
 * @template T
 * @template Object
 * @param {T} targetObject
 * @param {T} sourceObject
 * @param {boolean} [logWarning=false]
 * @returns {void}
 */
export function addValuesTo<T>(
  targetObject: T,
  sourceObject: T,
  logWarning: boolean = false
): void {
  if (typeof targetObject === 'undefined') {
    return;
  }

  if (isEmpty(sourceObject)) {
    return;
  }

  const keys: string[] = Object.keys(sourceObject);
  keys.forEach((key: string) => {
    if (Object.prototype.hasOwnProperty.call(targetObject, key) && logWarning) {
      console.log('Warning: target key existed');
    }
    // Need Param Reassign
    // eslint-disable-next-line
    targetObject[key] = sourceObject[key];
  });
}
