'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function bound(number, max) {
  return Math.max(Math.min(number, max - 1), 0);
}

var LaconaView = (function (_React$Component) {
  _inherits(LaconaView, _React$Component);

  function LaconaView(props) {
    _classCallCheck(this, LaconaView);

    _get(Object.getPrototypeOf(LaconaView.prototype), 'constructor', this).call(this, props);

    this.setByMouse = false;

    this.blurMatters = true;

    var hasOutputs = props.length > 0;
    this.state = { selection: hasOutputs ? 0 : -1 };
  }

  _createClass(LaconaView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hasOutputs = nextProps.outputs.length > 0;
      this.setState({ selection: hasOutputs ? 0 : -1 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.selection > -1 && !this.setByMouse) {
        var options = _react2['default'].findDOMNode(this.refs.options);
        var optionsRect = options.getBoundingClientRect();
        var optionReact = this.refs.options.getOption(this.state.selection);
        if (optionReact) {
          var selectedRect = _react2['default'].findDOMNode(optionReact).getBoundingClientRect();
          if (selectedRect.top < optionsRect.top) {
            options.scrollTop -= optionsRect.top - selectedRect.top;
          } else if (selectedRect.bottom > optionsRect.bottom) {
            options.scrollTop += selectedRect.bottom - optionsRect.bottom;
          }
        }
      }
      this.props.change();
    }
  }, {
    key: 'completeSelection',
    value: function completeSelection() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? this.state.selection : arguments[0];

      if (index > -1) {
        var result = this.props.outputs[index];
        var newString = _lodash2['default'].chain(result.words).takeWhile(function (item) {
          return !item.placeholder;
        }).map('text').join('').value();

        this.props.clearPrefix();

        this.update(newString);
      }
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(steps) {
      this.setByMouse = false;
      var selection = bound(this.state.selection + steps, this.props.outputs.length);
      this.setState({ selection: selection });
    }
  }, {
    key: 'execute',
    value: function execute() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? this.state.selection : arguments[0];

      if (index > -1) {
        var result = this.props.outputs[index];
        if (!result) return;

        if (_lodash2['default'].some(result.words, 'placeholder')) {
          this.completeSelection(index);
          this.refs.input.focusEnd();
        } else {
          this.update('');
          this.setState({ showHints: false });
          this.props.onBlur();
          this.props.execute(index);
        }
      }
    }
  }, {
    key: 'select',
    value: function select(index) {
      this.setByMouse = true;
      var selection = bound(index, this.props.outputs.length);
      this.setState({ selection: selection });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.props.cancel();
    }
  }, {
    key: 'update',
    value: function update(newText) {
      this.props.update(newText);
    }
  }, {
    key: 'focusEnd',
    value: function focusEnd() {
      this.refs.input.focusEnd();
    }
  }, {
    key: 'onFocus',
    value: function onFocus(event) {
      this.setState({ showHints: true });
      this.props.onFocus(event);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      if (!this.blurMatters) return;
      this.setState({ showHints: false });
      this.props.onBlur(event);
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown() {
      this.blurMatters = false;
      this.props.userInteracted();
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp() {
      this.blurMatters = true;
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.refs.input.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'lacona-view' },
        _react2['default'].createElement(_input2['default'], {
          ref: 'input',
          update: this.update.bind(this),
          prefix: this.props.prefix,
          suffix: this.props.suffix,
          tabIndex: this.props.tabIndex,
          completeSelection: this.completeSelection.bind(this),
          moveSelection: this.moveSelection.bind(this),
          userInput: this.props.userInput,
          execute: this.execute.bind(this),
          cancel: this.cancel.bind(this),
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this),
          userInteracted: this.props.userInteracted,
          placeholder: this.props.placeholder }),
        _react2['default'].createElement(_options2['default'], {
          ref: 'options',
          outputs: this.props.outputs,
          selection: this.state.selection,
          execute: this.execute.bind(this),
          select: this.select.bind(this),
          showHints: this.state.showHints,
          onMouseDown: this.mouseDown.bind(this),
          onMouseUp: this.mouseUp.bind(this) })
      );
    }
  }]);

  return LaconaView;
})(_react2['default'].Component);

exports['default'] = LaconaView;

LaconaView.defaultProps = {
  outputs: [],
  update: function update() {},
  cancel: function cancel() {},
  change: function change() {},
  execute: function execute() {},
  select: function select() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  userInteracted: function userInteracted() {},
  clearPrefix: function clearPrefix() {}
};
module.exports = exports['default'];