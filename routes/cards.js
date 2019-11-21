const router = require("express").Router();
const { getCards, getCard, createCard, deleteCard } = require("../controllers/cards");

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.delete("/:id", deleteCard);

module.exports = router;
