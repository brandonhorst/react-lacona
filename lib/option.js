var React = require('react');

var div = React.createFactory('div');

var Option = React.createClass({
  displayName: 'Lacona Option',
  render: function () {
    var this_ = this;

    var divs = ['match', 'suggestion', 'completion'].map(function (type) {
      return this_.props.option[type].map(function (item) {
        var className = this_.props.prefix + '-' + item.category +
          (item.input ? ' highlighted' : '');
        return div({className: className}, item.string);
      });
    }).reduce(function (prev, current) {
      return prev.concat(current);
    });

    var className = 'option' + (this.props.selected ? ' selected' : '');

    return div.apply(null, [{className: className}].concat(divs));
  }
});

module.exports = Option;
