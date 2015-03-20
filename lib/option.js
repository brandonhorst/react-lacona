"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var LaconaOption = (function (_React$Component) {
  function LaconaOption() {
    _classCallCheck(this, LaconaOption);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(LaconaOption, _React$Component);

  _createClass(LaconaOption, {
    render: {
      value: function render() {
        var _this = this;

        var divs = ["match", "suggestion", "completion"].map(function (type) {
          return _this.props.option[type].map(function (item) {
            var className = "" + type + " category-" + item.category + "" + (item.input ? " highlighted" : "");
            return React.createElement(
              "div",
              { className: className },
              item.string
            );
          });
        }).reduce(function (prev, current) {
          return prev.concat(current);
        }); //join

        var className = "option" + (this.props.selected ? " selected" : "");

        return React.createElement(
          "div",
          { className: className },
          divs
        );
      }
    }
  });

  return LaconaOption;
})(React.Component);

module.exports = LaconaOption;