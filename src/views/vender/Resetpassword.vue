<template>
  <div id="resetpassword">
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
                            <h4 style="font-size:16px;line-height:30px;" class="text-center">กำหนดรหัสผ่านใหม่</h4><br>
                            <div class="row form-group">
                                <div class="col-md-12 form-group">
                                    <label for=""><b>เลขประจำตัวผู้เสียภาษี</b></label>
                                    <input type="text" name="reset-taxid" id="reset-taxid" class="form-control" :value="reTaxid" readonly>
                                </div>
                                <div class="col-md-12 form-group">
                                    <div class="input-group custom">
                                        <input type="password" id="reset-newpassword" name="reset-newpassword" class="form-control form-control-lg" placeholder="กำหนดรหัสผ่านใหม่">
                                        <div class="input-group-append custom">
                                            <span class="input-group-text"><i class="dw dw-padlock1"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row pb-30">
                                <div class="col-12">
                                    <span class="checkPasswordText">(รหัสผ่านต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็ก(a , b) , ตัวพิมพ์ใหญ่(A , B) , อักขระ(!@#$%^&*) และตัวเลข(0-9) รวมกันไม่น้อยกว่า 8 ตัว ตัวอย่าง Ab*12345)</span>
                                </div>
                            </div>
                            <div class="row form-group text-center">
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-info mt-2 btn-block" id="btn-saveReset" name="btn-saveReset" @click="saveResetpassword">ยืนยัน</button>
                                </div>
                                <div class="col-md-12">
                                    <router-link to="/"><button type="button" class="btn btn-info mt-2 btn-block" id="btn-returnReset" name="btn-returnReset">กลับไปหน้าล็อกอิน</button></router-link>
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
    name:'Resetpassword',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            reTaxid:this.$route.params.r_taxid
        }
    },
    created() {
       this.checkResetPasswordStatus();
    },
    mounted() {
        const proxy = this;
        $(document).on('keyup' , '#reset-newpassword' , function()
        {
            if($(this).val() != ""){
                // Check single quote
                let str = $(this).val();
                console.log(proxy.keyForcePassword(str));
                if(proxy.keyForcePassword(str) === true){
                    $('#btn-saveReset').prop('disabled' , false);
                }else{
                    $('#btn-saveReset').prop('disabled' , true);
                }
            }else{
                $('#btn-saveReset').prop('disabled' , true);
            }
            


        });
    },
    methods: {
        keyForcePassword(str){ 
            let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(str);
        },
        saveResetpassword(){
            const proxy = this;
            $('#btn-saveReset').prop('disbled' , true);
            if($('#reset-taxid').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุเลขประจำตัวผู้เสียภาษี',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#reset-newpassword').val() == ""){
                Swal.fire({
                    title: 'กรุณากำหนดรหัสผ่านใหม่',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveResetpassword' , {
                    action:'saveResetpassword',
                    taxid:$('#reset-taxid').val(),
                    newpassword:$('#reset-newpassword').val(),
                    token:proxy.$route.params.r_tokencode
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Set New Password Success"){
                        Swal.fire({
                            title: 'กำหนดรหัสใหม่เรียบร้อยแล้ว',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
                        });
                    }else if(res.data.status == "Link Expire Sending Email Again"){
                        Swal.fire({
                            title: 'ลิ้งหมดอายุระบบได้ทำการส่งอีเมลให้ใหม่เรียบร้อยแล้ว',
                            icon: 'warning',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
                        });
                    }else{
                        Swal.fire({
                            title: 'พบข้อผิดพลาดในขั้นตอนของการขอ Reset Password',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
                        });
                    }
                });
            }
        },
        checkResetPasswordStatus(){
            const proxy = this;
            if(this.reTaxid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checkResetPasswordStatus',{
                    action:'checkResetPasswordStatus',
                    taxid:this.reTaxid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Not Found Reset Password Status"){
                        Swal.fire({
                            title: 'ไม่พบข้อมูลการขอ Reset Password กำลังกลับไปหน้าลงชื่อเข้าใช้โปรแกรม',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
                        });
                    }else if(res.data.status == "Found Reset Password Status"){
                        //code
                    }else{
                        Swal.fire({
                            title: 'พบปัญหาในการตรวจสอบข้อมูล',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
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