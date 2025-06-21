import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, AlertTriangle, Eye, CheckCircle, XCircle, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { deposits, loans, transactions, getTotalDeposits, getTotalLoans } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const totalDeposits = getTotalDeposits();
  const totalLoans = getTotalLoans();
  const platformRevenue = totalDeposits * 0.05; // 5% platform fee
  const activeDepositors = deposits.filter(d => d.status === 'active').length;
  const activeBorrowers = loans.filter(l => l.status === 'active').length;

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
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'matured':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Monitor platform performance and manage users.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDeposits)}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12.5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Loans</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalLoans)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+8.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(platformRevenue)}</p>
              </div>
              <div className="p-3 bg-secondary-100 rounded-full">
                <DollarSign className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">5% platform fee</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{activeDepositors + activeBorrowers}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-full">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{activeDepositors} depositors, {activeBorrowers} borrowers</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-2">
              <TabButton
                id="overview"
                label="Overview"
                isActive={activeTab === 'overview'}
                onClick={setActiveTab}
              />
              <TabButton
                id="deposits"
                label="Deposits"
                isActive={activeTab === 'deposits'}
                onClick={setActiveTab}
              />
              <TabButton
                id="loans"
                label="Loans"
                isActive={activeTab === 'loans'}
                onClick={setActiveTab}
              />
              <TabButton
                id="transactions"
                label="Transactions"
                isActive={activeTab === 'transactions'}
                onClick={setActiveTab}
              />
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Deposits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Deposits</h3>
                    <div className="space-y-3">
                      {deposits.slice(0, 5).map((deposit) => (
                        <div key={deposit.id}  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(deposit.amount)}</p>
                            <p className="text-sm text-gray-600">{deposit.duration} days • {formatDate(deposit.startDate)}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deposit.status)}`}>
                            {deposit.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Loans */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Loans</h3>
                    <div className="space-y-3">
                      {loans.slice(0, 5).map((loan) => (
                        <div key={loan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(loan.amount)}</p>
                            <p className="text-sm text-gray-600">{loan.purpose} • {formatDate(loan.startDate)}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                            {loan.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Platform Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Deposit Growth</h3>
                    <p className="text-3xl font-bold">+25%</p>
                    <p className="text-primary-100">This month</p>
                  </div>
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Loan Approval Rate</h3>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-secondary-100">Average approval</p>
                  </div>
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Default Rate</h3>
                    <p className="text-3xl font-bold">2.1%</p>
                    <p className="text-accent-100">Below industry avg</p>
                  </div>
                </div>
              </div>
            )}

            {/* Deposits Tab */}
            {activeTab === 'deposits' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Deposits</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Total: {deposits.length} deposits</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interest Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Earnings
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deposits.map((deposit) => (
                        <tr key={deposit.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(deposit.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {deposit.duration} days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(deposit.interestRate * 100).toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(deposit.startDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deposit.status)}`}>
                              {deposit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                            +{formatCurrency(deposit.accruedInterest)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Loans Tab */}
            {activeTab === 'loans' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Loans</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Total: {loans.length} loans</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purpose
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interest Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remaining
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loans.map((loan) => (
                        <tr key={loan.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(loan.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {loan.purpose}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {loan.duration} days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(loan.interestRate * 100).toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                              {loan.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                            {formatCurrency(loan.remainingAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {loan.status === 'pending' && (
                                <>
                                  <button className="text-green-600 hover:text-green-900">
                                    <CheckCircle className="h-4 w-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <XCircle className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                              <button className="text-primary-600 hover:text-primary-900">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Transactions</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Total: {transactions.length} transactions</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {transaction.type === 'deposit' && <ArrowUpRight className="h-4 w-4 text-green-600 mr-2" />}
                              {transaction.type === 'withdrawal' && <ArrowDownRight className="h-4 w-4 text-red-600 mr-2" />}
                              {transaction.type === 'loan' && <DollarSign className="h-4 w-4 text-blue-600 mr-2" />}
                              {transaction.type === 'repayment' && <CheckCircle className="h-4 w-4 text-green-600 mr-2" />}
                              {transaction.type === 'interest' && <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />}
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {transaction.type}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span className={
                              transaction.type === 'withdrawal' || transaction.type === 'loan' 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }>
                              {transaction.type === 'withdrawal' || transaction.type === 'loan' ? '-' : '+'}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;