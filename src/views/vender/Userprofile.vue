<template>
  <div id="userprofile">

    <div class="modal fade bs-example-modal-lg" id="editUserprofile_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าแก้ไขข้อมูลส่วนตัว</h4>
                    <button type="button" class="close userpro-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                <form id="frm-editUserprofile" autocomplete="off" @submit.prevent="saveEditProfile">
                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        
                        <div class="row form-group">
                            <div id="imagePreview" class="profile-photo mt-2"></div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>อัพโหลดรูป</b></label>
                                <input type="file" id="userpro-image" name="userpro-image[]" class="form-control">
                            </div>
                            <div class="col-md-12 form-group">
                              <label for=""><b>Email</b></label>
                              <input type="text" name="userpro-email" id="userpro-email" class="form-control">
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 form-group">
                              <label for=""><b>ผู้ติดต่อเพิ่มเติม</b></label>
                            </div>
                            <div class="col-md-12 form-group">
                              <label for=""><b>Email</b></label>
                              <input type="text" name="userpro-email1" id="userpro-email1" class="form-control">
                            </div>
                            <div class="col-md-12 form-group">
                              <label for=""><b>Email</b></label>
                              <input type="text" name="userpro-email2" id="userpro-email2" class="form-control">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-info" id="btn-save-userpro" name="btn-save-userpro">บันทึกข้อมูล</button>
                            </div>
                        </div>

                        <input hidden type="text" name="userpro-taxid" id="userpro-taxid" :value="userData_vender.taxid">
                      </div>
                    </div>
                  </div>

                </form>
                </div>
               
            </div>
        </div>
    </div>

      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้า User Profile</h3>
                      <hr>
                      <div class="row form-group">
                        <div class="col-md-12">
                            <div class="profile-photo">
                              <img :src="this.url+this.rsImagePath+this.rsImageName" alt="" class="avatar-photo">
                            </div>
                        </div>
                      </div>

                      <div class="row form-group">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 userinformation">
                          <p>
                            <span><b>บริษัท : </b>{{userData_vender.name}}</span>
                          </p>
                          <p>
                            <span><b>เลขที่ผู้เสียภาษี : </b>{{userData_vender.taxid}}</span>
                          </p>
                          <!-- <p>
                            <span><b>ที่อยู่ : </b>{{userData_vender.address}}</span>
                          </p> -->
                          <p>
                            <span><b>Email : </b>{{useremail}}</span>
                          </p>
                        </div>
                        <div class="col-md-3"></div>
                      </div>

                      <div class="row form-group">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 userinformation">
                          <span><b>ผู้ติดต่อเพิ่มเติม</b></span>
                          <p></p>
                          <p>
                            <span><b>Email : </b>{{useremail1}}</span>
                          </p>
                          <p>
                            <span><b>Email : </b>{{useremail2}}</span>
                          </p>
                        </div>
                        <div class="col-md-3"></div>
                      </div>

                      <div class="row form-group">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 text-center">
                          <button type="button" id="btn-edit-userprofile" name="btn-edit-userprofile" class="btn btn-info" data-toggle="modal" data-target="#editUserprofile_modal">แก้ไขข้อมูล</button>
                        </div>
                        <div class="col-md-3"></div>
                      </div>
                     
                  </div>
                </div>
              </div>



          </div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Swal from 'sweetalert2';

