<template>
  <div id="notallowpage">
    <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <div class="brand-logo">
                <a href="#">
                    <!-- <img src="<?=base_url('assets/')?>vendors/images/deskapp-logo.svg" alt=""> -->
                    <div style="color:gray;">e-Billing Admin</div>
                </a>
            </div>
            <div class="login-menu">
                
            </div>
        </div>
    </div>
    <div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div class="container">
            <div class="row align-items-center">
                
                <div class="col-md-12 col-lg-12">
                    <div class="login-box bg-white box-shadow border-radius-10">
                        <div class="login-title">
                            <h2 class="text-center">ท่านไม่สามารถใช้งานระบบนี้ได้ <br> กรุณาติดต่อไอที</h2>
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
// import axios from "axios";
// import $ from 'jquery';
import Swal from 'sweetalert2'

export default {
    name:'Notallowpage',
	props:[

	],
	data() {
		return {
			url:this.getUrl(),
			baseurl:this.baseUrl()
		}
	},
	created() {

		Swal.fire({
			title: 'พบข้อผิดพลาด',
			icon: 'error',
			showConfirmButton: false,
			timer:3000
		}).then(function(){
			localStorage.removeItem('userData');
        	location.reload();
		});
	},
	mounted() {
		
	},
    methods: {
		
		
    },
}
</script>


<style>

</style>