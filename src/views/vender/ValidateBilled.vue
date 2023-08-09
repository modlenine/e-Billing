<template>
  <div id="editbilled">
        <div class="main-container">
          <div class="pd-ltr-20">
          
            <form id="frm-saveCancelBill" @submit.prevent="saveCancelBill">
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าตรวจสอบรายการวางบิล</h3>
                      <h5 class="mt-1" style="text-align:center;">เอกสารเลขที่ : {{formno}}</h5>
                      <hr>
                      <div>
                        <h4 class="mb-2">บริษัท {{userData_vender.Fname}}</h4>
                        <!-- <span>ที่อยู่ {{userData_vender.address}}</span> -->
                      </div>
                      <div class="mt-3">
                        <!-- <span><b>เครดิตเทอม : </b>{{creditterm}} <b>วัน</b></span>
                        <span class="ml-3"><b>เงื่อนไขการจ่ายเงิน + : </b>{{dayfix}} <b>วัน</b></span>
                        <span class="ml-3"><b>วันที่วางบิล : </b>{{dateofbill}} </span>
                        <span class="ml-3"><b>วันที่คำนวณ : </b>{{this.datecalc}} </span><br>
                        <span class=""><b>วันที่จ่าย : </b>{{dateofpay}} </span> -->
                        <span class=""><b>วันที่รับเงิน : </b>{{dateofpayreal}} </span>
                      </div>
                      <hr>
                      <div id="show_billDetailEdit"></div>
                        <input hidden type="text" name="sed-taxid" id="sed-taxid" :value="venderdata.bpc_whtid">
                        <input hidden type="text" name="sed-venderaccount" id="sed-venderaccount" :value="venderdata.accountnum">
                        <input hidden type="text" name="sed-dataareaid" id="sed-dataareaid" :value="venderdata.dataareaid">
                        <input hidden type="text" name="sed-formno" id="sed-formno" :value="this.formno">

                        <div id="show_memo_venderHtml"></div>
                        <div id="zone-show-filevender" class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                                <label for=""><b>เอกสารที่เกี่ยวข้อง</b></label>
                                <div class="row" id="show_file_vender"></div>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                      <div class="row form-group text-center">
                        <div class="col-md-12">
                            <a :href="this.url+'intsys/ebilling/ebilling_backend/apivender/printBillReport/'+this.formno+'/'+this.venderdata.accountnum+'/'+venderdata.dataareaid" target="_blank"><button style="display:none;" type="button" id="btn-cancel-printBill" name="btn-cancel-printBill" class="btn btn-info ml-2"><i class="dw dw-print mr-2"></i>ปริ้นใบวางบิล</button></a>
                            <button style="display:none;" type="submit" id="btn-cancel-seletBill" name="btn-cancel-seletBill" class="btn btn-primary ml-2">ยกเลิกการวางบิล</button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name:"Editbilled",
    props:[
        'formno',
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
            userData_vender:this.getSessionStorage_vender(),
            venderdata:[],
            memovender:''
        }
    },
    mounted() {
        $(document).on('click' , '.cbemain_select' , function(){
            console.log($('.cbemain_select').prop('checked'));
            if($('.cbemain_select').prop('checked') == true){
                $('.cbe_select').prop('checked' , true)
            }else{
                $('.cbe_select').prop('checked' , false)
            }
        });
    },
    created() {
        this.getBillDetailEdit();
    },
    methods: {
      
        getBillDetailEdit(){
            const proxy = this;

            if(proxy.formno != ""){

                axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apivender/getBillDetailEdit' ,{
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
                        this.dateofpayreal = res.data.dateOfpayreal;
                        this.venderdata = res.data.venderinformation;
                        this.datecalc = res.data.datecalc;
                        this.mainstatus = res.data.mainstatus;
                        this.memovender = res.data.memovender;


                        if(res.data.mainstatus !== "Checking"){
                            $('#btn-cancel-seletBill').css('display' , 'none');
                        }else{
                            $('#btn-cancel-seletBill').css('display' , '');
                        }

                        if(res.data.mainstatus == "User Cancel"){
                            $('#btn-cancel-printBill').css('display' , 'none');
                        }else{
                            $('#btn-cancel-printBill').css('display' , '');
                        }

                        let html = '';
                        html +=`
                            <table id="dataBillDetail" class="table table-striped table-bordered" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="td1">
                                            <input type="checkbox" class="cbemain_select" id="cbemain" name="cbemain">
                                        </th>
                                        <th class="td2">Invoice</th>
                                        <th class="td9">Invoice Date</th>
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

                                    let statusColor = '';
                                    if(result[i].tr_status == "Checking"){
                                        statusColor = 'style="color:#0099FF;"';
                                    }else if(result[i].tr_status == "In Progress"){
                                        statusColor = 'style="color:#8B4513;"';
                                    }else if(result[i].tr_status == "Posted"){
                                        statusColor = 'style="color:#009900;"';
                                    }else if(result[i].tr_status == "User Cancel"){
                                        statusColor = 'style="color:#CC0000;"';
                                    }

                                if(res.data.mainstatus == "Checking" && result[i].tr_status == "Checking"){

                                    html +=`
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="cbe_select" id="cbe_`+result[i].tr_autoid+`" name="cbe[]" value="`+result[i].tr_autoid+`">
                                                <input hidden type="text" id="cbebill" name="cbebill_`+result[i].tr_autoid+`" value="`+result[i].tr_billupload_autoid+`">
                                            </td>
                                            <td>`+result[i].tr_invoice+`</td>
                                            <td>`+moment(result[i].tr_invoicedate).format('DD/MM/Y')+`</td>
                                            <td>`+result[i].tr_po+`</td>
                                            <td>`+result[i].tr_voucher+`</td>
                                            <td>`+proxy.numberWithCommas(result[i].tr_beforetax)+`</td>
                                            <td>`+proxy.numberWithCommas(result[i].tr_sumtax)+`</td>
                                            <td>`+proxy.numberWithCommas(result[i].tr_includetax)+`</td>
                                            <td><span `+statusColor+`><b>`+result[i].tr_status+`</b></span></td>
                                        </tr>
                                    </tbody>
                                    `;
                                }else if(res.data.mainstatus == "User Cancel" || res.data.mainstatus == "In Progress" || res.data.mainstatus == "Posted"){
                                        html +=`
                                        <tbody>
                                            <tr>
                                                <td>
                                                    #
                                                </td>
                                                <td>`+result[i].tr_invoice+`</td>
                                                <td>`+moment(result[i].tr_invoicedate).format('DD/MM/Y')+`</td>
                                                <td>`+result[i].tr_po+`</td>
                                                <td>`+result[i].tr_voucher+`</td>
                                                <td>`+proxy.numberWithCommas(result[i].tr_beforetax)+`</td>
                                                <td>`+proxy.numberWithCommas(result[i].tr_sumtax)+`</td>
                                                <td>`+proxy.numberWithCommas(result[i].tr_includetax)+`</td>
                                                <td><span `+statusColor+`><b>`+result[i].tr_status+`</b></span></td>
                                            </tr>
                                        </tbody>
                                        `;


                                }
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

                        $('#show_billDetailEdit').html(html);

                        let memohtml = '';
                        if(this.memovender !== null){                       
                            memohtml +=`
                            <div class="row form-group">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <label><b>หมายเหตุ</b></label>
                                    <textarea name="show_memo_vender_2" id="show_memo_vender_2" cols="30" rows="10" class="form-control" style="height:80px;" readonly>`+this.memovender+`</textarea>
                                </div>
                                <div class="col-md-2"></div>
                            </div>
                            `;
                        }
                        $('#show_memo_venderHtml').html(memohtml);


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
                                    </div>
                                    `;
                                }else{
                                    filehtml += `
                                    <div class="col-md-4 col-lg-4 col-6 div-imageShow form-group">
                                            <iframe src="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" height="200" width="100%"></iframe>
                                            <a class="a-imageShow" href="`+proxy.url+`intsys/ebilling/ebilling_backend/`+resultFile[i].bf_filepath+resultFile[i].bf_filename+`" target="_blank" download><b>`+resultFile[i].bf_filename+`</b></a>
                                    </div>
                                    `;
                                }
                            }

                            $('#show_file_vender').html(filehtml);
                        }else{
                            $('#show_file_vender').html('');
                            $('#zone-show-filevender').css('display' , 'none');
                        }

                    }
                });


                
            }

        },
        saveCancelBill()
        {
            let checkdataCheckBox = $('input:checkbox[name="cbe[]"]:checked').length;
            if(checkdataCheckBox == 0){
                Swal.fire({
                    title: 'กรุณาเลือกรายการวางบิลที่ต้องการยกเลิก',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{
                Swal.fire({
                    title: 'ท่านยืนยันที่จะยกเลิกการวางบิล ใช่หรือไม่',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText:'ยกเลิก'
                }).then((result)=> {
                    if(result.value == true){
                        const form = $('#frm-saveCancelBill')[0];
                        const data = new FormData(form);

                        axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveCancelBill' , data , {
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status == "Update Data Success"){
                                // this.getBillDetailEdit();
                                this.$router.push('/billedlist');
                            }
                        });
                    }
                });
                
            }
        },
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
    },
}
</script>

<style scoped>
.dw-print{
    font-size:20px;
}
</style>