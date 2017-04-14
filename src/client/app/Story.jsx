import React, { Component } from 'react'
import AjaxAdapter from '../helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch)

class Story extends Component {
  state = {
    story: null,
    code: '',
  }

  componentDidMount = () => {
    ajax.getStory().then(data => {
      this.setState({ story: data })
    })
  }

  updateCode = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    // validate code
    const successCode = await this.state.story.filter(each => each.code === this.state.code)
    
    // reveal code={this.state.code}
    if (successCode.length) {
      await ajax.updateStory(this.state.code).then(data => {
        this.setState({ story: data })
      }).catch(error => console.error('error when updating', error))
    }
    // TODO > scroll to?
    // TODO > start download
      // anchor tag has a download attribute
      // set download=true (initially it is false)
      // href to site url
  }

  render() {
    const { story } = this.state

    return (
      <div className="story">
        <div className="left-col">
          <div className="story-container">
            <p>Night Chimes</p>
            <p>
              {
                story
                &&
                story.map((each, index) => (
                  <span
                    key={`line-${index}`}
                    className="each-line"
                    id={each._id}
                  >
                    <span className={`${each.isCovered ? 'is-covered' : ''}`}>{each.value}. </span>
                    {each.endOfParagraph && <span className="new-paragraph" />} 
                  </span>
                ))
              }
            </p>
          </div>
        </div>
        <div className="right-col">
          <div className="form-container">
            <p>Enter your code to reveal a piece of the story to the world. If entered correctly, your download should start immediately after clicking REVEAL.</p>
            <form id="code" ref={node => this.form = node} onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.code} onChange={this.updateCode} />
              <button className="button" type="submit">REVEAL</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
