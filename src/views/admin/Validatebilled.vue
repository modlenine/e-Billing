<template>
  <div id="validatebilled">
        <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าตรวจสอบรายการวางบิล</h3>
                      <h5 class="mt-1" style="text-align:center;">เอกสารเลขที่ : {{formno}}</h5>
                      <hr>
                    <form id="frm-saveConfirmBill" @submit.prevent="saveConfirmBill">
                      <div>
                        <h4 class="mb-2">บริษัท {{venderdata.name}}</h4>
                        <!-- <span>ที่อยู่ {{venderdata.address}}</span> -->
                      </div>
                      <div class="mt-3">
                        <span><b>เครดิตเทอม : </b>{{creditterm}} <b>วัน</b></span>
                        <span class="ml-3"><b>เงื่อนไขการจ่ายเงิน + : </b>{{dayfix}} <b>วัน</b></span>
                        <span class="ml-3"><b>วันที่วางบิล : </b>{{dateofbill}} </span>
                        <span class="ml-3"><b>วันที่คำนวณ : </b>{{this.datecalc}} </span><br>
                        <span class=""><b>วันที่จ่าย : </b>{{dateofpay}} </span>
                        <span class="ml-3"><b>วันที่จ่ายตามรอบเดือน : </b>{{dateofpayreal}}</span>
                      </div>
                      <hr>
                      <div id="show_billDetailConfirm"></div>

                    <input hidden type="text" name="sedadmin-taxid" id="sedadmin-taxid" :value="venderdata.bpc_whtid">
                    <input hidden type="text" name="sedadmin-venderaccount" id="sedadmin-venderaccount" :value="venderdata.accountnum">
                    <input hidden type="text" name="sedadmin-dataareaid" id="sedadmin-dataareaid" :value="venderdata.dataareaid">
                    <input hidden type="text" name="sedadmin-formno" id="sedadmin-formno" :value="this.formno">
                    <input hidden type="text" name="seadmin-username" id="seadmin-username" :value="this.userData.Fname+' '+this.userData.Lname">
                    <input hidden type="text" name="seadmin-ecode" id="seadmin-ecode" :value="this.userData.ecode">

                      <div id="zone-approve" style="display:none;" class="row form-group text-center">
                        <div class="col-md-12">
                            <!-- <a :href="this.url+'intsys/ebilling/ebilling_backend/apivender/printBillReport/'+this.formno+'/'+this.venderdata.accountnum+'/'+venderdata.dataareaid" target="_blank"><button type="button" id="btn-cancel-seletBill" name="btn-cancel-seletBill" class="btn btn-info ml-2">ปริ้นใบวางบิล</button></a> -->
                            <button style="display:none;" type="submit" id="btn-approve-seletBill" name="btn-approve-seletBill" class="btn btn-success ml-2"><i class="mr-2 dw dw-tick"></i>อนุมัติใบวางบิล</button>
                        </div>
                      </div>
                    </form>

                    <section id="zone-savePay" style="display:none;">
                        <form id="frm-saveConfirmPay" @submit.prevent="saveConfirmPay">
                            <div class="row mt-3">
                                <div class="col-md-12 form-group">
                                <hr>
                                    <h4 class="text-center">บันทึกข้อมูลทำจ่าย</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8 form-group">
                                    <label for=""><b>หมายเหตุ</b></label>
                                    <textarea name="ap-memo-forvender" id="ap-memo-forvender" cols="30" rows="5" class="form-control" style="height:80px;"></textarea>
                                </div>
                                <div class="col-md-2"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8 form-group">
                                    <label for=""><b>บันทึกข้อความ ( สำหรับเจ้าหน้าที่ ข้อความในนี้จะไม่แสดงให้ผู้ค้าเห็น)</b></label>
                                    <textarea name="ap-memo-foradmin" id="ap-memo-foradmin" cols="30" rows="5" class="form-control" style="height:80px;"></textarea>
                                </div>
                                <div class="col-md-2"></div>
                            </div>

                            <div id="zone-show-fileadmin" class="row form-group">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <label for=""><b>เอกสารที่เกี่ยวข้อง</b></label>
                                    <div class="row" id="show_file"></div>
                                </div>
                                <div class="col-md-2"></div>
                            </div>

                            <div class="row form-group uploadZone" style="display:none;">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <label for=""><b>อัพโหลดเอกสารที่เกี่ยวข้อง</b></label>
                                    <input id="ap-file_name" name="ap-file_name[]" type="file" class="file" multiple data-show-upload="false" data-show-caption="true" data-show-preview="true" accept=".pdf,image/*">
                                </div>
                                <div class="col-md-2"></div>
                            </div>

                            <input hidden type="text" name="ap-admin-taxid" id="ap-admin-taxid" :value="venderdata.bpc_whtid">
                            <input hidden type="text" name="ap-admin-venderaccount" id="ap-admin-venderaccount" :value="venderdata.accountnum">
                            <input hidden type="text" name="ap-admin-dataareaid" id="ap-admin-dataareaid" :value="venderdata.dataareaid">
                            <input hidden type="text" name="ap-admin-formno" id="ap-admin-formno" :value="this.formno">
                            <input hidden type="text" name="ap-admin-username" id="ap-admin-username" :value="this.userData.Fname+' '+this.userData.Lname">
                            <input hidden type="text" name="ap-admin-ecode" id="ap-admin-ecode" :value="this.userData.ecode">

                            <div class="row text-center">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 form-group">
                                    <button style="display:none;" type="submit" id="btn-confirm-pay" name="btn-confirm-pay" class="btn btn-success ml-2"><i class="mr-2 dw dw-diskette1"></i>บันทึกการทำจ่าย</button>
                                </div>
                                <div class="col-md-3"></div>
                            </div>

                            <div id="scripts"><script type="application/javascript" defer :src="this.baseurl+`assets/js/bs-filestyle.js`"></script></div>
                        </form>
                    </section>

                  </div>
                </div>
              </div>



          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    name:"Validatebilled",
    props:[
        'formno',
        'taxid'
    ],
    data() {
        return {
            url:this.getUrl(),
            dateofbill:'',
            dateofpay:'',
            dateofpayreal:'',
            dayfix:0,
            datecalc:'',
            creditterm:0,
            mainstatus:'',
			baseurl:this.baseUrl(),
            userData:this.getUserData(),
            venderdata:[],
            memovender:'',
            memoadmin:'',
            permissionData:[]
        }
    },
    mounted() {
        let proxy = this;
        $(document).on('click' , '.cbemain_select' , function(){
            console.log($('.cbemain_select').prop('checked'));
            if($('.cbemain_select').prop('checked') == true){
                $('.cbe_select').prop('checked' , true)
            }else{
                $('.cbe_select').prop('checked' , false)
            }
        });

        $('#ap-date-pay').Zebra_DatePicker({
            direction: true,
            disabled_dates: ['* * * 0,6'],
        });

        // $(document).on('click' , '#btn-confirm-pay' , function(){
        //     Swal.fire({
        //         title: 'ท่านต้องการบันทึกการทำจ่ายใบวางบิล ใช่หรือไม่',
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonClass: 'btn btn-success',
        //         cancelButtonClass: 'btn btn-danger',
        //         confirmButtonText: 'ยืนยัน',
        //         cancelButtonText:'ยกเลิก'
        //     }).then((result)=> {
        //         if(result.value == true){
        //             proxy.saveConfirmPay();
        //         }
        //     });

        // });

        $(document).on('click' , '.delFileI' , function(){
            const data_filename = $(this).attr('data_filename');
            const data_filepath = $(this).attr('data_filepath');
            const data_fileautoid = $(this).attr('data_fileautoid');

             Swal.fire({
                title: 'ท่านต้องลบไฟล์ ใช่หรือไม่',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then((result)=> {
                if(result.value == true){
                    proxy.deleteFiles(data_filename , data_filepath , data_fileautoid);
                }
            });
        });
    },
    created() {
        $('#scripts').load(' #scripts');
        this.getUserPermission(this.userData.ecode);
    },
    methods: {
      
        getBillDetailEdit(){
            const proxy = this;

            if(proxy.formno != ""){

                axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apiadmin/getBillDetailEdit' ,{
                    action : 'getBillDetailEdit',
                    formno : proxy.formno ,
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){

                        let result = res.data.result;
                        this.creditterm = res.data.creditterm;
                        this.dayfix = res.data.dayFix;
                        this.dateofbill = res.data.dateOfbill;
                        this.dateofpay = res.data.dateOfpay;
                        this.venderdata = res.data.venderinformation;
                        this.datecalc = res.data.datecalc;
                        this.mainstatus = res.data.mainstatus;
                        this.memovender = res.data.memovender;
                        this.memoadmin = res.data.memoadmin;
                        this.dateofpayreal = res.data.dateOfpayReal;

                        console.log(this.permissionData);

                        if(res.data.mainstatus == "In Progress"){
                            $('#btn-approve-seletBill').css('display' , 'none');
                            // $('#btn-confirm-pay').css('display' , '');
                            $('#zone-savePay').css('display' , '');
                            if(this.permissionData.u_finance_section == "yes"){
                                $('#btn-confirm-pay').css('display' , '');
                                $('.uploadZone').css('display' , '');
                            }else{
                                $('#btn-confirm-pay').css('display' , 'none');
                                $('.uploadZone').css('display' , 'none');
                            }


                        }else if(res.data.mainstatus == "Checking"){
                            $('#zone-approve').css('display' , '');
                            // $('#btn-approve-seletBill').css('display' , '');
                            if(this.permissionData.u_ap_section == "yes"){
                                $('#btn-approve-seletBill').css('display' , '');
                            }else{
                                $('#btn-approve-seletBill').css('display' , 'none');
                            }
                        }else if(res.data.mainstatus == "Posted"){
                            $('#btn-approve-seletBill').css('display' , 'none');
                            $('#btn-confirm-pay').css('display' , 'none');


                            $('#ap-memo-forvender').prop('readonly' , true);
                            $('#ap-memo-foradmin').prop('readonly' , true);

                            $('#zone-savePay').css('display' , '');

                        }else{
                            // $('#btn-approve-seletBill').css('display' , '');
                        }
                        
                        let html = '';
                        html +=`
                            <table id="dataBillDetail" class="table table-striped table-bordered" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="td2">Invoice</th>
                                        <th class="td9">Invoice date</th>
                                        <th class="td3">PO</th>
                                        <th class="td4">Voucher</th>
                                        <th class="td5">Exclude VAT</th>
                                        <th class="td6">VAT</th>
                                        <th class="td7">Include VAT</th>
                                        <th class="td7">Status</th>
                                    </tr>
                                </thead>
                            `;

                        if(result.length !== 0){
                            for(let i = 0; i < result.length; i++){
                                let textcolor = '';
                                switch(result[i].tr_status){
                                    case "User Cancel":
                                        textcolor = "style='color:#CC0000;'";
                                        break;
                                    case "Checking":
                                        textcolor = "style='color:#0099FF;'";
                                        break;
                                    case "In Progress":
                                        textcolor = "style='color:#8B4513;'";
                                        break;
                                    case "Posted":
                                        textcolor = "style='color:#009900;'";
                                        break;
                                }

                                html +=`
                                <tbody>
                                    <tr>
                                        <td>`+result[i].tr_invoice+`</td>
                                        <td>`+moment(result[i].tr_invoicedate).format('DD/MM/Y')+`</td>
                                        <td>`+result[i].tr_po+`</td>
                                        <td>`+result[i].tr_voucher+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].tr_beforetax)+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].tr_sumtax)+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].tr_includetax)+`</td>
                                        <td><span `+textcolor+`><b>`+result[i].tr_status+`</b></span></td>
                                    </tr>
                                </tbody>
                                `;
                            }
                        }else{
                            html +=`
                                <tbody>
                                    <tr>
                                        <td colspan="8" class="text-center">ไม่พบรายการรอวางบิล</td>
                                    </tr>
                                </tbody>
                            `;
                        }


                        html +=`
                            </table>
                        `;

                        $('#show_billDetailConfirm').html(html);

                        
                        $('#ap-memo-forvender').val(this.memovender);
                        $('#ap-memo-foradmin').val(this.memoadmin);


                        //file zone
                        let resultFile = res.data.resultFiles;
                        if(resultFile.length != 0){
                            let filehtml = ``;
                            for(let i = 0 ; i < resultFile.length ; i++){
                                let fileExt = resultFile[i].bf_filename.split('.').pop().toLowerCase();
                                console.log(resultFile[i].bf_filename.split('.').pop().toLowerCase());
                                if(fileExt == "jpg" || fileExt == "png" || fileExt == "jpeg" || fileExt == "JPG" || fileExt == "PNG" || fileExt == "JPEG"){
                                    filehtml += `
                                    <div class="col-md-4 col-lg-4 col-6 div-imageShow form-group">
                                        <a class="a-imageShow" href="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" target="_blank">
                                            <img class="imageShow" src="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`">
                                        </a>
                                        <a class="a-imageShow" href="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" target="_blank" download><b>`+resultFile[i].bf_filename+`</b></a>
                                        <i class="dw dw-trash1 delFileI" 
                                            data_filename="`+resultFile[i].bf_filename+`"
                                            data_filepath="`+resultFile[i].bf_filepath+`"
                                            data_fileautoid="`+resultFile[i].bf_autoid+`"
                                        ></i>
                                    </div>
                                    `;
                                }else{
                                    filehtml += `
                                    <div class="col-md-4 col-lg-4 col-6 div-imageShow form-group">
                                            <iframe src="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" height="200" width="100%"></iframe>
                                            <a class="a-imageShow" href="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" target="_blank" download><b>`+resultFile[i].bf_filename+`</b></a>
                                            <i class="dw dw-trash1 delFileI" 
                                                data_filename="`+resultFile[i].bf_filename+`"
                                                data_filepath="`+resultFile[i].bf_filepath+`"
                                                data_fileautoid="`+resultFile[i].bf_autoid+`"
                                            ></i>
                                    </div>
                                    `;
                                }
                            }

                            $('#show_file').html(filehtml);
                        }else{
                            $('#show_file').html('');
                            $('#zone-show-fileadmin').css('display','none');
                        }
                    }
                });


                
            }

        },
        saveConfirmBill()
        {

            if(this.formno != ""){
                Swal.fire({
                    title: 'ท่านต้องการอนุมัติใบวางบิลเลขที่ ' +this.formno+ ' ใช่หรือไม่',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText:'ยกเลิก'
                }).then((result)=> {
                    if(result.value == true){
                        $('#btn-approve-seletBill').prop('disabled' , true);
                        const form = $('#frm-saveConfirmBill')[0];
                        const data = new FormData(form);

                        axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveConfirmBill' , data , {
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status == "Update Data Success"){
                                // this.getBillDetailEdit();
                                this.$router.push('/admin/validatebilled');
                            }
                        });
                    }
                });
            }
        },
        saveConfirmPay(){
            // check value
            const proxy = this;
            if($('#ap-admin-formno').val() != "" && $('#ap-admin-taxid').val() != ""){
                Swal.fire({
                    title: 'ท่านต้องการบันทึกการทำจ่ายใบวางบิล ใช่หรือไม่',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText:'ยกเลิก'
                }).then((result)=> {
                    if(result.value == true){
                        $('#btn-confirm-pay').prop('disabled' , true);

                        const form = $('#frm-saveConfirmPay')[0];
                        const data = new FormData(form);

                        axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveConfirmPay' ,data, {
                            header:{'Content-Type' : 'multipart/form-data'},
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status == "Update Data Success"){
                                Swal.fire({
                                    title: 'อัพโหลดไฟล์สำเร็จ',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer:1000
                                }).then(function(){
                                    proxy.$router.push("/admin/validatebilled");
                                });
                            }
                        });
                    }
                });
            }else{
                Swal.fire({
                    title: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }
        },
        saveUploadFile(){
            const proxy = this;
            if($('#ap-file-formno').val() != ""){
                const form = $('#frm-ap-uploadfile')[0];
                const data = new FormData(form);

                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveUploadFile' , data , {
                    header:{'Content-Type' : 'multipart/form-data'},
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Upload Data Success"){
                        Swal.fire({
                            title: 'อัพโหลดไฟล์สำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push("/admin/validatebilled");
                        });
                        
                    }
                });
            }
        },
        getUserData(){
            const getUserData = localStorage.getItem("userData");
            return JSON.parse(getUserData);
        },
        deleteFiles(filename , filepath , fileautoid){
            let proxy = this;
            if(filename != "" && filepath != "" && fileautoid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/deleteFiles' , {
                    action:"deleteFiles",
                    filename:filename,
                    filepath:filepath,
                    fileautoid:fileautoid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Delete Data Success"){
                        Swal.fire({
                            title: 'ลบไฟล์สำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.getBillDetailEdit();
                        });
                    }
                });
            }
        },
        getUserPermission(ecode){
            if(ecode != ""){
                //code
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getUserPermission',{
                    action:'getUserPermission',
                    ecode:ecode
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        //code
                        this.permissionData = res.data.result;
                        this.getBillDetailEdit();
                    }
                });
            }
        }
    },
}
</script>

<style>

</style>