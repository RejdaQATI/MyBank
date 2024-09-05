// WelcomeMessage.js
import React from 'react';

const WelcomeMessage = () => {
    const userName = localStorage.getItem('userName'); 

    return (
        <div className="welcome-message">
            <h2>Welcome back, {userName}!</h2>
        </div>
    );
};

export default WelcomeMessage;
