import view from './view.js';
import previewview from './previewview.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(results => previewview.render(results, false))
      .join('');
  }
}

export default new ResultView();
