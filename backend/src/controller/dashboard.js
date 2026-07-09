import catchAsync from "../utils/catchAsync.js";

export const dashboard = catchAsync(async (req, res) => {
  res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
    message: `Welcome ${req.user.name}`,
  });
});
