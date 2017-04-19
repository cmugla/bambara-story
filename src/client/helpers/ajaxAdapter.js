export default class AjaxAdapter {
  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work.";
  }

  getStory() {
    return fetch('/story').then( r => r.json() )
  }

  updateStory(code) {
  	return fetch(`/story/${code}`, {
      method: 'PUT',
      mode: 'cors',
    }).then( r => r.json() )
  }
}