import { useState, useEffect } from "react";
import { getStands } from "../services/getStands.js";

export function useStands(filters) {
    const [standsData, setStandsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationInfo, setPaginationInfo] = useState({
        nextPage: null,
        prevPage: null,
        totalPages: 0
    });

    const { part, search, order, page, limit } = filters;

    useEffect(() => {
        const fetchStands = async () => {
            try {
                setLoading(true);
                const data = await getStands({ part, search, order, page, limit });
                setStandsData(data.data || []);
                setPaginationInfo({
                    nextPage: data.nextPage,
                    prevPage: data.prevPage,
                    totalPages: data.totalPages || 0
                });
            } catch (err) {
                setError(err.message || "An error occurred while obtaining the stands");
            } finally {
                setLoading(false);
            }
        };

        fetchStands();
    }, [part, search, order, page, limit]);

    return { standsData, loading, error, ...paginationInfo };
}