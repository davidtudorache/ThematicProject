<template>
    <h1>{{ tournament.name }}</h1> 
    <h2>{{ "Game: " + tournament.game }}</h2>
    <h3>{{ "Host: " + tournament.host }}</h3>
    <br />


    <h2>{{ "matches (" + num_matches + ")" }}</h2>

    <form @submit.prevent="handleSubmit">

        <label for="score_1">Score 1: </label>
        <input type="number" name="score_1" v-model="score_1" />

        <label for="score_2">Score 2: </label>
        <input type="number" name="score_2" v-model="score_2" />
        <br />
        <button>Add</button>
        <div v-if="error">{{ error }}</div>
    </form>

    <ul v-if="matches.length">
        <li v-for="match in matches" :key="match.match_id">
            <div class="match-container">
                <div class="score_1">
                    {{ match.participant_score }}
                </div>
                <div class="score_2">
                    {{ match.competitor_score }}
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import { tournamentService } from "../../services/tournament.service"
    import { matchService } from "../../services/match.service"

    export default {
        data() {
            return {
                tournament: {},
                matches: [],
                num_matches: 0,
                error: "",
                newText: "",
                score_1: 0,
                score_2: 0
            }
        },
        created() {

            tournamentService.getOneTournament(this.$route.params.id)
            .then((tournament) => {
                this.tournament = tournament;
                matchservice.getAll(this.$route.params.id)
                .then((matches) => {
                    this.matches = matches
                    this.num_matches = matches.length
                })
                .catch(error => this.error = error)
            })
            .catch(error => this.error = error);
        },
        methods: {
            handleSubmit(e){
                const {score_1, score_2} = this

                if(!(match_text)){
                    this.error = "match box can't be empty"
                    return;
                }

                const data = {
                    "match_no": 1,
                    "tournament_id": this.$route.params.id
                };

                matchService.createMatch(this.$route.params.id, data)
                .then(response => {
                    matchservice.getAll(this.$route.params.id)
                    .then((matches) => {
                        this.matches = matches
                        this.num_matches = matches.length
                    })
                    .catch(error => this.error = error);
                })
                .catch(error => this.error = error)


                
            },
            updatetournament(e){

            }
        }
    }
</script>

<style scoped>
</style>