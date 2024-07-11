import { defineStore } from "pinia"
import {getAllAgents} from "../requests/agents-requests.ts";
import { OneAgentResponseModel} from "../models/agents-model.ts";

export const useUserStore = defineStore("userStore",{
    state: () => ({
        agent: {
            id: "",
            createdTime: "",
            fields: {
                number: 0,
                agent_name: "",
                agent_surname: "",
                appointments: [],
                color: ""
            }
        } as OneAgentResponseModel,
        app: "Estate Management System",
        agents: [] as OneAgentResponseModel[],
    }),

    actions: {
        setActiveAgent(agent: OneAgentResponseModel){
            console.log('NEW AGENT: ', agent)
            this.agent = agent
        },
        setAgents(agents: OneAgentResponseModel[]){
            this.agents = agents
        },
        async fetchAgents() {
            try {
                const response = await getAllAgents() // Adjust the URL to your API endpoint
                console.log("AGENTS: ", response.data.records)
                this.setAgents(response.data.records);
                this.setActiveAgent(response.data.records[0])
            } catch (error) {
                console.error('Failed to fetch agents:', error);
            }
        }
    }
})