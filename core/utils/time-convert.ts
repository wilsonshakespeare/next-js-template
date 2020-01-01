export enum Format {
  MILISECONDS = 1, // bitwise 1
  SECONDS = 2, // bitwise 10
  MINS = 6, // bitwise 110
  HOURS = 14, // bitwise 1110
  DAYS = 30 // bitwise 11110
}

export default class TimeConverter {
  public static target(target: Format): TimeConverter {
    return new TimeConverter(target);
  }

  public static getBaseValue(format: Format) {
    const value =
      ((format & Format.SECONDS) === Format.SECONDS ? 1000 : 1) *
      ((format & Format.MINS) === Format.MINS ? 60 : 1) *
      ((format & Format.HOURS) === Format.HOURS ? 60 : 1) *
      ((format & Format.DAYS) === Format.DAYS ? 24 : 1);

    return value;
  }

  // this is in miliseconds
  private _value: number;
  private _baseValue: number;

  constructor(target: Format) {
    this._baseValue = TimeConverter.getBaseValue(target);
    this._value = 0;
  }

  public add(format: Format, value: number): TimeConverter {
    this._value += value * TimeConverter.getBaseValue(format);
    return this;
  }

  public from(format: Format, value: number): number {
    this._value = value * TimeConverter.getBaseValue(format);
    return this.getValue();
  }

  public getValue(hasDecimal: boolean = true): number {
    const value = this._value / this._baseValue;
    return hasDecimal ? value : Math.floor(value);
  }
}
