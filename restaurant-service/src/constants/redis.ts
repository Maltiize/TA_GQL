const restaurants = {
  getRestaurants: {
    query: "restaurant:all",
    ttl: 10,
  },
  getRestaurantsCount: {
    query: "restaurant:all:count",
    ttl: 10000,
  },
};

export default restaurants;
