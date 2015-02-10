var chai = require('chai');
var expect = chai.expect;
var jsdom = require('jsdom');
var sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('react-lacona', function () {
  var React, reactLacona, TestUtils;
  var outputs = [
    [{id: 0, data: {
      match: [{string: 'match', category: 'match', input: true}],
      suggestion: [
        {string: 'sugg', category: 'suggestion', input: false},
        {string: 'estion', category: 'suggestion', input: true}
      ],
      completion: [{string: 'completion', category: 'completion', input: false}]
    }}],
    [{id: 1, data: {
      match: [{string: 'match2', category: 'match', input: true}],
      suggestion: [
        {string: 'sugg', category: 'suggestion', input: false},
        {string: 'estion2', category: 'suggestion', input: true}
      ],
      completion: [{string: 'completion2', category: 'completion', input: false}]
    }}]
  ];

  global.document = jsdom.jsdom();
  global.window = global.document.parentWindow;
  global.navigator = global.window.navigator;

  React = require('react/addons');
  reactLacona = React.createFactory(require('..'));
  TestUtils = React.addons.TestUtils;

  it('renders one output properly', function () {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0]}));

    var matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-match');
    var suggestions = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-suggestion');
    var completions = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-completion');

    expect(matches).to.have.length(1);
    expect(matches[0].getDOMNode().textContent).to.equal('match');
    expect(matches[0].getDOMNode().className).to.match(/\bhighlighted\b/);

    expect(suggestions).to.have.length(2);
    expect(suggestions[0].getDOMNode().textContent).to.equal('sugg');
    expect(suggestions[0].getDOMNode().className).to.not.match(/\bhighlighted\b/);
    expect(suggestions[1].getDOMNode().textContent).to.equal('estion');
    expect(suggestions[1].getDOMNode().className).to.match(/\bhighlighted\b/);

    expect(completions).to.have.length(1);
    expect(completions[0].getDOMNode().textContent).to.equal('completion');
    expect(completions[0].getDOMNode().className).to.not.match(/\bhighlighted\b/);
  });

  it('can change its outputs and keep same selection (up)', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0]}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(2);
      expect(options.children[0].className).to.match(/\bselected\b/);
      expect(options.children[0].children[0].innerHTML).to.equal('match');
      expect(options.children[1].className).to.not.match(/\bselected\b/);
      expect(options.children[1].children[0].innerHTML).to.equal('match2');

      done();
    }

    node.setProps({outputs: outputs[0].concat(outputs[1])}, callback);
  });

  it('can change its outputs and keep same selection (down)', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0]}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(2);
      expect(options.children[0].className).to.not.match(/\bselected\b/);
      expect(options.children[0].children[0].innerHTML).to.equal('match2');
      expect(options.children[1].className).to.match(/\bselected\b/);
      expect(options.children[1].children[0].innerHTML).to.equal('match');

      done();
    }

    node.setProps({outputs: outputs[1].concat(outputs[0])}, callback);
  });

  it('can remove an output and keep same selection', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0].concat(outputs[1])}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(1);
      expect(options.children[0].className).to.match(/\bselected\b/);
      expect(options.children[0].children[0].innerHTML).to.equal('match2');

      done();
    }

    node.setProps({outputs: outputs[1]}, callback);
  });

  it('can remove an output and pick a new selection', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0].concat(outputs[1])}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(1);
      expect(options.children[0].className).to.match(/\bselected\b/);
      expect(options.children[0].children[0].innerHTML).to.equal('match');

      done();
    }

    node.setProps({outputs: outputs[0]}, callback);
  });

  it('can remove all outputs', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: outputs[0]}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(0);

      done();
    }

    node.setProps({outputs: []}, callback);
  });

  it('can add an output', function (done) {
    var node = TestUtils.renderIntoDocument(reactLacona({outputs: []}));

    function callback(err) {
      var options;
      expect(err).to.not.exist;

      options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode();
      expect(options.children).to.have.length(1);
      expect(options.children[0].className).to.match(/\bselected\b/);
      expect(options.children[0].children[0].innerHTML).to.equal('match');

      done();
    }

    node.setProps({outputs: outputs[0]}, callback);
  });

  it('passes input to update', function () {
    var update = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({update: update}));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    TestUtils.Simulate.change(input, {target: {value: 'test'}});

    expect(update).to.have.been.calledOnce;
    expect(update).to.have.been.calledWith('test');
  });

  it('does not break if methods are not provided', function () {
    var node = TestUtils.renderIntoDocument(reactLacona());
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');

    expect(function () {
      TestUtils.Simulate.change(input, {target: {value: 'test'}});
    }).to.not.throw(Error);

    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return
    }).to.not.throw(Error);
  });

  it('does not break on keystrokes', function () {
    var node = TestUtils.renderIntoDocument(reactLacona());
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 65}); //return
    }).to.not.throw(Error);
  });

  it('calls done on return', function () {
    var done = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({
      outputs: outputs[0],
      execute: done
    }));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return

    expect(done).to.have.been.calledOnce;
    expect(done).to.have.been.calledWith(0);
  });

  it('can call done after adding an output', function (done) {
    var compDone = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({
      outputs: [],
      execute: compDone
    }));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');

    function callback(err) {
      expect(err).to.not.exist;

      TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return
      expect(compDone).to.have.been.calledOnce;
      expect(compDone).to.have.been.calledWith(0);

      done();
    }

    node.setProps({outputs: outputs[0], execute: compDone}, callback);
  });

  it('does not call done with no output', function () {
    var done = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({execute: done}));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return

    expect(done).to.not.have.been.called;
  });

  it('selects other outputs with down and up', function () {
    var done = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({
      outputs: outputs[0].concat(outputs[1]),
      execute: done
    }));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    TestUtils.Simulate.keyDown(input, {keyCode: 40}); //down
    TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return

    TestUtils.Simulate.keyDown(input, {keyCode: 38}); //up
    TestUtils.Simulate.keyDown(input, {keyCode: 13}); //return


    expect(done).to.have.been.calledTwice;
    expect(done.firstCall).to.have.been.calledWith(1);
    expect(done.secondCall).to.have.been.calledWith(0);
  });

  it('completes the output with tab', function () {
    var update = sinon.spy();
    var node = TestUtils.renderIntoDocument(reactLacona({
      outputs: outputs[0],
      update: update
    }));
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    TestUtils.Simulate.keyDown(input, {keyCode: 9}); //tab

    expect(update).to.have.been.calledOnce;
    expect(update).to.have.been.calledWith('matchsuggestion');
  });

  it('tab does not break with no output', function () {
    var node = TestUtils.renderIntoDocument(reactLacona());
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input');
    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 9}); //tab
    }).to.not.throw(Error);
  });
});
