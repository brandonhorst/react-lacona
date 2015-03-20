/*eslint-env mocha*/

import _ from 'lodash'
import chai, {expect} from 'chai'
import jsdom from 'jsdom'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.document = jsdom.jsdom()
global.window = global.document.defaultView
global.navigator = global.window.navigator

import React from 'react/addons'
import LaconaView from '..'
const TestUtils = React.addons.TestUtils

var outputs = [{
  match: [{string: 'match', category: 'match', input: true}],
  suggestion: [
    {string: 'sugg', category: 'suggestion', input: false},
    {string: 'estion', category: 'suggestion', input: true}
  ],
  completion: [{string: 'completion', category: 'completion', input: false}]
}, {
  match: [{string: 'match2', category: 'match', input: true}],
  suggestion: [
    {string: 'sugg', category: 'suggestion', input: false},
    {string: 'estion2', category: 'suggestion', input: true}
  ],
  completion: [{string: 'completion2', category: 'completion', input: false}]
}]

describe('react-lacona', function () {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders one output properly', function () {
    const node = TestUtils.renderIntoDocument(<LaconaView outputs={[outputs[0]]} />)

    const matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-match')
    const suggestions = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-suggestion')
    const completions = TestUtils.scryRenderedDOMComponentsWithClass(node, 'category-completion')

    expect(matches).to.have.length(1)
    expect(matches[0].getDOMNode().textContent).to.equal('match')
    expect(matches[0].getDOMNode().className).to.match(/\bhighlighted\b/)

    expect(suggestions).to.have.length(2)
    expect(suggestions[0].getDOMNode().textContent).to.equal('sugg')
    expect(suggestions[0].getDOMNode().className).to.not.match(/\bhighlighted\b/)
    expect(suggestions[1].getDOMNode().textContent).to.equal('estion')
    expect(suggestions[1].getDOMNode().className).to.match(/\bhighlighted\b/)

    expect(completions).to.have.length(1)
    expect(completions[0].getDOMNode().textContent).to.equal('completion')
    expect(completions[0].getDOMNode().className).to.not.match(/\bhighlighted\b/)
  })

  it('can change its outputs and keep same selection (up)', function () {
    React.render(<LaconaView outputs={[outputs[0]]} />, document.body)
    const node = React.render(<LaconaView outputs={outputs} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(2)
    expect(options.children[0].className).to.match(/\bselected\b/)
    expect(options.children[0].children[0].innerHTML).to.equal('match')
    expect(options.children[1].className).to.not.match(/\bselected\b/)
    expect(options.children[1].children[0].innerHTML).to.equal('match2')
  })

  it('can change its outputs and keep same selection (down)', function () {
    React.render(<LaconaView outputs={[outputs[1]]} />, document.body)
    const node = React.render(<LaconaView outputs={outputs} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(2)
    expect(options.children[0].className).to.not.match(/\bselected\b/)
    expect(options.children[0].children[0].innerHTML).to.equal('match')
    expect(options.children[1].className).to.match(/\bselected\b/)
    expect(options.children[1].children[0].innerHTML).to.equal('match2')
  })

  it('can remove an output and keep same selection', function () {
    React.render(<LaconaView outputs={outputs} />, document.body)
    const node = React.render(<LaconaView outputs={[outputs[1]]} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(1)
    expect(options.children[0].className).to.match(/\bselected\b/)
    expect(options.children[0].children[0].innerHTML).to.equal('match2')
  })

  it('can remove an output and pick a new selection', function () {
    React.render(<LaconaView outputs={outputs} />, document.body)
    var node = React.render(<LaconaView outputs={[outputs[0]]} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(1)
    expect(options.children[0].className).to.match(/\bselected\b/)
    expect(options.children[0].children[0].innerHTML).to.equal('match')
  })

  it('can remove all outputs', function () {
    React.render(<LaconaView outputs={[outputs[0]]} />, document.body)
    const node = React.render(<LaconaView outputs={[]} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(0)
  })

  it('can add an output', function () {
    React.render(<LaconaView outputs={[]} />, document.body)
    const node = React.render(<LaconaView outputs={[outputs[0]]} />, document.body)

    const options = TestUtils.findRenderedDOMComponentWithClass(node, 'options').getDOMNode()
    expect(options.children).to.have.length(1)
    expect(options.children[0].className).to.match(/\bselected\b/)
    expect(options.children[0].children[0].innerHTML).to.equal('match')
  })

  it('passes input to update', function () {
    var update = sinon.spy()
    var node = TestUtils.renderIntoDocument(<LaconaView update={update} />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.change(input, {target: {value: 'test'}})

    expect(update).to.have.been.calledOnce
    expect(update).to.have.been.calledWith('test')
  })

  it('does not break if methods are not provided', function () {
    var node = TestUtils.renderIntoDocument(<LaconaView />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')

    expect(function () {
      TestUtils.Simulate.change(input, {target: {value: 'test'}})
    }).to.not.throw(Error)

    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return
    }).to.not.throw(Error)
  })

  it('does not break on keystrokes', function () {
    var node = TestUtils.renderIntoDocument(<LaconaView />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 65}) // return
    }).to.not.throw(Error)
  })

  it('calls done on return', function () {
    var done = sinon.spy()
    var node = TestUtils.renderIntoDocument(
      <LaconaView outputs={[outputs[0]]} execute={done} />
    )
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return

    expect(done).to.have.been.calledOnce
    expect(done).to.have.been.calledWith(0)
  })

  it('can call done after adding an output', () => {
    const execute = sinon.spy()
    React.render(<LaconaView outputs={[]} execute={execute} />, document.body)
    const node = React.render(<LaconaView outputs={[outputs[0]]} execute={execute} />, document.body)
    const input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')

    TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return
    expect(execute).to.have.been.calledOnce
    expect(execute).to.have.been.calledWith(0)
  })

  it('does not call done with no output', function () {
    var done = sinon.spy()
    var node = TestUtils.renderIntoDocument(<LaconaView execute={done} />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return

    expect(done).to.not.have.been.called
  })

  it('selects other outputs with down and up', function () {
    var done = sinon.spy()
    var node = TestUtils.renderIntoDocument(
      <LaconaView outputs={outputs} execute={done} />
    )
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.keyDown(input, {keyCode: 40}) // down
    TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return

    TestUtils.Simulate.keyDown(input, {keyCode: 38}) // up
    TestUtils.Simulate.keyDown(input, {keyCode: 13}) // return

    expect(done).to.have.been.calledTwice
    expect(done.firstCall).to.have.been.calledWith(1)
    expect(done.secondCall).to.have.been.calledWith(0)
  })

  it('completes the output with tab', function () {
    var update = sinon.spy()
    var node = TestUtils.renderIntoDocument(
      <LaconaView outputs={[outputs[0]]} update={update} />
    )
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.keyDown(input, {keyCode: 9}) // tab

    expect(update).to.have.been.calledOnce
    expect(update).to.have.been.calledWith('matchsuggestion')
  })

  it('tab does not break with no output', function () {
    var node = TestUtils.renderIntoDocument(<LaconaView />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 9}) // tab
    }).to.not.throw(Error)
  })

  it('cancels with escape', function () {
    var cancel = sinon.spy()
    var node = TestUtils.renderIntoDocument(<LaconaView cancel={cancel} />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    TestUtils.Simulate.keyDown(input, {keyCode: 27}) // escape
    expect(cancel).to.have.been.calledOnce
  })

  it('escape does not break with no cancel', function () {
    var node = TestUtils.renderIntoDocument(<LaconaView />)
    var input = TestUtils.findRenderedDOMComponentWithTag(node, 'input')
    expect(function () {
      TestUtils.Simulate.keyDown(input, {keyCode: 27}) // tab
    }).to.not.throw(Error)
  })
})
