function generatePINUtil(max) {
  let aux1 = Math.floor(Math.random() * max);
  let aux2 = Math.floor(Math.random() * max);
  let aux3 = Math.floor(Math.random() * max);
  let aux4 = Math.floor(Math.random() * max);
  let aux5 = Math.floor(Math.random() * max);
  let aux6 = Math.floor(Math.random() * max);

  return `${aux1}${aux2}${aux3}${aux4}${aux5}${aux6}`;
}

export { generatePINUtil };
