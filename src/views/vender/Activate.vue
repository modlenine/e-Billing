<template>
  <div v-if="publishStatus === true" id="activate">
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
                            <h2 class="text-center">ยืนยันการเข้าใช้งานโปรแกรม</h2>
                        </div>
                        <form id="frm_venderActivate" name="frm_venderActivate" @submit.prevent="submitActivate">
                            
                            <div class="input-group custom">
                                <input type="text" id="venderActi-username" name="venderActi-username" class="form-control form-control-lg" placeholder="เลขประจำตัวผู้เสียภาษี" readonly :value="taxidvue">
                                <div class="input-group-append custom">
                                    <span class="input-group-text"><i class="icon-copy dw dw-user1"></i></span>
                                </div>
                            </div>
                            <div class="input-group custom">
                                <input type="text" id="venderActi-email" name="venderActi-email" class="form-control form-control-lg" placeholder="อีเมล์">
                                <div class="input-group-append custom">
                                    <span class="input-group-text"><i class="dw dw-email-1"></i></span>
                                </div>
                            </div>
                            <div class="input-group custom">
                                <input type="password" id="venderActi-password" name="venderActi-password" class="form-control form-control-lg" placeholder="กำหนดรหัสผ่านใหม่">
                                <div class="input-group-append custom">
                                    <span class="input-group-text"><i class="dw dw-padlock1"></i></span>
                                </div>
                            </div>
                            <div class="row pb-30">
                                <div class="col-12">
                                    <span class="checkPasswordText">(รหัสผ่านต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็ก(a , b) , ตัวพิมพ์ใหญ่(A , B) , อักขระ(!@#$%^&*) และตัวเลข(0-9) รวมกันไม่น้อยกว่า 8 ตัว ตัวอย่าง Ab*12345)</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 form-group">
                                    <div class="input-group mb-0">
                                        <button class="btn btn-primary btn-lg btn-block" id="btn-saveActivate" name="btn-saveActivate" disabled>ยืนยัน</button>
                                    </div>
                                </div>
                                <div class="col-sm-12 form-group">
                                    <div class="input-group mb-0">
                                        <button class="btn btn-danger btn-lg btn-block">ยกเลิก</button>
                                    </div>
                                </div>
                            </div>

                            <input hidden type="text" name="codeVerify" id="codeVerify" :value="this.$route.params.code">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- js -->
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name:'Activate',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            publishStatus:false,
            taxidvue:''
        }
    },
    created() {
        this.checkActivateStatus();
    },
    beforeMount(){

    },
    mounted() {
        const proxy = this;
        $(document).on('keyup' , '#venderActi-password' , function(){
            if($('#venderActi-email').val() != ""){
                if($(this).val() != ""){
                    // Check single quote
                    let str = $(this).val();
                    console.log(proxy.keyForcePassword(str));
                    if(proxy.keyForcePassword(str) === true){
                        $('#btn-saveActivate').prop('disabled' , false);
                    }else{
                        $('#btn-saveActivate').prop('disabled' , true);
                    }
                }else{
                    $('#btn-saveActivate').prop('disabled' , true);
                }
            }else{
                Swal.fire({
                    title: 'กรุณาระบุ Email',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                }).then(function(){
                    $('#venderActi-password').val('');
                });
            }


        });
    },
    methods: {
        keyForcePassword(str){ 
            let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(str);
        },
        submitActivate(){
            $('#btn-saveActivate').prop('disabled' , true);

            const form = $('#frm_venderActivate')[0];
            const data = new FormData(form);
            const proxy = this;

            axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apivender/saveActivate' , data , {
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Send Activate Data Success"){
                    let taxid = res.data.taxid;
                    Swal.fire({
						title: 'กรุณายืนยันตัวตนบน Email ที่ลงทะเบียนไว้',
						icon: 'success',
						showConfirmButton: false,
						timer:2000
					}).then(function(){
						proxy.$router.push('/waitactivate/'+taxid);
					});
                }else if(res.data.status == "Found Duplicate Email"){
                    Swal.fire({
						title: 'พบอีเมลซ้ำในระบบ',
						icon: 'error',
						showConfirmButton: false,
						timer:2000
					}).then(function(){
                        $('#venderActi-email , #venderActi-password').val('');
                    });
                }else{
                    proxy.$router.push('/');
                }
            });
        },
       checkActivateStatus()
       {
            let taxid = this.$route.params.id;
            if(taxid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checkActivateStatus' ,{
                    action:"checkActivateStatus",
                    taxid:taxid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Wait Activate Data"){
                        //code
                        this.$router.push('/waitactivate/'+taxid);
                    }else if(res.data.status == "Account Activate Already"){
                        this.$router.push('/');
                    }else if(res.data.status == "Not Found Data Account"){
                        //Code
                        if(res.data.code == this.$route.params.code){
                            this.publishStatus = true;
                            this.taxidvue = taxid;
                        }else{
                            this.publishStatus = false;
                            this.$router.push('/');
                        }

                    }
                });
            }
       }
    },
}
</script>

<style>

</style>