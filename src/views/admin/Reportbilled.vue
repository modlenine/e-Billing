<template>
  <div id="Reportbilledadmin">
    <div class="main-container">
        <div class="pd-ltr-20">
        
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                        <h3 style="text-align:center;">หน้ารายงานการวางบิล</h3>
                        <hr>
                        <FilterDataReport/>
                        <div class="row form-group">
                            <div class="col-md-3">
                                <span><b>จำนวน Invoice : </b></span>
                                <span class="ml-2">{{totalinvoice}}</span>
                                <span class="ml-2"><b>รายการ</b></span>
                            </div>
                            <div class="col-md-3">
                                <span class=""><b>ยอดเงินรวมทั้งสิ้น : </b></span>
                                <span class="ml-2">{{totalamount}}</span>
                                <span class="ml-2"><b>บาท</b></span>
                            </div>
                        </div>
                        <table id="tbl_billedreport_admin" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="td0">Vender name</th>
                                <th class="td1">Period</th>
                                <th class="td1">Vender Account</th>
                                <th class="td2">Company</th>
                                <th class="td3">Invoice</th>
                                <th class="td4">Invoice date</th>
                                <th class="td5">PO</th>
                                <th class="td6">Amount</th>
                                <th class="td7">Credit term</th>
                                <th class="td8">Period of billing</th>
                                <th class="td8">Date Pay</th>
                                <th class="td8">Datetime</th>
                                <th class="td9">Status</th>
                            </tr>
                            </thead>
                        </table>
                        <hr>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import FilterDataReport from '@/components/admin/FilterDatareport.vue'
import axios from 'axios'

