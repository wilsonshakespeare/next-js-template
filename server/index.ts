import dotenv from 'dotenv';

dotenv.config();
const environment: string = process.env.ENVIRONMENT || 'development';
const dev: boolean = environment !== 'production';

if (dev) {
  require('@babel/register')({
    babelrc: false,
    presets: ['next/babel', '@zeit/next-typescript/babel'],
    plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
  });
}

require('./run');
