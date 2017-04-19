import React, { Component } from 'react'
import Scroll, { Element, scroller } from 'react-scroll'

import AjaxAdapter from '../helpers/ajaxAdapter.js'
import TextInput from './TextInput.js'

const ajax = new AjaxAdapter(fetch)
const Config = {
  IS_IOS: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
}

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

  handleSubmit = (e) => {
    e.preventDefault()

    // validate code --> filter clientside to see if there is a match
    const successCode = this.state.story.filter((each) => each.code === this.state.code)

    if (successCode.length) {
      // Success!
      ajax.updateStory(this.state.code).then(data => {
        // update story
        this.setState({ story: data })
        // scroll to element
        const offset = -((window.innerHeight / 2) - 100)
        scroller.scrollTo(this.state.code, {
          duration: 200,
          delay: 0,
          smooth: true,
          offset: offset,
        })
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

  getStyle = style => {
    return { fontStyle: style }
  }

  render() {
    const { story, error, isReadMode, code } = this.state

    return (
      <div className="story">
        <div className="right-col">
          <div className={`container ${isReadMode ? 'is-success' : ''}`}>
            <p>BAMBARA</p>
            <p>Night Chimes</p>
            {
              isReadMode
              &&
              <div>
                <img className="album-art" src="src/client/images/cover.jpg" alt=""/>
                <button className="button" onClick={this.setIsReadMode}>ENTER DOWNLOAD CODE</button>
              </div>
            }
            {
              !isReadMode
              &&
              !Config.IS_IOS
              &&
              <div className="form-container">
                <p className="instructions">Instructions for digital download:</p>
                <p className="instructions">Enter the highlighted words on the download card sent to you with your copy of the Night Chimes 7". Click REVEAL.</p>
                <p className="instructions">Your download will start immediately after your passage is revealed to the world.</p>
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
            {
              !isReadMode
              &&
              Config.IS_IOS
              &&
              <div>
                <p>Darn, iOS devices do not support direct file downloads. Come back to this url on your Mac or PC (or Android device) and follow the instructions for download and, once downloaded, transfer the files to your iOS device.</p>
                <p className="instructions">Refer to <a href="https://support.apple.com/en-us/HT205919">iTunes Syncing Help</a> for more info on transferring files to your Apple device.</p>
              </div>
            }
            <a href="https://coldmoonrecords.bandcamp.com/album/night-chimes-7" target="blank">Get Night Chimes 7" >>></a>
          </div>
        </div>
        <div className="left-col">
          <div className="story-container">
            <p>Night Chimes</p>
            {
              story
              &&
              story.map((each, index) => (
                <Element
                  name={each.code}
                  key={`line-${index}`}
                >
                  <span className="each-line">
                    <span style={this.getStyle(each.font_style)} className={`${each.isCovered ? 'is-covered' : ''} ${isReadMode && each.code == code ? 'show' : ''}`}>{each.value}</span>
                    {each.endOfParagraph && <span><br/><br/></span>} 
                  </span>
                </Element>
              ))
            }
            <p>Story by Reid Bateh</p>
            <p>Music by <a href="https://bambara.bandcamp.com/album/night-chimes" target="blank">BAMBARA</a></p>
            <p><a href="https://coldmoonrecords.bandcamp.com/" target="blank">Cold Moon Records</a></p>
            <p>Website by <a href="http://celesteglavin.com/" target="blank">Celeste Glavin</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
