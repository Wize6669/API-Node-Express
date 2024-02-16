import rp from "request-promise";

/**
 * Sends a proactive event notification.
 *
 * @param {object} skill Skill configuration options.
 * @param {object} config Endpoint configuration options.
 * @param {string} messageOverride Message to send to the configured skills, overrides the "message" property in skills.json.
 */
async function sendProactiveEventNotification(
  skill,
  config,
  messageOverride = null
) {
  if (!skill?.client_id || !skill?.client_secret) {
    console.log(
      "client_id or client_secret not configured for skill.",
      skill?.skill_name
    );
    return null;
  }

  const message = messageOverride || skill.message;

  const fetchTokenOptions = {
    method: "POST",
    uri: "https://api.amazon.com/auth/o2/token",
    form: {
      grant_type: "client_credentials",
      client_id: skill.client_id,
      client_secret: skill.client_secret,
      scope: "alexa::proactive_events",
    },
    transform: function (body) {
      return JSON.parse(body);
    },
  };

  try {
    const tokenResponse = await rp(fetchTokenOptions);

    const messageAlert = require("./message-template.json");
    messageAlert.event.payload.messageGroup.creator.name = message;

    const ts = new Date();
    const h = ts.getTime() + skill.validity_hours * 60 * 60 * 1000;
    const expiryTime = new Date(h);

    messageAlert.timestamp = ts.toISOString();
    messageAlert.expiryTime = expiryTime.toISOString();

    const sendProactiveEventOptions = {
      method: "POST",
      uri: config.notification_service_url,
      body: JSON.stringify(messageAlert),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
      resolveWithFullResponse: true,
    };

    const response = await rp(sendProactiveEventOptions);
    console.log(
      `Event sent successfully for skill ${skill.skill_name}. statusCode: ${response.statusCode}`
    );
  } catch (error) {
    console.error(
      `Error sending event for skill ${skill.skill_name}: ${error}`
    );
  }
}

export { sendProactiveEventNotification };
