<template>
  <div id="activate">
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
                        <div class="login-title text-center">
                            <h4 style="font-size:16px;line-height:30px;" class="text-center">กรุณายืนยันตัวตนผ่าน Email ที่ท่านลงทะเบียน หรือคลิก ส่งอีเมลซ้ำ</h4><br>
                            <button type="button" class="btn btn-primary" id="btn-resendEmail" name="btn-resendEmail">ส่งอีเมลซ้ำ<span style="display:none;" class="ml-2 textCount"></span></button><br>
                            <router-link :to="'/editemailactivate/'+this.$route.params.waittaxid"><button type="button" class="btn btn-info mt-2" id="btn-editEmail" name="btn-editEmail">แก้ไขอีเมล</button></router-link>
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
    name:'Activate',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl()
        }
    },
    created() {
        this.checkActivateStatus();
    },
    mounted() {
        const proxy = this;
        $('#btn-resendEmail').click(function(){
            $(this).prop('disabled' , true);
            proxy.resendActivateEmail();
        });
    },
    methods: {
       resendActivateEmail(){
        const proxy = this;
        if(this.$route.params.waittaxid != ""){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/resendActivateEmail',{
                action:"resendActivateEmail",
                taxid:this.$route.params.waittaxid,
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Resend Email Success"){
                    Swal.fire({
                        title: 'ส่งอีเมลซ้ำสำเร็จกรุณาตรวจสอบอีเมลของท่าน',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        let counter = 29;
                        function updateCounter(){
                            $('.textCount').css('display','').html(counter)
                            counter--;
                        }
                        let intervalId = setInterval(updateCounter,1000);
                        setTimeout(function() {
                        // Code to execute after the delay
                        clearInterval(intervalId);
                        $('#btn-resendEmail').prop('disabled' , false);
                        $('.textCount').css('display','none').html('')
                        }, 30000);
                    });
                }else if(res.data.status == "Activate Account Already"){
                    Swal.fire({
                        title: 'Activate Account เรียบร้อยแล้ว กรุณาลงชื่อเข้าใช้งานโปรแกรม',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        proxy.$router.push('/');
                    });
                }else{
                    proxy.$router.push('/');
                }
            });
        }
       },

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
       }
    },
}
</script>

<style>

</style>