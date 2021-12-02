export const postgresResult = [
  {
    restaurant_uuid: "0095ed3b-55a5-446e-980f-cbce6b357dcf",
    name: "Green House",
    country_code: "ES",
    image_uuid: "b228cef9-e8b3-4f0d-b1ac-983ad28b9462",
    locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"],
  },
  {
    restaurant_uuid: "03382530-327c-4b76-b4c9-05f313f4e624",
    name: "Five Oceans",
    country_code: "ES",
    image_uuid: null,
    locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"],
  },
  {
    restaurant_uuid: "0a3f611f-e855-4885-aa89-5c30a4ff376f",
    name: "Alpine Meadow",
    country_code: "UK",
    image_uuid: null,
    locales: ["en_GB", "cy_GB"],
  },
  {
    restaurant_uuid: "0d53f486-1fdf-427f-929d-24380b7bace0",
    name: "Fish Thursday",
    country_code: "UK",
    image_uuid: null,
    locales: ["en_GB", "cy_GB"],
  },
];

export const apiResult = {
  data: {
    images: [
      {
        imageUuid: "b228cef9-e8b3-4f0d-b1ac-983ad28b9462",
        url: "https://cdn.pastemagazine.com/www/system/images/photo_albums/silicon-valley-memes/large/unspecified-1.jpg?1384968217",
      },
      {
        imageUuid: "0bed02f0-53b0-432c-9a6c-3c3fdcc4f3ff",
        url: "https://lesjoiesducode.fr/wp-content/uploads/2020/04/pUk30T7.jpg",
      },
      {
        imageUuid: "db077d40-fc3a-4cc1-8aaf-83d03e81d67f",
        url: "https://i.pinimg.com/600x315/78/3f/a5/783fa50427050800de4ebabb826c761b.jpg",
      },
      {
        imageUuid: "b04ab411-2e35-4492-a5ce-c96691e73d68",
        url: "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif",
      },
    ],
  },
};
export const finalResult = {
  pagination: { currentPage: 1, pageCount: 2, total: 5 },
  restaurants: [
    {
      restaurant_uuid: "0095ed3b-55a5-446e-980f-cbce6b357dcf",
      name: "Green House",
      country_code: "ES",
      image_uuid: "b228cef9-e8b3-4f0d-b1ac-983ad28b9462",
      locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"],
      restaurantUuid: "0095ed3b-55a5-446e-980f-cbce6b357dcf",
      country: { code: "ES", locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"] },
      images: [
        "https://cdn.pastemagazine.com/www/system/images/photo_albums/silicon-valley-memes/large/unspecified-1.jpg?1384968217",
      ],
    },
    {
      restaurant_uuid: "03382530-327c-4b76-b4c9-05f313f4e624",
      name: "Five Oceans",
      country_code: "ES",
      image_uuid: null,
      locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"],
      restaurantUuid: "03382530-327c-4b76-b4c9-05f313f4e624",
      country: { code: "ES", locales: ["es_ES", "ca_ES", "eu_ES", "gl_ES"] },
      images: [],
    },
    {
      restaurant_uuid: "0a3f611f-e855-4885-aa89-5c30a4ff376f",
      name: "Alpine Meadow",
      country_code: "UK",
      image_uuid: null,
      locales: ["en_GB", "cy_GB"],
      restaurantUuid: "0a3f611f-e855-4885-aa89-5c30a4ff376f",
      country: { code: "UK", locales: ["en_GB", "cy_GB"] },
      images: [],
    },
    {
      restaurant_uuid: "0d53f486-1fdf-427f-929d-24380b7bace0",
      name: "Fish Thursday",
      country_code: "UK",
      image_uuid: null,
      locales: ["en_GB", "cy_GB"],
      restaurantUuid: "0d53f486-1fdf-427f-929d-24380b7bace0",
      country: { code: "UK", locales: ["en_GB", "cy_GB"] },
      images: [],
    },
  ],
};
