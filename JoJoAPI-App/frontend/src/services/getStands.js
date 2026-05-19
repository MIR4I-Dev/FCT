import { API_URL } from "../config/config.js";

export async function getStands({ part, search, order, page, limit = 10 }) {
    try {
        const offset = (page - 1) * limit;
        const asc = order === 'ASC' ? 'ASC' : 'DESC';
        const params = new URLSearchParams({ limit, offset, asc });
        if (part && part !== 'all') params.set('origin_part', part);
        if (search) params.set('name', search);

        const res = await fetch(`${API_URL}/stands?${params.toString()}`);

        if (!res.ok) return { data: [], totalPages: 0, nextPage: null, prevPage: null };

        const result = await res.json();

        return {
            data: result.data,
            totalPages: result.pagination.totalPages,
            nextPage: result.pagination.nextPage,
            prevPage: result.pagination.prevPage
        };
    } catch {
        return { data: [], totalPages: 0, nextPage: null, prevPage: null };
    }
}