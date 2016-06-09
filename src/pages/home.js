var React = require(`react`);
var Footer = require(`../components/footer.js`);
var Header = require(`../components/header.js`);
var HeroUnit = require(`../components/hero-unit.js`);
var ContentContainer = require(`../components/content-container.js`);

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="home-page">
        <Header/>
        <HeroUnit>
        </HeroUnit>
        <div className="page">
          <ContentContainer>
            {this.context.intl.formatMessage({id: 'content'})}
          </ContentContainer>
        </div>
        <Footer/>
      </div>
    );
  }
});
