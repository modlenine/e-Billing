<template>
  <div id="reportbilled">
    <div class="main-container">
        <div class="pd-ltr-20">
        
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                        <h3 style="text-align:center;">หน้ารายงานการวางบิล</h3>
                        <hr>
                        <FilterDataReport/>
                        <table id="tbl_billedreport" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="td_formno">Fromno</th>
                                <th class="td_venacc">Vender Account</th>
                                <th class="td_compa">Company</th>
                                <th class="td_inv">Invoice</th>
                                <th class="td2">Invoice date</th>
                                <th class="td7">PO</th>
                                <th class="td7">Amount</th>
                                <th class="td_cred">Credit term</th>
                                <th class="td7">Datetime</th>
                                <th class="td7">Status</th>
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
import FilterDataReport from '@/components/vender/FilterDatareport.vue'
import axios from 'axios'

export default {
    name:"Reportbilled",
    components:{
        FilterDataReport
    },
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
            userData_vender:this.getSessionStorage_vender(),
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
            let periodbilling_filter = $('#filterBy-periodbilling-rp').val();

            let filterReport_vender = {
            "startDate_filter":startDate_filter,
            "endDate_filter":endDate_filter,
            "company_filter":company_filter,
            "status_filter":status_filter,
            "periodbilling_filter":periodbilling_filter
            };

            //create session storage
            sessionStorage.setItem('filterReport_vender' , JSON.stringify(filterReport_vender));

            let table = $('#tbl_billedreport').DataTable();
            table.state.clear();

            proxy.loadBilledReport();
        });


        $(document).on('click' , '#btn-dateClear-rp' , function(){
            let table = $('#tbl_billedreport').DataTable();
			table.state.clear();
            $('.col-search-input').val('');

            sessionStorage.removeItem("filterReport_vender");
            $('#startDate-rp').val('');
            $('#endDate-rp').val('');
            $('#filterBy-company-rp').val('');
            $('#filterBy-status-rp').val('');
            $('#filterBy-invoiceid-rp').val('');
            $('#filterBy-periodbilling-rp').val('');

            proxy.loadBilledReport();

        });

    },
    methods: {
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
        loadBilledReport(){


            const proxy = this;

            let taxid = proxy.userData_vender.taxid;

            let startDate_filter = $('#startDate-rp').val();
            let endDate_filter = $('#endDate-rp').val();
            let company_filter = $('#filterBy-company-rp').val();
            let status_filter = $('#filterBy-status-rp').val();
            let periodbilling_filter = $('#filterBy-periodbilling-rp').val();


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

            if(periodbilling_filter == "" || periodbilling_filter == null){
                periodbilling_filter = 0;
            }


            // console.log(startDate_filter+"/"+endDate_filter+"/"+company_filter+"/"+status_filter);

            let thid = 1;
            $('#tbl_billedreport thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_billedreport'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_billedreport').DataTable().destroy();
            var table = $('#tbl_billedreport').DataTable({
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
                          "url":this.url+'intsys/ebilling/ebilling_backend/apivender/loadBilledReport/'+taxid+'/'+startDate_filter+'/'+endDate_filter+'/'+company_filter+'/'+status_filter+'/'+periodbilling_filter,
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
                    $('#filterBy-status-rp').html(html);
                    this.getPeriodBilling();
                    
                }
            });
        },
        loadFilterOnSessionStorage(){
            const proxy = this;
            let get_filterReport_vender = sessionStorage.getItem("filterReport_vender");

            if(get_filterReport_vender != null){
                let startDate_filter = JSON.parse(get_filterReport_vender).startDate_filter;
                let endDate_filter = JSON.parse(get_filterReport_vender).endDate_filter;
                let company_filter = JSON.parse(get_filterReport_vender).company_filter;
                let status_filter = JSON.parse(get_filterReport_vender).status_filter;
                let periodbilling_filter = JSON.parse(get_filterReport_vender).periodbilling_filter;

                $('#startDate-rp').val(startDate_filter);
                $('#endDate-rp').val(endDate_filter);
                $('#filterBy-company-rp').val(company_filter);
                $('#filterBy-status-rp').val(status_filter);
                $('#filterBy-periodbilling-rp').val(periodbilling_filter);

            }
            proxy.loadBilledReport();
        },
        getPeriodBilling(){
            const proxy = this;
            let taxid = proxy.userData_vender.taxid;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apivender/getPeriodBilling' , {
                action:"getPeriodBilling",
                taxid:taxid
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                        <option value="">กรองด้วยรอบการวางบิล</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].ma_periodbilling+`">`+result[i].ma_periodbilling+`</option>
                        `;
                    }
                    $('#filterBy-periodbilling-rp').html(html);
                    this.loadFilterOnSessionStorage();
                    
                }
            });
        }
    },
}
</script>

<style>

</style>