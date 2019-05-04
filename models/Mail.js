const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
    createdAt: String,
    title: String,
    content: String,
    from: String,
    unread: Boolean,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: {
        text: String,
        createdAt: {type: Date, default: Date.now},
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
}, {timestamps: true});

module.exports = mongoose.model("Mail", MailSchema);
