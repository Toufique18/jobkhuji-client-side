import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (!loading && user?.email) {
                try {
                    setIsAdminLoading(true);
                    const response = await fetch(`http://localhost:5000/users/admin/${user.email}`);
                    const data = await response.json();
                    setIsAdmin(data?.admin || false);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
