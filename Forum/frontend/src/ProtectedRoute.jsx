import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roleRequired, children }) => {
    const role = localStorage.getItem('role');

    // Użytkownik ma wymaganą rolę lub jest adminem mającym dostęp do innych ról
    if (role === roleRequired || (roleRequired === 'MOD' && role === 'ADMIN')) {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;