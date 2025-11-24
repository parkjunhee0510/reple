import { createContext, useContext, useState } from 'react';

interface AuthContextType {
    user: string | null;
    login: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    const login = (name: string) => setUser(name);

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('AuthContext must be used inside AuthProvider');
    return ctx;
};
