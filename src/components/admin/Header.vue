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
                                    <img :src="userImage" alt="">
                                </span>
                                <span class="user-name">{{userFullname}}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <a class="dropdown-item" id="logoutBtn" href="#"><i class="dw dw-logout"></i>ลงชื่ออก</a>
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
                        <span style="font-size:28px;color:#ef476f;"><b>e-Billing Admin</b></span>
                    </a>
                    <div class="close-sidebar" data-toggle="left-sidebar-close">
                        <i class="ion-close-round"></i>
                    </div>
                </div>
                <div class="menu-block customscroll">
                    <div class="sidebar-menu">
                        <ul id="accordion-menu">
                            <li class="dropdown">
                                <router-link to='/admin' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-analytics-3 wdfI1"></span><span class="mtext">หน้าหลัก</span>
                                </router-link>
                            </li>
                    
                            <li>
                                <router-link to='/admin/uploadpage' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-invoice-1 wdfI1"></span><span class="mtext">อัพโหลดข้อมูลวางบิล</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to='/admin/validatebilled' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-file-210 wdfI1"></span><span class="mtext">ตรวจสอบใบวางบิล</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to='/admin/announce' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-megaphone wdfI1"></span><span class="mtext">ลงประกาศบริษัท</span>
                                </router-link>
                            </li>

                            <!-- <li>
                                <router-link to='/admin/reportbilled' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-outbox wdfI1"></span><span class="mtext">รายงาน</span>
                                </router-link>
                            </li> -->

                            <li class="dropdown">
                                <a href="javascript:void(0)" class="dropdown-toggle">
                                    <span class="micon dw dw-outbox wdfI1"></span><span class="mtext">รายงาน</span>
                                </a>
                                <ul class="submenu">
                                    <li>
                                        <router-link to='/admin/reportbilledsum' class="">
                                            <span class="mtext">รายงานสรุปตามรอบของข้อมูล</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/admin/reportbilled' class="">
                                            <span class="mtext">รายงานแสดงตามรายการ</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>


                            <li class="admin-section" style="display:none;">
                                <div class="dropdown-divider"></div>
                            </li>
                            <li class="admin-section" style="display:none;">
                                <div class="sidebar-small-cap mtext">ตั้งค่า</div>
                            </li>
                            <li class="admin-section" style="display:none;">
                                <router-link to='/admin/setting' class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-settings1 wdfI1"></span><span class="mtext">ตั้งค่าโปรแกรม</span>
                                </router-link>
                            </li>
                            <li class="admin-section" style="display:none;">
                                <router-link to='/admin/settinguser' class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-settings1 wdfI1"></span><span class="mtext">ตั้งค่าผู้ใช้งาน</span>
                                </router-link>
                            </li>
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
import axios from 'axios'
export default {
    name:'Header',
    props:[
        'userDataProps'
    ],
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrladmin(),
            userImage:'',
            userFullname:'',
            resultUserData:[],
        }
    },
    created() {
        this.resultUserData = this.userDataProps;
        this.getUserPermission(this.userDataProps.ecode);

    },
    mounted() {
        const proxy = this;
        this.getUserData();
        console.log(this.resultUserData);
        console.log('Public path'+process.env.NODE_ENV);

        $('#logoutBtn').click(function(){
            localStorage.removeItem('userData');
            location.href = proxy.url+'intsys/ebilling/admin';
        });

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
        getUserPermission(ecode){
            const proxy = this;
            if(ecode != "" || ecode !== null){
                //code
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getUserPermission',{
                    action:'getUserPermission',
                    ecode:ecode
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        //code
                        let result = res.data.result;
                        if(result !== null){
                            if(result.u_admin_section == "yes" || proxy.userDataProps.DeptCode == "1002"){
                                $('.admin-section').css('display' , '');
                            }else{
                                $('.admin-section').css('display' , 'none');
                            }
                        }else{
                            if(proxy.userDataProps.DeptCode == "1002"){
                                $('.admin-section').css('display' , '');
                            }else{
                                 $('.admin-section').css('display' , 'none');
                            }
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