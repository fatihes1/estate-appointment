export type AgentsModel = AgentModel[]

export type AgentModel = {
    number: number,
    agent_name: string,
    agent_surname: string,
    appointments: string[],
    color: string,
}

export type AllAgentsResponseModel = {
    records: OneAgentResponseModel[]
}

export type OneAgentResponseModel = {
    id: string,
    createdTime: string,
    fields: AgentModel
}