const restaurants = {
  get: {
    text: "SELECT * FROM restaurant LEFT JOIN country on country.country_code = restaurant.country_code ORDER BY restaurant_uuid DESC LIMIT $1 OFFSET $2",
  },
  errorValidation: {
    page: {
      invalid: "Invalid type, the page must be a number",
      positive: "Invalid page, the page must be positive",
    },
    perPage: {
      invalid: "Invalid type, the perPage must be a number",
      positive: "Invalid perPage, the perPage must be positive",
    },
  },
};

export default restaurants;
