import * as model from './model.js';
import recipeview from './view/recipeview.js';
import searchView from './view/searchview.js';
import resultsview from './view/resultsview.js';
import paginationview from './view/paginationview.js';
import bookmarkview from './view/bookmarkview.js';
import 'core-js/stable';
import 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeview.renderSpinner();

    resultsview.update(model.getSearchResultsPage());
    bookmarkview.update(model.state.bookmarks);

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2.Rendering recipe
    recipeview.render(model.state.recipe);
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
    await model.loadSearchResults(query);

    // 3. render results
    // resultsview.render(model.state.search.results);
    resultsview.render(model.getSearchResultsPage());

    // 4.render initial pagination button
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new results
  resultsview.render(model.getSearchResultsPage(goToPage));

  // 4.render new pagination button
  paginationview.render(model.state.search);
};

const controlServings = function (newServings) {
  // Updata the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. update recipeview
  recipeview.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarkview.render(model.state.bookmarks);
};

const init = function () {
  recipeview.addHandlerRender(controlRecipe);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPagination);
};
init();
