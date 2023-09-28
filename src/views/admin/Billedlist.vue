<template>
  <div id="billedlist">
    <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าตรวจสอบใบวางบิล</h3>
                      <hr>
                      <FilterData/>
                        <table id="tbl_billedlist" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="td1">Fromno</th>
                                <th class="td2">Tax ID</th>
                                <th class="td3">Vender ID</th>
                                <th class="td4">Company</th>
                                <th class="td5">Credit term</th>
                                <th class="td7">Date Pay</th>
                                <th class="td7">Date of bill</th>
                                <th class="td7">Status</th>
                            </tr>
                            </thead>
                        </table>
                  </div>
                </div>
              </div>



          </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import FilterData from '@/components/admin/FilterDataValidateBilled.vue'
import axios from 'axios'
export default {
    name:'Billedlist',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            userData_vender:this.getSessionStorage_vender(),
        }
    },
    components:{
        FilterData
    },
    mounted() {
        let proxy = this;
        // this.loadBilledList();
        this.loadFilterOnSessionStorage();

        $(document).on('click' , '#btn-dateSearch-adbl' , function(){
            let startDate_filter = $('#startDate-adbl').val();
            let endDate_filter = $('#endDate-adbl').val();
            let company_filter = $('#filterBy-company-adbl').val();
            let status_filter = $('#filterBy-status-adbl').val();
            let invoiceid_filter = $('#filterBy-invoiceid-adbl').val();
            let datepayreal_filter = $('#filterBy-datepayreal-adbl').val();

            let filterValidateBill_admin = {
            "startDate_filter":startDate_filter,
            "endDate_filter":endDate_filter,
            "company_filter":company_filter,
            "status_filter":status_filter,
            "invoice_filter":invoiceid_filter,
            "datepayreal_filter":datepayreal_filter
            };

            //create session storage
            sessionStorage.setItem('filterValidateBill_admin' , JSON.stringify(filterValidateBill_admin));

            let table = $('#tbl_billedlist').DataTable();
            table.state.clear();

            proxy.loadBilledList();
        });


        $(document).on('click' , '#btn-dateClear-adbl' , function(){
            let table = $('#tbl_billedlist').DataTable();
			table.state.clear();
            $('.col-search-input').val('');

            sessionStorage.removeItem("filterValidateBill_admin");
            $('#startDate-adbl').val('');
            $('#endDate-adbl').val('');
            $('#filterBy-company-adbl').val('');
            $('#filterBy-status-adbl').val('');
            $('#filterBy-invoiceid-adbl').val('');
            $('#filterBy-datepayreal-adbl').val('');

            proxy.loadBilledList();

        });
    },
    created() {
        this.getcompany();
    },
    methods: {
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
        loadBilledList(){

            let startDate_filter = $('#startDate-adbl').val();
            let endDate_filter = $('#endDate-adbl').val();
            let company_filter = $('#filterBy-company-adbl').val();
            let status_filter = $('#filterBy-status-adbl').val();
            let invoice_filter = $('#filterBy-invoiceid-adbl').val();
            let datepayreal_filter = $('#filterBy-datepayreal-adbl').val();


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

            if(invoice_filter == "" || invoice_filter == null){
                invoice_filter = 0;
            }

            if(datepayreal_filter == "" || datepayreal_filter == null){
                datepayreal_filter = 0;
            }

            // console.log(startDate_filter+"/"+endDate_filter+"/"+company_filter+"/"+status_filter);

            let thid = 1;
            $('#tbl_billedlist thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_billedlist'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_billedlist').DataTable().destroy();
            var table = $('#tbl_billedlist').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_billedlist thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadBilledList/'+startDate_filter+'/'+endDate_filter+'/'+company_filter+'/'+status_filter+'/'+invoice_filter+'/'+datepayreal_filter,
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

                $('#tbl_billedlist6').prop('readonly' , true).css({
                    'background-color':'#F5F5F5',
                    'cursor':'no-drop'
                });
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
                  $('#filterBy-company-adbl').html(html);
                  this.getstatus();
              }
          });
        },
        getstatus(){
            axios.get(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getstatus').then(res=>{
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
                    $('#filterBy-status-adbl').html(html);
                    this.getDateOfPayReal();
                    
                }
            });
        },
        getDateOfPayReal(){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDateOfPayRealM' , {
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
                        <option value="`+result[i].ma_dateofpayreal+`">`+result[i].ma_dateofpayreal+`</option>
                        `;
                    }
                    $('#filterBy-datepayreal-adbl').html(html);
                    this.loadFilterOnSessionStorage();
                }
            });
        },
        loadFilterOnSessionStorage(){
            const proxy = this;
            let get_filterValidateBill_admin = sessionStorage.getItem("filterValidateBill_admin");

            if(get_filterValidateBill_admin != null){
                let startDate_filter = JSON.parse(get_filterValidateBill_admin).startDate_filter;
                let endDate_filter = JSON.parse(get_filterValidateBill_admin).endDate_filter;
                let company_filter = JSON.parse(get_filterValidateBill_admin).company_filter;
                let status_filter = JSON.parse(get_filterValidateBill_admin).status_filter;
                let invoice_filter = JSON.parse(get_filterValidateBill_admin).invoice_filter;
                let datepayreal_filter = JSON.parse(get_filterValidateBill_admin).datepayreal_filter;

                $('#startDate-adbl').val(startDate_filter);
                $('#endDate-adbl').val(endDate_filter);
                $('#filterBy-company-adbl').val(company_filter);
                $('#filterBy-status-adbl').val(status_filter);
                $('#filterBy-invoiceid-adbl').val(invoice_filter);
                $('#filterBy-datepayreal-adbl').val(datepayreal_filter);

            }
            proxy.loadBilledList();
        },
    },
}
</script>

<style>

</style>