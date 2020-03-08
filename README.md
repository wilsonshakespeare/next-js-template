# app-name-placeholder Project

NOTE: BUILDING IN PROGRESS

TODO: UPGRADE TO NEXT JS 9

app-name-placeholder is created from npx create-next-template.

## Running the Program

This Project should be created from npx create-next-template your-app-name

## Demo

For Demo: http://www.omdbapi.com endpoint is being used for API call

Please generate own api key to replace your .env file

For Server Side Rendering demo will initially load `Star Wars` for search query

Remove this DEMO api and descriptions and replace with your own projects end point and api documentation.

This is written in assumptions you are already familiar with NextJs

## Purpose

To resolve some pain points of setting up new project, and with best practice documented.

P.S. if you have better practices, please let me know I'm happy for you to contribute.

## Git Practices

1. Use semantics:
   Reference for semantics:
   https://seesparkbox.com/foundry/semantic_commit_messages

   Note: hotfix: is always from master branch

2. Use project management software with ticket ids:
   Assuming the repository can link with ticket - Example: Gitlab can link to Jira Tickets
   Commit it in message:
   // can be sub-task of TQID-1234 (Refer 4.)
   feat: TQID-1235 Add animation base for page change
   test: Remove hanging gitlab runner git remotes
   chore: Update ABSTRACT.md for typography

3. Follow the GREAT CHRIS BEAM of commit rules:
   https://chris.beams.io/posts/git-commit
   Note: Allow title have additional 10 - 15 characters because of Ticket ID and semantics

4. Branching with semantics and Ticket ID:
   feat/TQID-1234-page-change-animation

5. Follow git flow model:
   https://nvie.com/posts/a-successful-git-branching-model/

   a. Release branches are staging
   b. Have pre-production branch calling live api - to ensure regression test is passed.
   This is in case backend apis haven't release latest feature.

## NPM Commands:

**NPM Dos and Do NOT:**

1. Run `npm ci` to install node_modules
2. Do not run `npm install`. We try to keep the integrity of package-lock.json
3. Run `npm install` only when to upgrade a package or install a new package
4. Do not use `yarn`, when you are using virtual runner for CI/CD.
   Sometimes the connection to yarn failed and whole build process failed.
   And it is SLOWER than npm.

**NPM run commands:**
`npm run dev`: Run with dev environment with hot module reloading
`npm run prod`: Run with prod environment with minimized js and css
`npm run jest`: Run jest test
`npm run lint`: Run ts linting test
`npm run analyze-build`: Check bundle size for production environment
`npm run cleanup`: Clean up build files. Do it when there are files renaming or refactoring happened

**Review Build:**

With CI/CD practices, you might have feature based urls corresponding to the feature branches.

Minimizer might take time to build hence using docker to run command `npm run prod:review-build`.

This will create production build without minimizing js files. Then run command `npm run prod:start` to start the server.

## IMPORTANT Known Project Caveat ~ Resolve on NextJs 9:

### next-dev Caveat

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

### dev environment rehydration issue

Following warning would occur when run `npm run dev`:

`Warning: Did not expect server HTML to contain a <div> in <div>`

P.S. These issues will be resolved when doing NextJs 9 upgrade

## Rationale and Pain Points:

This is developed after having experience with 2 Whitelabel projects.

- Server Side Rendering Complexity with NextJs:
  - Use of server side node modules like fs, storage services (But not at getInitialProps)
  - Protecting your keys at server side
  - Awaiting saga response before proceeding with rendering
  - Accessing static store / app states at client side
- Loading theme configuration
- Cookies handling, https only and Server Set-Cookie and Client Side (Mediating both)
- SEO and OG Handling
- Standard Scss Usage and Pre-prossesor compilation handling:
  - auto-prefixing
  - purging and merging css
- Tracking with different tracking (On Next Release)
- Setting up new server.js
- WHEN SETUP A NEW PROJECT!!!
- Many Copy and Pasting Codes happening
  (typescript, jest, postcss, next plugins, next-build-id, etc. for a proper tech-stack)
  P.S Especially potentially larger project and keep deviated from standards and no replicable structure

This Boilerplate setting the structure intend to resolve above issues

## Naming Convention and Practices (Javascript)

Use American English.

