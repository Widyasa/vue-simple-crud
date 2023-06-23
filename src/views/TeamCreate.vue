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
          <button type="button" @click="saveTeam" class="btn btn-primary">Add Data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "TeamCreate",
  data () {
    return{
      errorlist:'',
      model: {
        team:{
          member_name:'',
          role:''
        }
      }
    }
  },
  methods: {
    saveTeam() {
      let myThis = this;
      axios.post('http://127.0.0.1:8000/api/team/members', this.model.team)
          .then(({data}) => {
            console.log(data.data)
            // alert(data.message);

            this.model.team = {
              member_name:'',
              role:''
            }
            this.$router.push({name:'teams'})
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
    },
    // validateForm() {
    //
    // }
  }
}
</script>

<style scoped>

</style>