<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h4>Teams</h4>
        <router-link :to="{name:'teamCreate'}" class="btn btn-primary float-end">add teams</router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody v-if="this.teams.length > 0">
          <tr v-for="(teams, index) in this.teams" :key="index">
            <td>{{index+1}}</td>
            <td>{{teams.member_name}}</td>
            <td>{{teams.role}}</td>
            <td class="d-flex flex-row gap-3">
              <router-link :to="{path: '/teams/edit'+teams.id}" class="btn btn-warning text-white ">Update</router-link>
              <button type="button" @click="deleteTeam(teams.id)" class="btn btn-danger text-white ">Delete</button>
            </td>

          </tr>
          </tbody>
          <tbody v-else>
            <tr aria-colspan="4">Loading...</tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  // import teamCreate from "@/views/TeamCreate.vue";

  export default {
    name:'teams',
    data(){
      return {
        teams:[],
        // counterStart:1
      }
    },
    mounted() {
      this.getTeams();
    },
    methods: {
      getTeams() {
        axios.get('http://127.0.0.1:8000/api/team/members').then(({data}) => {
          this.teams = data.data;
          this.teams.sort((a,b) => a.member_name.localeCompare(b.member_name));
        });
      },

      deleteTeam(teamId) {
        if (confirm('Do You Sure To delete')){
          axios.delete(`http://127.0.0.1:8000/api/team/members/delete/${teamId}`)
              .then(({data})=>{
                this.getTeams();
              })
        }
      }
    }
  }
</script>

<style scoped>

</style>