P.S:
I'm guilty of using colours instead of colors, and many other words as well.
English is my second language, and I studied british english.
If you found any british english or broken english, feel free to make a Merge Request for such chores.
Much appreciated. <3

### Variable Naming Standard

- boolean use `is`, `has`, `use` prefix
- `use` prefix is mainly for feature usage
- always use camel case for variables

### HOCs

- If there is static function in the component class, you can't use props:
  In this case resolve to HOC also
- Function as Wrapper

### Classes

- One file should only export one Class or one Component
- Seperate the types declaration from the class files
- For **Naming of Files**:
  - If the class is required to be extended, use `PascalCase`
  - If the class is required to be used as model / object, use `PascalCase`
  - If the class is used like a util, use `kebab-case`
- variables always use `camelCase`
- private variables use `_`. Example `_camelCase`
- Usage of Design Patterns naming convention is highly recommended:
  Example: Decorator, Strategy, Composite and etc.
  In this boilerplate Example: RenderComposite, RenderStrategyBase

### React

- Following AirBnb React standard (tslint being setup for that)
  https://github.com/airbnb/javascript/tree/master/react

## Environment and Project Setting Files

.env.sample is the sample for node environment variables

Replace your own values in .env file, the given sample are the standard variables being used

### Adding @ alias to module path

```javascript
// Following using resolve alias for typescript
import myPlugin from '@my-utils/plugin';

// Instead of using relative path:
import myPlugin from '../../../../plugin';
```

Following are the locations to add for @ alias module path:

a. At next config:

```javascript
// Inside next.config.js
config.resolve.alias = {
  ...config.resolve.alias,
  '@core': path.resolve(__dirname, 'core'),
  '@components': path.resolve(__dirname, 'components'),
  //... refer file for all codes
};
```

b. At jest config

```javascript
// // Inside jest.config.js
module.exports = {
  // ... codes
  moduleNameMapper: {
    '^.+\\.(css|less|scss|svg)$': 'identity-obj-proxy',
    '^@core(.*)$': '<rootDir>/core$1',
    '^@components(.*)$': '<rootDir>/components$1',
    // ... refer file for all codes
  },
  // ... codes
};
```

c. At ts config

```json
// inside both tsconfig.json and tsconfig.server.json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["core/*"],
      "@components/*": ["components/*"]
      // ... refer file for all codes
    }
  }
}
```

## Important New Concepts

Following will explain new concepts and approach to address work around with Next Js lifecycle

## Client Side New Concepts:

### Container Hooks, View, and Index

- Like Container Concepts, dealing with logic and hooks

Refer Home Page

### page/app/Init Component

- Resolve standard app level (Not Page Level) getIntialProps calling:
  For Example you would like to dispatch some state, instead of doing at `_app.tsx` file, Do it at `page/_init/delegator` file.
  Purpose is to seperate the logic away from the component. In future, this can be attachable for reusability.

- Resolve standard AppState:
  - Static values that do not require listening to change should use AppState: `utils/app-state`.
    Example: Config
  - Variables that would require listening to changes should use Redux and stored to AppStore: `utils/app-store`.
    Example: Error States and Current Path change states

```javascript
import getInitComponent from '@core/page/Init';
import Store from '@utils/app-store';
import delegator from './delegator';

export default getInitComponent(Store.getInstance(), delegator);
```

For client side singleton initialization add at componentDidMount

```javascript
```

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
- lodash: For validation utilities, remember to
- joi: For model validation purpose, take note on ModelBase usage in core libraries

## Security Implementation

- helmet plugin to sanitize query and protect from framing
- dompurify to sanitize html

## TODO and Known Issues:

- feat: Upgrade to next js 9
- feat: SEO and OG component
- feat: Event Tracking component
- fix: Fix @ module resolver not working for server.js
- feat: Include LinguiJs, react-intl is no longer supported
- refactor: Move config module to core and have custom config type, might need OOP implementation, refer to core/README.md
- feat: core module to have config next-core.config.js for custom configurations
- feat: Seperate core module as seperate library reduce dependencies
- prettier configuration on save for the quotation as prettier now having issue
- chore: Resolve the following in `server.ts`:

```javascript
// Follwoing will have quotation mark warning
"<!DOCTYPE html><html><body>I'm Healthy</body></html>";
```
