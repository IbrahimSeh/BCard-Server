const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");
const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};

//used
const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
};

const getUserCards = (userID) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getUserCards(userID);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardByBizNumber(bizNumber);
  }
};

const updateCard = (id, cardToUpdate) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
};

const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};

const cardToLike = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getUserCards,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  cardToLike,
};
