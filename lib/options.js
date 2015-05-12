'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _Option = require('./option');

var _Option2 = _interopRequireDefault(_Option);

var _fulltext = require('lacona-util-fulltext');

var _fulltext2 = _interopRequireDefault(_fulltext);

var Options = (function (_React$Component) {
  function Options() {
    _classCallCheck(this, Options);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Options, _React$Component);

  _createClass(Options, [{
    key: 'render',

    // componentDidUpdate() {
    //   const scrolledDiv = React.findDOMNode(this.refs.options)
    //   const scrolledAmount = scrolledDiv.scrollTop
    //   const scrollHeight = 400
    //
    //   const selectedDiv = React.findDOMNode(this.refs.selection)
    //   const divHeight = 40
    //   const divPos = this.props.selection * 40
    //
    //
    //   if (divPos < scrolledAmount) {
    //     scrolledDiv.scrollTop = divPos
    //   } else if (divPos > scrollHeight + scrolledAmount - divHeight) {
    //     scrolledDiv.scrollTop = divPos - (scrollHeight - divHeight)
    //   }
    // }
    //
    value: function render() {
      var _this = this;

      var divs = this.props.outputs.map(function (option, index) {
        var execute = function execute() {
          _this.props.execute(index);
        };
        var select = function select() {
          _this.props.select(index);
        };
        var selected = index === _this.props.selectedPhraseIndex;

        return _React2['default'].createElement(_Option2['default'], {
          execute: execute,
          select: select,
          key: index,
          selectedItemNumber: _this.props.selectedItemNumber,
          selected: selected,
          option: option
        });
      });

      return _React2['default'].createElement(
        'div',
        { className: 'options', ref: 'options' },
        divs
      );
    }
  }]);

  return Options;
})(_React2['default'].Component);

exports['default'] = Options;
module.exports = exports['default'];