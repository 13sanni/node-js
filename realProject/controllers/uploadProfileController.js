export async function uploadProfilePhoto(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    if (!req.file) {
      return next({ status: 400, message: "No file provided" });
    }

    const oldId = user.avatar?.public_id || null;

    const result = await uploadToCloudinary(req.file.buffer);

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await user.save();

    if (oldId) {
      await deletefromcloudinary(oldId);
    }

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    return next(err);
  }
}
