var React = require(`react`);

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <footer className="footer">
        {this.props.children}
      </footer>
    );
  }
});
