import { views } from '../store.js';

export const incrementCachedViewCount = (name) => {
    const user = views[name];
    if (!user) {
        // Create initial cache
        views[name] = {
            cachedViews: [],
            totalViewCount: 0
        };
    }

    views[name].cachedViews.push([name, Date.now()]);
    views[name].totalViewCount++;
};
