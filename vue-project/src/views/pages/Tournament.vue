<template>
    <h1>{{ tournament.name }}</h1> 
    <h2>{{ "Game: " + tournament.tournament_game }}</h2>
    <h3>{{ "Host: " + tournament.tournament_host }}</h3>
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
                    {{"Player 1: " + match.participant_score }}
                </div>
                <div class="score_2">
                    {{"Player 2: "  + match.competitor_score }}
                </div>
            </div>
            <br />
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
                score_2: 0,
                match_no: 1,
                id: this.$route.params.id
            }
        },
        created() {

            tournamentService.getOneTournament(this.$route.params.id)
            .then((tournament) => {
                this.tournament = tournament;
                matchService.getAllMatches(this.$route.params.id)
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
                const {match_no, id, score_1, score_2} = this

                

                const data = {
                    "match_no": match_no,
                    "tournament_id": id
                };

                const data2 = {
                    "participant_score": score_1,
                    "competitor_score": score_2
                }

                matchService.createMatch(data)
                .then(response => {
                    console.log(response.match_id);
                    matchService.updateMatch(response.match_id, data2)
                    .then(response => {
                        matchService.getAllMatches(this.$route.params.id)
                        .then((matches) => {
                            this.matches = matches
                            this.num_matches = matches.length
                        })
                    .catch(error => this.error = error);
                    })
                   
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