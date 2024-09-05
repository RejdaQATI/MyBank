// BalanceDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/BalanceDisplay.css'; 

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
                    headers: { 'Authorization': `Bearer ${token}` },
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
        <div className="balance-container">
            <div className="balance-block">
                <h2>Total Balance: ${formattedTotalBalance}</h2>
            </div>
            <div className="balance-block">
                <h2>Income: ${formattedIncomeBalance}</h2>
            </div>
            <div className="balance-block">
                <h2>Expenses: ${formattedExpensesBalance}</h2>
            </div>
        </div>

    );
};

export default BalanceDisplay;

