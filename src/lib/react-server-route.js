import React  from 'react';
import ReactDOM, { renderToString } from 'react-dom/server';
import { IntlProvider } from 'react-intl';
import { match, RouterContext } from 'react-router';
import url from 'url';
var locales = require('../../public/locales.json');
var locationParser = require('./location-parser.js');

// Using a server response we don't have an "index.html", so instead of
// generating a <Page>...</Page> like we do over in App.js, we actually
// use a component that wraps a <Page/> with a full HTML document:
var HTML = require(`../index.js`);
var routes = require('../routes.js');

module.exports = function(req, res, next) {
  var location = url.parse(req.url).pathname;
  var search = url.parse(req.url).search || "";
  var locale = "";

  // This is essentially a callback lookup. If the requested URL is a known
  // URL based on the routing map as defined in routes.js, then this will
  // lead to render properties that can be used to generate page components.
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // obviously, we need an error handler.
    if (error) {
      res.status(500).send(error.message);
      return;
    }

    // React router lets you specify redirects. If we had any, we literally
    // just tell our server that we need to look up a different URL.
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + search);
    }
    // This is the most interesting part: we have content that React can render.
    else if (renderProps) {
      locale = locationParser(req.headers["accept-language"], location).locale;
      if (location === "/") {
        res.redirect(302, location + locale + search);
        return;
      }
      function createElement(Component, props) {
        var messages = locales[locale];
        // make sure you pass all the props in!
        return (
          <IntlProvider locale={locale} messages={messages}>
            <Component {...props} />
          </IntlProvider>
        );
      }
      // renderToString() generates React-properties-enriched HTML that a
      // React app can be loaded into. There's also renderToStaticMarkup(),
      // but that generates HTML without any React properties, so that _would_
      // get wiped if the HTML contains a <script> element that tries to load
      // the bundle for hooking into the DOM.
      let reactHTML = ReactDOM.renderToString(<RouterContext createElement={createElement} {...renderProps}/>);
      let html = ReactDOM.renderToStaticMarkup(
        <HTML reactHTML={reactHTML}
          locale={locale}
          title={"title"}
        />
      );

      // And to be good citizens of the web, we need a doctype, which React
      // cannot generate for us because exclamation points are funny.
      let doctype = "<!doctype html>";

      // Finally, send a full HTML document over to the client
      res.status(200).type('text/html').send(doctype + html);
    }

    // of course if this didn't have an error, nor a known redirect,
    // and it didn't find any render properties with which to render
    // a (set of) React component(s), we should fall through to whatever
    // else our express server can try to do to serve up content.
    else { next(); }
  });
};
