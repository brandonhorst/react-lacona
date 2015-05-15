'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var Placeholder = (function (_React$Component) {
  function Placeholder() {
    _classCallCheck(this, Placeholder);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Placeholder, _React$Component);

  _createClass(Placeholder, [{
    key: 'render',
    value: function render() {
      return _React2['default'].createElement(
        'div',
        { className: 'placeholder' },
        _import2['default'].chain(this.props.item.placeholderDescriptors).map(function (desc, index) {
          var className = 'placeholder-component descriptor-' + _import2['default'].kebabCase(desc);
          return [_React2['default'].createElement(
            'div',
            { className: 'placeholder-component category-conjunction', key: index + ',' },
            ', '
          ), _React2['default'].createElement(
            'div',
            { className: className, key: index },
            desc
          )];
        }).flatten().rest().value()
      );
    }
  }]);

  return Placeholder;
})(_React2['default'].Component);

var LaconaOption = (function (_React$Component2) {
  function LaconaOption() {
    _classCallCheck(this, LaconaOption);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(LaconaOption, _React$Component2);

  _createClass(LaconaOption, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var nextProps = arguments[0] === undefined ? {} : arguments[0];

      if (nextProps.option === this.props.option) {
        return;
      }var items = _import2['default'].zip(_import2['default'].toArray(_React2['default'].findDOMNode(this.refs.descriptors).children), _import2['default'].toArray(_React2['default'].findDOMNode(this.refs.words).children));

      _import2['default'].forEach(items, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var annotation = _ref2[0];
        var content = _ref2[1];

        annotation.style.width = 'auto';
        var max = Math.max(content.offsetLeft - annotation.offsetLeft + content.offsetWidth, annotation.offsetWidth + 1);
        annotation.style.width = '' + max + 'px';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var itemGroups = _import2['default'].chain(['match', 'suggestion', 'completion']).map(function (type) {
        return _import2['default'].map(_this.props.option[type], function (word) {
          return { word: word, type: type };
        });
      }).flatten().reduce(function (acc, item) {
        var last = _import2['default'].last(_import2['default'].last(acc));
        if (last && last.word.topLevelDescriptor === item.word.topLevelDescriptor) {
          _import2['default'].last(acc).push(item);
        } else {
          acc.push([item]);
        }
        return acc;
      }, []).value();

      var descriptors = _import2['default'].map(itemGroups, function (itemGroup, index) {
        if (itemGroup.length === 1 && itemGroup[0].word.placeholder) {
          return _React2['default'].createElement('div', { className: 'descriptor', key: index });
        } else {
          var first = _import2['default'].first(itemGroup).word;
          var _className = 'descriptor descriptor-' + _import2['default'].kebabCase(first.topLevelDescriptor) + ' category-' + first.category;
          return _React2['default'].createElement(
            'div',
            { className: _className, key: index },
            first.topLevelDescriptor
          );
        }
      });

      var words = _import2['default'].map(itemGroups, function (itemGroup, index) {
        var first = _import2['default'].first(itemGroup).word;
        var className = 'word descriptor-' + _import2['default'].kebabCase(first.topLevelDescriptor) + ' category-' + first.category;

        return _React2['default'].createElement(
          'div',
          { className: className, key: index },
          _import2['default'].map(itemGroup, function (item, index) {
            if (item.word.placeholder) {
              return _React2['default'].createElement(Placeholder, { item: item.word, key: index });
            } else {
              var _className2 = 'word-component ' + item.type + '' + (item.word.input ? ' highlighted' : '');
              return _React2['default'].createElement(
                'div',
                { className: _className2, key: index },
                item.word.string
              );
            }
          })
        );
      });

      var className = 'option' + (this.props.selected ? ' selected' : '');
      return _React2['default'].createElement(
        'div',
        { className: className },
        _React2['default'].createElement(
          'div',
          { className: 'descriptors', ref: 'descriptors' },
          descriptors
        ),
        _React2['default'].createElement(
          'div',
          { className: 'words', ref: 'words' },
          words
        )
      );
    }
  }]);

  return LaconaOption;
})(_React2['default'].Component);

exports['default'] = LaconaOption;
module.exports = exports['default'];