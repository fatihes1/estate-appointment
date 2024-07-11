import axiosInstance from "./axios-instance.ts";
const AGENTS_KEY = 'Agents'

export function getAllAgents(pageSize?: number , offset?: string) {
    return axiosInstance.get(AGENTS_KEY, {
        params: {
            pageSize,
            offset
        }
    })
}

export function getOneAgent(agentId: string) {
    return axiosInstance.get(`${AGENTS_KEY}/${agentId}`)
}

