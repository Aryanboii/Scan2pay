import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IndianRupee, Copy, Check, LogOut, Wallet } from 'lucide-react';

export default function QRGenerator() {
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const { upiId, user, setUser } = useAuth();
  const navigate = useNavigate();

  const upiLink = `upi://pay?pa=${upiId}&pn=QR%20Pay&am=${amount}&cu=INR`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateQR = () => {
    if (amount) {
      navigate(`/payment-confirmation?amount=${amount}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="gradient-border bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg animate-float">
              <IndianRupee className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scan2Pay
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300 rounded-full hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <Wallet className="w-4 h-4 mr-2 text-purple-500" />
            Enter Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:border-purple-300"
          />
        </div>

        {amount && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <QRCode 
                    value={upiLink} 
                    size={200} 
                    level="H"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm">
              <div className="truncate flex-1 text-sm text-gray-600 font-medium">
                {upiLink}
              </div>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 text-purple-500 hover:bg-purple-100 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              onClick={handleGenerateQR}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Generate QR
            </button>
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex items-center justify-center">
              <span className="font-medium text-purple-600">{user?.email}</span>
            </p>
            <p className="flex items-center justify-center text-gray-500">
              UPI ID: <span className="font-medium ml-1">{upiId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}