export default {
  name:"Userprofile",
  components:{

  },
  data() {
    return {
      url:this.getUrl(),
			baseurl:this.baseUrl(),
      userData_vender:this.getSessionStorage_vender(),

      useremail:'',
      useremail1:'',
      useremail2:'',
      rsImagePath:'',
      rsImageName:''

    }
  },
  created() {
    this.getDataVenderMember();
   
  },
  mounted() {
      const imageInput = document.getElementById('userpro-image');
      const imagePreview = document.getElementById('imagePreview');

      imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          // Remove any existing images from the preview container
          while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
          }

          const imageUrl = reader.result;
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          // imageElement.className = 'avatar-photo';
          imagePreview.appendChild(imageElement);
        });

        reader.readAsDataURL(file);
      });

      const proxy = this;

      $('#btn-edit-userprofile').click(function(){
        const imagename = $(this).attr('imagename');
        const imagepath = $(this).attr('imagepath');

        const imagePreview = document.getElementById('imagePreview');
        const imageElement = document.createElement('img');

        const email = $(this).attr('email');
        const email1 = $(this).attr('email1');
        const email2 = $(this).attr('email2');
        $('#userpro-email').val(email);
        $('#userpro-email1').val(email1);
        $('#userpro-email2').val(email2);

        while (imagePreview.firstChild) {
          imagePreview.removeChild(imagePreview.firstChild);
        }

        imageElement.src = proxy.url+imagepath+imagename;
        imagePreview.appendChild(imageElement);
      });

      $('#userpro-email1').on('keyup' , function(){
        let str = $(this).val();
        console.log(proxy.notKeySingleQ(str));
        if(proxy.notKeySingleQ(str) === false){
          Swal.fire({
              title: "ตรวจพบเครื่องหมาย(','')",
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          }).then(function(){
              //Code
              $('#userpro-email1').val('')
          });
        }

      });



  },
  methods: {
    getSessionStorage_vender(){
        const getUserData = localStorage.getItem("userData_vender");
        return JSON.parse(getUserData);
    },
    getDataVenderMember()
    {
      const proxy = this;
      axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/getDataVenderMember' , {
        action:"getDataVenderMember",
        taxid:proxy.userData_vender.taxid
      }).then(res=>{
        console.log(res.data);
        if(res.data.status == "Select Data Success"){
          let imagename = '';
          let imagepath = '';
          let result = res.data.result;
          let email = result.vm_email;
          let email1 = result.vm_email1;
          let email2 = result.vm_email2;

          if(result.vm_picture_profile === null){
            imagename = 'userlogo.png';
            imagepath = 'intsys/ebilling/ebilling_backend/uploads/images/imageprofile/';
          }else{
            imagename = result.vm_picture_profile;
            imagepath = 'intsys/ebilling/ebilling_backend/'+result.vm_picture_path;
          }

          $('#btn-edit-userprofile').attr({
            'imagename':imagename,
            'imagepath':imagepath,
            'email':email,
            'email1':email1,
            'email2':email2
          });

          this.useremail = email;
          this.useremail1 = email1;
          this.useremail2 = email2;
          this.rsImagePath = imagepath;
          this.rsImageName = imagename;
          
        }
      });
    },
    saveEditProfile()
    {
      //code
      // const proxy = this;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email1 = $('#userpro-email1').val();
      const email2 = $('#userpro-email2').val();

      let haveEmail1 = "";
      let haveEmail2 = "";
      if(email1 !== ""){
        if (emailPattern.test(email1) === false) {
          console.log("Valid email address");
          Swal.fire({
              title: 'กรุณากรอก Email ให้ถูกต้อง',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else{
          haveEmail1 = true;
        }
      }else{
        haveEmail1 = true;
      }

      if(email2 !== ""){
        if (emailPattern.test(email2) === false) {
          console.log("Valid email address");
          Swal.fire({
              title: 'กรุณากรอก Email ให้ถูกต้อง',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else{
          haveEmail2 = true;
        }
      }else{
        haveEmail2 = true;
      }

      if(haveEmail1 === true && haveEmail2 === true){
        $('#btn-save-userpro').prop('disabled' , true);
        const form = $('#frm-editUserprofile')[0];
        const data = new FormData(form);
        axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveEditProfile' , data , {
          header:{
            'Content-Type':'multipart/form-data'
          },
        }).then(res=>{
          console.log(res.data);
          if(res.data.status == "Update Data Success"){
            Swal.fire({
                title: 'อัพเดตข้อมูลสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer:1000
            }).then(function(){
                //Code
                $('.userpro-closeClick').click();
                location.reload();

            });
          }else if(res.data.status == "Update Data Success And Activate Data Again"){
            Swal.fire({
                title: 'ระบบได้ทำการส่ง Link สำหรับ Activate Email ให้ท่านเรียบร้อยแล้ว',
                icon: 'success',
                showConfirmButton: false,
                timer:3000
            }).then(function(){
                localStorage.removeItem('userData_vender');
                $('.userpro-closeClick').click();
                location.reload();
            });
            
            // location.reload();
          }else if(res.data.status == "Found Duplicate Email"){
            Swal.fire({
                title: 'พบข้อมูลซ้ำในระบบ',
                icon: 'error',
                showConfirmButton: false,
                timer:2000
            }).then(function(){
                $('#btn-save-userpro').prop('disabled' , false);
                $('#userpro-email').val('');
            });
          }
        });
      }


    },
    notKeySingleQ(str) 
    { 
        return /^[^'"]*$/.test(str); 
    }
  },

  }
</script>

<style scoped>

</style>