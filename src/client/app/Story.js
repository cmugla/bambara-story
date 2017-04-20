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

  handleAnalyticsClickReveal = e => {
    ga('send', 'event', 'Story', 'click', 'REVEAL');
  }

  handleClickExternalLink = e => {
    ga('send', 'event', 'External', 'click', e.target.name);
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // send google anaytics event
    this.handleAnalyticsClickReveal()

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
        // Start download, if not an iOS device (not supported)
        if (!Config.IS_IOS) {
          this.download.click()
          // send event to Google Analytics
          ga('send', 'event', 'Story', 'click', 'Download begins');
        }
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
          <div className="container">
            <p>BAMBARA</p>
            <p>Night Chimes</p>
            <div className={isReadMode ? '' : 'hide'}>
              <img className="album-art" src="src/client/images/cover.jpg" alt=""/>
              <button className="button" onClick={this.setIsReadMode}>ENTER DOWNLOAD CODE</button>
            </div>
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
                  <a ref={node => {this.download = node}} href="http://celesteglavin.com/BAMBARA.zip" download="BAMBARA - Night Chimes" />
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
                <p>In the meantime, check out Reid's short story, Night Chimes, below. Enter the highlighted words from the download card to reveal the accompanying unique passage to the world.</p>
                <form id="code" ref={node => this.form = node} onSubmit={this.handleSubmit}>
                  <TextInput
                    type="text"
                    placeholder="Enter download code"
                    value={code}
                    error={error}
                    onChange={this.updateCode}
                  />
                  <button className="button" type="submit">REVEAL</button>
                  <a ref={node => {this.download = node}} href="http://celesteglavin.com/BAMBARA.zip" download="BAMBARA - Night Chimes" />
                </form>
                <p className="instructions">Refer to <a name="apple support link" href="https://support.apple.com/en-us/HT205919" onClick={this.handleClickExternalLink}>iTunes Syncing Help</a> for more info on transferring files to your Apple device.</p>
              </div>
            }
            <a name="Night Chimes 7in link" href="https://coldmoonrecords.bandcamp.com/album/night-chimes-7" target="blank" onClick={this.handleClickExternalLink}>Get Night Chimes 7" >>></a>
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
                  key={`line-${index}`}
                  name={each.code}
                  className="each-line"
                >
                  <span>
                    <span style={this.getStyle(each.font_style)} className={`${each.isCovered ? 'is-covered' : ''} ${isReadMode && each.code == code ? 'show' : ''}`}>{each.value} </span>
                    {each.endOfParagraph && <span><br/><br/></span>} 
                  </span>
                </Element>
              ))
            }
            <p>Story by Reid Bateh</p>
            <p>Music by <a name="BAMBARA bandcamp link" href="https://bambara.bandcamp.com/album/night-chimes" target="blank" onClick={this.handleClickExternalLink}>BAMBARA</a></p>
            <p><a name="Cold Moon bandcamp link" href="https://coldmoonrecords.bandcamp.com/" target="blank" onClick={this.handleClickExternalLink}>Cold Moon Records</a></p>
            <p>Website by <a name="Celeste personal link" href="http://celesteglavin.com/" target="blank" onClick={this.handleClickExternalLink}>Celeste Glavin</a></p>
            <p className="instructions">If you have any questions, please contact Cold Moon Records at <a name="email Cold Moon" href="mailto:coldmoonrecords@gmail.com?subject=Heya%20from%20Bambara%20Night%20Chimes%20website" onClick={this.handleClickExternalLink}>coldmoonrecords@gmail.com</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
