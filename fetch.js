const url = "https://api-v2-node.onrender.com/api/v2/branchs";
const accessToken = "AKIAQKSPBPHMZW4DN7OM";
const idBranch = 1;
function getEmergencyOrders(url, accessToken, id) {
  async function getEmergencyOrdersAPI(url, accessToken, id) {
    const urlFetch = `${url}/${id}`;
    let emergencyOrder = {};
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(urlFetch, options);
      if (!response.ok) {
        console.log("Error fetching the data");
        return emergencyOrder;
      }
      const aux = await response.json();
      const { id, nameLaboratory, subDomain, token, branch } = aux;
      emergencyOrder = {
        id: id,
        nameLaboratory: nameLaboratory,
        subDomain: subDomain,
        token: token,
        branch: branch,
      };
      return emergencyOrder;
    } catch (e) {
      console.error("Error with method getEmergencyOrders " + e);
      throw e; // Lanza el error para que se maneje en el bloque de catch de getEmergencyOrders
    }
  }

  return getEmergencyOrdersAPI(url, accessToken, id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
async function fetchAndPrintData() {
  try {
    const result = await getEmergencyOrders(url, accessToken, idBranch);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

fetchAndPrintData();
