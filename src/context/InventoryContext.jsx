import { createContext, useContext, useState } from "react";
import { mockInventory } from "../data/inventoryData.js";

const InventoryContext = createContext(undefined);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(mockInventory);

  const updateInventory = (id, updates) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const addInventory = (item) => {
    setInventory((prev) => [...prev, item]);
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        updateInventory,
        addInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
