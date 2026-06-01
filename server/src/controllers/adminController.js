const getAdminDashboard = async (req, res) => {

  res.status(200).json({
    message: "Welcome Admin Dashboard",
    user: req.user,
  });

};

module.exports = {
  getAdminDashboard,
};