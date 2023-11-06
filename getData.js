const orderEmengency = async () => {
    const data = await getEmergencyOrdersAPI(url, accessToken, idBranch);
    console.log(data);
}

orderEmengency()