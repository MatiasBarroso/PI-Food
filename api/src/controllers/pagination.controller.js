const pagination = async (allRecipes, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (endIndex < allRecipes.length) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.next = {
      page: parseInt(page) + 1,
      limit: limit,
    };
  }
  results.results = allRecipes.slice(startIndex, endIndex);
  return results;
};

module.exports = {
  pagination,
};
