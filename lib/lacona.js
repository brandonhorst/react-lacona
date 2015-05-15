'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _fulltext = require('lacona-util-fulltext');

var _fulltext2 = _interopRequireDefault(_fulltext);

var _LaconaOptions = require('./options');

var _LaconaOptions2 = _interopRequireDefault(_LaconaOptions);

var _LaconaInput = require('./input');

var _LaconaInput2 = _interopRequireDefault(_LaconaInput);

function bound(number, max) {
  return Math.max(Math.min(number, max - 1), 0);
}

var LaconaView = (function (_React$Component) {
  function LaconaView(props) {
    _classCallCheck(this, LaconaView);

    _get(Object.getPrototypeOf(LaconaView.prototype), 'constructor', this).call(this, props);

    var hasOutputs = props.length > 0;
    this.state = {
      userInput: props.initialInput || '',
      selection: hasOutputs ? 0 : -1
      // selectedKey: hasOutputs ? fulltext.all(this.props.outputs[0]) : ''
    };
  }

  _inherits(LaconaView, _React$Component);

  _createClass(LaconaView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hasOutputs = nextProps.outputs.length > 0;
      this.setState({ selection: hasOutputs ? 0 : -1 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.change();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.change();
    }
  }, {
    key: 'completeSelection',
    value: function completeSelection() {
      if (this.state.selection > -1) {
        var result = this.props.outputs[this.state.selection];
        var newString = _import2['default'].chain(result.match.concat(result.suggestion, result.completion)).takeWhile(function (item) {
          return !item.placeholder;
        }).map('string').join('').value();

        this.update(newString);
      }
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(steps) {
      var selection = bound(this.state.selection + steps, this.props.outputs.length);
      this.setState({ selection: selection });
    }
  }, {
    key: 'execute',
    value: function execute() {
      if (this.state.selection > -1) {
        var result = this.props.outputs[this.state.selection];
        if (_import2['default'].some(result.match.concat(result.suggestion, result.completion), 'placeholder')) {
          this.completeSelection();
        } else {
          this.setState({ userInput: '' });
          this.props.execute(this.state.selection);
        }
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.setState({ userInput: '' });
      this.props.cancel();
    }
  }, {
    key: 'update',
    value: function update(newText) {
      this.setState({ userInput: newText });
      this.props.update(newText);
    }
  }, {
    key: 'render',
    value: function render() {
      return _React2['default'].createElement(
        'div',
        { className: 'lacona-view' },
        _React2['default'].createElement(_LaconaInput2['default'], {
          update: this.update.bind(this),
          prefix: this.props.prefix,
          suffix: this.props.suffix,
          completeSelection: this.completeSelection.bind(this),
          moveSelection: this.moveSelection.bind(this),
          userInput: this.state.userInput,
          execute: this.execute.bind(this),
          cancel: this.cancel.bind(this) }),
        _React2['default'].createElement(_LaconaOptions2['default'], { outputs: this.props.outputs, selection: this.state.selection })
      );
    }
  }]);

  return LaconaView;
})(_React2['default'].Component);

exports['default'] = LaconaView;

LaconaView.defaultProps = {
  outputs: [],
  update: function update() {},
  cancel: function cancel() {},
  change: function change() {},
  execute: function execute() {}
};
module.exports = exports['default'];
// if (nextProps.outputs.length > 0) {

// if something was selected in the past
// if (this.state.selection > -1) {
//     newSelection = _.findIndex(nextProps.outputs, output => fulltext.all(output) === this.state.selectedKey)
//     if (newSelection > -1) {
//       this.setState({selection: newSelection})
//       return
//     }
//   }
//   newSelection = bound(this.state.selection - 1, nextProps.outputs.length)
//   this.setState({
//     selection: newSelection,
//     selectedKey: fulltext.all(nextProps.outputs[newSelection])
//   })
// } else {
//   this.setState({
//     selection: -1,
//     selectedKey: ''
//   })
// }