export default {
    name:"Reportbilledadmin",
    components:{
        FilterDataReport
    },
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            userData_vender:this.getSessionStorage_vender(),
            totalinvoice:0,
            totalamount:0
        }
    },
    created(){
        this.getcompany();
    },
    mounted() {
        let proxy = this;
        this.loadFilterOnSessionStorage();

        $(document).on('click' , '#btn-dateSearch-rp' , function(){
            let startDate_filter = $('#startDate-rp').val();
            let endDate_filter = $('#endDate-rp').val();
            let company_filter = $('#filterBy-company-rp').val();
            let status_filter = $('#filterBy-status-rp').val();
            let creditterm_filter = $('#filterBy-creditterm-rp').val();
            let datepayreal_filter = $('#filterBy-datepayreal-rp').val();
            let period_filter = $('#filterBy-period-rp').val();

            let filterReport_admin = {
            "startDate_filter":startDate_filter,
            "endDate_filter":endDate_filter,
            "company_filter":company_filter,
            "status_filter":status_filter,
            "creditterm_filter":creditterm_filter,
            "datepayreal_filter":datepayreal_filter,
            "period_filter":period_filter
            };

            //create session storage
            sessionStorage.setItem('filterReport_admin' , JSON.stringify(filterReport_admin));

            let table = $('#tbl_billedreport_admin').DataTable();
            table.state.clear();

            proxy.loadBilledReport();
            proxy.loaddatareportConditionSum(startDate_filter , endDate_filter , company_filter , status_filter , creditterm_filter , datepayreal_filter , period_filter)

            //get Code to btn export
            let startDate_filter_btn = "";
            let endDate_filter_btn = "";
            let company_filter_btn = "";
            let status_filter_btn = "";
            let creditterm_filter_btn = "";
            let datepayreal_filter_btn = "";
            let period_filter_btn = "";

            if(startDate_filter == "" || startDate_filter == null){
                startDate_filter_btn = "0";
            }else{
                startDate_filter_btn = startDate_filter;
            }
            if(endDate_filter == ""){
                endDate_filter_btn = "0";
            }else{
                endDate_filter_btn = endDate_filter;
            }
            if(company_filter == ""){
                company_filter_btn = "0";
            }else{
                company_filter_btn = company_filter;
            }
            if(status_filter == ""){
                status_filter_btn = "0";
            }else{
                status_filter_btn = status_filter.replace(/\s+/g,"-");
            }
            if(creditterm_filter == ""){
                creditterm_filter_btn = "0";
            }else{
                creditterm_filter_btn = creditterm_filter;
            }
            if(datepayreal_filter == ""){
                datepayreal_filter_btn = "0";
            }else{
                datepayreal_filter_btn = datepayreal_filter;
            }
            if(period_filter == ""){
                period_filter_btn = "0";
            }else{
                period_filter_btn = period_filter;
            }
            $('.btn-exportreport').attr({
                'startDate_filter':startDate_filter_btn,
                'endDate_filter':endDate_filter_btn,
                'company_filter':company_filter_btn,
                'status_filter':status_filter_btn,
                'creditterm_filter':creditterm_filter_btn,
                'datepayreal_filter':datepayreal_filter_btn,
                'period_filter':period_filter_btn
            });
        });


        $(document).on('click' , '#btn-dateClear-rp' , function(){
            let table = $('#tbl_billedreport_admin').DataTable();
			table.state.clear();
            $('.col-search-input').val('');

            sessionStorage.removeItem("filterReport_admin");
            $('#startDate-rp').val('');
            $('#endDate-rp').val('');
            $('#filterBy-company-rp').val('');
            $('#filterBy-status-rp').val('');
            $('#filterBy-creditterm-rp').val('');
            $('#filterBy-datepayreal-rp').val('');
            $('#filterBy-period-rp').val('');

            $('.btn-exportreport').attr({
                'startDate_filter':"0",
                'endDate_filter':"0",
                'company_filter':"0",
                'status_filter':"0",
                'creditterm_filter':"0",
                'datepayreal_filter':"0",
                'period_filter':"0"
            });

            proxy.loadBilledReport();
            proxy.loaddatareportConditionSum();

        });


        $(document).on('click' , '.btn-exportreport' ,function(){
            //code
            // $('#btn-exportreport').prop('disabled' , true);
            
            const startDate_filter = $(this).attr('startDate_filter');
            const endDate_filter = $(this).attr('endDate_filter');
            const company_filter = $(this).attr('company_filter');
            const status_filter = $(this).attr('status_filter');
            const creditterm_filter = $(this).attr('creditterm_filter');
            const datepayreal_filter = $(this).attr('datepayreal_filter');
            const period_filter = $(this).attr('period_filter');

            //get Code to btn export
            let startDate_filter_btn = "";
            let endDate_filter_btn = "";
            let company_filter_btn = "";
            let status_filter_btn = "";
            let creditterm_filter_btn = "";
            let datepayreal_filter_btn = "";
            let period_filter_btn = "";


            if(startDate_filter == "" || startDate_filter == null){
                startDate_filter_btn = "0";
            }else{
                startDate_filter_btn = startDate_filter;
            }
            if(endDate_filter == ""){
                endDate_filter_btn = "0";
            }else{
                endDate_filter_btn = endDate_filter;
            }
            if(company_filter == ""){
                company_filter_btn = "0";
            }else{
                company_filter_btn = company_filter;
            }
            if(status_filter == ""){
                status_filter_btn = "0";
            }else{
                status_filter_btn = status_filter.replace(/\s+/g,"-");
            }
            if(creditterm_filter == ""){
                creditterm_filter_btn = "0";
            }else{
                creditterm_filter_btn = creditterm_filter;
            }
            if(datepayreal_filter == ""){
                datepayreal_filter_btn = "0";
            }else{
                datepayreal_filter_btn = datepayreal_filter;
            }
            if(period_filter == ""){
                period_filter_btn = "0";
            }else{
                period_filter_btn = period_filter;
            }

            location.href = proxy.url+'intsys/ebilling/ebilling_backend/exportadmin/exportReportData/'+startDate_filter_btn+'/'+endDate_filter_btn+'/'+company_filter_btn+'/'+status_filter_btn+'/'+creditterm_filter_btn+'/'+datepayreal_filter_btn+'/'+period_filter_btn;
            console.log(proxy.url);
        });
        

    },
    methods: {
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
        loadBilledReport(){

            let startDate_filter = $('#startDate-rp').val();
            let endDate_filter = $('#endDate-rp').val();
            let company_filter = $('#filterBy-company-rp').val();
            let status_filter = $('#filterBy-status-rp').val();
            let creditterm_filter = $('#filterBy-creditterm-rp').val();
            let datepayreal_filter = $('#filterBy-datepayreal-rp').val();
            let period_filter = $('#filterBy-period-rp').val();


            if(startDate_filter == "" || startDate_filter == null){
            startDate_filter = "0";
            }

            if(endDate_filter == "" || endDate_filter == null){
            endDate_filter = "0";
            }

            if(company_filter == "" || company_filter == null){
            company_filter = "0";
            }

       

            if(status_filter == "" || status_filter == null){
                status_filter = "0";
            }else{
                status_filter = status_filter.replace(/\s+/g,"-");
            }

            if(creditterm_filter == "" || creditterm_filter == null){
                creditterm_filter = "0";
            }

            if(datepayreal_filter == "" || datepayreal_filter == null){
                datepayreal_filter = "0";
            }

            if(period_filter == "" || period_filter == null){
                period_filter = "0";
            }


            // console.log(startDate_filter+"/"+endDate_filter+"/"+company_filter+"/"+status_filter);

            let thid = 1;
            $('#tbl_billedreport_admin thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_billedreport_admin'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_billedreport_admin').DataTable().destroy();
            var table = $('#tbl_billedreport_admin').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_billedreport thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadBilledReport/'+startDate_filter+'/'+endDate_filter+'/'+company_filter+'/'+status_filter+'/'+creditterm_filter+'/'+datepayreal_filter+'/'+period_filter,
                          },
                          dom: 'Bfrtip',
                            "buttons": [{
                              extend: 'copyHtml5',
                              title: 'รายงานการ Service'
                            },
                            {
                              extend: 'excelHtml5',
                              autoFilter: true,
                              title: 'รายงานการ Service'
                            }
                            ],
                          order: [
                              [0, 'desc']
                          ],
                          columnDefs: [{
                                  targets: "_all",
                                  orderable: false
                              },
                          ],
                  });

                  table.columns().every(function() {
                      var table = this;
                      $('input', this.header()).on('keyup change', function() {
                          if (table.search() !== this.value) {
                              table.search(this.value).draw();
                          }
                      });
                  });

                    // $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                    //     'background-color':'#F5F5F5',
                    //     'cursor':'no-drop'
                    // });
        },
        getcompany(){
          axios.get(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getcompany').then(res=>{
              console.log(res.data);
              if(res.data.status == "Select Data Success"){
                  let result = res.data.result;
                  let html = `
                      <option value="">กรองด้วยบริษัท</option>
                  `;
                  for(let i = 0; i < result.length; i++){
                      html +=`
                      <option value="`+result[i].c_shotname+`">`+result[i].c_fullname+`</option>
                      `;
                  }
                  $('#filterBy-company-rp').html(html);
                  this.getstatus();
              }
          });
        },
        getstatus(){
            axios.get(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getstatusUpload').then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                        <option value="">กรองด้วยสถานะ</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].s_autoid+`">`+result[i].s_statusname+`</option>
                        `;
                    }
                    $('#filterBy-status-rp').html(html);
                    this.getCreditterm();
                    
                }
            });
        },
        getCreditterm(){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getCreditterm' , {
                action:"getCreditterm"
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                        <option value="">กรองด้วย Creditterm</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].numofday+`">`+result[i].payment+`</option>
                        `;
                    }
                    $('#filterBy-creditterm-rp').html(html);
                    this.getDateOfPayReal();
                }
            });
        },
        getDateOfPayReal(){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDateOfPayReal' , {
                action:"getDateOfPayReal",
                // dateStart:$('#startDate-rp').val(),
                // dateEnd:$('#endDate-rp').val()
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                        <option value="">กรองด้วย วันที่จ่ายเงิน</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].tr_dateofpayreal+`">`+result[i].tr_dateofpayreal+`</option>
                        `;
                    }
                    $('#filterBy-datepayreal-rp').html(html);
                    this.getDataPeriod();
                }
            });
        },
        getDataPeriod(){
            
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getperiod',{
                action:"getDataPeriod",
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let period = "";

                    let outputHtml = `<option value="">กรองด้วยรอบของข้อมูล</option>`;
                    for(let i = 0; i < result.length; i++){
                        period = result[i].dataYear+'-'+result[i].dataMonth;
                        outputHtml += `
                        <option value="`+period+`">`+period+`</option>
                        `;
                    }
                    outputHtml += `</ul>`;
                    $('#filterBy-period-rp').html(outputHtml);


                    this.loadFilterOnSessionStorage();
                }
            });
        },
        loadFilterOnSessionStorage(){
            const proxy = this;
            let get_filterReport_admin = sessionStorage.getItem("filterReport_admin");

            let startDate_filter , endDate_filter , company_filter , status_filter , creditterm_filter , datepayreal_filter , period_filter = "";
            if(get_filterReport_admin != null){
                startDate_filter = JSON.parse(get_filterReport_admin).startDate_filter;
                endDate_filter = JSON.parse(get_filterReport_admin).endDate_filter;
                company_filter = JSON.parse(get_filterReport_admin).company_filter;
                status_filter = JSON.parse(get_filterReport_admin).status_filter;
                creditterm_filter = JSON.parse(get_filterReport_admin).creditterm_filter;
                datepayreal_filter = JSON.parse(get_filterReport_admin).datepayreal_filter;
                period_filter = JSON.parse(get_filterReport_admin).period_filter;

                $('#startDate-rp').val(startDate_filter);
                $('#endDate-rp').val(endDate_filter);
                $('#filterBy-company-rp').val(company_filter);
                $('#filterBy-status-rp').val(status_filter);
                $('#filterBy-creditterm-rp').val(creditterm_filter);
                $('#filterBy-datepayreal-rp').val(datepayreal_filter);
                $('#filterBy-period-rp').val(period_filter);


                //get Code to btn export
                let startDate_filter_btn = "";
                let endDate_filter_btn = "";
                let company_filter_btn = "";
                let status_filter_btn = "";
                let creditterm_filter_btn = "";
                let datepayreal_filter_btn = "";
                let period_filter_btn = "";

                if(startDate_filter == ""){
                    startDate_filter_btn = "0";
                }else{
                    startDate_filter_btn = startDate_filter;
                }
                if(endDate_filter == ""){
                    endDate_filter_btn = "0";
                }else{
                    endDate_filter_btn = endDate_filter;
                }
                if(company_filter == ""){
                    company_filter_btn = "0";
                }else{
                    company_filter_btn = company_filter;
                }
                if(status_filter == ""){
                    status_filter_btn = "0";
                }else{
                    status_filter_btn = status_filter;
                }
                if(creditterm_filter == ""){
                    creditterm_filter_btn = "0";
                }else{
                    creditterm_filter_btn = creditterm_filter;
                }
                if(datepayreal_filter == ""){
                    datepayreal_filter_btn = "0";
                }else{
                    datepayreal_filter_btn = datepayreal_filter;
                }
                if(period_filter == ""){
                    period_filter_btn = "0";
                }else{
                    period_filter_btn = period_filter;
                }
                $('.btn-exportreport').attr({
                    'startDate_filter':startDate_filter_btn,
                    'endDate_filter':endDate_filter_btn,
                    'company_filter':company_filter_btn,
                    'status_filter':status_filter_btn,
                    'creditterm_filter':creditterm_filter_btn,
                    'datepayreal_filter':datepayreal_filter_btn,
                    'period_filter':period_filter_btn
                });

            }
            proxy.loadBilledReport();
            proxy.loaddatareportConditionSum(startDate_filter , endDate_filter , company_filter , status_filter , creditterm_filter , datepayreal_filter , period_filter)
        },

        loaddatareportConditionSum(startDate_filter , endDate_filter , company_filter , status_filter , creditterm_filter , datepayreal_filter , period_filter)
        {
            if(startDate_filter == "" || startDate_filter == null){
            startDate_filter = "0";
            }

            if(endDate_filter == "" || endDate_filter == null){
            endDate_filter = "0";
            }

            if(company_filter == "" || company_filter == null){
            company_filter = "0";
            }

       

            if(status_filter == "" || status_filter == null){
                status_filter = "0";
            }else{
                status_filter = status_filter.replace(/\s+/g,"-");
            }

            if(creditterm_filter == "" || creditterm_filter == null){
                creditterm_filter = "0";
            }

            if(datepayreal_filter == "" || datepayreal_filter == null){
                datepayreal_filter = "0";
            }

            if(period_filter == "" || period_filter == null){
                period_filter = "0";
            }

            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/loaddatareportConditionSum' , {
                action:"loaddatareportConditionSum",
                startDate_filter:startDate_filter,
                endDate_filter:endDate_filter,
                company_filter:company_filter,
                status_filter:status_filter,
                creditterm_filter:creditterm_filter,
                datepayreal_filter:datepayreal_filter,
                period_filter:period_filter
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    this.totalinvoice = this.numberWithCommas(result.invoice);
                    this.totalamount = this.numberWithCommas(result.totalamount);
                }
            });
        }
    },
}
</script>

<style scoped>
  /* Control upload page */
  #tbl_billedreport_admin{
    width:100% !important;
  }

  .td0{
    width:50px;
  }
  .td1{
    width:80px;
  }

  @media (min-width:1440px){
    #tbl_billedreport_admin{
      width:1800px !important;
    }
  }

  @media (min-width:1024px) and (max-width:1439px){
    #tbl_billedreport_admin{
      width:1800px !important;
    }
  }

  @media (min-width:768px) and (max-width:1023px){
    #tbl_billedreport_admin{
      width:1800px !important;
    }
  }

  @media (min-width:320px) and (max-width:767px) {

  }
</style>