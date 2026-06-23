import { createContext, useContext, useState } from "react";
import { mockTransactions } from "../data/transactionsData.js";

const TransactionContext = createContext(undefined);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider",
    );
  }
  return context;
};
