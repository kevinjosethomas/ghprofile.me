import { views } from '../store.js';
import { fetchUser } from './fetch-user.js';

export const incrementCachedViewCount = async (name) => {
    const user = views[name];
    if (!user) await fetchUser(name);
    views[name].cachedViews.push([name, new Date()]);
    
    views[name].totalViewCount++;
};
