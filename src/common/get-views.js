import { views } from '../store.js';

export const getViews = (keys) => {
  let newViews = [];
  for (const key of keys) {
    if (!views[key].cachedViews.length) continue;

    newViews = newViews.concat(views[key].cachedViews.slice(0, 1500));
    views[key].cachedViews = [];
  } 

  return newViews;
}