<template>
    <h1>Tournament Organisation Tool</h1>


    <div class="tournaments">
        <h2>Add an tournament</h2>
        <form @submit.prevent="handleSubmit">
            <label for="name">Tournament name: </label>
            <input type="text" name="name" v-model="name" />

            <label for="game">Tournament game: </label>
            <input type="text" name="game" v-model="game" />

            <label for="host">Tournament host: </label>
            <input type="text" name="host" v-model="host" />

            <button>Create Tournament</button>
            <div v-if="error">{{ error }}</div>
        </form>
    </div>

    <ul v-if="tournaments.length">
        <li v-for="tournament in tournaments" :key="tournament.tournament_id">
            <router-link :to="'/tournament/' + tournament.tournament_id">
                {{ tournament.tournament_name + ' on ' + tournament.tournament_game }}
            </router-link>
        </li>
    </ul>

    <div v-if="error">
        {{ error }}
    </div>
</template>

<script>
    import { tournamentService } from "../../services/tournament.service"

    export default {
        data() {
            return {
                tournaments: [],
                error: "",
                loading: true,
                name: "",
                game: "",
                host: "",
                player_id: 1,
                user_id: 1
            }
        },
        mounted() {
            tournamentService.getAllTournaments()
            .then(tournaments => {
                this.tournaments = tournaments
                this.loading = false
            })
            .catch(error => this.error = error);
        },
        methods: {
            handleSubmit(e){
                const {name, game, host, player_id, user_id} = this

                if(!(name && game && host)){
                    return;
                }

                const data = {
                    "tournament_name": name,
                    "tournament_game": game,
                    "tournament_host": host,
                    "player_id": player_id,
                    "user_id": user_id
                }

                tournamentService.createTournament(data)
                .then(result => {
                    console.log("tournament created")
                    tournamentService.getAllTournaments()
                    .then(tournaments => {
                        this.tournaments = tournaments
                        this.loading = false
                    })
                    .catch(error => this.error = error);
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