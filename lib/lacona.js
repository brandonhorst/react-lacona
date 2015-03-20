"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("lodash"));

var React = _interopRequire(require("react"));

var fulltext = _interopRequire(require("lacona-util-fulltext"));

var LaconaOptions = _interopRequire(require("./options"));

var LaconaInput = _interopRequire(require("./input"));

function bound(number, max) {
  return Math.max(Math.min(number, max - 1), 0);
}

var LaconaView = (function (_React$Component) {
  function LaconaView(props) {
    _classCallCheck(this, LaconaView);

    _get(Object.getPrototypeOf(LaconaView.prototype), "constructor", this).call(this, props);

    var hasOutputs = this.props.outputs.length > 0;
    this.state = {
      userInput: this.props.initialInput || "",
      selection: hasOutputs ? 0 : -1,
      selectedKey: hasOutputs ? fulltext.all(this.props.outputs[0]) : ""
    };
  }

  _inherits(LaconaView, _React$Component);

  _createClass(LaconaView, {
    componentWillReceiveProps: {
      value: function componentWillReceiveProps(nextProps) {
        var _this = this;

        var newSelection = undefined;
        // if there are outputs
        if (nextProps.outputs.length > 0) {
          // if something was selected in the past
          if (this.state.selection > -1) {
            newSelection = _.findIndex(nextProps.outputs, function (output) {
              return fulltext.all(output) === _this.state.selectedKey;
            });
            if (newSelection > -1) {
              this.setState({ selection: newSelection });
              return;
            }
          }
          newSelection = bound(this.state.selection - 1, nextProps.outputs.length);
          this.setState({
            selection: newSelection,
            selectedKey: fulltext.all(nextProps.outputs[newSelection])
          });
        } else {
          this.setState({
            selection: -1,
            selectedKey: ""
          });
        }
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.props.change();
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this.props.change();
      }
    },
    completeSelection: {
      value: function completeSelection() {
        if (this.state.selection > -1) {
          var newString = fulltext.match(this.props.outputs[this.state.selection]) + fulltext.suggestion(this.props.outputs[this.state.selection]);

          this.update(newString);
        }
      }
    },
    moveSelection: {
      value: function moveSelection(steps) {
        var selection = bound(this.state.selection + steps, this.props.outputs.length);
        this.setState({
          selection: selection,
          selectedKey: fulltext.all(this.props.outputs[selection])
        });
      }
    },
    execute: {
      value: function execute() {
        if (this.state.selection > -1) {
          this.setState({ userInput: "" });
          this.props.execute(this.state.selection);
        }
      }
    },
    cancel: {
      value: function cancel() {
        this.setState({ userInput: "" });
        this.props.cancel();
      }
    },
    update: {
      value: function update(newText) {
        this.setState({ userInput: newText });
        this.props.update(newText);
      }
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "lacona-view" },
          React.createElement(LaconaInput, { update: this.update.bind(this),
            completeSelection: this.completeSelection.bind(this),
            moveSelection: this.moveSelection.bind(this),
            userInput: this.state.userInput,
            execute: this.execute.bind(this), cancel: this.cancel.bind(this) }),
          React.createElement(LaconaOptions, { outputs: this.props.outputs, selection: this.state.selection })
        );
      }
    }
  });

  return LaconaView;
})(React.Component);

module.exports = LaconaView;

LaconaView.defaultProps = {
  outputs: [],
  update: function update() {},
  cancel: function cancel() {},
  change: function change() {},
  execute: function execute() {}
};