'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _option = require('./option');

var Options = (function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options() {
    _classCallCheck(this, Options);

    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).call(this);
    this.options = [];
    this.coords = [0, 0];
  }

  _createClass(Options, [{
    key: 'getOption',
    value: function getOption(index) {
      return this.options[index];
    }
  }, {
    key: 'mouseMoved',
    value: function mouseMoved(coords) {
      return coords[0] !== this.coords[0] || coords[1] !== this.coords[1];
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      this.coords = [e.pageX, e.pageY];
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

        return _react2['default'].createElement(_option.Option, {
          ref: function (c) {
            return _this.options[index] = c;
          },
          key: index,
          selected: index === _this.props.selection,
          mouseMoved: _this.mouseMoved.bind(_this),
          option: option,
          select: select,
          execute: execute,
          onMouseDown: _this.props.onMouseDown,
          onMouseUp: _this.props.onMouseUp,
          hint: hint });
      });

      return divs.length ? _react2['default'].createElement(
        'div',
        { className: 'options', onMouseMove: this.handleMouseMove.bind(this) },
        divs
      ) : null;
    }
  }]);

  return Options;
})(_react2['default'].Component);

exports.Options = Options;