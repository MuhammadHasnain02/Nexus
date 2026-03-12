// import React, { createContext, useState, useEffect, ReactNode } from 'react';

// // --- Types ---
// export interface Transaction {
//   id: string;
//   amount: number;
//   sender: string;
//   receiver: string;
//   type: 'Deposit' | 'Withdraw' | 'Transfer' | 'Funding';
//   status: 'Completed' | 'Pending' | 'Failed';
//   date: string;
// }

// interface PaymentContextType {
//   balance: number;
//   transactions: Transaction[];
//   deposit: (amount: number) => void;
//   withdraw: (amount: number) => void;
//   transfer: (amount: number, receiver: string) => void;
//   fundProject: (amount: number, entrepreneurName: string) => void;
// }

// export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // 1. Initial State: LocalStorage se data uthana
//   const [balance, setBalance] = useState<number>(() => {
//     const savedBalance = localStorage.getItem('wallet_balance');
//     return savedBalance ? JSON.parse(savedBalance) : 500000; // Default $500k
//   });

//   const [transactions, setTransactions] = useState<Transaction[]>(() => {
//     const savedTx = localStorage.getItem('payment_transactions');
//     return savedTx ? JSON.parse(savedTx) : [
//       { 
//         id: 'tx_init', 
//         amount: 500000, 
//         sender: 'System', 
//         receiver: 'Investor', 
//         type: 'Deposit', 
//         status: 'Completed', 
//         date: new Date().toISOString().split('T')[0] 
//       }
//     ];
//   });

//   // 2. Persistence: Jab bhi state change ho, LocalStorage update karo
//   useEffect(() => {
//     localStorage.setItem('wallet_balance', JSON.stringify(balance));
//     localStorage.setItem('payment_transactions', JSON.stringify(transactions));
//   }, [balance, transactions]);

//   // --- Actions ---

//   // Helper: Nayi transaction create karna
//   const createTransaction = (amount: number, sender: string, receiver: string, type: Transaction['type']) => {
//     const newTx: Transaction = {
//       id: `tx_${Math.random().toString(36).substr(2, 9)}`,
//       amount,
//       sender,
//       receiver,
//       type,
//       status: 'Completed',
//       date: new Date().toISOString().split('T')[0],
//     };
//     setTransactions(prev => [newTx, ...prev]);
//   };

//   const deposit = (amount: number) => {
//     setBalance(prev => prev + amount);
//     createTransaction(amount, 'External Bank', 'Wallet', 'Deposit');
//   };

//   const withdraw = (amount: number) => {
//     if (balance >= amount) {
//       setBalance(prev => prev - amount);
//       createTransaction(amount, 'Wallet', 'External Bank', 'Withdraw');
//     } else {
//       alert("Insufficient balance!");
//     }
//   };

//   const transfer = (amount: number, receiver: string) => {
//     if (balance >= amount) {
//       setBalance(prev => prev - amount);
//       createTransaction(amount, 'Me', receiver, 'Transfer');
//     } else {
//       alert("Insufficient balance!");
//     }
//   };

//   // Special Action for Milestone 5 (Investor -> Entrepreneur)
//   const fundProject = (amount: number, entrepreneurName: string) => {
//     if (balance >= amount) {
//       setBalance(prev => prev - amount);
//       createTransaction(amount, 'Investor', entrepreneurName, 'Funding');
//     } else {
//       alert("Insufficient funds for this deal!");
//     }
//   };

//   return (
//     <PaymentContext.Provider value={{ balance, transactions, deposit, withdraw, transfer, fundProject }}>
//       {children}
//     </PaymentContext.Provider>
//   );
// };

// ===============================================================

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Bill, PaymentContextType, Transaction } from '../types';

// --- Types ---
// export interface Transaction {
//   id: string;
//   amount: number;
//   sender: string;
//   receiver: string;
//   type: 'Deposit' | 'Withdraw' | 'Funding';
//   status: 'Completed' | 'Pending';
//   date: string;
// }

// export interface Bill {
//   id: string;
//   title: string;
//   amount: number;
//   status: 'Unpaid' | 'Paid';
//   date: string;
// }

