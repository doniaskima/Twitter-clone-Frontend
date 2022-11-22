const bookmarkModels = require("../models/bookmark.models");
const mongoose = require("mongoose");


const bookmarkPost = async(req, res) => {
    try {
        let isPostBookmarked = null;
        isPostBookmarked = await bookmarkModels.findOne({
            post: req.post._id,
            user: req.verifiedUser._id,
        });
        if (!isPostBookmarked) {
            isPostBookmarked = new bookmarkModels({
                user: req.verifiedUser._id,
                post: req.post._id,
            });
            await isPostBookmarked.save();
        }
        return res.status(201).json({ message: `${res.post.content} bookmarked` })
    } catch (err) {
        return res.status(500).json(err);
    }
}


const unbookmarkPost = async(req, res) => {
    try {
        await bookmarkModels.deleteOne({
            user: req.verifiedUser._id,
            post: req.post._id,
        });
        return res.status(204).json();

    } catch (err) {
        return res.status(500).json(err);
    }
}


const getBookmarkedPosts = async(req, res) => {
    try {
        const bookmarks = await bookmarkModels.aggregate([{
                $match: { user: mongoose.Types.ObjectId(req.verifiedUser._id) },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "post",
                    foreignField: "_id",
                    as: "post",
                },
            },
            { $unwind: "$post" },
            {
                $project: {
                    post: 1,
                },
            },
        ]);
        return res.status(200).json(bookmarks);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//The 
// $project
// takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, 
//and the resetting of the values of existing fields.Alternatively, you may specify the exclusion of fields.





module.exports.bookmarkPost = bookmarkPost;
module.exports.unbookmarkPost = unbookmarkPost;
module.exports.getBookmarkedPosts = getBookmarkedPosts;