import { pool } from "./db.service.js";
import { generateAccessToken } from "../utils/jwt.generate.util.js";

export const signInService = async (laboratoryID, branchCode) => {
  const query = `
        SELECT l.tenant, b.branch_name, b.sub_domain 
        FROM laboratory l 
        RIGHT JOIN branch b ON l.laboratoryID = b.laboratoryID 
        WHERE l.laboratoryID = ? AND b.branchID = ?
    `;
  const [rows] = await pool.query(query, [laboratoryID, branchCode]);

  if (rows.length > 0) {
    const tenant = rows[0]?.tenant;
    const branchName = rows[0]?.branch_name;
    const sudDomain = rows[0]?.sub_domain;

    let laboratory = {
      tenant,
      branchName,
      sudDomain,
    };

    let auxLaboratory = {
      ...laboratory,
      laboratoryID,
      branchCode,
    };

    const token = generateAccessToken(auxLaboratory);
    laboratory = { ...laboratory, token };

    return laboratory;
  }

  return null;
};
