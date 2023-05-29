<template>
  <div id="Reportbilledsumadmin">
    <div class="main-container">
        <div class="pd-ltr-20">
        
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                        <h3 style="text-align:center;">หน้ารายงานการวางบิลตามรอบ</h3>
                        <hr>
                        <FilterDataReportsum/>
                        <table id="tbl_billedreportsum_admin" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="sum-td0">Period</th>
                                <th class="sum-td1">Total Bill</th>
                                <th class="sum-td2">Total Billing</th>
                                <th class="sum-td3">Total Billed</th>
                                <!-- <th class="sum-td1">Bill Amount</th> -->
                                <th class="sum-td2">Exclude VAT</th>
                                <th class="sum-td3">VAT</th>
                                <th class="sum-td4">Include VAT</th>
                                <th class="sum-td5">Billing amount</th>
                                <th class="sum-td6">Billed amount</th>
                                <th class="sum-td7">Total vender</th>
                                <th class="sum-td8">Vender billing</th>
                                <th class="sum-td9">Vender billed</th>
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
import FilterDataReportsum from '@/components/admin/FilterDatareportsum.vue'
import axios from 'axios'

export default {
    name:"Reportbilledsumadmin",
    components:{
        FilterDataReportsum
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

        $(document).on('click' , '#btn-dateSearch-rps' , function(){

            let company_filter = $('#filterBy-company-rps').val();

            let filterReportsum_admin = {
                "company_filter":company_filter,
            };

            //create session storage
            sessionStorage.setItem('filterReportsum_admin' , JSON.stringify(filterReportsum_admin));

            let table = $('#tbl_billedreportsum_admin').DataTable();
            table.state.clear();

            proxy.loadBilledReport();
            console.log(company_filter);
        });


        $(document).on('click' , '#btn-dateClear-rps' , function(){
            let table = $('#tbl_billedreportsum_admin').DataTable();
			table.state.clear();
            $('.col-search-input').val('');

            sessionStorage.removeItem("filterReportsum_admin");
            $('#filterBy-company-rps').val('');

            proxy.loadBilledReport();

        });

    },
    methods: {
        getSessionStorage_vender(){
            const getUserData = localStorage.getItem("userData_vender");
            return JSON.parse(getUserData);
        },
        loadBilledReport(){

            let company_filter = $('#filterBy-company-rps').val();

            if(company_filter == "" || company_filter == null){
            company_filter = "0";
            }

            let thid = 1;
            $('#tbl_billedreportsum_admin thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_billedreportsum_admin'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_billedreportsum_admin').DataTable().destroy();
            var table = $('#tbl_billedreportsum_admin').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_billedreportsum_admin thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadBilledReportsum/'+company_filter,
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
                      <option value="">ทุกบริษัท</option>
                  `;
                  for(let i = 0; i < result.length; i++){
                      html +=`
                      <option value="`+result[i].c_shotname+`">`+result[i].c_fullname+`</option>
                      `;
                  }
                  $('#filterBy-company-rps').html(html);
                  this.loadFilterOnSessionStorage();
              }
          });
        },

        loadFilterOnSessionStorage(){
            const proxy = this;
            let get_filterReportsum_admin = sessionStorage.getItem("filterReportsum_admin");

            if(get_filterReportsum_admin != null){

                let company_filter = JSON.parse(get_filterReportsum_admin).company_filter;
                $('#filterBy-company-rps').val(company_filter);

            }
            proxy.loadBilledReport();
        },
    },
}
</script>

<style scoped>

</style>