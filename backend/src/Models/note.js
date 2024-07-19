import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tags: [
    {
      type: String,
      maxlength: 9,
    },
  ],
  backgroundColor: {
    type: String,
    default: "#ffffff", // Default white background
  },
  archived: {
    type: Boolean,
    default: false,
  },
  trashedAt: {
    type: Date,
    default: null,
  },
  reminder: {
    type: Date,
    default: null,
  },
}, {
    timestamps: true
});

export const Note = mongoose.model('Note', noteSchema)
