import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useEmployer = () => {
    const { user, loading } = useContext(AuthContext);
    const [isEmployer, setIsEmployer] = useState(false);
    const [isEmployerLoading, setIsEmployerLoading] = useState(true);

    useEffect(() => {
        const fetchEmployerStatus = async () => {
            if (!loading && user?.email) {
                try {
                    setIsEmployerLoading(true);
                    const response = await fetch(`http://localhost:5000/users/employer/${user.email}`);
                    const data = await response.json();
                    setIsEmployer(data.employer || false);
                } catch (error) {
                    console.error("Error checking employer status:", error);
                    setIsEmployer(false);
                } finally {
                    setIsEmployerLoading(false);
                }
            }
        };

        fetchEmployerStatus();
    }, [user, loading]);

    return [isEmployer, isEmployerLoading];
};

export default useEmployer;
