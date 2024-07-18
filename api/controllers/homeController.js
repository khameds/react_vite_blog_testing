const homeController = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      status: 200,
      message: `Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}`,
    });
  } catch (error) {}
};

module.exports = homeController;
