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

const getAllIntakeForms = async (
    req,
    res
    ) => {

    try {

        const intakeForms =
        await IntakeForm.find()
        .populate(
            "client",
            "name email role"
        );

        res.status(200).json(
        intakeForms
        );

    } catch (error) {

        res.status(500).json({
        message: error.message,
        });

    }

    };

    const reviewIntakeForm = async (
        req,
        res
        ) => {

        try {

            const intake =
            await IntakeForm.findById(
                req.params.id
            );

            if (!intake) {
            return res.status(404).json({
                message:
                "Intake Form Not Found",
            });
            }

            intake.status = "approved";

            await intake.save();

            res.status(200).json({
            message:
                "Intake Form Approved",
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
  getAllIntakeForms,
  reviewIntakeForm,
};