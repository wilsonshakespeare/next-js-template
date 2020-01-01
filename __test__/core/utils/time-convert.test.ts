import TimeConverter, { Format } from '@core/utils/time-convert';

describe('milisecs', () => {
  it('should get milisecs: from', () => {
    expect(TimeConverter.target(Format.MILISECONDS).from(Format.MILISECONDS, 1234)).toBe(1234);
    expect(TimeConverter.target(Format.MILISECONDS).from(Format.SECONDS, 123)).toBe(123000);
    expect(TimeConverter.target(Format.MILISECONDS).from(Format.MINS, 3)).toBe(180000);
    expect(TimeConverter.target(Format.MILISECONDS).from(Format.HOURS, 3)).toBe(3 * 60 * 60 * 1000);
    expect(TimeConverter.target(Format.MILISECONDS).from(Format.DAYS, 3)).toBe(
      3 * 24 * 60 * 60 * 1000
    );
  });

  it('should get secs: from', () => {
    expect(TimeConverter.target(Format.SECONDS).from(Format.MILISECONDS, 1234)).toBe(1.234);
    expect(TimeConverter.target(Format.SECONDS).from(Format.SECONDS, 123)).toBe(123);
    expect(TimeConverter.target(Format.SECONDS).from(Format.MINS, 3)).toBe(180);
    expect(TimeConverter.target(Format.SECONDS).from(Format.HOURS, 3)).toBe(3 * 60 * 60);
    expect(TimeConverter.target(Format.SECONDS).from(Format.DAYS, 3)).toBe(3 * 24 * 60 * 60);
  });

  it('should get mins: from', () => {
    expect(TimeConverter.target(Format.MINS).from(Format.MILISECONDS, 1200)).toBe(0.02);
    expect(TimeConverter.target(Format.MINS).from(Format.SECONDS, 123)).toBe(2.05);
    expect(TimeConverter.target(Format.MINS).from(Format.MINS, 3)).toBe(3);
    expect(TimeConverter.target(Format.MINS).from(Format.HOURS, 3)).toBe(3 * 60);
    expect(TimeConverter.target(Format.MINS).from(Format.DAYS, 3)).toBe(3 * 24 * 60);
  });

  it('should get hours: from', () => {
    expect(TimeConverter.target(Format.HOURS).from(Format.MILISECONDS, 3600)).toBe(0.001);
    expect(TimeConverter.target(Format.HOURS).from(Format.SECONDS, 3600)).toBe(1);
    expect(TimeConverter.target(Format.HOURS).from(Format.MINS, 3600)).toBe(60);
    expect(TimeConverter.target(Format.HOURS).from(Format.HOURS, 3)).toBe(3);
    expect(TimeConverter.target(Format.HOURS).from(Format.DAYS, 3)).toBe(3 * 24);
  });

  it('should get days: from', () => {
    expect(TimeConverter.target(Format.DAYS).from(Format.MILISECONDS, 86400)).toBe(0.001);
    expect(TimeConverter.target(Format.DAYS).from(Format.SECONDS, 86400)).toBe(1);
    expect(TimeConverter.target(Format.DAYS).from(Format.MINS, 86400)).toBe(60);
    expect(TimeConverter.target(Format.DAYS).from(Format.HOURS, 240)).toBe(10);
    expect(TimeConverter.target(Format.DAYS).from(Format.DAYS, 3)).toBe(3);
  });
});
