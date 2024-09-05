import React from 'react';
import { Link } from 'react-router-dom'; 
import wallpaper from './real-logo.png'; 

const Dashboard = () => {
    const backgroundStyle = {
        position: 'absolute',
        top: '35%', 
        left: '50%',
        width: '500px', 
        height: '500px', 
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
    };

    return (
        <div className="dashboard-container" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <header style={{ position: 'absolute', top: '20px', width: '100%', textAlign: 'center', color: '#0155A5', fontSize: '24px', fontWeight: 'bold' }}>
                Welcome to Your Dashboard
            </header>
            <div style={backgroundStyle}></div>
            <div style={{ position: 'absolute', top: 'calc(30% + 500px - 250px)', textAlign: 'center', zIndex: 2 }}>
    <Link to="/login" style={{ textDecoration: 'none' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
            Login
        </button>
    </Link>
</div>

        </div>
    );
};

export default Dashboard;

