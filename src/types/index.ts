export interface User {
  id: string;
  name: string;
  email: string;
  role: 'depositor' | 'borrower' | 'admin';
  balance: number;
  createdAt: string;
}

export interface Deposit {
  id: string;
  userId: string;
  amount: number;
  duration: number; // in days
  interestRate: number;
  startDate: string;
  maturityDate: string;
  accruedInterest: number;
  status: 'active' | 'matured' | 'withdrawn';
  autoRenewal: boolean;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  duration: number; // in days
  interestRate: number;
  startDate: string;
  dueDate: string;
  remainingAmount: number;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'overdue';
  monthlyPayment: number;
  purpose: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'loan' | 'repayment' | 'interest';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DepositPlan {
  id: string;
  name: string;
  duration: number;
  interestRate: number;
  minAmount: number;
  description: string;
  features: string[];
}