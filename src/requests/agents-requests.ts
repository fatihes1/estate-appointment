import axiosInstance from './axios-instance.ts'
const AGENTS_KEY = 'Agents'

export function getAllAgents(pageSize?: number, offset?: string) {
  return axiosInstance.get(AGENTS_KEY, {
    params: {
      pageSize,
      offset,
    },
  })
}

export function searchAgentRequest(search: string) {
  const filterByFormula = `OR(FIND(LOWER("${search}"), LOWER({agent_name})) > 0, FIND(LOWER("${search}"), LOWER({agent_surname})) > 0)`
  return axiosInstance.get(AGENTS_KEY, {
    params: {
      filterByFormula,
    },
  })
}

export function searchAgentsByRecordIds(recordIds: string[]) {
  const filterFormula = `OR(${recordIds.map((id) => `RECORD_ID()='${id}'`).join(',')})`
  return axiosInstance.get(AGENTS_KEY, {
    params: {
      filterByFormula: filterFormula,
    },
  })
}

export function getOneAgent(agentId: string) {
  return axiosInstance.get(`${AGENTS_KEY}/${agentId}`)
}
