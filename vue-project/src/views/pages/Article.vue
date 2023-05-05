<template>
    <button v-if="session_token" @click="logoutButton">Logout</button>

    <em v-if="loading">Loading...</em>

    <h1>{{ article.title }}</h1> 
    <h2>{{ "Written By: " + article.author }}</h2>
    <h3>{{ "Published: " + article.date_published }}</h3>
    <p>{{ article.article_text }}</p>
    <br />
    <button v-if="session_token && user_id==='1'" @click="deleteArticle">Delete Article</button>


    <h2>{{ "Comments (" + num_comments + ")" }}</h2>

    <form @submit.prevent="handleSubmit">
        <input type="text" name="comment_text" v-model="comment_text" />
        <button>Add</button>
        <div v-if="error">{{ error }}</div>
    </form>

    <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.comment_id">
            <div class="comment-container">
                <div class="comment-body">
                    {{ comment.comment_text }}
                </div>
                <div class="comment-footer">
                    {{ comment.date_published }}
                </div>
                <button v-if="session_token && user_id==='1'" @click="deleteComment(comment.comment_id)">Delete</button>
            </div>
        </li>
    </ul>
</template>

<script>
    import { articleService } from "../../services/articles.service"
    import { loginService } from "../../services/login.service"
    import { commentService } from "../../services/comments.service"

    export default {
        data() {
            return {
                article: {},
                comments: [],
                num_comments: 0,
                comment: "",
                error: "",
                session_token: localStorage.getItem("session_token"),
                user_id: localStorage.getItem("user_id"),
                newText: ""
            }
        },
        created() {
            this.article.loading = true;
            this.comments.loading = true;

            articleService.getOne(this.$route.params.id)
            .then((article) => {
                this.article = article;
                this.article.loading = false;
                commentService.getAll(this.$route.params.id)
                .then((comments) => {
                    this.comments = comments
                    this.num_comments = comments.length
                })
                .catch(error => this.error = error)
            })
            .catch(error => this.error = error);
        },
        methods: {
            handleSubmit(e){
                const {comment_text} = this

                if(!(comment_text)){
                    this.error = "comment box can't be empty"
                    return;
                }

                const data = {
                    "comment_text": comment_text
                };

                commentService.postOne(this.$route.params.id, data)
                .then(response => {
                    commentService.getAll(this.$route.params.id)
                    .then((comments) => {
                        this.comments = comments
                        this.num_comments = comments.length
                    })
                    .catch(error => this.error = error);
                })
                .catch(error => this.error = error)


                
            },
            logoutButton(e){
                loginService.logout()
                .then(result => {
                    console.log("Logged out, reloading page")
                    this.$router.go()
                })
                .catch(error => {
                    this.error = error;
                })
            },
            deleteComment(comment_id){
                commentService.remove(comment_id)
                .then(response => {
                    commentService.getAll(this.$route.params.id)
                    .then((comments) => {
                        this.comments = comments
                        this.num_comments = comments.length
                    })
                    .catch(error => this.error = error);
                })
                .catch(error => this.error = error);
            },
            deleteArticle(e){
                articleService.remove(this.$route.params.id)
                this.$router.push("/")
            },
            updateArticle(e){

            }
        }
    }
</script>

<style scoped>
</style>