const Assignment =
require("../models/Assignment");

const IntakeForm =
require("../models/IntakeForm");

const Therapist =
require("../models/Therapist");

const {
  createNotification,
} = require(
  "../services/notificationService"
);

const assignTherapist = async (
  req,
  res
) => {

  try {

    const {
      intakeFormId,
      therapistId,
    } = req.body;

    const intake =
      await IntakeForm.findById(
        intakeFormId
      );

    if (!intake) {
      return res.status(404).json({
        message:
          "Intake Form Not Found",
      });
    }

    const therapist =
      await Therapist.findById(
        therapistId
      );

    if (!therapist) {
      return res.status(404).json({
        message:
          "Therapist Not Found",
      });
    }

    const assignment =
      await Assignment.create({
        client: intake.client,
        therapist:
          therapist._id,
        intakeForm:
          intake._id,
      });

    intake.status =
      "assigned";

    await intake.save();

    res.status(201).json({
      message:
        "Therapist Assigned Successfully",
      assignment,
    });

    await createNotification({

  recipient:
    intake.client,

  title:
    "Therapist Assigned",

  message:
    "A therapist has been assigned to your account.",

  type:
    "assignment",

});

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};



module.exports = {
  assignTherapist,
};