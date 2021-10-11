import { fetchUser } from './fetch-user.js';

export const getViewCount = async (name) => {
  const user = views[name];
  if (user) {
    return user.totalViewCount;
  }

  // Get user from db
  const dbUser = await fetchUser(name);

  // Return views
  return dbUser.totalViewCount;
};