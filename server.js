import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/app.js';

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<App />);

  fs.readFile('./dist/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    res.send(document);
  });
}

const app = express();

app.use(express.static(__dirname+'/dist'));

app.route('/*').get(function(req,res) {
  handleRender(req,res);
});

app.listen(3000);
