import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';

const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
