<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h4>Teams</h4>
        <button @click="showModal" class="btn btn-primary float-end">add teams</button>
      </div>
      <div class="card-body">
        <ul class="alert alert-success" v-if="Object.keys(this.message).length >0">
          <p class="mb-0 ms-3">
            {{message}}
          </p>
        </ul>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Image</th>
            <th>Actions</th>
          </tr> 
          </thead>
          <tbody v-if="this.teams.length > 0">
          <tr v-for="(team, index) in this.teams" :key="index">
            <td>{{index+1}}</td>
            <td>{{team.member_name}}</td>
            <td>{{team.role}}</td>
            <td><img :src="'http://127.0.0.1:8000/'+team.member_img" alt="" class="w-25"></td>
            <td class="d-flex flex-row gap-3">
<!--              <router-link :to="{path: '/teams/edit/'+teams.id}" class="btn btn-warning text-white ">Update</router-link>-->
              <button type="button" @click="showModalEdit(team)" class="btn btn-warning text-white ">Update</button>
              <button type="button" @click="showModalDelete(team.id)" class="btn btn-danger text-white ">Delete</button>
            </td>

          </tr>
          </tbody>
          <tbody v-else>
            <tr aria-colspan="4">Loading...</tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel1" v-show="modalStatus">edit Teams</h1>
            <h1 class="modal-title fs-5" id="exampleModalLabel1" v-show="!modalStatus">Add Teams</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <form ref="teamForm" @submit.prevent="this.modalStatus ? editTeam(model.team.id) : saveTeam()">
            <div class="modal-body">
              <div class="card border-0">
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
                    <label for="">image</label>
                    <input type="file" @change="onChange" class="form-control">
                    <div v-if="model.team.member_img" v-show="!modalStatus">
                      <img v-bind:src="imgPreview" width="100" height="100"/>
                    </div>
                    <div class="" v-if="model.team.member_img" v-show="modalStatus">
                      <img :src="
                        model.team.image_url ??
                        'http://127.0.0.1:8000/' + model.team.member_img" alt="" width="100" height="100">
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" v-show="!modalStatus">Save Team</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" v-show="modalStatus">Edit Team</button>
            </div>
            </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel1">Delete Teams</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <form>
            <div class="modal-body">
              <div class="card border-0">
                <div class="card-body">

                  <ul class="alert alert-warning" v-if="Object.keys(this.errorlist).length >0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorlist" :key="index">
                      {{error[0]}}
                    </li>
                  </ul>
                  <div class="mb-3">
                   <p>yakin mau hapus?</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="deleteTeam()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Delete Team</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
import { ref } from "vue";



  export default {
    name:'teams',
    data(){
      return {
        items:'',
        errorlist:'',
        message:'',
        modalStatus:false,
        teams:[],
        model:{
          team:{
            member_name:'',
            role:'',
            member_img:'',
            image_url:''
          }
        },
        imgPreview:null,
        idTeam:ref('')
        // counterStart:1
      }
    },
    mounted() {
      this.getTeams();
    },
    created() {
    },
    methods: {
      refreshTable() {
        this.items = this.getTeams()
      },
      getTeams() {
        axios.get('http://127.0.0.1:8000/api/team/members').then(({data}) => {
          this.teams = data.data;
          this.teams.sort((a,b) => a.member_name.localeCompare(b.member_name));
        });
      },
      showModal(){
        this.modalStatus = false
        $("#modal").modal("show")
        this.model.team = {}

      },
      showModalEdit(team){

        this.modalStatus = true
        $("#modal").modal("show");
        this.model.team.member_name = team.member_name;
        this.model.team.role = team.role
        this.model.team.member_img = team.member_img
        this.model.team.image_url = team.image_url
        this.model.team.id = team.id
      },
      showModalDelete(teamId){ 
        $("#modalDelete").modal("show")
        this.idTeam = teamId 
      },
      onChange(e)
      {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          // The field to send on backend and apply validations
          this.model.team.member_img = reader.result;
          // The field to display here
          this.model.team.image_url = reader.result;
          this.imgPreview = reader.result;
          e.target.value = "";
        };
        reader.readAsDataURL(file);
      },
      saveTeam() {
        let myThis = this;
        axios.post('http://127.0.0.1:8000/api/team/members',this.model.team)
            .then(({data}) => {
              this.model.team = {
                member_name:'',
                role:'',
                member_img: '',
                image_url: '',
              }
              this.refreshTable()
              this.message = data.meta.message
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
      editTeam(teamId) {
        axios.put(`http://127.0.0.1:8000/api/team/members/edit/${teamId}`, this.model.team)
            .then(({data})=>{
              // console.log(data.data);
              this.model.team =data.data
              this.refreshTable()
              this.message = data.meta.message
            })
      },
      deleteTeam() {
          console.log(this.idTeam)
          axios.delete(`http://127.0.0.1:8000/api/team/members/delete/${this.idTeam}`)
              .then(({data})=>{
                console.log(data.data)
                this.getTeams();
              })
        }
    }
  }
</script>

<style scoped>

</style>