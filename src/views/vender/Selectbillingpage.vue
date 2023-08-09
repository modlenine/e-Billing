<template>
  <div id="selectbillingpage">
    <div v-if="openBillPageStatus == true" class="main-container">
          <div class="pd-ltr-20">
          
            <form id="frm-saveSelectBill" @submit.prevent="saveSelectBill">
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าเลือกรายการวางบิล</h3>
                      <hr>
                      <div>
                        <h4 class="mb-2">บริษัท {{venderInformation.slc_fname}}</h4>
                        <!-- <span>ที่อยู่ {{venderInformation.address}}</span> -->
                      </div>
                      <div class="mt-3">
                        <!-- <span><b>เครดิตเทอม : </b>{{this.payment}} <b>วัน</b></span>
                        <span class="ml-3"><b>เงื่อนไขการจ่ายเงิน + : </b>{{this.dayfix}} <b>วัน</b></span>
                        <span class="ml-3"><b>วันที่วางบิล : </b>{{this.datenow}} </span>
                        <span class="ml-3"><b>วันที่คำนวณ : </b>{{this.datecalc}} </span><br>
                        <span><b>วันที่จ่าย : </b>{{this.datepay}} </span> -->
                        <span class=""><b>วันที่รับเงิน : </b>{{this.datepayReal}} </span>
                      </div>
                      <hr>
                      <div id="show_billDetail"></div>
                        <input hidden type="text" name="se-taxid" id="se-taxid" :value="venderInformation.bpc_whtid">
                        <input hidden type="text" name="se-venderaccount" id="se-venderaccount" :value="venderInformation.accountnum">
                        <input hidden type="text" name="se-dataareaid" id="se-dataareaid" :value="venderInformation.dataareaid">
                        <input hidden type="text" name="se-payment" id="se-payment" :value="this.payment">

                        <input hidden type="text" name="se-numofday" id="se-numofday" :value="this.numofday">
                        <input hidden type="text" name="se-dayfix" id="se-dayfix" :value="this.dayfix">
                        <input hidden type="text" name="se-dateofbilling" id="se-dateofbilling" :value="this.datenow">
                        <input hidden type="text" name="se-dateofpay" id="se-dateofpay" :value="this.datepay">
                        <input hidden type="text" name="se-dateofcalc" id="se-dateofcalc" :value="this.datecalc">
                        <input hidden type="text" name="se-datepayreal" id="se-datepayreal" :value="this.datepayReal">
                        <input hidden type="text" name="se-period" id="se-period" :value="this.period">

                      <div class="row form-group text-center">
                        <div class="col-md-12">
                            <!-- <button type="button" id="btn-cancel-selectBill" name="btn-cancel-selectBill" class="btn btn-danger">ยกเลิก</button> -->
                            <button type="submit" id="btn-confirm-seletBill" name="btn-confirm-seletBill" class="btn btn-primary ml-2"><i class="dw dw-diskette1 mr-2"></i>ยืนยันการวางบิล</button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
    </div>

    <div v-else class="main-container">
        <div class="pd-ltr-20">
        
            <div class="row">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                    <h3 style="text-align:center;">ยังไม่เปิดให้วางบิล</h3>
                    <hr>
                </div>
            </div>
            </div>

        </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Swal from 'sweetalert2'
import moment from 'moment'

