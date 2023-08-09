const generateBizNumber = require("./generateBizNumber");

const normalizeCar = async (car, userId) => {
  if (!car.image) {
    car.image = {};
  }
  car.image = {
    url:
      car.image.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: car.image.alt || "yellow fluffy chickens",
  };
  return {
    ...car,
    address: {
      ...car.address,
      state: car.address.state || "",
    },
    bizNumber: car.bizNumber || (await generateBizNumber()),
    user_id: car.user_id || userId,
  };
};

module.exports = normalizeCar;
