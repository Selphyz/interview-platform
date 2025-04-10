import React from 'react';

interface ILayout {
    children: React.ReactNode;
}

const AuthLayout: React.FC<ILayout> = ({children}) => {
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
};

export default AuthLayout;