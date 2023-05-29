<template>
  <div id="forgotpassword">
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
                            <h4 style="font-size:16px;line-height:30px;" class="text-center">ลืมรหัสผ่าน / รีเซ็ทรหัสผ่าน</h4><br>
                            <div class="row form-group">
                                <div class="col-md-12 form-group">
                                    <label for=""><b>เลขประจำตัวผู้เสียภาษี</b></label>
                                    <input type="text" name="forgot-taxid" id="forgot-taxid" class="form-control">
                                </div>
                                <div class="col-md-12 form-group">
                                    <label for=""><b>อีเมลที่ลงทะเบียน</b></label>
                                    <input type="text" name="forgot-email" id="forgot-email" class="form-control">
                                </div>
                            </div>
                            <div class="row form-group text-center">
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-info mt-2 btn-block" id="btn-saveForgot" name="btn-saveForgot" @click="saveFotgotpassword">ยืนยัน</button>
                                </div>
                                <div class="col-md-12">
                                    <router-link to="/"><button type="button" class="btn btn-info mt-2 btn-block" id="btn-returnForgot" name="btn-returnForgot">กลับไปหน้าล็อกอิน</button></router-link>
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
import $ from 'jquery'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    name:'Forgotpassword',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl()
        }
    },
    created() {
       
    },
    mounted() {
        
    },
    methods: {
       saveFotgotpassword(){
        const proxy = this;
        $('#btn-saveForgot').prop('disabled' , true);
        if($('#forgot-taxid').val() == ""){
            Swal.fire({
                title: 'กรุณาระบุเลขประจำตัวผู้เสียภาษี',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
        }else if($('#forgot-email').val() == ""){
            Swal.fire({
                title: 'กรุณาระบุอีเมล',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
        }else{
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveFotgotpassword' , {
                action:'saveFotgotpassword',
                taxid:$('#forgot-taxid').val(),
                email:$('#forgot-email').val()
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Email Sending"){
                    Swal.fire({
                        title: 'ส่งอีเมลสำหรับกำหนดรหัสผ่านใหม่เรียบร้อยแล้ว',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        $('#btn-saveForgot').prop('disabled' , false);
                        proxy.$router.push('/');
                    });
                }else if(res.data.status == "Not Found Account"){
                    Swal.fire({
                        title: 'ไม่พบข้อมูลผู้ใช้ในระบบ',
                        icon: 'error',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        $('#btn-saveForgot').prop('disabled' , false);
                    });
                }
            });
        }
       }
    },
}
</script>

<style>

</style>