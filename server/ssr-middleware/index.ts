import { SsrMiddleware } from '../../core/definitions/Server';
import { MiddlewareValues } from './index.d';

// NOTE: For Demo Purpose
import config from '../../store/modules/config/initial-state';

// @ts-ignore for now not processing req and res
const middleware: SsrMiddleware<MiddlewareValues> = async (req, res) => {
  /**
   * This is for demo purpose, proper config retrieval should be done through:
   * - api call
   * - s3 or gcs storage retrieval
   * - database call
   */
  return { config };
};

export default middleware;
