import React, { useState } from 'react';
import { TrendingUp, DollarSign, Clock, ArrowUpRight, ArrowDownRight, Plus, Eye, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const DepositorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { deposits, transactions, depositPlans, createDeposit, withdrawDeposit, getTotalEarnings, getTotalDeposits } = useApp();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const totalDeposits = getTotalDeposits();
  const totalEarnings = getTotalEarnings();
  const totalBalance = user?.balance || 0;

  const handleCreateDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan && depositAmount) {
      createDeposit(Number(depositAmount), selectedPlan);
      setShowDepositModal(false);
      setSelectedPlan('');
      setDepositAmount('');
    }
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

  const getDaysRemaining = (maturityDate: string) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Track your investments and earnings.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Balance</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">Available for investment</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDeposits)}</p>
              </div>
              <div className="p-3 bg-secondary-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{deposits.filter(d => d.status === 'active').length} active deposits</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-accent-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12.5% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Return</p>
                <p className="text-2xl font-bold text-gray-900">12.8%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Annual percentage yield</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Deposits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Active Deposits</h2>
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Deposit</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {deposits.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deposits yet</h3>
                    <p className="text-gray-600 mb-4">Start investing today and watch your money grow</p>
                    <button
                      onClick={() => setShowDepositModal(true)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Make Your First Deposit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deposits.map((deposit) => {
                      const plan = depositPlans.find(p => p.duration === deposit.duration);
                      const daysRemaining = getDaysRemaining(deposit.maturityDate);
                      
                      return (
                        <div key={deposit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{plan?.name || 'Investment Plan'}</h3>
                              <p className="text-sm text-gray-600">{deposit.duration} days • {(deposit.interestRate * 100).toFixed(1)}% APY</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{formatCurrency(deposit.amount)}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                deposit.status === 'active' ? 'bg-green-100 text-green-800' :
                                deposit.status === 'matured' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {deposit.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Start Date</p>
                              <p className="font-medium">{formatDate(deposit.startDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Maturity</p>
                              <p className="font-medium">{formatDate(deposit.maturityDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Earnings</p>
                              <p className="font-medium text-green-600">+{formatCurrency(deposit.accruedInterest)}</p>
                            </div>
                          </div>

                          {deposit.status === 'active' && (
                            <div className="mt-3 bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Matured - Ready to withdraw'}
                                </span>
                                {daysRemaining === 0 && (
                                  <button
                                    onClick={() => withdrawDeposit(deposit.id)}
                                    className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                                  >
                                    Withdraw
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="p-6">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-100' :
                          transaction.type === 'withdrawal' ? 'bg-red-100' :
                          transaction.type === 'interest' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {transaction.type === 'deposit' && <ArrowUpRight className="h-4 w-4 text-green-600" />}
                          {transaction.type === 'withdrawal' && <ArrowDownRight className="h-4 w-4 text-red-600" />}
                          {transaction.type === 'interest' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                        </div>
                        <div className="text-sm font-medium">
                          <span className={transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'}>
                            {transaction.type === 'withdrawal' ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* New Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Create New Deposit</h2>
              </div>
              
              <form onSubmit={handleCreateDeposit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {depositPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        <div className="text-2xl font-bold text-primary-600 my-2">
                          {(plan.interestRate * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.duration} days</p>
                        <p className="text-xs text-gray-500">Min: {formatCurrency(plan.minAmount)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min={depositPlans.find(p => p.id === selectedPlan)?.minAmount}
                      max={totalBalance}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter amount"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Available balance: {formatCurrency(totalBalance)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedPlan || !depositAmount}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Deposit
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

export default DepositorDashboard;