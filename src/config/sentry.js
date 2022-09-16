import { REACT_APP_SENTRY_DSN } from './env';

// Could import some verifications
export const SENTRY_DSN = REACT_APP_SENTRY_DSN;

const generateSentryConfig = () => {
  let SENTRY_ENVIRONMENT = 'development';
  let SENTRY_TRACE_SAMPLE_RATE = 1.0;
  switch (process.env.NODE_ENV) {
    case 'production':
      SENTRY_ENVIRONMENT = 'production';
      SENTRY_TRACE_SAMPLE_RATE = 0.1;
      break;
    case 'test':
      SENTRY_TRACE_SAMPLE_RATE = 0.0;
      break;
    case 'development':
      SENTRY_TRACE_SAMPLE_RATE = 0.0;
      break;
    default:
  }

  return { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE };
};

export const { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE } =
  generateSentryConfig();
