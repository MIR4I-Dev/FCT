export const mapLowStock = (gadgets) => {
  return gadgets.map((gadget) => ({
    ...gadget,
    low_stock: gadget.stock < 5,
  }));
};
