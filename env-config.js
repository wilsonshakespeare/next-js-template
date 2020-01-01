const dotenv = require('dotenv');

// process.env.ENV_FILE can be pass to docker file for different environment.
const envPath = process.env.ENV_FILE ? `./${process.env.ENV_FILE}` : './.env';
console.log(`Loading build envs from ${envPath}`);

dotenv.config({ path: envPath });

/*/
Server Side env:
For this case no API_KEY
Never export sensitive data, example: 
- Google Cloud Storage service account key path
- Your payment processor private key and more
- In this case, assuming API_KEY is senstive
Keep it as server side environment variable
/*/

module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  APP_URL: process.env.APP_URL,
  API_URL: process.env.API_URL,
  API_ENV: process.env.API_ENV,
};