export default {
    name:"Selectbillingpage",
    props:[
        'venderaccount',
        'dataareaid',
        'payment'
    ],
    data() {
        return {
            url:this.getUrl(),
            venderInformation : [],
            datenow:'',
            datepay:'',
            datepayReal:'',
            dayfix:0,
            datecalc:'',
            numofday:0,
            period:'',
			baseurl:this.baseUrl(),
            openBillPageStatus:true
        }
    },
    mounted() {
        $(document).on('click' , '.cbmain_select' , function(){
            console.log($('.cbmain_select').prop('checked'));
            if($('.cbmain_select').prop('checked') == true){
                $('.cb_select').prop('checked' , true)
            }else{
                $('.cb_select').prop('checked' , false)
            }
        });
    },
    created() {
        this.checkDateOpenAndClose();
    },
    methods: {
        getVenderInformationByaccount(){
            if(this.venderaccount != "" && this.dataareaid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/getVenderInformationByaccount',{
                    action : 'getVenderInformationByaccount',
                    venderaccount:this.venderaccount,
                    dataareaid:this.dataareaid,
                    payment:this.payment
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        this.venderInformation = res.data.result;
                        this.datenow = res.data.datenow;
                        this.datepay = res.data.datepay;
                        this.dayfix = res.data.dayFix;
                        this.datecalc = res.data.datecalc;
                        this.numofday = res.data.numofday;
                        this.datepayReal = res.data.datepayReal;

                        this.getBillDetail();
                    }
                })
            }
        },
        getBillDetail(){
            const proxy = this;

            if(proxy.venderaccount != "" && proxy.dataareaid != "" && proxy.payment){

                axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apivender/getBillDetail' ,{
                    action : 'getBillDetail',
                    venderaccount : proxy.venderaccount ,
                    dataareaid : proxy.dataareaid ,
                    payment : proxy.payment
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let result = res.data.result;
                        this.period = res.data.period;
                        let html = '';
                        html +=`
                            <table id="dataBillDetail" class="table table-striped table-bordered" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="td1">
                                            <input type="checkbox" class="cbmain_select" id="cbmain" name="cbmain">
                                        </th>
                                        <th class="td2">Invoice</th>
                                        <th class="td9">Invoice Date</th>
                                        <th class="td3">PO</th>
                                        <th class="td4">Voucher</th>
                                        <th class="td5">Exclude VAT</th>
                                        <th class="td6">VAT</th>
                                        <th class="td7">Include VAT</th>
                                    </tr>
                                </thead>
                            `;

                        if(result.length !== 0){
                            for(let i = 0; i < result.length; i++){
                                let oecheck = "";
                                let onclickfalse = "";
                                if(result[i].voucher == "OE"){
                                    oecheck = "checked";
                                    onclickfalse = 'onclick="return false"';
                                }else{
                                    oecheck = "";
                                    onclickfalse = "";
                                }
                                html +=`
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="cb_select" id="cb_`+result[i].autoid+`" name="cb[]" value="`+result[i].autoid+`" `+oecheck+` `+onclickfalse+`></td>
                                        <td>`+result[i].invoiceid+`</td>
                                        <td>`+moment(result[i].invoicedate).format('DD/MM/Y')+`</td>
                                        <td>`+result[i].purchid+`</td>
                                        <td>`+result[i].ledgervoucher+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].salesbalance)+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].sumtax)+`</td>
                                        <td>`+proxy.numberWithCommas(result[i].invoiceamount)+`</td>
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

                        $('#show_billDetail').html(html);
                    }
                });


                
            }

        },
        saveSelectBill()
        {
            let checkdataCheckBox = $('input:checkbox[name="cb[]"]:checked').length;
            if(checkdataCheckBox == 0){
                Swal.fire({
                    title: 'กรุณาเลือกรายการวางบิล',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{
                Swal.fire({
                    title: 'ท่านยืนยันที่จะทำการวางบิล ใช่หรือไม่',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText:'ยกเลิก'
                }).then((result)=> {
                    if(result.value == true){
                        const form = $('#frm-saveSelectBill')[0];
                        const data = new FormData(form);

                        axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/saveSelectBill' , data , {
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status == "Insert Data Success"){
                                this.getBillDetail();
                                this.$router.push('/billing');
                                // location.href = this.url+'intsys/ebilling/ebilling_backend/apivender/printBillReport/'+res.data.formno+'/'+this.venderInformation.accountnum+'/'+this.venderInformation.dataareaid;

                                window.open(this.url+'intsys/ebilling/ebilling_backend/apivender/printBillReport/'+res.data.formno+'/'+this.venderInformation.accountnum+'/'+this.venderInformation.dataareaid , '_blank');
                            }
                        });
                    }
                });
                
            }
        },
        checkDateOpenAndClose()
        {
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/checkDateOpenAndClose',{
                action:'checkDateOpenAndClose'
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let dateNowSec = res.data.dateNowSec;
                    let dateOpenSec = res.data.dateOpenSec;
                    let dataCloseSec = res.data.dateCloseSec;

                    if(dateNowSec >= dateOpenSec && dateNowSec <= dataCloseSec){
                        this.openBillPageStatus = true;
                            this.getVenderInformationByaccount();
                    }else{
                        this.openBillPageStatus = false;
                    }
                }
            });
        }
    },
}
</script>

<style>

</style>