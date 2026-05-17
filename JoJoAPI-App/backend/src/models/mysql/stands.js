import { connection } from "../../config/config.js";

export class StandModel {
  static async getAllStands({ name, origin_part, asc = "DESC", limit = 10, offset = 0 }) {
    const queryParams = [];
    const whereClauses = [];

    if (name) {
      whereClauses.push("name LIKE ?");
      queryParams.push(`%${name}%`);
    }

    if (origin_part && origin_part !== 'all') {
      whereClauses.push("origin_part = ?");
      queryParams.push(origin_part);
    }

    const whereSQL = whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : '';
    const order = asc === true || asc === 'ASC' ? 'ASC' : 'DESC';

    const countQuery = `SELECT COUNT(*) as total FROM stands${whereSQL}`;
    const [countResult] = await connection.query(countQuery, queryParams);
    const total = countResult[0] ? Number(countResult[0].total) : 0;

    const dataQuery = `SELECT * FROM stands${whereSQL} ORDER BY id ${order} LIMIT ? OFFSET ?`;
    const [rows] = await connection.query(dataQuery, [...queryParams, Number(limit), Number(offset)]);

    return { stands: rows, totalCount: total };
  }
}
