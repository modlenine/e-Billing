<template>
  <div id="editemailactivate">
    <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <div class="brand-logo">
                <a href="#">
                    <!-- <img src="<?=base_url('assets/')?>vendors/images/deskapp-logo.svg" alt=""> -->
                    <div style="color:gray;">Salee Colour e-Billing System</div>
                </a>
            </div>
            <div class="login-menu">
                
            </div>
        </div>
    </div>
    <div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div class="container">
            <div class="row align-items-center">
                <!-- <div class="col-md-6 col-lg-7">
                    <img src="<?=base_url('assets/')?>vendors/images/login-page-img.png" alt="">
                </div> -->
                <div class="col-md-12 col-lg-12">
                    <div class="login-box bg-white box-shadow border-radius-10">
                        <div class="login-title">
                            <h4 style="font-size:16px;line-height:30px;" class="text-center">แก้ไขอีเมล</h4><br>
                            <div class="row form-group">
                                <div class="col-md-12 form-group">
                                    <label for=""><b>อีเมลปัจจุบัน</b></label>
                                    <input type="text" name="current-email" id="current-email" class="form-control" readonly>
                                </div>
                                <div class="col-md-12 form-group">
                                    <label for=""><b>อีเมลใหม่</b></label>
                                    <input type="text" name="new-email" id="new-email" class="form-control">
                                </div>
                            </div>
                            <div class="row form-group text-center">
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-info mt-2 btn-block" id="btn-saveEditEmail" name="btn-saveEditEmail">บันทึกการแก้ไขอีเมล</button>
                                </div>
                                <div class="col-md-12">
                                    <router-link to="/"><button type="button" class="btn btn-info mt-2 btn-block" id="btn-editEmail" name="btn-editEmail">กลับไปหน้าล็อกอิน</button></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- js -->
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Swal from 'sweetalert2'

export default {
    name:'EditemailActivate',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl()
        }
    },
    created() {
        this.getdatauserForEditEmailActivate();
    },
    mounted() {
        const proxy = this;
        $('#btn-saveEditEmail').click(function(){
            $(this).prop('disabled' , true);
            proxy.saveChangeEmailForActivate();
        });
    },
    methods: {
       
       checkActivateStatus()
       {
            let taxid = this.$route.params.waittaxid;
            if(taxid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checkActivateStatus' ,{
                    action:"checkActivateStatus",
                    taxid:taxid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Wait Activate Data"){
                        //code
                    }else if(res.data.status == "Account Activate Already"){
                        this.$router.push('/');
                    }else{
                        this.$router.push('/');
                    }
                });
            }
       },
       getdatauserForEditEmailActivate()
       {
        let taxid = this.$route.params.edittaxid;
        const proxy = this;
        if(taxid != ""){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/getdatauserForEditEmailActivate',{
                action:"getdatauserForEditEmailActivate",
                taxid:taxid
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let result = res.data.result;
                    $('#current-email').val(result.vm_email_temp);
                }else if(res.data.status == "Activate Account Already"){
                    Swal.fire({
                        title: 'ท่าน Activate Account เรียบร้อยแล้วกรุณาลงชื่อเข้าใช้โปรแกรม',
                        icon: 'warning',
                        showConfirmButton: false,
                        timer:2000
                    }).then(function(){
                        proxy.$router.push('/');
                    });
                }
            });
        }
       },
       saveChangeEmailForActivate()
       {
        const proxy = this;
        if($('#new-email').val() != ""){
            if($('#new-email').val() != $('#current-email').val()){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveChangeEmailForActivate' , {
                    action:'saveChangeEmailForActivate',
                    newemail:$('#new-email').val(),
                    taxid:this.$route.params.edittaxid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Change Email Success"){
                        //code
                        Swal.fire({
                            title: 'เปลี่ยนอีเมลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/waitactivate/'+res.data.taxid);
                        });
                    }else if(res.data.status == "Found Duplicate Email"){
                        Swal.fire({
                            title: 'พบอีเมลซ้ำในระบบ',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $('#new-email').val('');
                            $('#new-email').prop('disabled' , false);
                        });
                    }
                });
            }else{
                Swal.fire({
                    title: 'อีเมลใหม่ซ้ำกับอีเมลปัจจุบัน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                }).then(function(){
                    $('#btn-saveEditEmail').prop('disabled' , false);
                });
            }
        }
       }
    },
}
</script>

<style>

</style>