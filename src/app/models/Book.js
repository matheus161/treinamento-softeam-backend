const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
    

    releaseDate: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true,
    }

);

module.exports = mongoose.model("Book", BookSchema);
