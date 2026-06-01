const IntakeForm =
require("../models/IntakeForm");

const submitIntakeForm = async (
  req,
  res
) => {

  try {

    const {
      age,
      gender,
      concern,
      symptoms,
      preferredTherapistGender,
      preferredLanguage,
      emergencyContact,
      notes,
    } = req.body;

    const intake =
      await IntakeForm.create({
        client: req.user.id,
        age,
        gender,
        concern,
        symptoms,
        preferredTherapistGender,
        preferredLanguage,
        emergencyContact,
        notes,
      });

    res.status(201).json({
      message:
        "Intake Form Submitted Successfully",
      intake,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  submitIntakeForm,
};