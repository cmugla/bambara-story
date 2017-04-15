import React, { Component } from 'react'
import AjaxAdapter from '../helpers/ajaxAdapter.js'
import TextInput from './TextInput.jsx'

const ajax = new AjaxAdapter(fetch)

class Story extends Component {
  state = {
    story: null,
    code: '',
    error: null,
    isSuccess: false,
  }

  componentDidMount = () => {
    ajax.getStory().then(data => {
      this.setState({ story: data })
    })
  }

  updateCode = (e) => {
    this.setState({
      code: e.target.value.toLowerCase()
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()


    // validate code
    const successCode = await this.state.story.filter(each => each.code === this.state.code)

    if (successCode.length) {
      // Success!
      await ajax.updateStory(this.state.code).then(data => {
        this.setState({ story: data })
      }).catch(error => console.error('error when updating', error))
      // TODO > clear form
      this.setState({
        isSuccess: true,
      })
    } else {
      // Code not right, show error
      this.setState({
        error: 'Looks like that is not a valid code, please try again.'
      })
    }
    // TODO > scroll to id = _id
    // TODO > start download
      // anchor tag has a download attribute
      // set download=true (initially it is false)
      // href to album url
  }

  render() {
    const { story, error, isSuccess, code } = this.state

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
                    ref={node => { this[each.code] = node }}
                    key={`line-${index}`}
                    className="each-line"
                  >
                    <span className={`${each.isCovered ? 'is-covered' : ''}`}>{each.value}. </span>
                    {each.endOfParagraph && <span className="new-paragraph" />} 
                  </span>
                ))
              }
            </p>
            <p>Story by Reid Bateh</p>
            <p>Music by <a href="https://bambara.bandcamp.com/album/night-chimes" target="blank">BAMBARA</a></p>
            <p><a href="https://coldmoonrecords.bandcamp.com/" target="blank">Cold Moon Records</a></p>
            <p>Website by <a href="http://celesteglavin.com/" target="blank">Celeste Glavin</a></p>
          </div>
        </div>
        <div className="right-col">
          <div className="form-container">
            <p>BAMBARA</p>
            <p>Night Chimes</p>
            <p>Album download</p>
            <p>Enter your code to reveal a piece of the story to the world. If entered correctly, your download should start immediately after clicking REVEAL.</p>
            <form key={key} id="code" ref={node => this.form = node} onSubmit={this.handleSubmit}>
              <TextInput
                type="text"
                value={code}
                onChange={this.updateCode}
                error={error}
              />
              <button className="button" type="submit">REVEAL</button>
            </form>
            <a href="https://bambara.bandcamp.com/album/night-chimes" target="blank">Listen >>></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
