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

function toPlaceholder(wordList) {
  return _import2['default'].chain(wordList).takeWhile(function (word) {
    return !word.placeholder;
  }).map('string').join('').value();
}

function hasPlaceholder(wordList) {
  return _import2['default'].some(wordList, function (word) {
    return word.placeholder;
  });
}

function getPhraseListItemCount(phraseList) {
  var firstComplexPhrase = _import2['default'].find(phraseList, function (phrase) {
    return phrase.items && phrase.items.length > 1;
  });
  return firstComplexPhrase ? firstComplexPhrase.items.length : 1;
}

function getTotalSelectables(outputs) {
  return _import2['default'].chain(outputs).map(getPhraseListItemCount).sum().value();
}

var LaconaView = (function (_React$Component) {
  function LaconaView(props) {
    _classCallCheck(this, LaconaView);

    _get(Object.getPrototypeOf(LaconaView.prototype), 'constructor', this).call(this, props);

    var hasOutputs = this.props.outputs.length > 0;
    this.state = {
      selection: hasOutputs ? 0 : -1
    };
  }

  _inherits(LaconaView, _React$Component);

  _createClass(LaconaView, [{
    key: 'getSelectionNumberInPhraseList',
    value: function getSelectionNumberInPhraseList(number) {
      var totalCount = 0;
      var itemNumber = undefined;

      var phraseIndex = _import2['default'].findIndex(this.props.outputs, function (phraseList) {
        var thisCount = getPhraseListItemCount(phraseList);
        if (totalCount + thisCount > number) {
          itemNumber = number - totalCount;
          return true;
        }

        totalCount += thisCount;
        return false;
      });

      return { phraseIndex: phraseIndex, itemNumber: itemNumber };
    }
  }, {
    key: 'getAllWords',
    value: function getAllWords(number) {
      var _getSelectionNumberInPhraseList = this.getSelectionNumberInPhraseList(number);

      var phraseIndex = _getSelectionNumberInPhraseList.phraseIndex;
      var itemNumber = _getSelectionNumberInPhraseList.itemNumber;

      return _import2['default'].chain(this.props.outputs[phraseIndex]).map(function (phrase) {
        if (phrase.placeholder) return phrase;
        if (phrase.words) return phrase.words;
        if (phrase.items) return phrase.items[itemNumber];
        return [];
      }).flatten().value();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.outputs !== this.props.outputs) {
        if (nextProps.outputs.length > 0) {
          this.setSelection(0);
        } else {
          this.setState({ selection: -1 });
        }
      }
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
    key: 'focusBar',
    value: function focusBar() {
      this.refs.input.focus();
    }
  }, {
    key: 'moveSelection',
    value: function moveSelection(steps) {
      var total = getTotalSelectables(this.props.outputs);
      var selection = bound(this.state.selection + steps, total);
      this.setSelection(selection);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      this.setState({ selection: selection });
      this.props.select(selection);
    }
  }, {
    key: 'complete',
    value: function complete(_x, wordList) {
      var selection = arguments[0] === undefined ? this.state.selection : arguments[0];

      if (selection > -1) {
        var realWordList = wordList || this.getAllWords(selection);
        var newString = toPlaceholder(realWordList);
        if (newString !== this.props.userInput) {
          this.update(newString);
        }
      }
    }
  }, {
    key: 'execute',
    value: function execute() {
      var selection = arguments[0] === undefined ? this.state.selection : arguments[0];

      if (selection > -1) {
        var wordList = this.getAllWords(selection);
        if (hasPlaceholder(wordList)) {
          this.complete(selection, wordList);
        } else {
          this.props.execute(selection);
        }
      }
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
    key: 'render',
    value: function render() {
      var _getSelectionNumberInPhraseList2 = this.getSelectionNumberInPhraseList(this.state.selection);

      var phraseIndex = _getSelectionNumberInPhraseList2.phraseIndex;
      var itemNumber = _getSelectionNumberInPhraseList2.itemNumber;

      return _React2['default'].createElement(
        'div',
        { className: 'lacona-view' },
        _React2['default'].createElement(_LaconaInput2['default'], { ref: 'input', update: this.update.bind(this),
          completeSelection: this.complete.bind(this),
          moveSelection: this.moveSelection.bind(this),
          focus: this.props.focus, blur: this.props.blur,
          userInput: this.props.userInput,
          execute: this.execute.bind(this), cancel: this.cancel.bind(this),
          placeholder: this.props.placeholder, autoFocus: this.props.autoFocus }),
        _React2['default'].createElement(_LaconaOptions2['default'], { outputs: this.props.outputs, selectedPhraseIndex: phraseIndex,
          selectedItemNumber: itemNumber,
          select: this.setSelection.bind(this), execute: this.execute.bind(this) })
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
  execute: function execute() {},
  select: function select() {},
  focus: function focus() {},
  blur: function blur() {}
};
module.exports = exports['default'];
// this.refs.input.blur() //I am commenting this out, but www.lacona.io needs it