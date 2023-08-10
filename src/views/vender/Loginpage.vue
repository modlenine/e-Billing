<template>

    <div id="loginpage">

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
								<h2 class="text-center">ล็อกอินเข้าสู่ระบบ</h2>
							</div>
							<form id="frm_venderlogin" name="frm_venderlogin" @submit.prevent="submitLogin">
								
								<div class="input-group custom">
									<input type="text" id="vender-username" name="vender-username" class="form-control form-control-lg" placeholder="เลขประจำตัวผู้เสียภาษี">
									<div class="input-group-append custom">
										<span class="input-group-text"><i class="icon-copy dw dw-user1"></i></span>
									</div>
								</div>
								<div class="input-group custom">
									<input type="password" id="vender-password" name="vender-password" class="form-control form-control-lg" placeholder="**********">
									<div class="input-group-append custom">
										<span class="input-group-text"><i class="dw dw-padlock1"></i></span>
									</div>
								</div>
								<div class="row pb-30">
									<div class="col-6">
										<div class="custom-control custom-checkbox">
											
										</div>
									</div>
									<div class="col-6">
										<div class="forgot-password"><router-link :to="'/forgotpassword/'+randomNumber">ลืมรหัสผ่าน</router-link></div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div class="input-group mb-0">
											<button id="btn-login-vender" name="btn-login-vender" class="btn btn-primary btn-lg btn-block">เข้าสู่ระบบ</button>
										</div>
									</div>
								</div>
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
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2'

export default {
    name:'Loginpage',
	props:[
		'userDataProps',
		'accessData'
	],
	data() {
		return {
			url:this.getUrl(),
			baseurl:this.baseUrl(),
			randomNumber:Math.random()
		}
	},
	created() {
		
	},
	mounted() {
		console.log(this.$router.currentRoute.path);
	},
    methods: {
		
        submitLogin(){
            const form = $('#frm_venderlogin')[0];
			const data = new FormData(form);
			const proxy = this;

			$('#btn-login-vender').prop('disabled' , true);

			axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checklogin' , data,{
			}).then(res=>{
				console.log(res.data);
				if(res.data.status == "Login Successfully"){
					let sessionData = res.data.session_vender_data;

					let userData_vender = {
						'address':sessionData.address,
						'taxid':sessionData.bpc_whtid,
						'name':sessionData.name,
						'Fname':sessionData.slc_fname,
						'Lname':sessionData.slc_lname,
						'venderDateExpire':sessionData.vender_dateExpire
					}

					localStorage.setItem('userData_vender' , JSON.stringify(userData_vender));

					Swal.fire({
						title: 'ลงชื่อเข้าใช้สำเร็จ',
						icon: 'success',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = window.location.href;
					});

				}else if(res.data.status == "Login failed"){
					Swal.fire({
						title: 'ลงชื่อเข้าใช้ไม่สำเร็จ',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
						$('#btn-login-vender').prop('disabled' , false);
					});
				}else if(res.data.status == "Default Password Incorrect"){
					Swal.fire({
						title: 'Default Password ไม่ถูกต้อง',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					});
					$('#btn-login-vender').prop('disabled' , false);
				}else if(res.data.status == "Login failed please fill username and password"){
					Swal.fire({
						title: 'กรุณากรอก Username & Password',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
						$('#btn-login-vender').prop('disabled' , false);
					});
				}else if(res.data.status == "Redirect To Activate Page"){
					this.$router.push('/activate/'+res.data.taxid+'/'+res.data.defaultPassword);
				}else if(res.data.status == "Wait Activate Data"){
					this.$router.push('/waitactivate/'+res.data.taxid);
				}else if(res.data.status == "Not Found Taxid"){
					Swal.fire({
						title: 'ไม่พบข้อมูล กรุณาตรวจสอบเลขที่ผู้เสียภาษีอีกครั้ง',
						icon: 'error',
						showConfirmButton: false,
						timer:3000
					}).then(function(){
						$('#btn-login-vender').prop('disabled' , false);
					});
				}
			});
        },
		
    },
}
</script>

<style>

</style>