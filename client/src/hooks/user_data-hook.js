import $api from "../http/http-axios"


export default function useUserData () {
    async function getUserData () {
        try {
            const res = await $api.get("/api/userData/getUserData")
            // console.log(res)
            const userData = res.data.userData
            const {name, surname} = userData
            // console.log(name, surname)
            const fullname = name + " " + surname
            return {userData, fullname}
        } catch (e) {
            console.log(e)
        }
        
    }
    
    async function getUserPosts () {
        try {
            const res = await $api.get("/api/userData/getUserPosts")
            // console.log(res)
            const {posts, likedList} = res.data
            
            return {posts, likedList}
        } catch (e) {
            console.log(e)
        }
    }

    async function getPostsLimited (amount) {
        try {
            const res = await $api.post("/api/userData/getPosts/limited", {amount})
            // console.log(res)
            const {posts} = res.data
            
            return {posts}
        } catch (e) {
            console.log(e)
        }
    }

    async function createUserPost (post) {
        try {
            const res = await $api.post("/api/userData/createUserPost", {post})
            // console.log(res)
            if (res.status === 201) {
                return 1
            } 
            return 0
            
        } catch (e) {
            console.log(e)
        }
        
    }
    
    

    // async function definePostAuthor (userId) {
    //     try {
    //         const res = await $api.get("/api/userData/definePostAuthor/" + userId)
    //     } catch (e) {

    //     }
    // }


    return {
        getUserData,
        createUserPost,
        getUserPosts,
        getPostsLimited
    }
}