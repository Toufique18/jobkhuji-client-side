import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useCandidate = () => {
    const { user, loading } = useContext(AuthContext);
    const [isCandidate, setIsCandidate] = useState(false);
    const [isCandidateLoading, setIsCandidateLoading] = useState(true);

    useEffect(() => {
        const fetchCandidateStatus = async () => {
            if (!loading && user?.email) {
                try {
                    setIsCandidateLoading(true);
                    const response = await fetch(`http://localhost:5000/users/candidate/${user.email}`);
                    const data = await response.json();
                    setIsCandidate(data?.role === "candidate");
                } catch (error) {
                    console.error("Error checking candidate status:", error);
                    setIsCandidate(false);
                } finally {
                    setIsCandidateLoading(false);
                }
            }
        };

        fetchCandidateStatus();
    }, [user, loading]);

    return [isCandidate, isCandidateLoading];
};

export default useCandidate;
