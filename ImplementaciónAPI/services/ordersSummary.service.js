import { pool } from "./db.service.js";

export const consultStatusEmergencyOrdersService = async (
  dateFrom,
  dateTo,
  laboratoryID,
  branchCode
) => {
  const query = `
        SELECT COALESCE(SUM(o.G), 0) AS sum_G, 
        COALESCE(SUM(o.P), 0) AS sum_P, 
        COALESCE(SUM(o.R), 0) AS sum_R, 
        COALESCE(SUM(o.L), 0) AS sum_L, 
        COALESCE(SUM(o.V), 0) AS sum_V
        FROM orders o 
        WHERE o.creation_date BETWEEN ? AND ? 
        AND o.laboratoryID = ? 
        AND o.branchID = ?;
        `;
  const [rows] = await pool.query(query, [
    dateFrom,
    dateTo,
    laboratoryID,
    branchCode,
  ]);

  return rows.map((row) => {
    return {
      G: row?.G,
      P: row?.P,
      R: row?.R,
      L: row?.L,
      V: row?.V,
    };
  });
};
