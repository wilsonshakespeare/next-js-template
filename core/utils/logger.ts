// TODO: Logger Decorator
// This is friendly for StackDriver log format, with assumption of using axios

import { AxiosError } from 'axios';

export enum Severity {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export function getAxiosErrorResponse(axiosError: AxiosError) {
  if (!axiosError.response || !axiosError.config) {
    return {};
  }

  return {
    url: axiosError.config.url,
    params: axiosError.config.params,
    status: axiosError.response.status,
    header: axiosError.response.headers,
    data: axiosError.response.data,
  };
}

function getError(error: AxiosError) {
  if (error) {
    return {
      message: error.message,
      stack: error.stack,
      response: getAxiosErrorResponse(error),
    };
  }
  return {};
}

export function error_log(message: string, error: AxiosError) {
  console_log(
    message,
    {
      error: getError(error),
    },
    {},
    Severity.ERROR
  );
}

export function console_log(
  message: string,
  logObject: object = {},
  labels: object = {},
  severity: Severity = Severity.INFO
) {
  // standard logging structure
  const log = {
    severity,
    message,
    labels,
    logObject,
  };

  if (severity === Severity.ERROR) {
    console.error(JSON.stringify(log));
    return;
  }

  if (severity === Severity.WARNING) {
    console.warn(JSON.stringify(log));
    return;
  }

  console.log(JSON.stringify(log));
}

export default {
  console_log,
  error_log,
};
