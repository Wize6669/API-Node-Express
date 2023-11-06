let pin = {
  pin: 3545,
};

async function sendPIN(pin) {
  const url = "https://api-v2-node.onrender.com/api/v1/login";
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
    const { message } = aux;
    console.log(message);
  } catch (error) {
    console.log("Error" + error);
  }
}

async function fetchAndPrintData(pin) {
  try {
    const result = await sendPIN(pin);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

fetchAndPrintData(pin);
