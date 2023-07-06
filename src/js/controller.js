import * as modal from './modal.js';
import recipeview from './view/recipeview.js';
import searchView from './view/searchview.js';
import resultsview from './view/resultsview.js';
import paginationview from './view/paginationview.js';
import 'core-js/stable';
import 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeview.renderSpinner();

    // 1. Loading recipe
    await modal.loadRecipe(id);

    // 2.Rendering recipe
    recipeview.render(modal.state.recipe);
  } catch (err) {
    recipeview.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsview.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2.Load search results
    await modal.loadSearchResults(query);

    // 3. render results
    // resultsview.render(modal.state.search.results);
    resultsview.render(modal.getSearchResultsPage('3'));

    // 4.render initial pagination button
    paginationview.render(modal.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeview.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
