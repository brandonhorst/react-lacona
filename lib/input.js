'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        (0, _reactDom.findDOMNode)(this).focus();
      }
    }
  }, {
    key: 'change',
    value: function change(e) {
      this.props.update(e.target.value);
    }
  }, {
    key: 'focus',
    value: function focus() {
      (0, _reactDom.findDOMNode)(this.refs.input).focus();
    }
  }, {
    key: 'focusEnd',
    value: function focusEnd() {
      var elem = (0, _reactDom.findDOMNode)(this.refs.input);
      var pos = this.props.userInput.length;

      if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.move('character', pos);
        range.select();
      } else {
        if (elem.selectionStart) {
          elem.focus();
          elem.setSelectionRange(pos, pos);
        } else {
          elem.focus();
        }
      }
      elem.scrollLeft = elem.scrollWidth; //just pretty big
    }
  }, {
    key: 'blur',
    value: function blur() {
      (0, _reactDom.findDOMNode)(this.refs.input).blur();
    }
  }, {
    key: 'keyDown',
    value: function keyDown(e) {
      this.props.userInteracted();
      if (e.keyCode === 9) {
        // tab
        this.props.completeSelection();
      } else if (e.keyCode === 38) {
        // up
        this.props.moveSelection(-1);
      } else if (e.keyCode === 40) {
        // down
        this.props.moveSelection(1);
      } else if (e.keyCode === 13) {
        // return
        this.props.execute();
      } else if (e.keyCode === 27) {
        // escape
        this.props.cancel();
      } else if (e.keyCode === 39) {
        //right
        var node = (0, _reactDom.findDOMNode)(this.refs.input);
        if (node.selectionStart === node.selectionEnd && node.selectionStart === this.props.userInput.length) {
          this.props.completeSelection();
        } else {
          return;
        }
      } else if (e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.keyCode >= 49 && e.keyCode <= 57) {
        this.props.execute(e.keyCode - 49);
      } else {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', {
        type: 'text',
        className: 'input',
        ref: 'input',
        tabIndex: this.props.tabIndex,
        autoCorrect: false,
        spellCheck: false,
        autoCapitalize: false,
        value: this.props.userInput,
        onChange: this.change.bind(this),
        onKeyDown: this.keyDown.bind(this),
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onClick: this.props.userInteracted,
        placeholder: this.props.placeholder });
    }
  }]);

  return Input;
})(_react2['default'].Component);

exports.Input = Input;