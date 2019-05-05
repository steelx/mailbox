const { AuthenticationError } = require("apollo-server");
const Mail = require("./models/Mail");

const authenticated = (next) => (root, args, ctx, info) => {
    if(!ctx) {
        return new AuthenticationError("Authentication Error");
    }

    return next(root, args, ctx, info);
}

module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser),
        getMails: async (root, args, ctx) => {
            const emails = await Mail.find({}).populate("author").populate("body.author");
            return emails;
        }
    },
    Mutation: {
        createMail: authenticated(async (root, args, ctx) => {
            const _mail = await new Mail({
                ...args.input,
                author: ctx.currentUser._id
            }).save();
            const mailCreated = await Mail.populate(_mail, "author");
            return mailCreated;
        }),
        deleteMail: authenticated(async (root, args, ctx) => {
            const mailDeleted = await Mail.findOneAndDelete({_id: args.mailId}).exec()
            return mailDeleted;
        }),
        deleteMails: authenticated(async (root, args, ctx) => {
            try {
                await Mail.deleteMany({_id: {$in: args.mailIds}}).exec();
                return true;
            } catch(e) {
                console.log("ERROR deleteMails:", e);
                return false;
            }
        }),
        markAsRead: authenticated(async (root, args, ctx) => {
            try {
                await Mail.updateMany(
                    { _id: { $in: args.mailIds } },
                    { $set: { unread : false } }
                ).exec();
                return true;
            } catch(e) {
                console.log("ERROR markAsRead:", e);
                return false;
            }
        })
    }
}
