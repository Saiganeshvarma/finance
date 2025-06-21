// API Configuration
const API_BASE_URL = 'https://crudcrud.com/api/be8770af095045cfa34fcaa9e6a1beab';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('financeflow_token');
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('financeflow_token');
      localStorage.removeItem('financeflow_user');
      window.location.href = '/login';
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// API endpoints
export const authAPI = {
  // Register a new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'depositor' | 'borrower';
  }) => {
    try {
      const response = await apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password, // In production, this should be hashed
          role: userData.role,
          balance: userData.role === 'depositor' ? 10000 : 0,
          createdAt: new Date().toISOString(),
        }),
      });
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user by checking against users API
  login: async (credentials: { email: string; password: string }) => {
    try {
      // Get all users and find the one with matching email and password
      const users = await apiRequest('/users', {
        method: 'GET',
      });
      
      const user = users.find((u: any) => 
        u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        // Create a token-like response for consistency
        return {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            balance: user.balance,
            createdAt: user.createdAt,
          },
          token: `token_${user._id}_${Date.now()}`, // Mock token
          success: true,
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const response = await apiRequest(`/users/${userId}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Get all users
  getUsers: async () => {
    try {
      const response = await apiRequest('/users', {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },
};

export const depositsAPI = {
  // Get user deposits
  getUserDeposits: async (userId: string) => {
    try {
      const response = await apiRequest(`/deposits?userId=${userId}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Get deposits error:', error);
      throw error;
    }
  },

  // Create new deposit
  createDeposit: async (depositData: {
    userId: string;
    amount: number;
    duration: number;
    interestRate: number;
    planId: string;
  }) => {
    try {
      const response = await apiRequest('/deposits', {
        method: 'POST',
        body: JSON.stringify({
          ...depositData,
          startDate: new Date().toISOString(),
          maturityDate: new Date(Date.now() + depositData.duration * 24 * 60 * 60 * 1000).toISOString(),
          accruedInterest: 0,
          status: 'active',
          autoRenewal: false,
        }),
      });
      return response;
    } catch (error) {
      console.error('Create deposit error:', error);
      throw error;
    }
  },
};

export const loansAPI = {
  // Get user loans
  getUserLoans: async (userId: string) => {
    try {
      const response = await apiRequest(`/loans?userId=${userId}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Get loans error:', error);
      throw error;
    }
  },

  // Create new loan application
  createLoan: async (loanData: {
    userId: string;
    amount: number;
    duration: number;
    purpose: string;
  }) => {
    try {
      const response = await apiRequest('/loans', {
        method: 'POST',
        body: JSON.stringify({
          ...loanData,
          interestRate: 0.18, // 18% annual
          startDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + loanData.duration * 24 * 60 * 60 * 1000).toISOString(),
          remainingAmount: loanData.amount,
          status: 'pending',
          monthlyPayment: (loanData.amount * (1 + 0.18 * loanData.duration / 365)) / (loanData.duration / 30),
        }),
      });
      return response;
    } catch (error) {
      console.error('Create loan error:', error);
      throw error;
    }
  },
};

export const transactionsAPI = {
  // Get user transactions
  getUserTransactions: async (userId: string) => {
    try {
      const response = await apiRequest(`/transactions?userId=${userId}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },

  // Create new transaction
  createTransaction: async (transactionData: {
    userId: string;
    type: 'deposit' | 'withdrawal' | 'loan' | 'repayment' | 'interest';
    amount: number;
    description: string;
  }) => {
    try {
      const response = await apiRequest('/transactions', {
        method: 'POST',
        body: JSON.stringify({
          ...transactionData,
          date: new Date().toISOString(),
          status: 'completed',
        }),
      });
      return response;
    } catch (error) {
      console.error('Create transaction error:', error);
      throw error;
    }
  },
};

// Export the base API URL for direct fetch calls if needed
export { API_BASE_URL }; 