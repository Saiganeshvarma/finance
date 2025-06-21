import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Clock, Users, DollarSign, PiggyBank, CreditCard } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary-600" />,
      title: 'High Returns',
      description: 'Earn up to 15% annual returns on your deposits with our flexible investment plans.'
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary-600" />,
      title: 'Secure Platform',
      description: 'Bank-level security with end-to-end encryption to protect your investments.'
    },
    {
      icon: <Clock className="h-8 w-8 text-accent-600" />,
      title: 'Quick Processing',
      description: 'Fast loan approvals and instant deposit processing for your convenience.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with all your queries.'
    }
  ];

  const stats = [
    { label: 'Total Investments', value: '₹50M+', icon: <DollarSign className="h-6 w-6" /> },
    { label: 'Happy Investors', value: '10K+', icon: <Users className="h-6 w-6" /> },
    { label: 'Loans Disbursed', value: '₹25M+', icon: <CreditCard className="h-6 w-6" /> },
    { label: 'Average Returns', value: '12.5%', icon: <TrendingUp className="h-6 w-6" /> }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Smart Financial Solutions
              <br />
              <span className="text-accent-300">For Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
              Grow your wealth with our secure investment plans or get quick loans 
              for your financial needs. Join thousands of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link
                to="/register"
                className="bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 group"
              >
                <PiggyBank className="h-5 w-5" />
                <span>Start Investing</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 group"
              >
                <CreditCard className="h-5 w-5" />
                <span>Apply for Loan</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="flex justify-center items-center mb-2">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FinanceFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive financial solutions designed to help you achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 animate-slide-up group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of flexible investment options tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Growth Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-transparent hover:border-primary-300 transition-all duration-200 animate-scale-in">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Growth</h3>
                <div className="text-4xl font-bold text-primary-600 mb-4">8%</div>
                <p className="text-gray-600 mb-6">Annual Return</p>
                <ul className="text-left space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span>7-day duration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span>Minimum ₹1,000</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span>Daily interest payout</span>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Smart Saver Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-secondary-400 relative animate-scale-in">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Saver</h3>
                <div className="text-4xl font-bold text-secondary-600 mb-4">12%</div>
                <p className="text-gray-600 mb-6">Annual Return</p>
                <ul className="text-left space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                    <span>15-day duration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                    <span>Minimum ₹5,000</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                    <span>Auto-renewal option</span>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="w-full bg-secondary-600 text-white py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors inline-block text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Premium Plus Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-transparent hover:border-accent-300 transition-all duration-200 animate-scale-in">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plus</h3>
                <div className="text-4xl font-bold text-accent-600 mb-4">15%</div>
                <p className="text-gray-600 mb-6">Annual Return</p>
                <ul className="text-left space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                    <span>30-day duration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                    <span>Minimum ₹10,000</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="w-full bg-accent-600 text-white py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors inline-block text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who are already growing their wealth with FinanceFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <span>Join Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;