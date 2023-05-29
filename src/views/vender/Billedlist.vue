<template>
  <div id="billedlist">
    <div class="modal fade bs-example-modal-lg" id="memoVender_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close upload-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea name="show_memo_vender" id="show_memo_vender" cols="30" rows="10" class="form-control" style="height:80px;"></textarea>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>


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
                                <th class="td1">From No</th>
                                <th class="td2">Taxid</th>
                                <th class="td3">Vender Account</th>
                                <th class="td4">Company</th>
                                <th class="td5">Credit Term</th>
                                <th class="td7">Date Of Bill</th>
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
import FilterData from '@/components/vender/FilterData.vue'
import axios from 'axios';
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
        const proxy = this;
        // this.loadBilledList();
        this.loadFilterOnSessionStorage();

        $(document).on('click' , '#btn-dateSearch-bl' , function(){
            let startDate_filter = $('#startDate-bl').val();
            let endDate_filter = $('#endDate-bl').val();
            let company_filter = $('#filterBy-company-bl').val();
            let status_filter = $('#filterBy-status-bl').val();
            let invoiceid_filter = $('#filterBy-invoiceid-bl').val();
            let periodbilling_filter = $('#filterBy-periodbilling-bl').val();

            let filterBilledlist_vender = {
            "startDate_filter":startDate_filter,
            "endDate_filter":endDate_filter,
            "company_filter":company_filter,
            "status_filter":status_filter,
            "invoice_filter":invoiceid_filter,
            "periodbilling_filter":periodbilling_filter
            };

            //create session storage
            sessionStorage.setItem('filterBilledlist_vender' , JSON.stringify(filterBilledlist_vender));

            let table = $('#tbl_billedlist').DataTable();
            table.state.clear();

            proxy.loadBilledList();
        });

        $(document).on('click' , '#btn-dateClear-bl' , function(){
            let table = $('#tbl_billedlist').DataTable();
			table.state.clear();

            sessionStorage.removeItem("filterBilledlist_vender");
            $('#startDate-bl').val('');
            $('#endDate-bl').val('');
            $('#filterBy-company-bl').val('');
            $('#filterBy-status-bl').val('');
            $('#filterBy-invoiceid-bl').val('');
            $('#filterBy-periodbilling-bl').val('');

            proxy.loadBilledList();

        });

        $(document).on('click' , '.memovender' , function(){
            const data_memovender = $(this).attr("data_memovender");
            console.log(data_memovender);
            $('#show_memo_vender').val(data_memovender).prop('readonly' , true);
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
            const proxy = this;

            let taxid = proxy.userData_vender.taxid;

            let startDate_filter = $('#startDate-bl').val();
            let endDate_filter = $('#endDate-bl').val();
            let company_filter = $('#filterBy-company-bl').val();
            let status_filter = $('#filterBy-status-bl').val();
            let invoice_filter = $('#filterBy-invoiceid-bl').val();
            let periodbilling_filter = $('#filterBy-periodbilling-bl').val();


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

            if(periodbilling_filter == "" || periodbilling_filter == null){
                periodbilling_filter = 0;
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
                          "url":this.url+'intsys/ebilling/ebilling_backend/apivender/loadBilledList/'+taxid+'/'+startDate_filter+'/'+endDate_filter+'/'+company_filter+'/'+status_filter+'/'+invoice_filter+'/'+periodbilling_filter,
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
                  $('#filterBy-company-bl').html(html);
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
                    $('#filterBy-status-bl').html(html);
                    this.getPeriodBilling();
                    
                }
            });
        },
        loadFilterOnSessionStorage(){
            const proxy = this;
            let get_filterBilledlist_vender = sessionStorage.getItem("filterBilledlist_vender");

            if(get_filterBilledlist_vender != null){
            let startDate_filter = JSON.parse(get_filterBilledlist_vender).startDate_filter;
            let endDate_filter = JSON.parse(get_filterBilledlist_vender).endDate_filter;
            let company_filter = JSON.parse(get_filterBilledlist_vender).company_filter;
            let status_filter = JSON.parse(get_filterBilledlist_vender).status_filter;
            let invoice_filter = JSON.parse(get_filterBilledlist_vender).invoice_filter;
            let periodbilling_filter = JSON.parse(get_filterBilledlist_vender).periodbilling_filter;

            $('#startDate-bl').val(startDate_filter);
            $('#endDate-bl').val(endDate_filter);
            $('#filterBy-company-bl').val(company_filter);
            $('#filterBy-status-bl').val(status_filter);

            $('#filterBy-invoiceid-bl').val(invoice_filter);
            $('#filterBy-periodbilling-bl').val(periodbilling_filter);

            
            }
            proxy.loadBilledList();
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
                    $('#filterBy-periodbilling-bl').html(html);
                    this.loadFilterOnSessionStorage();
                    
                }
            });
        }
    },
}
</script>

<style>

</style>