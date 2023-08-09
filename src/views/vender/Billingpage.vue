<template>
  <div id="billingpage">
    <div v-if="openBillPageStatus == true" class="main-container">
        <div class="pd-ltr-20">
        
            <div class="row">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                <div class="mt-5"></div>
                    <h3 style="text-align:center;">หน้าสำหรับวางบิล</h3>
                    <hr>
                    <div class="row form-group" id="showBillData"></div>
                    <div id="divShowNoData" class="row form-group" style="display:none;">
                    <div class="col-md-12">
                        <h5 id="showNodata" class="text-center"></h5>
                    </div>
                    </div>
                    <hr>
                </div>
            </div>
            </div>



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
import $ from 'jquery';
import axios from 'axios'

export default {
    name:"Billingpage",
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            userData_vender:this.getSessionStorage_vender(),
            venderdata : [],
            openBillPageStatus:true
        }
    },
    created() {
        this.checkDateOpenAndClose();
    },
    mounted() {
        const proxy = this;
        $(document).on('click' , '.selectVender' , function(){
            const data_venderaccount = $(this).attr('data_venderaccount');
            const data_areaid = $(this).attr('data_areaid');
            const data_payment = $(this).attr('data_payment');

            console.log(data_venderaccount);
            console.log(data_areaid);
            console.log(data_payment);
            this.venderdata = {
                'data_venderaccount':data_venderaccount,
                'data_areaid':data_areaid,
                'data_payment':data_payment
            }

            console.log(this.venderdata);
            proxy.gotoSelectBillingpage(this.venderdata);
        });
    },
    methods: {
        loadDataBilling(taxid){
            const proxy = this;
            if(taxid != ""){
                axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apivender/loadDataBilling' , {
                    taxid:taxid,
                    action:"loadDataBilling"
                }).then(res=>{
                    console.log(res.data);
                    let html = 	``;
                    if(res.data.status == "Select Data Success"){
                        let cliData = res.data.venderClient;
                        let VenderAccount = res.data.venderAccount;
                        let countBill = res.data.countBill;
                        

                        if(cliData.length !== 0){
                            for(let i = 0; i < cliData.length; i++){
                                // let companyname = '';
                                let logo = '';
                                if(cliData[i].dataareaid === "ca"){
                                    // companyname = 'Composite';
                                    logo = proxy.baseurl+'assets/vendors/images/caBanner.png';
                                }else if(cliData[i].dataareaid === "sln"){
                                    // companyname = 'Salee Colour';
                                    logo = proxy.baseurl+'assets/vendors/images/slnBanner.png';
                                }else if(cliData[i].dataareaid === "tbb"){
                                    // companyname = 'The bubbles';
                                    logo = proxy.baseurl+'assets/vendors/images/tbBanner.png';
                                }else if(cliData[i].dataareaid === "st"){
                                    // companyname = 'Subtera';
                                    logo = proxy.baseurl+'assets/vendors/images/stBanner.png';
                                }


                                html += `
                                <div class="col-md-3">
                                    <div class="card card-box">
                                        <img class="card-img-top" src="`+logo+`" alt="Card image cap">
                                        <ul class="list-group list-group-flush">`;
                                            
                                            for(let ii = 0; ii < VenderAccount.length ; ii++){ 
                                                if(cliData[i].dataareaid == VenderAccount[ii].dataareaid){
                                                    let countBilldata = 0;
                                                    if(countBill[ii].invoiceaccount == VenderAccount[ii].invoiceaccount){
                                                        countBilldata = countBill[ii].countBill;
                                                    }
                                                    let venderac = VenderAccount[ii].invoiceaccount;
                                                    html +=`
                                                    <a href="javascript:void(0)" class="list-group-item list-group-item-action selectVender"
                                                        data_venderaccount ="`+venderac+`"
                                                        data_areaid ="`+VenderAccount[ii].dataareaid+`"
                                                        data_payment ="`+VenderAccount[ii].payment+`"
                                                    >
                                                        <span><b>`+VenderAccount[ii].invoiceaccount+`</b></span><br>
                                                        <span><b>Term : </b>`+VenderAccount[ii].payment+`</span><br>
                                                        <span><b>รอวางบิล : </b><span class="badge badge-info badge-pill">`+countBilldata+`</span> <b>รายการ</b></span>
                                                    </a>
                                                    `;
                                                }
                                            }
                                        html +=`
                                        </ul>
                                    </div>
                                </div>
                                `;
                            }
                        }else{
                            $('#divShowNoData').css('display','');
                            $('#showNodata').html(`ไม่พบข้อมูลการวางบิล`);
                        }

                        $('#showBillData').html(html);
                    }
                });
            }
        },
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
        gotoSelectBillingpage(venderdata){
            if(venderdata){
                this.$router.push({path:'/selectbilling/'+venderdata.data_venderaccount+'/'+venderdata.data_areaid+'/'+venderdata.data_payment})
                .catch(err =>{
                    if(err.name !== 'NavigationDuplicated'){
                        throw err
                    }
                })
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
                            let taxid = this.userData_vender.taxid;
                            this.loadDataBilling(taxid);
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