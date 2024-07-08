import { defineStore } from "pinia"

export const useUserStore = defineStore("userStore",{
    state: () => ({
        user: {
            id: 0,
            name: "Fatih",
            surname: "ES",
            email: "fatihesdev@gmail.com"
        },
        app: "Estate Management System",
    }),
})