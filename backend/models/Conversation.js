import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastMessagePreview: {
      content: String,
      timestamp: Date,
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

conversationSchema.index(
  { "participants.0": 1, "participants.1": 1 },
  { unique: true },
);

conversationSchema.pre("save", function (next) {
  if (this.participants && this.participants.length === 2) {
    this.participants = this.participants.map((p) => p.toString()).sort();
  }
  next();
});

export default mongoose.model("Conversation", conversationSchema);
