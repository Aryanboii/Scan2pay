import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, IndianRupee } from 'lucide-react';

export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount') || '0';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="gradient-border bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md text-center transition-all duration-300 hover:shadow-3xl">
        <div className="flex justify-center mb-6">
          <div className="relative animate-float">
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-4">
              <CheckCircle className="w-20 h-20 text-white" />
              <IndianRupee className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Payment Accepted Successfully!
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6 shadow-sm">
          <p className="text-3xl font-bold text-green-600 mb-1">
            ₹{amount}
          </p>
          <p className="text-sm text-green-600 font-medium">
            has been received
          </p>
        </div>

        <div className="text-sm text-gray-500 mb-8 animate-pulse">
          Redirecting to home in a few seconds...
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 bg-blue-50 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Return to Home</span>
        </button>
      </div>
    </div>
  );
}