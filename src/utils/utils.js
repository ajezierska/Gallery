export const getPhoto = (amount, index, data) => {
  return data.slice(index, index + amount);
};

export const getSlugPhoto = (url) => {
  return url.substr("https://unsplash.com/photos/".length);
};
