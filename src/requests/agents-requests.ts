import axiosInstance from "./axios-instance.ts";
const AGENTS_KEY = 'Agents'

export function getAllAgents(maxRecords: number = 10) {
    return axiosInstance.get(AGENTS_KEY, {
        params: {
            maxRecords
        }
    })
}

export function getOneAgent(agentId: string) {
    return axiosInstance.get(`${AGENTS_KEY}/${agentId}`)
}