'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var Placeholder = (function (_React$Component) {
  _inherits(Placeholder, _React$Component);

  function Placeholder() {
    _classCallCheck(this, Placeholder);

    _get(Object.getPrototypeOf(Placeholder.prototype), 'constructor', this).apply(this, arguments);
  }

  //
  // function getCorners(elem, parentBoundingRect) {
  //   const rects = elem.getClientRects()
  //   const bounds = elem.getBoundingClientRect()
  //
  //   return {
  //     topLeft: rects[0].left - parentBoundingRect.left,
  //     topTop: rects[0].top - parentBoundingRect.top,
  //     bottomRight: _.last(rects).right - parentBoundingRect.left,
  //     bottomTop: _.last(rects).top - parentBoundingRect.top,
  //     boundRight: bounds.right - parentBoundingRect.left,
  //     wrapped: rects.length > 1
  //   }
  // }

  _createClass(Placeholder, [{
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        { className: 'placeholder' },
        _lodash2['default'].chain(this.props.item.placeholderTexts).map(function (desc, index) {
          var className = 'placeholder-component descriptor-' + (_this.props.item.argument ? '' : _lodash2['default'].kebabCase(desc) || desc.replace(' ', '-'));
          return [_react2['default'].createElement(
            'div',
            { className: 'placeholder-component category-conjunction', key: index + ',' },
            ', '
          ), _react2['default'].createElement(
            'div',
            { className: className, key: index },
            desc
          )];
        }).flatten().rest().value()
      );
    }
  }]);

  return Placeholder;
})(_react2['default'].Component);

var LaconaOption = (function (_React$Component2) {
  _inherits(LaconaOption, _React$Component2);

  function LaconaOption() {
    _classCallCheck(this, LaconaOption);

    _get(Object.getPrototypeOf(LaconaOption.prototype), 'constructor', this).call(this);
    this.updateCount = 0;
  }

  _createClass(LaconaOption, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var nextProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var words = (0, _reactDom.findDOMNode)(this.refs.words);
      var descs = (0, _reactDom.findDOMNode)(this.refs.descriptors);
      var wordsRect = words.getBoundingClientRect();

      var all = _lodash2['default'].zip(_lodash2['default'].toArray(words.children), _lodash2['default'].toArray(descs.children));

      _lodash2['default'].forEach(all, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var word = _ref2[0];
        var desc = _ref2[1];

        var rects = word.getClientRects();
        var rect = rects[0]; //use _.last for RTL
        var lines = _lodash2['default'].groupBy(rects, 'top');
        var keys = Object.keys(lines);
        if (keys.length > 1) {
          var firstLineRects = lines[keys[0]];
          var secondLineRects = lines[keys[1]];
          if (_lodash2['default'].last(firstLineRects).right - firstLineRects[0].left < 50 && _lodash2['default'].last(secondLineRects).right - secondLineRects[0].left >= 50) {
            rect = secondLineRects[0];
          }
        }

        desc.style.left = rect.left - wordsRect.left + 'px';
        // // RTL
        // desc.style.right = `${wordsRect.right - rect.right}px`
        desc.style.top = rect.top - wordsRect.top + 6 + 'px';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var itemGroups = _lodash2['default'].chain(this.props.option.words).reduce(function (acc, item) {
        var last = _lodash2['default'].last(_lodash2['default'].last(acc));
        if (last && last.argument === item.argument) {
          _lodash2['default'].last(acc).push(item);
        } else {
          acc.push([item]);
        }
        return acc;
      }, []).value();

      var descriptors = _lodash2['default'].chain(itemGroups).map(function (itemGroup, index) {
        if (itemGroup.length === 1 && itemGroup[0].placeholder) {
          return _react2['default'].createElement('div', { className: 'descriptor', key: index });
        } else {
          var first = _lodash2['default'].first(itemGroup);
          var _className = 'descriptor descriptor-' + (_lodash2['default'].kebabCase(first.argument) || first.argument && first.argument.replace(' ', '-')) + ' category-' + first.category;
          return _react2['default'].createElement(
            'div',
            { className: _className, key: index },
            first.argument
          );
        }
      })
      // .map(elem => [<div className='spacer-left' />, elem, <div className='spacer-right' />])
      .flatten().value();

      var words = _lodash2['default'].map(itemGroups, function (itemGroup, index) {
        var first = _lodash2['default'].first(itemGroup);
        var className = 'word descriptor-' + (_lodash2['default'].kebabCase(first.argument) || first.argument && first.argument.replace(' ', '-'));

        return _react2['default'].createElement(
          'div',
          { className: className, key: index },
          _lodash2['default'].map(itemGroup, function (item, index) {
            if (item.placeholder) {
              return _react2['default'].createElement(Placeholder, { item: item, key: index });
            } else {
              var _className2 = 'word-component' + (item.input ? ' highlighted' : '') + ' category-' + item.category + (item.fallthrough ? ' fallthrough' : '') + (item.decorator ? ' decorator' : '');
              return _react2['default'].createElement(
                'div',
                { className: _className2, key: index },
                item.text
              );
            }
          })
        );
      });

      var className = 'option' + (this.props.selected ? ' selected' : '');
      return _react2['default'].createElement(
        'div',
        {
          className: className,
          onMouseOver: this.props.select,
          onClick: this.props.execute,
          onMouseDown: this.props.onMouseDown,
          onMouseUp: this.props.onMouseUp },
        _react2['default'].createElement(
          'div',
          { className: 'hint' },
          this.props.hint
        ),
        _react2['default'].createElement(
          'div',
          { className: 'descriptors', ref: 'descriptors' },
          descriptors
        ),
        _react2['default'].createElement(
          'div',
          { className: 'words', ref: 'words' },
          words
        )
      );
    }
  }]);

  return LaconaOption;
})(_react2['default'].Component);

exports['default'] = LaconaOption;
module.exports = exports['default'];