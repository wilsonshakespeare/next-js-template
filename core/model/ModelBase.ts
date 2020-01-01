import { AnySchema, ValidationError } from 'joi';
import Joi from 'joi-browser';
import { addValuesTo } from '../utils/json';
import { IJoiErrorItem } from '../definitions/Error.d';

export abstract class ModelBase {
  public schema: AnySchema;
  public defaultValues: object;
  private _isValidated: boolean;
  public get isValidated(): boolean {
    return this._isValidated;
  }
  private errors: IJoiErrorItem[];

  constructor(schema: AnySchema, defaultValues: object = {}, data: object) {
    this.schema = schema;
    this.defaultValues = defaultValues;
    this._isValidated = false;
    this.errors = [];
    addValuesTo(this, data);
  }

  public handleErrors(joiError: ValidationError) {
    // Function will create error message object and return the error path
    return joiError.details.map(err => {
      const { path, context, message } = err;
      const errorPath = path.join('.');
      const errorObject: IJoiErrorItem = {
        message,
        key: errorPath,
        value: context.value,
      };
      this.errors.push(errorObject);

      // returns the array of path for the object property that cause error
      return err.path;
    });
  }

  public validate() {
    if (!this._isValidated) {
      // Validation process for primitive data
      Joi.validate(
        this,
        this.schema,
        {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: { objects: true },
        },
        (error, value) => {
          if (error) {
            const errorPaths = this.handleErrors(error);
            this.setDefaultValues(errorPaths, value);

            // Add values to This object if it is an object model data
            addValuesTo(this, value);
          }
        }
      );

      // Remove unusable properties
      delete this.defaultValues;
      delete this.schema;
      this._isValidated = true;
    }

    return this;
  }

  protected setDefaultValues<T>(errorPaths: string[][], value: T) {
    errorPaths.forEach(errPath => {
      // Check if the path for the property is at the nth level of object
      if (errPath.length > 1) {
        let tempThisObj = value[errPath[0]];
        let tempDefault = this.defaultValues[errPath[0]];

        // Slice off the 1st level for looping
        const slicedErrPath = errPath.slice(1, errPath.length);

        // Check if first element is Array, apply Default value for Array
        let arrayObj = Array.isArray(tempThisObj) ? tempDefault : null;

        for (let i = 0; i < slicedErrPath.length; i++) {
          const pathKey = slicedErrPath[i];
          tempDefault =
            tempDefault && tempDefault[pathKey] !== undefined ? tempDefault[pathKey] : null;

          if (Array.isArray(tempThisObj[pathKey])) {
            // if consecutive element is array, replace Default value
            arrayObj = tempDefault;
          }

          // Assigning default value for the given property that cause error
          if (i === slicedErrPath.length - 1) {
            // Check if got default array, if not = apply respective default value
            tempThisObj[pathKey] = arrayObj && arrayObj[pathKey] ? arrayObj[pathKey] : tempDefault;
          }

          // Assigning current This object property for the current path
          // To move on to the next property in This object
          tempThisObj = tempThisObj[pathKey];
        }
      } else {
        // If error property is at the 1st level object, apply default value directly
        value[errPath[0]] =
          this.defaultValues && this.defaultValues[errPath[0]] !== undefined
            ? this.defaultValues[errPath[0]]
            : null;
      }
    });
  }
}
