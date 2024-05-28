const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
} = require("../models/cardsAccessDataService");
const validateCardWithJoi = require("../validations/Joi/validateCardWithJoi");
const router = express.Router();
const Card = require("../models/mongodb/Card");

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  // שינוי הנתיב ל "/"
  try {
    const { error } = validateCardWithJoi(req.body);
    if (error)
      return res.status(400).send(`Joi Error: ${error.details[0].message}`);

    const normalizedCard = await normalizeCard(req.body, req.user._id);
    const card = await createCard(normalizedCard);
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id.toString();

    const originalCard = await Card.findById(cardId);
    if (!originalCard) {
      return res.status(404).send("Card not found");
    }

    if (userId !== originalCard.user_id.toString()) {
      const message =
        "Authorization Error: Only the user who created the business card can update its details";
      return res.status(403).send(message);
    }

    const { error } = validateCardWithJoi(req.body);
    if (error) {
      return res.status(400).send(`Joi Error: ${error.details[0].message}`);
    }

    const normalizedCard = await normalizeCard(req.body, userId);
    const updatedCard = await updateCard(cardId, normalizedCard);
    if (!updatedCard) {
      return res.status(404).send("Card not found");
    }

    res.send(updatedCard);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await likeCard(cardId, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
