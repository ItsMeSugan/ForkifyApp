import view from './view.js';
import icons from 'url:../../img/icons.svg';
import previewview from './previewview.js';

class bookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet ;)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(bookmark => previewview.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
