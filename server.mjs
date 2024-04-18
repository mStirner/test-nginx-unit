#!/usr/bin/env node

import { createServer } from 'node:http';

const ENVIRONMENT = {
  DJANGO_SETTINGS_MODULE: "blog.settings.prod",
  DB_ENGINE: "django.db.backends.postgresql",
  DB_NAME: "test",
  DB_HOST: "127.0.0.1",
  DB_PORT: "5432"
};

// override default env, with external set env
// but keep the defaul object untouched
// so we can iterrate over it
process.env = Object.assign({}, ENVIRONMENT, process.env);


const ENVS = Object.fromEntries(Object.entries(process.env).filter(([key, value]) => {
  return Object.keys(ENVIRONMENT).includes(key);
}));


const server = createServer((req, res) => {

  let {address, port} = server.address();
  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify({
    header: req.headers,
    url: req.url,
    method: req.method,
    server: {
      host: address,
      port
    },
    args: process.argv.splice(2),
    environment: ENVS
  }, null, 2));

});


server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});