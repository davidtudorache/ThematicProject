<template>
    <button v-if="session_token" @click="logoutButton">Logout</button>
    <h1 v-if="session_token === null">Login</h1>
    <h1 v-if="session_token">Please log out in order to use this page</h1>
    <form @submit.prevent="handleSubmit" v-if="session_token === null">
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="email" />
        <div v-show="submitted && !email">Email is required</div>

        <br /><br />

        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password" />
        <div v-show="submitted && !password">Password is required</div>

        <br /><br />

        <button>Login</button>
        <div v-if="error">{{ error }}</div>
    </form>
</template>

<script>
    import { userService } from "../../services/user.service"

    export default {
        data(){
            return {
                email: "",
                password: "",
                submitted: false,
                session_token: localStorage.getItem("session_token")
            }
        },
        methods: {
            handleSubmit(e){
                this.submitted = true
                const {email, password} = this

                if(!(email && password)){
                    return;
                }

                const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(!(email_pattern.test(email))){
                    this.error = "Email must be a valid email."
                    return;
                }

                const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
                if(!(password_pattern.test(password))){
                    this.error = "Password not strong enough."
                    return;
                }

                const data = {
                    "email": email,
                    "password": password
                }

                userService.login(data)
                .then(result => {
                    console.log("Auth - go to homepage")
                    this.$router.push("/")
                })
                .catch(error => {
                    this.error = error;
                })

            },
            logoutButton(e){
                userService.logout()
                .then(result => {
                    console.log("Logged out, reloading page")
                    this.$router.go()
                })
                .catch(error => {
                    this.error = error;
                })
            }
        }
    }
</script>

<style scoped>
</style>