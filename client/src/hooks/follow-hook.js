import $api from "../http/http-axios";

export default function useFollowing () {
    async function subscribeTo(id) {
        try {
            
            const res = await $api.get("/api/subscribe_to/" + id)
            // console.log(res)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    async function unsubscribeTo(id) {
        try {
            const res = await $api.get("/api/unsubscribe_to/" + id)
            // console.log(res)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    async function getSubscriptions (id) {
        try {
            const res = await $api.get("/api/get_subscriptions/" + id)
            // console.log(res)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    async function getSubscribers (id) {
        try {
            const res = await $api.get("/api/get_subscribers/" + id)
            // console.log("subscribers: ",res.data)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    return {
        subscribeTo,
        unsubscribeTo,
        getSubscriptions,
        getSubscribers
    }
}