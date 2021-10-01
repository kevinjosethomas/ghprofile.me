import { views } from '../store.js';

export const incrementViewCount = (name) => {
    if (!views[name]) views[name] = {
        cachedViews: [],
        totalViewCount: 0
    };
    views[name].cachedViews.push([name, Date.now()]);
    views[name].totalViewCount++;
};
