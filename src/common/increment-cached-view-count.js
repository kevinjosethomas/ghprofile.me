import { views } from '../store.js';
import { fetchUser } from './fetch-user.js';

export const incrementCachedViewCount = (name) => {
    const user = views[name];
    if (!user) await fetchUser(name);
    views[name].cachedViews.push([name, Date.now()]);
    views[name].totalViewCount++;
};
