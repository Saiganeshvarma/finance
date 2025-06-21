import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deposit, Loan, Transaction, Notification, DepositPlan } from '../types';
import { useAuth } from './AuthContext';

interface AppContextType {
  deposits: Deposit[];
  loans: Loan[];
  transactions: Transaction[];
  notifications: Notification[];
  depositPlans: DepositPlan[];
  createDeposit: (amount: number, planId: string) => void;
  createLoan: (amount: number, duration: number, purpose: string) => void;
  withdrawDeposit: (depositId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  getTotalEarnings: () => number;
  getTotalDeposits: () => number;
  getTotalLoans: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const mockDepositPlans: DepositPlan[] = [
  {
    id: '1',
    name: 'Quick Growth',
    duration: 7,
    interestRate: 0.08, // 8% annual
    minAmount: 1000,
    description: 'Perfect for short-term savings with daily returns',
    features: ['Daily interest payout', 'No lock-in period', 'Instant withdrawal after maturity'],
  },
  {
    id: '2',
    name: 'Smart Saver',
    duration: 15,
    interestRate: 0.12, // 12% annual
    minAmount: 5000,
    description: 'Balanced growth for medium-term investments',
    features: ['Higher returns', 'Flexible withdrawal', 'Auto-renewal option'],
  },
  {
    id: '3',
    name: 'Premium Plus',
    duration: 30,
    interestRate: 0.15, // 15% annual
    minAmount: 10000,
    description: 'Maximum returns for committed investors',
    features: ['Highest interest rate', 'Priority support', 'Bonus rewards'],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      // Initialize mock data for the user
      if (user.role === 'depositor') {
        const mockDeposits: Deposit[] = [
          {
            id: '1',
            userId: user.id,
            amount: 25000,
            duration: 15,
            interestRate: 0.12,
            startDate: '2024-01-15',
            maturityDate: '2024-01-30',
            accruedInterest: 1250,
            status: 'active',
            autoRenewal: false,
          },
          {
            id: '2',
            userId: user.id,
            amount: 15000,
            duration: 7,
            interestRate: 0.08,
            startDate: '2024-01-20',
            maturityDate: '2024-01-27',
            accruedInterest: 230,
            status: 'matured',
            autoRenewal: true,
          },
        ];
        setDeposits(mockDeposits);

        const mockTransactions: Transaction[] = [
          {
            id: '1',
            userId: user.id,
            type: 'deposit',
            amount: 25000,
            date: '2024-01-15',
            description: 'Smart Saver Plan Deposit',
            status: 'completed',
          },
          {
            id: '2',
            userId: user.id,
            type: 'interest',
            amount: 125,
            date: '2024-01-20',
            description: 'Daily Interest Credit',
            status: 'completed',
          },
        ];
        setTransactions(mockTransactions);
      } else if (user.role === 'borrower') {
        const mockLoans: Loan[] = [
          {
            id: '1',
            userId: user.id,
            amount: 50000,
            duration: 90,
            interestRate: 0.18,
            startDate: '2024-01-10',
            dueDate: '2024-04-10',
            remainingAmount: 35000,
            status: 'active',
            monthlyPayment: 18500,
            purpose: 'Business expansion',
          },
        ];
        setLoans(mockLoans);

        const mockTransactions: Transaction[] = [
          {
            id: '1',
            userId: user.id,
            type: 'loan',
            amount: 50000,
            date: '2024-01-10',
            description: 'Business Loan Disbursement',
            status: 'completed',
          },
          {
            id: '2',
            userId: user.id,
            type: 'repayment',
            amount: 15000,
            date: '2024-01-25',
            description: 'Monthly Loan Repayment',
            status: 'completed',
          },
        ];
        setTransactions(mockTransactions);
      }

      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: user.id,
          title: 'Interest Credited',
          message: user.role === 'depositor' 
            ? 'Your daily interest of ₹125 has been credited to your account'
            : 'Loan payment reminder: ₹18,500 due in 5 days',
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          userId: user.id,
          title: user.role === 'depositor' ? 'Deposit Maturity Alert' : 'Payment Confirmation',
          message: user.role === 'depositor' 
            ? 'Your Quick Growth deposit will mature tomorrow'
            : 'Your payment of ₹15,000 has been processed successfully',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setNotifications(mockNotifications);
    }
  }, [user]);

  const createDeposit = (amount: number, planId: string) => {
    if (!user) return;
    
    const plan = mockDepositPlans.find(p => p.id === planId);
    if (!plan) return;

    const startDate = new Date();
    const maturityDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    const newDeposit: Deposit = {
      id: Date.now().toString(),
      userId: user.id,
      amount,
      duration: plan.duration,
      interestRate: plan.interestRate,
      startDate: startDate.toISOString(),
      maturityDate: maturityDate.toISOString(),
      accruedInterest: 0,
      status: 'active',
      autoRenewal: false,
    };

    setDeposits(prev => [...prev, newDeposit]);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'deposit',
      amount,
      date: new Date().toISOString(),
      description: `${plan.name} Plan Deposit`,
      status: 'completed',
    };

    setTransactions(prev => [...prev, newTransaction]);

    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: user.id,
      title: 'Deposit Created Successfully',
      message: `Your deposit of ₹${amount.toLocaleString()} in ${plan.name} plan has been activated`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const createLoan = (amount: number, duration: number, purpose: string) => {
    if (!user) return;

    const startDate = new Date();
    const dueDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    const interestRate = 0.18; // 18% annual
    const monthlyPayment = (amount * (1 + interestRate * duration / 365)) / (duration / 30);

    const newLoan: Loan = {
      id: Date.now().toString(),
      userId: user.id,
      amount,
      duration,
      interestRate,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      remainingAmount: amount,
      status: 'pending',
      monthlyPayment,
      purpose,
    };

    setLoans(prev => [...prev, newLoan]);

    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: user.id,
      title: 'Loan Application Submitted',
      message: `Your loan application for ₹${amount.toLocaleString()} is under review`,
      type: 'info',
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const withdrawDeposit = (depositId: string) => {
    if (!user) return;

    const deposit = deposits.find(d => d.id === depositId);
    if (!deposit) return;

    const totalAmount = deposit.amount + deposit.accruedInterest;

    setDeposits(prev => prev.map(d => 
      d.id === depositId ? { ...d, status: 'withdrawn' as const } : d
    ));

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'withdrawal',
      amount: totalAmount,
      date: new Date().toISOString(),
      description: 'Deposit Withdrawal',
      status: 'completed',
    };

    setTransactions(prev => [...prev, newTransaction]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const getTotalEarnings = () => {
    return deposits.reduce((total, deposit) => total + deposit.accruedInterest, 0);
  };

  const getTotalDeposits = () => {
    return deposits.reduce((total, deposit) => 
      deposit.status === 'active' ? total + deposit.amount : total, 0
    );
  };

  const getTotalLoans = () => {
    return loans.reduce((total, loan) => 
      loan.status === 'active' ? total + loan.amount : total, 0
    );
  };

  return (
    <AppContext.Provider value={{
      deposits,
      loans,
      transactions,
      notifications,
      depositPlans: mockDepositPlans,
      createDeposit,
      createLoan,
      withdrawDeposit,
      markNotificationRead,
      getTotalEarnings,
      getTotalDeposits,
      getTotalLoans,
    }}>
      {children}
    </AppContext.Provider>
  );
};