const chatWithAI =
async (req, res) => {

  try {

    const { message } =
      req.body;

    let reply =
      "I'm here to support you.";

    const lowerMessage =
      message.toLowerCase();

    if (
      lowerMessage.includes(
        "anxiety"
      ) ||
      lowerMessage.includes(
        "anxious"
      )
    ) {

      reply =
      "Feeling anxious can be difficult. Try deep breathing exercises, short walks, and breaking large tasks into smaller manageable steps. If anxiety persists, consider speaking with a therapist.";

    }

    else if (
      lowerMessage.includes(
        "stress"
      )
    ) {

      reply =
      "Stress is a natural response to challenges. Make sure you get enough rest, stay hydrated, and schedule short breaks throughout your day.";

    }

    else if (
      lowerMessage.includes(
        "sad"
      ) ||
      lowerMessage.includes(
        "depressed"
      )
    ) {

      reply =
      "I'm sorry you're feeling this way. Try reaching out to someone you trust and engaging in activities you normally enjoy. If these feelings continue, consider seeking professional support.";

    }

    else if (
      lowerMessage.includes(
        "sleep"
      )
    ) {

      reply =
      "Maintaining a consistent sleep schedule, reducing screen time before bed, and avoiding caffeine late in the day may help improve sleep quality.";

    }

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

module.exports = {
  chatWithAI,
};