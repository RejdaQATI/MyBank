import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BalanceDisplay = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [incomeBalance, setIncomeBalance] = useState(0);
    const [expensesBalance, setExpensesBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };

                const totalBalanceResponse = await axios.get('http://localhost:8000/api/total-balance', config);
                setTotalBalance(Number(totalBalanceResponse.data.total_balance));

                const incomeBalanceResponse = await axios.get('http://localhost:8000/api/total-income', config);
                setIncomeBalance(Number(incomeBalanceResponse.data.total_income));

                const expensesBalanceResponse = await axios.get('http://localhost:8000/api/total-expenses', config);
                setExpensesBalance(Number(expensesBalanceResponse.data.total_expenses));

                setLoading(false);
            } catch (error) {
                console.error('Error fetching balances:', error);
                setLoading(false);
            }
        };

        fetchBalances();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const formattedTotalBalance = Number(totalBalance).toFixed(2);
    const formattedIncomeBalance = Number(incomeBalance).toFixed(2);
    const formattedExpensesBalance = Number(expensesBalance).toFixed(2);

    return (
        <div className="flex flex-wrap  w-full px-5 md:space-x-4 space-y-2 md:space-y-0">
            {/* Total Balance Card */}
            <div className="w-full md:w-1/4 bg-gray-800 text-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold">Total Balance</h3>
                <p className="text-2xl font-bold">${formattedTotalBalance}</p>
            </div>

            {/* Income Balance Card */}
            <div className="w-full md:w-1/4 bg-gray-700 text-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold">Income Balance</h3>
                <p className="text-2xl font-bold">${formattedIncomeBalance}</p>
            </div>

            {/* Expenses Balance Card */}
            <div className="w-full md:w-1/4 bg-gray-600 text-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold">Expenses Balance</h3>
                <p className="text-2xl font-bold">${formattedExpensesBalance}</p>
            </div>
        </div>
    );
};

export default BalanceDisplay;
