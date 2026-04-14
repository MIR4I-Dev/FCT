import { validateGadget, validatePartialGadget } from "../schemas/gadgets.js";
import { mapLowStock } from "../logic/low-stock.js";

export class GadgetController {
  constructor({ gadgetModel }) {
    this.gadgetModel = gadgetModel;
  }

  getAllGadgets = async (req, res) => {
    try {
      const { brand, category } = req.query;
      const gadgets = await this.gadgetModel.getAllGadgets({ brand, category });
      if (!gadgets || gadgets.length === 0) {
        return res.status(200).json([]);
      }
      const gadgetsWithLowStock = mapLowStock(gadgets);
      res.json(gadgetsWithLowStock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getGadgetById = async (req, res) => {
    try {
      const { id } = req.params;
      const gadget = await this.gadgetModel.getGadgetById(id);
      if (!gadget || gadget.length === 0) {
        return res.status(200).json([]);
      }
      const gadgetsWithLowStock = mapLowStock(gadget);
      res.json(gadgetsWithLowStock[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createGadget = async (req, res) => {
    try {
      const result = validateGadget(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }
      const newGadget = await this.gadgetModel.createGadget(result.data);
      res.status(201).json(newGadget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateGadget = async (req, res) => {
    try {
      const result = validatePartialGadget(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }
      const { id } = req.params;
      const updatedGadget = await this.gadgetModel.updateGadget(
        id,
        result.data,
      );
      res.json(updatedGadget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteGadget = async (req, res) => {
    try {
      const { id } = req.params;
      await this.gadgetModel.deleteGadget(id);
      res.json({ message: "Gadget deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
