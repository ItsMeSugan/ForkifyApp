import * as modal from './modal.js';
import recipeview from './view/recipeview.js';
import 'core-js/stable';
import 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeview.renderSpinner();

    // 1. Loading recipe
    await modal.loadRecipe(id);

    // 2.Rendering recipe
    recipeview.render(modal.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