// interface PaymentContextType {
//   investorBalance: number;
//   entrepreneurBalance: number;
//   transactions: Transaction[];
//   bills: Bill[];
//   // Actions
//   deposit: (amount: number, role: 'investor' | 'entrepreneur') => void;
//   withdraw: (amount: number, role: 'investor' | 'entrepreneur') => void;
//   createBill: (amount: number, title: string) => void;
//   payBill: (billId: string) => void;
// }

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from LocalStorage
  const [investorBalance, setInvestorBalance] = useState<number>(() => 
    JSON.parse(localStorage.getItem('investor_bal') || '1000000') // $1M for Investor
  );
  const [entrepreneurBalance, setEntrepreneurBalance] = useState<number>(() => 
    JSON.parse(localStorage.getItem('entrepreneur_bal') || '5000') // $5k for Startup
  );
  const [transactions, setTransactions] = useState<Transaction[]>(() => 
    JSON.parse(localStorage.getItem('tx_history') || '[]')
  );
  const [bills, setBills] = useState<Bill[]>(() => 
    JSON.parse(localStorage.getItem('venture_bills') || '[]')
  );

  // 2. Persistence Logic
  useEffect(() => {
    localStorage.setItem('investor_bal', JSON.stringify(investorBalance));
    localStorage.setItem('entrepreneur_bal', JSON.stringify(entrepreneurBalance));
    localStorage.setItem('tx_history', JSON.stringify(transactions));
    localStorage.setItem('venture_bills', JSON.stringify(bills));
  }, [investorBalance, entrepreneurBalance, transactions, bills]);

  // --- Helper: Transaction Logger ---
  const logTransaction = (amount: number, sender: string, receiver: string, type: Transaction['type']) => {
    const newTx: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      amount,
      sender,
      receiver,
      type,
      status: 'Completed',
      date: new Date().toLocaleDateString(),
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  // --- Actions ---

  // Deposit Logic (Role Based)
  const deposit = (amount: number, role: 'investor' | 'entrepreneur') => {
    if (role === 'investor') setInvestorBalance(prev => prev + amount);
    else setEntrepreneurBalance(prev => prev + amount);
    logTransaction(amount, 'External Bank', role.toUpperCase(), 'Deposit');
  };

  // Withdraw Logic (Role Based)
  const withdraw = (amount: number, role: 'investor' | 'entrepreneur') => {
    const currentBal = role === 'investor' ? investorBalance : entrepreneurBalance;
    if (currentBal >= amount) {
      if (role === 'investor') setInvestorBalance(prev => prev - amount);
      else setEntrepreneurBalance(prev => prev - amount);
      logTransaction(amount, role.toUpperCase(), 'External Bank', 'Withdraw');
    } else {
      alert("Insufficient Funds!");
    }
  };

  // Entrepreneur creates a bill (Funding Request)
  const createBill = (amount: number, title: string) => {
    const newBill: Bill = {
      id: `BILL-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      amount,
      status: 'Unpaid',
      date: new Date().toLocaleDateString(),
    };
    setBills(prev => [newBill, ...prev]);
  };

  // Investor pays the bill
  const payBill = (billId: string) => {
    const bill = bills.find(b => b.id === billId);
    if (!bill || bill.status === 'Paid') return;

    if (investorBalance >= bill.amount) {
      // 1. Deduct from Investor
      setInvestorBalance(prev => prev - bill.amount);
      // 2. Add to Entrepreneur
      setEntrepreneurBalance(prev => prev + bill.amount);
      // 3. Update Bill Status
      setBills(prev => prev.map(b => b.id === billId ? { ...b, status: 'Paid' } : b));
      // 4. Log Transaction
      logTransaction(bill.amount, 'Investor', 'Entrepreneur', 'Funding');
    } else {
      alert("Investor has insufficient balance to pay this bill!");
    }
  };

  return (
    <PaymentContext.Provider value={{ 
      investorBalance, entrepreneurBalance, transactions, bills, 
      deposit, withdraw, createBill, payBill 
    }}>
      {children}
    </PaymentContext.Provider>
  );
};