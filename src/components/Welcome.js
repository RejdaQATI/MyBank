import React from 'react';

const WelcomeMessage = () => {
    const userName = localStorage.getItem('userName'); 

    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-white text-left">
                Welcome back, {userName}!
            </h2>
        </div>
    );
};

export default WelcomeMessage;
