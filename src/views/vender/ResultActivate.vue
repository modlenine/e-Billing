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
                        <div class="login-title">
                            <h2 class="text-center">ผลการยืนยันการเข้าใช้งานโปรแกรม</h2>
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name:'Activate',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            resultTaxid:this.$route.params.resultid,
            resultActivatecode:this.$route.params.link
        }
    },
    created() {
        this.checkActivate();
    },
    mounted() {
        
    },
    methods: {
        checkActivate()
        {
            const proxy = this;
            let taxid = this.$route.params.resultid;
            let activatecode = this.$route.params.link;

            if(taxid != "" && activatecode != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checkActivate',{
                    action:'checkActivate',
                    taxid:taxid,
                    activatecode:activatecode
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Activate Account Success"){
                        Swal.fire({
                            title: 'ยืนยันตัวตนสำเร็จ กรุณาล็อคอินเพื่อเข้าสู่ระบบ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/');
                        });
                        
                    }else if(res.data.status == "Activate Link Expire"){
                        Swal.fire({
                            title: 'ลิ้งค์สำหรับยืนยันตัวตนหมดอายุ กรุณาส่งการยืนยันใหม่อีกครั้ง',
                            icon: 'warning',
                            showConfirmButton: false,
                            timer:2000
                        }).then(function(){
                            proxy.$router.push('/waitactivate/'+taxid);
                        });

                    }else if(res.data.status == "Not Found This Account"){
                        Swal.fire({
                            title: 'ไม่พบข้อมูลบัญชีนี้รอยืนยันตัวตน',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:2000
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