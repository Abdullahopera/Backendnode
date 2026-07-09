import Feedback from "../models/feedback.js";
import catchAsync from "../utils/catchAsync.js";

export const submitFeedback = catchAsync(async (req, res) => {
  const { type, title, description } = req.body;
  const feedback = await Feedback.create({
    user: req.user._id,
    type: type || "other",
    title,
    description,
  });
  res.status(201).json({ message: "Feedback submitted", feedback });
});
