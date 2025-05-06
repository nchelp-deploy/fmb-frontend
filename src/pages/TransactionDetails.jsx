import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { format } from 'date-fns';

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/transactions/${id}`);
        setTransaction(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transaction details');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <div className="card text-center">
          <p className="text-lg text-gray-500">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <div className="card text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4 flex items-center justify-center mx-auto">
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <div className="card text-center">
          <p className="text-lg text-gray-500">Transaction not found.</p>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4 flex items-center justify-center mx-auto">
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-light flex items-center justify-center px-2 py-8">
      <div className="card w-full max-w-md">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-primary hover:underline">
          <ArrowLeftIcon className="h-5 w-5 mr-1" /> Back
        </button>
        <h2 className="text-xl font-bold mb-6 text-center text-primary">Transaction Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Transaction ID:</span>
            <span className="font-mono text-gray-900">{transaction._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-900">{format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Description:</span>
            <span className="text-gray-900">{transaction.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Type:</span>
            <span className={transaction.type === 'credit' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Amount:</span>
            <span className={transaction.type === 'credit' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
              {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
          {transaction.createdBy && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Created By:</span>
              <span className="text-gray-900">{transaction.createdBy.username || transaction.createdBy._id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 