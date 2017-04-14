export default class AjaxAdapter {
  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getStory() {
    return fetch('/story').then( r => {
      const story = r.json()
      console.log('story get r', r, story)
      return story
    });
  }

  updateStory(code) {
  	console.log('updateStory', code)
  	return fetch(`/story/${code}`, {
      method: 'PUT',
    }).then( r => {
      const story = r.json()
      console.log('r', r, story)
      return story
    })
  }
}