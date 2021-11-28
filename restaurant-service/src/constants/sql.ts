const restaurants = {
  get: {
    text: "SELECT * FROM restaurant LEFT JOIN restaurant_has_image as rhi on rhi.restaurant_uuid = restaurant.restaurant_uuid LEFT JOIN country on country.country_code = restaurant.country_code ORDER BY restaurant.restaurant_uuid DESC LIMIT $1 OFFSET $2",
  },
};

export default restaurants;
