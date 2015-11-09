'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var Options = (function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options() {
    _classCallCheck(this, Options);

    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Options, [{
    key: 'getOption',

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

    value: function getOption(index) {
      return this.refs[index];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var divs = this.props.outputs.map(function (option, index) {
        var select = function select() {
          return _this.props.select(index);
        };
        var execute = function execute() {
          return _this.props.execute(index);
        };

        var hint = _this.props.showHints ? index === _this.props.selection ? '↩' : index < 9 ? '⌥' + (index + 1) : '' : '';

        return _react2['default'].createElement(_option2['default'], {
          ref: index,
          key: index,
          selected: index === _this.props.selection,
          option: option,
          select: select,
          execute: execute,
          onMouseDown: _this.props.onMouseDown,
          onMouseUp: _this.props.onMouseUp,
          hint: hint });
      });

      return divs.length ? _react2['default'].createElement(
        'div',
        { className: 'options', ref: 'options' },
        divs
      ) : null;
    }
  }]);

  return Options;
})(_react2['default'].Component);

exports['default'] = Options;
module.exports = exports['default'];