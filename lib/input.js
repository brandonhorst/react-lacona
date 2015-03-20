"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var LaconaInput = (function (_React$Component) {
  function LaconaInput() {
    _classCallCheck(this, LaconaInput);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(LaconaInput, _React$Component);

  _createClass(LaconaInput, {
    change: {
      value: function change(e) {
        this.props.update(e.target.value);
      }
    },
    keyDown: {
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
          this.props.execute();
        } else if (e.keyCode === 27) {
          // escape
          this.props.cancel();
        } else {
          return;
        }
        e.preventDefault();
      }
    },
    render: {
      value: function render() {
        return React.createElement("input", { type: "text", autoCorrect: false, spellCheck: false,
          autoCapitalize: false, className: "input", value: this.props.userInput,
          onChange: this.change.bind(this), onKeyDown: this.keyDown.bind(this) });
      }
    }
  });

  return LaconaInput;
})(React.Component);

module.exports = LaconaInput;