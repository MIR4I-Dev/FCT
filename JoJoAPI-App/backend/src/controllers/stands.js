export class StandController {
  constructor({ standModel }) {
    this.standModel = standModel;
  }

  getAllStands = async (req, res) => {
    try {
      const name = req.query.name || '';
      const origin_part = req.query.origin_part || 'all';
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = parseInt(req.query.offset, 10) || 0;
      const asc = req.query.asc === 'ASC' ? 'ASC' : 'DESC';
      const { stands, totalCount } = await this.standModel.getAllStands({
        name,
        origin_part,
        limit,
        offset,
        asc,
      });

      if (!stands || stands.length === 0) {
        return res.status(200).json({
          data: [],
          pagination: { totalPages: 0, currentPage: 1, nextPage: null, prevPage: null }
        });
      }

      const totalPages = Math.ceil(totalCount / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      const nextPage = currentPage < totalPages ? currentPage + 1 : null;
      const prevPage = currentPage > 1 ? currentPage - 1 : null;

      res.json({
        data: stands,
        pagination: {
          limit,
          offset,
          totalItems: totalCount,
          totalPages,
          currentPage,
          nextPage,
          prevPage
        }
      });

    } catch (error) {
      console.error("Error in getAllStands:", error);
      res.status(500).json({ error: error.message || error.toString() });
    }
  };
}