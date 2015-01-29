var React = require('react');

var optionComp = React.createFactory(require('./option'));
var div = React.createFactory('div');
//
// function adjust() {
//   var domNode = this.getDOMNode()
//   var selectedPos = domNode.children[this.props.selection].getBoundingClientRect().top;
//   var currentOffset = parseInt(domNode.style.marginTop) || 0;
//   domNode.style.marginTop = (selectedPos - currentOffset) + 'px';
// }

var Options = React.createClass({
  displayName: 'Lacona Options',
  // componentDidMount: adjust,
  // componentDidUpdate: adjust,
  render: function () {
    var this_ = this;
    var divs = this.props.outputs.map(function (option, index) {
      return optionComp({
        key: option.id,
        selected: index === this_.props.selection,
        option: option.data,
        prefix: 'category'
      });
    });

    return div({className: 'options'}, divs);
      // return div({
      //   className: 'options non-central'
      // }, this.createDivs()),
    // );
  }
});


module.exports = Options;
