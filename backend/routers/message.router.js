const express = require("express");
const router = express.Router();
const {
    deleteMessageById,
    deleteChatByRecipientId,
    getMessages,
} = require("../controllers/message.controller");

router.route("/delete-chat").post(deleteChatByRecipientId);
router.route("/:messageId").delete(deleteMessageById);
router.route("/get_messages").post(getMessages);
module.exports = router;