import crypto from "crypto";
import { connection } from "../../config/config.js";

export class GadgetModel {
  static async getAllGadgets({ brand, category }) {
    let query = `
    SELECT g.id, g.name, g.price, g.stock, b.name AS brand, GROUP_CONCAT(c.name) AS categories
    FROM gadget g
    LEFT JOIN brand b ON g.brand_id = b.id
    LEFT JOIN gadget_categories gc ON g.id = gc.gadget_id
    LEFT JOIN category c ON gc.category_id = c.id
  `;

    const queryParams = [];
    const whereClauses = [];

    if (brand) {
      whereClauses.push("b.name = ?");
      queryParams.push(brand);
    }

    if (category) {
      whereClauses.push(
        "g.id IN (SELECT gadget_id FROM gadget_categories gc2 JOIN category c2 ON gc2.category_id = c2.id WHERE c2.name = ?)",
      );
      queryParams.push(category);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    query += " GROUP BY g.id;";

    const [rows] = await connection.query(query, queryParams);

    return rows.map((row) => ({
      ...row,
      categories: row.categories ? row.categories.split(",") : [],
    }));
  }

  static async getGadgetById(id) {
    const [rows] = await connection.query(
      `
    SELECT g.id, g.name, g.price, g.stock, b.name AS brand, GROUP_CONCAT(c.name) AS categories
    FROM gadget g
    LEFT JOIN brand b ON g.brand_id = b.id
    LEFT JOIN gadget_categories gc ON g.id = gc.gadget_id
    LEFT JOIN category c ON gc.category_id = c.id
    WHERE g.id = ?
    GROUP BY g.id;
  `,
      [id],
    );
    return rows.length > 0
      ? [
          {
            ...rows[0],
            categories: rows[0].categories ? rows[0].categories.split(",") : [],
          },
        ]
      : [];
  }

  static async createGadget(gadget) {
    const { name, price, stock, brand, categories } = gadget;
    const id = crypto.randomUUID();

    try {
      await connection.beginTransaction();
      const [brands] = await connection.query(
        "SELECT id FROM brand WHERE name = ?",
        [brand],
      );

      if (brands.length === 0) throw new Error("Brand not found");
      const brandId = brands[0].id;

      await connection.query(
        "INSERT INTO gadget (id, name, price, stock, brand_id) VALUES (?, ?, ?, ?, ?)",
        [id, name, price, stock, brandId],
      );

      for (const category of categories) {
        const [cat] = await connection.query(
          "SELECT id FROM category WHERE LOWER(name) = LOWER(?)",
          [category],
        );
        if (cat.length === 0) throw new Error("Category not found");
        const categoryId = cat[0].id;
        await connection.query(
          "INSERT INTO gadget_categories (gadget_id, category_id) VALUES (?, ?)",
          [id, categoryId],
        );
      }
      await connection.commit();
      return this.getGadgetById(id);
    } catch (e) {
      await connection.rollback();
      throw e;
    }
  }

  static async updateGadget(id, gadget) {
    try {
      await connection.beginTransaction();
      const { categories, brand, ...rest } = gadget;

      const fieldsToUpdate = { ...rest };

      if (brand) {
        const [brands] = await connection.query(
          "SELECT id FROM brand WHERE name = ?",
          [brand],
        );
        if (brands.length === 0) throw new Error("Brand not found");
        fieldsToUpdate.brand_id = brands[0].id;
      }

      if (Object.keys(fieldsToUpdate).length > 0) {
        const queryString = Object.keys(fieldsToUpdate)
          .map((k) => `${k} = ?`)
          .join(", ");
        const [result] = await connection.query(
          `UPDATE gadget SET ${queryString} WHERE id = ?`,
          [...Object.values(fieldsToUpdate), id],
        );
        if (result.affectedRows === 0) throw new Error("Gadget not found");
      }

      if (categories && Array.isArray(categories)) {
        await connection.query(
          "DELETE FROM gadget_categories WHERE gadget_id = ?",
          [id],
        );

        for (const categoryName of categories) {
          const [cat] = await connection.query(
            "SELECT id FROM category WHERE LOWER(name) = LOWER(?)",
            [categoryName],
          );
          if (cat.length === 0) throw new Error("Category not found");
          await connection.query(
            "INSERT INTO gadget_categories (gadget_id, category_id) VALUES (?, ?)",
            [id, cat[0].id],
          );
        }
      }

      await connection.commit();
      return await this.getGadgetById(id);
    } catch (e) {
      await connection.rollback();
      throw e;
    }
  }

  static async deleteGadget(id) {
    try {
      const [result] = await connection.query(
        "DELETE FROM gadget WHERE id = ?",
        [id],
      );

      if (result.affectedRows === 0) throw new Error("Gadget not found");

      return true;
    } catch (e) {
      throw e;
    }
  }
}
