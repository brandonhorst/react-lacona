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

var LaconaInput = (function (_React$Component) {
  function LaconaInput() {
    _classCallCheck(this, LaconaInput);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(LaconaInput, _React$Component);

  _createClass(LaconaInput, [{
<<<<<<< HEAD
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        _React2['default'].findDOMNode(this).focus();
      }
    }
  }, {
=======
>>>>>>> f86e775
    key: 'change',
    value: function change(e) {
      this.props.update(e.target.value);
    }
  }, {
<<<<<<< HEAD
    key: 'focus',
    value: function focus() {
      _React2['default'].findDOMNode(this.refs.input).focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      _React2['default'].findDOMNode(this.refs.input).blur();
    }
  }, {
=======
>>>>>>> f86e775
    key: 'keyDown',
    value: function keyDown(e) {
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
<<<<<<< HEAD
        e.preventDefault();
        e.stopPropagation();
=======
>>>>>>> f86e775
        this.props.execute();
      } else if (e.keyCode === 27) {
        // escape
        this.props.cancel();
<<<<<<< HEAD
      } else if (e.keyCode === 39) {
        //right
        var node = _React2['default'].findDOMNode(this.refs.input);
        if (node.selectionStart === node.selectionEnd && node.selectionStart === this.props.userInput.length) {
          this.props.completeSelection();
        } else {
          return;
        }
=======
>>>>>>> f86e775
      } else {
        return;
      }
      e.preventDefault();
<<<<<<< HEAD
      e.stopPropagation();
=======
>>>>>>> f86e775
    }
  }, {
    key: 'render',
    value: function render() {
<<<<<<< HEAD
      return _React2['default'].createElement('input', { type: 'text', autoCorrect: false, spellCheck: false,
        onFocus: this.props.focus, onBlur: this.props.blur,
        autoCapitalize: false, className: 'input', value: this.props.userInput,
        onChange: this.change.bind(this), onKeyDown: this.keyDown.bind(this),
        placeholder: this.props.placeholder, ref: 'input' });
=======
      return _React2['default'].createElement(
        'div',
        { className: 'input' },
        _React2['default'].createElement(
          'div',
          { className: 'prefix' + (this.props.prefix ? '' : ' hidden') },
          this.props.prefix
        ),
        _React2['default'].createElement('input', { type: 'text', autoCorrect: false, spellCheck: false,
          autoCapitalize: false, className: 'true-input', value: this.props.userInput,
          onChange: this.change.bind(this), onKeyDown: this.keyDown.bind(this) }),
        _React2['default'].createElement(
          'div',
          { className: 'suffix' + (this.props.suffix ? '' : ' hidden') },
          this.props.suffix
        )
      );
>>>>>>> f86e775
    }
  }]);

  return LaconaInput;
})(_React2['default'].Component);

exports['default'] = LaconaInput;
module.exports = exports['default'];