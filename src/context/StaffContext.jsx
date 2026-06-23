import { createContext, useContext, useState } from "react";
import { mockStaff } from "../data/staffData.js";

const StaffContext = createContext(undefined);

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState(mockStaff);

  const addStaff = (staffMember) => {
    setStaff((prev) => [...prev, staffMember]);
  };

  const updateStaff = (id, updates) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

  const deleteStaff = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StaffContext.Provider
      value={{
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
