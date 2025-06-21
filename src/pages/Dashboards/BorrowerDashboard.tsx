import React, { useState } from 'react';
import { CreditCard, DollarSign, Clock, AlertTriangle, CheckCircle, Plus, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const BorrowerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { loans, transactions, createLoan } = useApp();
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanData, setLoanData] = useState({
    amount: '',
    duration: '90',
    purpose: '',
    monthlyIncome: '',
    employmentType: 'employed',
  });

  const totalBorrowed = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const activeLoan = loans.find(loan => loan.status === 'active');
  const monthlyPayment = loans.reduce((sum, loan) => 
    loan.status === 'active' ? sum + loan.monthlyPayment : sum, 0
  );

  const handleLoanApplication = (e: React.FormEvent) => {
    e.preventDefault();
    createLoan(Number(loanData.amount), Number(loanData.duration), loanData.purpose);
    setShowLoanModal(false);
    setLoanData({
      amount: '',
      duration: '90',
      purpose: '',
      monthlyIncome: '',
      employmentType: 'employed',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Borrower Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Manage your loans and applications.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBorrowed)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{loans.length} total loans</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(activeLoan?.remainingAmount || 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Amount remaining</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Payment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-full">
                <Calendar className="h-6 w-6 text-accent-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {activeLoan && (
                <span className="text-gray-600">
                  Due: {formatDate(activeLoan.dueDate)}
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Score</p>
                <p className="text-2xl font-bold text-gray-900">750</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">Excellent</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loan Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Your Loans</h2>
                  <button
                    onClick={() => setShowLoanModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Apply for Loan</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {loans.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No loans yet</h3>
                    <p className="text-gray-600 mb-4">Apply for your first loan to get started</p>
                    <button
                      onClick={() => setShowLoanModal(true)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Apply for Loan
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {loans.map((loan) => {
                      const daysUntilDue = getDaysUntilDue(loan.dueDate);
                      const progressPercentage = ((loan.amount - loan.remainingAmount) / loan.amount) * 100;
                      
                      return (
                        <div key={loan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {loan.purpose || 'Personal Loan'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Applied on {formatDate(loan.startDate)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">{formatCurrency(loan.amount)}</p>
                              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                                {loan.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Interest Rate</p>
                              <p className="font-semibold">{(loan.interestRate * 100).toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Duration</p>
                              <p className="font-semibold">{loan.duration} days</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Monthly Payment</p>
                              <p className="font-semibold">{formatCurrency(loan.monthlyPayment)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Remaining</p>
                              <p className="font-semibold text-red-600">{formatCurrency(loan.remainingAmount)}</p>
                            </div>
                          </div>

                          {loan.status === 'active' && (
                            <>
                              <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Repayment Progress</span>
                                  <span>{progressPercentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    {daysUntilDue > 0 ? (
                                      <>
                                        <p className="text-sm text-gray-600">Next payment due</p>
                                        <p className="font-semibold">
                                          {daysUntilDue} days ({formatDate(loan.dueDate)})
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-sm text-red-600">Payment overdue</p>
                                        <p className="font-semibold text-red-600">
                                          {Math.abs(daysUntilDue)} days past due
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                    Make Payment
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setShowLoanModal(true)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Apply for Loan</span>
                </button>
                <button className="w-full bg-secondary-600 text-white py-3 rounded-lg hover:bg-secondary-700 transition-colors">
                  Make Payment
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Statement
                </button>
              </div>
            </div>

            {/* Loan Requirements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Loan Requirements</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Age: 21-65 years</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Minimum income: ₹25,000/month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Credit score: 650+</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Employment: 2+ years</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                {transactions.length === 0 ? (
                  <div className="text-center py-4">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                        </div>
                        <span className={`text-sm font-medium ${
                          transaction.type === 'loan' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'loan' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loan Application Modal */}
        {showLoanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Apply for Loan</h2>
                <p className="text-gray-600 mt-1">Fill out the form below to apply for a loan</p>
              </div>
              
              <form onSubmit={handleLoanApplication} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount *
                    </label>
                    <input
                      type="number"
                      value={loanData.amount}
                      onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
                      min="10000"
                      max="1000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter loan amount"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={loanData.duration}
                      onChange={(e) => setLoanData({...loanData, duration: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Loan *
                  </label>
                  <select
                    value={loanData.purpose}
                    onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Select purpose</option>
                    <option value="Business expansion">Business expansion</option>
                    <option value="Personal expenses">Personal expenses</option>
                    <option value="Medical emergency">Medical emergency</option>
                    <option value="Education">Education</option>
                    <option value="Home improvement">Home improvement</option>
                    <option value="Debt consolidation">Debt consolidation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income *
                    </label>
                    <input
                      type="number"
                      value={loanData.monthlyIncome}
                      onChange={(e) => setLoanData({...loanData, monthlyIncome: e.target.value})}
                      min="25000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter monthly income"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type
                    </label>
                    <select
                      value={loanData.employmentType}
                      onChange={(e) => setLoanData({...loanData, employmentType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="employed">Salaried</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="business">Business owner</option>
                      <option value="freelancer">Freelancer</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Loan Details</h3>
                  {loanData.amount && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-700">Interest Rate: <span className="font-semibold">18% APY</span></p>
                        <p className="text-blue-700">Processing Fee: <span className="font-semibold">2%</span></p>
                      </div>
                      <div>
                        <p className="text-blue-700">Monthly Payment: <span className="font-semibold">
                          {formatCurrency(Number(loanData.amount) * 1.18 / (Number(loanData.duration) / 30))}
                        </span></p>
                        <p className="text-blue-700">Total Payable: <span className="font-semibold">
                          {formatCurrency(Number(loanData.amount) * 1.18)}
                        </span></p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowLoanModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowerDashboard;