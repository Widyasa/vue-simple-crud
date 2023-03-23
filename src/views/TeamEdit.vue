<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Add Teams</h4>
      </div>
      <div class="card-body">

        <ul class="alert alert-warning" v-if="Object.keys(this.errorlist).length >0">
          <li class="mb-0 ms-3" v-for="(error,index) in this.errorlist" :key="index">
            {{error[0]}}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">Name</label>
          <input type="text" v-model="model.team.member_name" class="form-control">
        </div>
        <div class="mb-3">
          <label for="">Role</label>
          <input type="text" v-model="model.team.role" class="form-control">
        </div>
        <div class="mb-3">
          <button type="button" @click="editTeam" class="btn btn-primary">Edit Data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "TeamEdit",
  data () {
    return{
      errorlist:'',
      teamId:'',
      model: {
        team:{
          member_name:'',
          role:''
        }
      }
    }
  },
  mounted() {
    this.teamId = this.$route.params.id
    this.getTeamData(this.$route.params.id)
  },
  methods: {
    getTeamData(){
      axios.get(`http://127.0.0.1:8000/api/team/members/edit/${this.teamId}`)
          .then(({data})=>{
            // console.log(data.data);
            this.model.team = data.data;
      });

    },
    editTeam() {
      axios.put(`http://127.0.0.1:8000/api/team/members/edit/${this.teamId}`, this.model.team)
          .then(({data})=>{
            console.log(data.data);
            this.model.team = data.data
          })
    },
    saveTeam() {
      let myThis = this;
      axios.post('http://127.0.0.1:8000/api/team/members', this.model.team)
          .then(({data}) => {
            console.log(data.data)
            alert(data.message);

            this.model.team = {
              member_name:'',
              role:''
            }
          })
          .catch( function (error) {
                if (error.response) {
                  if (error.response.status == 422) {
                    myThis.errorlist = error.response.data.errors;
                  }
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
                console.log(error.config);
              }
          )
    }
  }
}
</script>

<style scoped>

</style>