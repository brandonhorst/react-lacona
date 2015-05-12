'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _Phrase = require('./phrase');

var _Phrase2 = _interopRequireDefault(_Phrase);

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

function wordize(words) {
  return words.map(function (item, index) {
    var categoryList = item.category || '';
    var categories = categoryList.split(' ').map(function (cat) {
      return 'category-' + cat;
    }).join(' ');
    var className = '' + categories + '' + (item.input ? ' highlighted' : '') + '' + (item.placeholder ? ' placeholder' : '');
    return _React2['default'].createElement(
      'div',
      { className: className, key: index },
      item.string
    );
  });
}

var LaconaOption = (function (_React$Component) {
  function LaconaOption() {
    _classCallCheck(this, LaconaOption);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(LaconaOption, _React$Component);

  _createClass(LaconaOption, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.execute();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var className = 'option' + (this.props.selected ? ' selected' : '');
      var backgroundStyle = this.props.selected ? { marginTop: 28 * this.props.selectedItemNumber } : {};
      return _React2['default'].createElement(
        'div',
        { className: className, onClick: this.click.bind(this) },
        _React2['default'].createElement('div', { className: 'background', style: backgroundStyle, onMouseOver: this.props.select }),
        _import2['default'].map(this.props.option, function (phrase, i) {
          return _React2['default'].createElement(_Phrase2['default'], {
            phrase: phrase,
            key: i,
            selectedItemNumber: _this.props.selected ? _this.props.selectedItemNumber : undefined });
        })
      );
      // const match = wordize(this.props.option.match)
      // const completion = wordize(this.props.option.completion)
      // const suggestions = _.chain(this.props.option.suggestions)
      //   .map(wordize)
      //   .map(words => <div className='suggestion-option'>{words}</div>)
      //   .value()
      // const divs = (
      //   <div>
      //     <div className='match'>{match}</div>
      //     <div className='suggestion'>
      //       <div className='descriptor'>{this.props.option.suggestionDescriptor}</div>
      //       <div className='suggestion-options'>{suggestions}</div>
      //     </div>
      //     <div className='completion'>{completion}</div>
      //   </div>
      // )
      //
      // const className = `option${(this.props.selected ? ' selected' : '')}`
      // const qualifiers = this.props.option.qualifiers ? `(${this.props.option.qualifiers.join(', ')})` : null
      //
      // const hint = this.props.selected ? '↩' : ''
      //
      // return (
      //   <div onMouseDown={this.click.bind(this)} onMouseMove={this.props.select} className={className}>
      //     <div className='hint'>{hint}</div>
      //     <div className='words'>{divs}</div>
      //     <div className='qualifiers'>{qualifiers}</div>
      //   </div>
      // )
    }
  }]);

  return LaconaOption;
})(_React2['default'].Component);

exports['default'] = LaconaOption;
module.exports = exports['default'];