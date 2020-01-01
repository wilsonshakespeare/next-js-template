# Core Files

This contains reusable classes and functions

## Standard Modules

### Error Handling

### Pathname Handling

## New Concepts

### Client Side New Concepts:

#### Page Renderers

#### ModelBase for joi validation

Example of extending ModelBase for joi validation:

An api call is made:

```javascript
// in the saga function
```

Schema declaration:

```javascript
// For the Model declaration
```

### Server Side New Concepts:

#### Extending Server Object

#### SSR Middlewares

##### How do you going to use server side module in getInitialProps for nextJs?

- There are many hacky ways to do it for example, require real-time during getInitialProps.
- Then comes another issue, what about if the modules require sensitive data? Example, your private key, or api key? Example supplier api, payment api, or GCP service account?
- Exposing the file path is a huge security breach, hence it should be of secure path, or end-point to be hashed with next-build-id. Hence everytime will be different.
- So SSR Middleware, runs on server side before next server renders it.

Creating the Middleware:

```javascript
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
```

Passing to Server Object:

```javascript
import ssrMiddleware from './ssr-middleware';

export class Server extends ServerBase<MiddlewareValues> {
  // ...
  private constructor() {
    // pass hasServiceWorker or SSR Middleware
    super(false, ssrMiddleware);
  }
  // ...
}
```

#### Routing

- Important to know that in the route function cannot have `this`, the because, the function is being passed not the object

### TODO:

- Improve modules with OOP instead of FP, it will reduce export and import hell
- Move Config Module here
- Add EventTrackingManager (For GTM, GA, CleverTap, MixPanel) -> with all tracking configurations
- Add Seo and OG tag Component
- Initialize with Custom Context
- Core library will soon be extracted as a seperate npm library
