import React, { Component } from 'react'
import AjaxAdapter from '../helpers/ajaxAdapter.js'
import TextInput from './TextInput.jsx'

const ajax = new AjaxAdapter(fetch)

class Story extends Component {
  state = {
    story: null,
    code: '',
    error: null,
    isReadMode: true,
  }

  componentDidMount = () => {
    ajax.getStory().then(data => {
      this.setState({ story: data })
    })
  }

  updateCode = e => {
    console.log('updateCode', e.target.value)
    var regExOnlyLettersSpaces = /^[a-zA-Z\s]*$/;
    if (!regExOnlyLettersSpaces.test(e.key)) {
      e.preventDefault()
      return
    }
    this.setState({
      code: e.target.value.split(' ').join('').toLowerCase()
    })
  }

  setIsReadMode = () => {
    this.setState({
      isReadMode: false,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    // validate code --> filter clientside to see if there is a match
    const successCode = await this.state.story.filter(each => each.code === this.state.code)

    if (successCode.length) {
      // Success!
      await ajax.updateStory(this.state.code).then(data => {
        // update story
        this.setState({ story: data })
        // scroll to element
        this[this.state.code].scrollIntoView()
        // Start download
        this.download.click()
        this.setState({ isReadMode: true })
      }).catch(error => console.error('error when updating', error))
    } else {
      // Code not right, show error
      this.setState({
        error: 'That is not a valid code, please try again.'
      })
    }
  }

  render() {
    const { story, error, isReadMode, code } = this.state

    console.log('code', code)

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
                    <span className={`${each.isCovered ? 'is-covered' : ''} ${isReadMode && each.code == code ? 'show' : ''}`}>{each.value}. </span>
                    {each.endOfParagraph && <span><br/><br/></span>} 
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
          <div className={`container ${isReadMode ? 'is-success' : ''}`}>
            <p>BAMBARA</p>
            <p>Night Chimes</p>
            {
              isReadMode
              &&
              <div>
                <img className="album-art" src="https://f4.bcbits.com/img/a3123205419_10.jpg" alt=""/>
                <button className="button" onClick={this.setIsReadMode}>ENTER DOWNLOAD CODE</button>
              </div>
            }
            {
              !isReadMode
              &&
              <div className="form-container">
                <p className="instructions">Instructions for digital download:</p>
                <p className="instructions">Enter the highlighted words from the passage sent to you with your copy of the Night Chimes 7". Click REVEAL.</p>
                <p className="instructions">Your download will start immediately after it your passage is revealed to the world.</p>
                <form id="code" ref={node => this.form = node} onSubmit={this.handleSubmit}>
                  <TextInput
                    type="text"
                    placeholder="Enter download code"
                    value={code}
                    error={error}
                    onChange={this.updateCode}
                  />
                  <button className="button" type="submit">REVEAL</button>
                  <a ref={node => {this.download = node}} href="http://celesteglavin.com/BAMBARA.zip" download />
                </form>
              </div>
            }
            <a href="https://bambara.bandcamp.com/album/night-chimes" target="blank">Listen >>></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
