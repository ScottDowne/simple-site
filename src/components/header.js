var React = require(`react`);

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="header">
        {this.props.children}
      </div>
    );
  }
});
