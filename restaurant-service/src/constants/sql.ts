const restaurants = {
  get: {
    text: "SELECT restaurant.*, rhi.image_uuid,country.locales FROM restaurant LEFT JOIN restaurant_has_image as rhi on rhi.restaurant_uuid = restaurant.restaurant_uuid LEFT JOIN country on country.country_code = restaurant.country_code ORDER BY restaurant.restaurant_uuid LIMIT $1 OFFSET $2",
  },
  getCount: {
    text: "SELECT count(*) FROM restaurant LEFT JOIN restaurant_has_image as rhi on rhi.restaurant_uuid = restaurant.restaurant_uuid LEFT JOIN country on country.country_code = restaurant.country_code",
  },
  getOnlyImg: {
    text: "SELECT restaurant.*, rhi.image_uuid,country.locales FROM restaurant LEFT JOIN restaurant_has_image as rhi on rhi.restaurant_uuid = restaurant.restaurant_uuid LEFT JOIN country on country.country_code = restaurant.country_code where rhi.image_uuid is not null ORDER BY restaurant.restaurant_uuid LIMIT $1 OFFSET $2",
  },
  getOnlyImgCount: {
    text: "SELECT count(*) FROM restaurant LEFT JOIN restaurant_has_image as rhi on rhi.restaurant_uuid = restaurant.restaurant_uuid LEFT JOIN country on country.country_code = restaurant.country_code where rhi.image_uuid is not null ",
  },
};

export default restaurants;
