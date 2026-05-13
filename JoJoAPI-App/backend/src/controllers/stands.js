export class StandController {
  constructor({ standModel }) {
    this.standModel = standModel;
  }

  getAllStands = async (req, res) => {
    try {
      const { name, origin_part, limit, offset, asc } = req.query;
      const stands = await this.standModel.getAllStands({
        name,
        origin_part,
        limit,
        offset,
        asc,
      });
      if (!stands || stands.length === 0) {
        return res.status(200).json([]);
      }
      res.json(stands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
