import { connection } from "../../config/config.js";

export class StandModel {
  static async getAllStands({ name, origin_part, asc = "DESC", limit = 7, offset = 0 }) {
    let query = `
    SELECT *
    FROM stands
  `;

    const queryParams = [];
    const whereClauses = [];

    if (name) {
      whereClauses.push("name LIKE ?");
      queryParams.push(`%${name}%`);
    }

    if (origin_part) {
      whereClauses.push("origin_part = ?");
      queryParams.push(origin_part);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    query += ` ORDER BY id ${asc} LIMIT ? OFFSET ?;`;
    queryParams.push(Number(limit), Number(offset));
    const [rows] = await connection.query(query, queryParams);

    return rows;
  }
}
