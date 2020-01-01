# app-name Project

NOTE: BUILDING IN PROGRESS

app-name is created from npx create-next-template.

For Demo: http://www.omdbapi.com endpoint is being used.

Please generate own api key to replace your .env file

For Server Side Rendering demo will initially load `Star Wars` for search query

Remove this DEMO api and descriptions and replace with your own projects end point and api documentation.

This is written in assumptions you are already familiar with NextJs and to resolve some point points with some standard practice

## Running the Program

This Project should be created from npx create-next-template your-app-name

### NPM Dos and Do NOT

Do not run `npm install`. We try to keep the integrity of package-lock.json
Do not use `yarn`, when you are using virtual runner for CI/CD sometimes the connection to yarn will fail and whole build process failed. And it is SLOWER.

### NPM commands

### IMPORTANT Known Caveat:

When your run `npm run dev`, you will encounter this:

```bash
[ error ] ./node_modules/next/dist/client/next-dev.js 36:6
Module parse failed: Unexpected token (36:6)
You may need an appropriate loader to handle this file type.
|
|
> import('./noop'); // Support EventSource on Internet Explorer 11
|
| if (!window.EventSource) {
```

Comment `// import('./noop');` at `node_modules/next/dist/client/next-dev.js`

Every time you run `npm ci` this will happen.

## Frontend Pain-Points:

This is developed after having experience with 2 Whitelabel projects

- Server Side Rendering Complexity:
  - Use of server side node modules like fs, storage services
  - Protecting your keys at server side
  - Await saga to return only do rendering
  - Accessing static store at client side
- Loading theme configuration
- Cookies handling, https only and Server Set-Cookie and Client Side (Mediating both)
- SEO and OG Handling
- Tracking (Next Update)
- WHEN SETUP A NEW PROJECT!!!
- Many Copy and Pasting Codes happening
  (typescript, jest, postcss, next plugins, next-build-id, etc. for a proper tech-stack)
  P.S Especially potentially larger project and keep deviated from standards and no replicable structure

This Boilerplate setting the structure intend to resolve above issues

## Projects Standard and Practices

## Naming Convention and Practices

### Variable Naming Standard

- boolean use `is`, `has`, `use` prefix
- `use` prefix is mainly for feature usage
- always use camel case

### HOCs

- If there is static function in the component class, you can't use props:
  In this case resolve to HOC also
- Function as Wrapper

### Classes

- One file export one class
- Seperate the types from the class files
- If the class is required to be extended, use `PascalCase`
- If the class is required to be used as model / object, use `PascalCase`
- If the class is used like a util, use `kebab-case`
- variables always use `camelCase`
- private variables use `_` example `_camelCase`
- Usage of Design Patterns naming convention is highly recommended:
  Example: Decorator, Strategy, Composite and etc.

### Environment File

.env.sample is the sample for node environment variables

Replace your own values in .env file, the given sample are the standard variables being used

### Adding @ alias to module path

## Important New Concepts

### Client Side New Concepts:

#### Container Hooks, View, and Index

- Like Container Concepts, dealing with logic and hooks

Refer Home Page

### Project Structure

Followings are the required project folder and structure practice:

- definitions stores all the App Level typescript definitions/
- Project level types and states should be declared as follows

```javascript
// Location
// Import your store/module/typings
import { Config, ConfigReducer } from '@store/modules/typings.d';

// Add your project redux state here
export interface ProjectState {
  config: Config;
}

// Add your project reducer function definitions here
export interface ProjectReducers {
  config: ConfigReducer;
}
```

- All constants should be store under `constants` folder

#### page/app/Init Component

- Resolve standard app level (Not Page Level) getIntialProps calling:
  For Example you would like to dispatch some state, instead of doing at \_app.tsx file, Do it at `page/app/delegator` file. Purpose is to seperate the logic away from the component. In future, this can be attachable for reusability.

- Resolve standard AppState

For client side singleton initialization add at componentDidMount

```javascript


...

## Configurations

- dotenv: For node environment variables
- autoprefixer: For auto-prefixing css
- typescripts: Added @types
- express-async-handler: To handle async server side call

Note: For npm modules that are not available from http://microsoft.github.io/TypeSearch/
add to types.d.ts

## Server Side Parsers and Middleware:

- body-parser: To allow the express to parse JSON request body
- cookie-parsers: To allow the cookie to be accessible in getInitialProps as req.cookies

## React

- next js
- react-redux with hooks
- redux-saga
- react-icon for icons

## Styles

Using Sass, there is an intention to use styled components in this boilerplate. Yet following still in research to achieve:

- Base style
- Having complex mixin
- Complex functions
- Resets, normalize and etc.

## Utilities

- classnames: Conditionally adding classnames based on props flag
- qs: For query string stringify
- card-validator: Validate Card Number, CVV and Expiry
- libphonenumber-js: For parsing phone number to string
- lodash: For validation utilities
- joi: For model validation purpose, take note on ModelBase usage in core libraries

## TODO and Known Issues:

- feat: SEO and OG component
- feat: Event Tracking component
- refactor: Improve readability at next.config.js with next-compose-plugins
- fix: Fix @ module resolver not working for server.js
- feat: Include Lingui Js, react-intl is no longer supported
- refactor: Move config module to core and have custom config type, might need OOP implementation, refer to core/README.md
- feat: core module to have config next-core.config.js for custom configurations
- feat: Upgrade to next js 9
- feat: Seperate core module as seperate library reduce dependencies
- prettier configuration on save for the quotation for prettier have issue

```

"<!DOCTYPE html><html><body>I'm Healthy</body></html>" -> will have quotation mark warning

```

```
