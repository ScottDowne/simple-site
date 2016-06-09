import React from 'react';
import fs from 'fs';
import Path from 'path';
import Pontoon from './components/pontoon.js';

module.exports = React.createClass({
  render: function() {
    var localeData = "";
    var locale = this.props.locale || "";
    var googleFonts = "//fonts.googleapis.com/css?family=Fira+Sans:300,300i,400i,400,600|Fira+Mono:400";
    if (locale) {
      if (locale === "cs") {
        googleFonts += "&subset=latin-ext";
      }
      localeData = fs.readFileSync(Path.join(__dirname, '../node_modules/react-intl/locale-data/' + locale.split('-')[0] + '.js'), 'utf8');
    }
    return (
      <html>
        <head>
          <meta charSet="UTF-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" type="text/css" href="/build/main.css"/>
          <link rel="stylesheet" type="text/css" href={googleFonts}/>
          <title>{this.props.title}</title>
          <script dangerouslySetInnerHTML={{__html: localeData}}></script>
          <Pontoon/>
        </head>
        <body>
          <div id="my-app" dangerouslySetInnerHTML={{__html: this.props.reactHTML}}/>
          <script src="/build/main.js"></script>
        </body>
      </html>
    );
  }
});

