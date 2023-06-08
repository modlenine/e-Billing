<template>
  <div id="settinguser">
    <section id="settinguser-allow-section">
    <div class="modal fade bs-example-modal-lg" id="addUser_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="addUserlabel">เพิ่มผู้ใช้งานโปรแกรม</h4>
                    <button type="button" class="close usersetting-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                <form id="frm-saveUserSetting" autocomplete="off" @submit.prevent="saveUserSetting">
                  <div class="row form-group">
                    <div class="col-md-12 form-group">
                      <label for=""><b>ค้นหาผู้ใช้งาน</b> (ชื่อ-สกุล ภาษาอังกฤษ , รหัสพนักงาน , ชื่อแผนก , อีเมล)</label>
                      <input type="text" name="ip-addUser-search" id="ip-addUser-search" class="form-control" @keyup="searchUser">
                      <div id="show-usersearch"></div>
                    </div>
                  </div>
                  <hr>

                  <div class="row form-group">
                    <div class="col-md-6 form-group">
                      <label for=""><b>รหัสพนักงาน</b></label>
                      <input type="text" name="ip-addUser-ecode" id="ip-addUser-ecode" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                      <label for=""><b>ชื่อผู้ใช้งาน</b></label>
                      <input type="text" name="ip-addUser-username" id="ip-addUser-username" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                      <label for=""><b>ชื่อ-สกุล</b></label>
                      <input type="text" name="ip-addUser-fullname" id="ip-addUser-fullname" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                      <label for=""><b>แผนก</b></label>
                      <input type="text" name="ip-addUser-dept" id="ip-addUser-dept" class="form-control" readonly>
                      <input hidden type="text" name="ip-addUser-deptcode" id="ip-addUser-deptcode">
                    </div>
                    <div class="col-md-6 form-group">
                      <label for=""><b>อีเมล</b></label>
                      <input type="text" name="ip-addUser-email" id="ip-addUser-email" class="form-control" readonly>
                    </div>
                  </div>
                  <hr>

                    <div class="row form-group">
                        <div class="col-md-6 form-group">
                            <span><b>Admin Section</b></span>
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="row">
                                <div class="col-lg-12 form-inline">

                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-admin-yes" name="ip-addUser-admin" value="yes" class="custom-control-input" required> 
                                        <label for="ip-addUser-admin-yes" class="custom-control-label">Yes</label>
                                    </div> 
                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-admin-no" name="ip-addUser-admin" value="no" class="custom-control-input" required> <label for="ip-addUser-admin-no" class="custom-control-label">No</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6 form-group">
                            <span><b>Upload Section</b></span>
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="row">
                                <div class="col-lg-12 form-inline">

                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-upload-yes" name="ip-addUser-upload" value="yes" class="custom-control-input" required> 
                                        <label for="ip-addUser-upload-yes" class="custom-control-label">Yes</label>
                                    </div> 
                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-upload-no" name="ip-addUser-upload" value="no" class="custom-control-input" required> <label for="ip-addUser-upload-no" class="custom-control-label">No</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6 form-group">
                            <span><b>Acc Section</b></span>
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="row">
                                <div class="col-lg-12 form-inline">

                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-acc-yes" name="ip-addUser-acc" value="yes" class="custom-control-input" required> 
                                        <label for="ip-addUser-acc-yes" class="custom-control-label">Yes</label>
                                    </div> 
                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-acc-no" name="ip-addUser-acc" value="no" class="custom-control-input" required> <label for="ip-addUser-acc-no" class="custom-control-label">No</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6 form-group">
                            <span><b>AP Section</b></span>
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="row">
                                <div class="col-lg-12 form-inline">

                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-ap-yes" name="ip-addUser-ap" value="yes" class="custom-control-input" required> 
                                        <label for="ip-addUser-ap-yes" class="custom-control-label">Yes</label>
                                    </div> 
                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-ap-no" name="ip-addUser-ap" value="no" class="custom-control-input" required> <label for="ip-addUser-ap-no" class="custom-control-label">No</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6 form-group">
                            <span><b>Finance Section</b></span>
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="row">
                                <div class="col-lg-12 form-inline">

                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-fn-yes" name="ip-addUser-fn" value="yes" class="custom-control-input" required> 
                                        <label for="ip-addUser-fn-yes" class="custom-control-label">Yes</label>
                                    </div> 
                                    <div class="custom-control custom-radio mb-5 ml-3">
                                        <input type="radio" id="ip-addUser-fn-no" name="ip-addUser-fn" value="no" class="custom-control-input" required> <label for="ip-addUser-fn-no" class="custom-control-label">No</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <hr>
                  
                    <div class="row form-group">
                      <div class="col-md-12">
                        <button type="submit" id="btn-saveAddUser" class="btn btn-info">บันทึก</button>
                      </div>
                    </div>

                    <input hidden type="text" name="ip-addUser-login-fullname" id="ip-addUser-login-fullname" :value="userData.Fname+' '+userData.Lname">
                    <input hidden type="text" name="ip-addUser-login-ecode" id="ip-addUser-login-ecode" :value="userData.ecode">
                    <input hidden type="text" name="ip-addUser-login-username" id="ip-addUser-login-username" :value="userData.username">
                    <input hidden type="text" name="ip-addUser-login-dept" id="ip-addUser-login-dept" :value="userData.Dept">
                    <input hidden type="text" name="ip-addUser-login-deptcode" id="ip-addUser-login-deptcode" :value="userData.DeptCode">
                    <input hidden type="text" name="ip-addUser-login-email" id="ip-addUser-login-email" :value="userData.memberemail">
                    <input hidden type="text" name="ip-addUser-autoid" id="ip-addUser-autoid">
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
                  <button type="button" id="btn-addEmail" name="btn-addEmail" class="btn btn-info btn-addEmail" data-target="#addUser_modal" data-toggle="modal">เพิ่มผู้ใช้งาน</button>
                <div class="mt-2"></div>
                  <div>
                    <h4 class="text-center">ตั้งค่าผู้ใช้งาน</h4>
                    <hr>
                  </div>
                  <div class="row form-group mt-3">
                    <div class="col-md-8">
                        
                    </div>
                  </div>
                  <table id="tbl_settinguser" class="table table-striped table-bordered" cellspacing="0">
                      <thead>
                      <tr>
                          <!-- <th class="td1">Ulid</th> -->
                          <th class="td1">รหัสพนักงาน</th>
                          <th class="td2">ชื่อผู้ใช้</th>
                          <th class="td3">ชื่อเต็ม</th>
                          <th class="td3">แผนก</th>
                          <th class="td4">วันที่ร้องขอ</th>
                          <th class="td4">สถานะ</th>
                          <th class="td5">#</th>
                      </tr>
                      </thead>
                  </table>
              </div>
            </div>
          </div>
      </div>
    </div>
    </section>

    <section id="settinguser-notallow-section" style="display:none;">
      <div class="main-container">
        <div class="pd-ltr-20">
            <div class="row">
              <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                  <div class="mt-2"></div>
                    <div>
                    </div>
                    <div class="row form-group mt-3 text-center">
                      <div class="col-md-12">
                        <h4>ขออภัยท่านสิทธิ์ของท่านไม่สามารถใช้งานหน้านี้ได้</h4>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import $ from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:"Settinguser",
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),
        }
    },
    created() {
      this.getUserPermission(this.userData.ecode);
    },
    mounted() {
      const proxy = this;
      this.loadUserPermission();

      $(document).on('click' , '.selectUserLi' , function(){
        const data_username = $(this).attr('data_username');
        const data_fullname = $(this).attr('data_fullname');
        const data_ecode = $(this).attr('data_ecode');
        const data_dept = $(this).attr('data_dept');
        const data_deptcode = $(this).attr('data_deptcode');
        const data_memberemail = $(this).attr('data_memberemail');

        $('#ip-addUser-ecode').val(data_ecode);
        $('#ip-addUser-username').val(data_username);
        $('#ip-addUser-fullname').val(data_fullname);
        $('#ip-addUser-dept').val(data_dept);
        $('#ip-addUser-deptcode').val(data_deptcode);
        $('#ip-addUser-email').val(data_memberemail);

        $('#show-usersearch').html('');
        $('#ip-addUser-search').val('');

      });

      $(document).on('click' , '.editUser' , function(){
        const data_autoid = $(this).attr('data_autoid');
        $('#addUserlabel').html('แก้ไขผู้ใช้งานโปรแกรม');

        proxy.getDataUserSettingForEdit(data_autoid);
      });


      $(document).on('click' , '.btn-addEmail' , function(){
          $('#ip-addUser-search').prop('readonly' , false);
          $('#ip-addUser-ecode').val('');
          $('#ip-addUser-username').val('');
          $('#ip-addUser-fullname').val('');
          $('#ip-addUser-dept').val('');
          $('#ip-addUser-deptcode').val('');
          $('#ip-addUser-email').val('');
          $('#ip-addUser-autoid').val('');

          $('#btn-saveAddUser').html("บันทึก");
          $('input:radio[name="ip-addUser-admin"]').prop('checked' , false);
          $('input:radio[name="ip-addUser-upload"]').prop('checked' , false);
          $('input:radio[name="ip-addUser-acc"]').prop('checked' , false);
          $('input:radio[name="ip-addUser-ap"]').prop('checked' , false);
          $('input:radio[name="ip-addUser-fn"]').prop('checked' , false);
      });

      $(document).on('click' , '.delUser' , function(){
        const data_autoid = $(this).attr('data_autoid');
          Swal.fire({
            title: 'ต้องการลบข้อมูล ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText:'ยกเลิก'
          }).then((result)=>{
            if(result.value === true){
              proxy.deleteUser(data_autoid);
            }
          });
      });

      $('#btn-addEmail').click(function(){
        $('#addUserlabel').html('เพิ่มผู้ใช้งานโปรแกรม');
      });
    },
    methods: {
      getSessionStorage(){
        const getUserData = localStorage.getItem("userData");
        return JSON.parse(getUserData);
      },
      loadUserPermission(){
        let thid = 1;
        $('#tbl_settinguser thead th').each(function() {
          var title = $(this).text();
          $(this).html(title + ' <input type="text" id="tbl_settinguser'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
          thid++;
        });

          $('#tbl_settinguser').DataTable().destroy();
          var table = $('#tbl_settinguser').DataTable({
                        "scrollX": true,
                        "processing": true,
                        "serverSide": true,
                        "stateSave": true,
                        stateLoadParams: function(settings, data) {
                            for (let i = 0; i < data.columns["length"]; i++) {
                                let col_search_val = data.columns[i].search.search;
                                if (col_search_val !== "") {
                                    $("input", $("#tbl_settinguser thead th")[i]).val(col_search_val);
                                }
                            }
                        },
                        "ajax": {
                        "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadUserPermission',
                        },
                        dom: 'Bfrtip',
                          "buttons": [{
                            extend: 'copyHtml5',
                            title: 'รายงานการ Service'
                          },
                          {
                            extend: 'excelHtml5',
                            autoFilter: true,
                            title: 'รายงานการ Service'
                          }
                          ],
                        order: [
                            [0, 'desc']
                        ],
                        columnDefs: [{
                                targets: "_all",
                                orderable: false
                            },
                        ],
                });

                table.columns().every(function() {
                    var table = this;
                    $('input', this.header()).on('keyup change', function() {
                        if (table.search() !== this.value) {
                            table.search(this.value).draw();
                        }
                    });
                });

    
                  // $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                  //     'background-color':'#F5F5F5',
                  //     'cursor':'no-drop'
                  // });
      },
      searchUser(){
        if($('#ip-addUser-search').val() != ""){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/searchUser' , {
            action:"searchuser",
            searchuser:$('#ip-addUser-search').val()
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
                let result = res.data.result;
                let outputHtml = `<ul class="list-group mt-2 selectUserUl">`;
                for(let i = 0; i < result.length; i++){
                    outputHtml += `
                    <li class="list-group-item list-group-item list-group-item-action selectUserLi"
                        data_username="`+result[i].username+`"
                        data_fullname="`+result[i].Fname+' '+result[i].Lname+`"
                        data_ecode="`+result[i].ecode+`"
                        data_dept="`+result[i].Dept+`"
                        data_deptcode="`+result[i].DeptCode+`"
                        data_memberemail="`+result[i].memberemail+`"
                    >
                        <span>`+result[i].username+` | `+result[i].ecode+` | `+result[i].Dept+`</span>
                    </li>
                    `;
                }
                outputHtml += `</ul>`;
                $('#show-usersearch').html(outputHtml);
            }
          });
        }else{
          $('#show-usersearch').html('');
        }
      },
      saveUserSetting(){
        if($('#ip-addUser-ecode').val() == ""){
          Swal.fire({
              title: 'กรุณาเลือกข้อมูลผู้ใช้งาน',
              icon: 'error',
              showConfirmButton: false,
              timer:2000
          });
        }else{
          const form = $('#frm-saveUserSetting')[0];
          const data = new FormData(form);

          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveUserSetting' , data).then(res=>{
            console.log(res.data);
            if(res.data.status == "Insert Data Success"){
              Swal.fire({
                title: 'บันทึกข้อมูลสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer:1000
              }).then(function(){
                // clear value
                $('#ip-addUser-ecode , #ip-addUser-username , #ip-addUser-fullname , #ip-addUser-dept , #ip-addUser-deptcode , #ip-addUser-email').val('');
                $('input:radio[name="ip-addUser-acc"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-ap"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-fn"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-admin"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-upload"]').prop('checked' , false);
                // clear value

                $('.usersetting-closeClick').click();
                $('#tbl_settinguser').DataTable().ajax.reload();
              });
            }else if(res.data.status == "Update Data Success"){
              Swal.fire({
                title: 'บันทึกการแก้ไขข้อมูลสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer:1000
              }).then(function(){
                // clear value
                $('#ip-addUser-ecode , #ip-addUser-username , #ip-addUser-fullname , #ip-addUser-dept , #ip-addUser-deptcode , #ip-addUser-email').val('');
                $('input:radio[name="ip-addUser-acc"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-ap"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-fn"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-admin"]').prop('checked' , false);
                $('input:radio[name="ip-addUser-upload"]').prop('checked' , false);
                // clear value

                $('.usersetting-closeClick').click();
                $('#tbl_settinguser').DataTable().ajax.reload();
              });
            }
          });
        }
      },
      getDataUserSettingForEdit(autoid)
      {
        if(autoid != ""){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDataUserSettingForEdit' , {
            action:'getDataUserSettingForEdit',
            autoid:autoid
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
              let result = res.data.result;
              $('#ip-addUser-search').prop('readonly' , true);
              $('#ip-addUser-ecode').val(result.u_ecode);
              $('#ip-addUser-username').val(result.u_username);
              $('#ip-addUser-fullname').val(result.u_fullname);
              $('#ip-addUser-dept').val(result.u_dept);
              $('#ip-addUser-deptcode').val(result.u_deptcode);
              $('#ip-addUser-email').val(result.u_email);
              $('#ip-addUser-autoid').val(autoid);

              $('#btn-saveAddUser').html("บันทึกการแก้ไขข้อมูล");

              if(this.userData.DeptCode != "1002"){
                $('input:radio[name="ip-addUser-admin"]').click(function(e){
                  e.preventDefault();
                })
              }
              if(result.u_admin_section == "yes"){
                $('#ip-addUser-admin-yes').prop('checked' , true);
              }else if(result.u_admin_section == "no"){
                $('#ip-addUser-admin-no').prop('checked' , true);
              }

              if(result.u_upload_section == "yes"){
                $('#ip-addUser-upload-yes').prop('checked' , true);
              }else if(result.u_upload_section == "no"){
                $('#ip-addUser-upload-no').prop('checked' , true);
              }

              if(result.u_account_section == "yes"){
                $('#ip-addUser-acc-yes').prop('checked' , true);
              }else if(result.u_account_section == "no"){
                $('#ip-addUser-acc-no').prop('checked' , true);
              }
              
              if(result.u_ap_section == "yes"){
                $('#ip-addUser-ap-yes').prop('checked' , true);
              }else if(result.u_ap_section == "no"){
                $('#ip-addUser-ap-no').prop('checked' , true);
              }
              
              if(result.u_finance_section == "yes"){
                $('#ip-addUser-fn-yes').prop('checked' , true);
              }else if(result.u_ap_section == "no"){
                $('#ip-addUser-fn-no').prop('checked' , true);
              }

            }
          });
        }
      },
      getUserPermission(ecode){
        // const proxy = this;
        if(ecode != ""){
            //code
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getUserPermission',{
                action:'getUserPermission',
                ecode:ecode
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let permissiondata = res.data.result;
                    if(permissiondata.u_admin_section == "yes"){
                      $('#settinguser-allow-section').css('display','');
                      $('#settinguser-notallow-section').css('display','none');
                    }else{
                      $('#settinguser-notallow-section').css('display','');
                      $('#settinguser-allow-section').css('display','none');
                    }
                }
            });
        }
      },
      deleteUser(autoid)
      {
        if(autoid != ""){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/deleteUser' , {
            action:"deleteUser",
            autoid:autoid
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Delete Data Success"){
              //code
              Swal.fire({
                title: 'ลบข้อมูลสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer:1000
              }).then(function(){
                $('#tbl_settinguser').DataTable().ajax.reload();
              });
            }
          });
        }
      }
    },
}
</script>

<style scoped>
#tbl_settinguser{
  width:100% !important;
}
</style>