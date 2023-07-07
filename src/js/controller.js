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

    resultsview.update(modal.getSearchResultsPage());

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
    resultsview.render(modal.getSearchResultsPage());

    // 4.render initial pagination button
    paginationview.render(modal.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new results
  resultsview.render(modal.getSearchResultsPage(goToPage));

  // 4.render new pagination button
  paginationview.render(modal.state.search);
};

const controlServings = function (newServings) {
  // Updata the recipe servings (in state)
  modal.updateServings(newServings);

  // Update the recipe view
  // recipeview.render(modal.state.recipe);
  recipeview.update(modal.state.recipe);
};

const init = function () {
  recipeview.addHandlerRender(controlRecipe);
  recipeview.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPagination);
};
init();
