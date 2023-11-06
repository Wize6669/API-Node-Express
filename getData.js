let pin = {
  pin: 2886,
};

const url = "https://api-v2-node.onrender.com/api/v1/login";

function sendPIN(url, pin) {
  async function sendPINAPI(url, pin) {
    console.log(pin);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body: '{"pin":3545}'
      body: JSON.stringify(pin),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log("Error fetching the PIN");
      }
      const aux = await response.json();
      //const { message } = aux;
      return aux;
    } catch (error) {
      console.log("Error" + error);
    }
  }

  return sendPINAPI(url, pin)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

async function fetchAndPrintData(url, pin) {
  try {
    const result = await sendPIN(url, pin);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

fetchAndPrintData(url, pin);
