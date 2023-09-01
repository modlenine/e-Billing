<template>
    <div>
        <div>
            <div class="header">
                <div class="header-left">
                    <div class="menu-icon dw dw-menu"></div>
                </div>
                <div class="header-right">

                    <div class="user-notification">
                        <div class="dropdown">
                            <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
                                <i class="icon-copy dw dw-notification"></i>
                                <div id="notify-section" style="display:none;">
                                    <span class="badge notification-active"></span>
                                    <div class="d-flex align-items-center justify-content-center countNotify">
                                        <span class="countNotifyText">0</span>
                                    </div>
                                </div>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="notification-list mx-h-350 customscroll">
                                    <div id="show_notifyData"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="user-info-dropdown">
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                <span class="user-icon">
                                    <img class="avataUser" :src="this.url+this.rsImagePath+this.rsImageName" alt="">
                                </span>
                                <span class="user-name">&nbsp;{{resultUserData.name}}</span>
                            </a>
                            
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <router-link to="/userprofile" class="dropdown-item" id="logoutBtn" href="#"><i class="dw dw-support-1"></i>ข้อมูลผู้ใช้</router-link>
                                <a class="dropdown-item" id="logoutBtn" href="javascript:void(0)" @click="logout"><i class="dw dw-logout"></i>ลงชื่อออก</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="left-side-bar">
                <div class="brand-logo">
                    <a href="#">
                        <!-- <img src="#" alt="" class="dark-logo">
                        <img src="#" alt="" class="light-logo"> -->
                        <span style="font-size:28px;color:#ef476f;"><b>e-Billing System</b></span>
                    </a>
                    <div class="close-sidebar" data-toggle="left-sidebar-close">
                        <i class="ion-close-round"></i>
                    </div>
                </div>
                <div class="menu-block customscroll">
                    <div class="sidebar-menu">
                        <ul id="accordion-menu">
                            <li class="dropdown">
                                <router-link to='/' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-analytics-3 wdfI1"></span><span class="mtext">หน้าหลัก</span>
                                </router-link>
                            </li>
                    
                            <li>
                                <router-link to='/billing' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-invoice-1 wdfI1"></span><span class="mtext">วางบิลออนไลน์</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to='/billedlist' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-file-210 wdfI1"></span><span class="mtext">ตรวจสอบใบวางบิล / ดาวน์<br>โหลดใบหัก ณ ที่จ่าย</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to='/reportbilled' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-outbox wdfI1"></span><span class="mtext">รายงานการวางบิล</span>
                                </router-link>
                            </li>


                            <!-- <li>
                                <div class="dropdown-divider"></div>
                            </li>
                            <li>
                                <div class="sidebar-small-cap mtext">ตั้งค่า</div>
                            </li>
                            <li v-if="userDataProps.ecode == 'M1809' ">
                                <router-link to='/serviceType' class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-add-file1 wdfI1"></span><span class="mtext">เพิ่มหัวข้อการบริการ</span>
                                </router-link>
                            </li> -->
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-overlay"></div>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name:'Header',
    props:[
        'userDataVenderProps'
    ],
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrl(),
            userImage:'',
            userFullname:'',
            resultUserData:[],
            rsImagePath:'',
            rsImageName:''
        }
    },
    created() {
        this.resultUserData = this.userDataVenderProps;
    },
    mounted() {
        // const proxy = this;
        this.getDataVenderMemberHead();
        this.getUserData();
        console.log(this.resultUserData);
        console.log('Public path'+process.env.NODE_ENV);

        // $('#logoutBtn').click(function(){
        //     localStorage.removeItem('userData');
        //     location.href = proxy.baseurl;
        // });

        $(document).on('click' , '.header-left' , function(){
            $('.left-side-bar').addClass('open');
            $('.mobile-menu-overlay').addClass('show');
        });

        $(document).on('click' , '.close-sidebar' , function(){
            $('.left-side-bar').removeClass('open');
            $('.mobile-menu-overlay').removeClass('show');
        });

        $(document).on('click' , '.menu' , function(){
            $('.left-side-bar').removeClass('open');
            $('.mobile-menu-overlay').removeClass('show');
        });
    },
    methods: {

        getUserData(){
            if(this.userDataProps != null){
                this.userImage = 'https://intranet.saleecolour.com/intsys/usermanagement/uploads/'+this.resultUserData.file_img;
                this.userFullname = this.resultUserData.Fname+' '+this.resultUserData.Lname;
            }
        },
        logout(){
            Swal.fire({
                title: 'ต้องการลงชื่อออก ใช่หรือไม่',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then((result)=> {
                if(result.value == true){
                    localStorage.removeItem('userData_vender');
                    location.reload();
                }
            });
            
        },
        getDataVenderMemberHead()
        {
        const proxy = this;
        axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/getDataVenderMember' , {
            action:"getDataVenderMember",
            taxid:proxy.resultUserData.taxid
        }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
            let imagename = '';
            let imagepath = '';
            let result = res.data.result;
            let email = result.vm_email;

            if(result.vm_picture_profile === null){
                imagename = 'userlogo.png';
                imagepath = 'intsys/ebilling/ebilling_backend/uploads/images/imageprofile/';
            }else{
                imagename = result.vm_picture_profile;
                imagepath = 'intsys/ebilling/ebilling_backend/'+result.vm_picture_path;
            }

            this.useremail = email;
            this.rsImagePath = imagepath;
            this.rsImageName = imagename;
            
            }
        });
        },

    },
}
</script>

<style>

</style>