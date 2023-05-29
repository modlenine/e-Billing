<template>
  <div id="uploadpage">

    <div class="modal fade bs-example-modal-lg" id="upload_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าอัพโหลดข้อมูล</h4>
                    <button type="button" class="close upload-closeClick" @click="uploadCloseClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                  <form id="frm-uploadData" autocomplete="off" @submit.prevent="uploadData">
                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>
                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกไฟล์ : </b></label>
                              <input type="file" name="ipf-uploadData" id="ipf-uploadData" class="form-control">
                            </div>
                            <div class="col-md-2"></div>
                          </div>

                        <section class="blockDataPeriod">
                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกเดือนของข้อมูล : </b></label>
                              <select name="ip-uploadDataMonth" id="ip-uploadDataMonth" class="form-control"></select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>


                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกปีของข้อมูล : </b></label>
                              <select name="ip-uploadDataYear" id="ip-uploadDataYear" class="form-control"></select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>
                        </section>

                        <section class="blockDataPeriod mt-3">
                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกรอบเดือนของการวางบิล : </b></label>
                              <select name="ip-uploadBillDataMonth" id="ip-uploadBillDataMonth" class="form-control" readonly>
                                <option value="">กรุณาเลือกรอบเดือนของการวางบิล</option>
                              </select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>


                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกรอบปีของการวางบิล : </b></label>
                              <select name="ip-uploadBillDataYear" id="ip-uploadBillDataYear" class="form-control" readonly>
                                <option value="">กรุณาเลือกรอบปีของการวางบิล</option>
                              </select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>
                        </section>

                        <div class="row form-group mt-2">
                          <div class="col-md-12">
                            <span class="text1">** ตัวอย่างเช่น ข้อมูลของเดือน 4 จะสามารถวางบิลได้ตั้งแต่เดือน 5 เป็นต้นไป **</span>
                          </div>
                        </div>

                          <div class="row form-group mt-3">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <button type="submit" id="btn-upload" name="btn-upload" class="btn btn-primary btn-block"><i class="mr-2 dw dw-upload1"></i>อัพโหลด</button>
                            </div>
                            <div class="col-md-2"></div>
                          </div>


                          <input type="text" hidden name="ip-userupload" id="ip-userupload" :value="this.userData.Fname+` `+this.userData.Lname">
                          <input type="text" hidden name="ip-ecodeupload" id="ip-ecodeupload" :value="this.userData.ecode">
      
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
               
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="deleteInvoice_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าลบข้อมูล Invoice</h4>
                    <button type="button" class="close invoiceMd-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
         
                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>
                        <div class="row form-group">
                          <div class="col-md-6 form-group">
                            <label for=""><b>Tax ID</b></label>
                            <input type="text" name="delInv-taxid" id="delInv-taxid" class="form-control" readonly>
                          </div>
                          <div class="col-md-6 form-group">
                            <label for=""><b>Vender ID</b></label>
                            <input type="text" name="delInv-venderid" id="delInv-venderid" class="form-control" readonly>
                          </div>
                          <div class="col-md-6 form-group">
                            <label for=""><b>PO</b></label>
                            <input type="text" name="delInv-po" id="delInv-po" class="form-control" readonly>
                          </div>
                          <div class="col-md-6 form-group">
                            <label for=""><b>Invoice</b></label>
                            <input type="text" name="delInv-invoice" id="delInv-invoice" class="form-control" readonly>
                          </div>
                          <div class="col-md-6 form-group">
                            <label for=""><b>Invoice Date</b></label>
                            <input type="text" name="delInv-invoicedate" id="delInv-invoicedate" class="form-control" readonly>
                          </div>
                          <div class="col-md-6 form-group">
                            <label for=""><b>Include VAT</b></label>
                            <input type="text" name="delInv-includevat" id="delInv-includevat" class="form-control" readonly>
                          </div>
                          <input hidden type="text" name="delInv-autoid" id="delInv-autoid">
                          <div class="col-md-12">
                            <button type="button" id="btn-delInv" name="btn_delInv" class="btn btn-danger btn-delInv"><i class="dw dw-delete-3 mr-2"></i>ลบ Invoice</button>
                          </div>
                        </div>
      
                      </div>
                    </div>
                  </div>
    
                </div>
               
            </div>
        </div>
    </div>

    
    <div class="modal fade bs-example-modal-lg" id="deletedata_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าลบข้อมูลการอัพโหลด</h4>
                    <button type="button" class="close closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                  <form id="frm-deleteData" autocomplete="off" @submit.prevent="deleteData" class="needs-validation" novalidate>
                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>

                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกเดือนของข้อมูล : </b></label>
                              <select name="ip-deleteDataMonth" id="ip-deleteDataMonth" class="form-control" required></select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>

                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <label for=""><b>กรุณาเลือกปีของข้อมูล : </b></label>
                              <select name="ip-deleteDataYear" id="ip-deleteDataYear" class="form-control" required>
                                <option value="">กรุณาเลือกปีของข้อมูล</option>
                              </select>
                            </div>
                            <div class="col-md-2"></div>
                          </div>

                          <div class="row form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                              <button type="submit" id="btn-deleteDataUpload" name="btn-deleteDataUpload" class="btn btn-danger btn-block"><i class="mr-2 dw dw-trash1"></i>ลบข้อมูลการอัพโหลด</button>
                            </div>
                            <div class="col-md-2"></div>
                          </div>

                          <input type="text" hidden name="ip-userupload" id="ip-userupload" :value="this.userData.Fname+` `+this.userData.Lname">
                          <input type="text" hidden name="ip-ecodeupload" id="ip-ecodeupload" :value="this.userData.ecode">
      
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
               
            </div>
        </div>
    </div>



        <div class="main-container">
          <div class="pd-ltr-20">
            <div class="card-box height-100-p pd-20">
              <h4 class="text-center">หน้าอัพโหลดข้อมูล</h4>
              <hr>
              <div class="row form-group">
                <div class="col-md-12">
                  <button style="display:none;" type="button" id="btn-uploadMd" name="btn-uploadMd" class="btn btn-primary" data-toggle="modal" data-target="#upload_modal"><i class="mr-2 dw dw-upload1"></i>อัพโหลดข้อมูล</button>
                  <button style="display:none;" type="button" id="btn-deleteMd" name="btn-deleteMd" class="btn btn-danger ml-2" data-toggle="modal" data-target="#deletedata_modal"><i class="mr-2 dw dw-trash1"></i>ลบข้อมูลแบบทั้งชุด</button>
                </div>
              </div>
              <hr id="lineUpload" style="display:none;">

              <h4 class="text-center mb-3">รายการอัพโหลด</h4>
              <FilterData/>
              <table id="dataMainList" class="table table-striped table-bordered" cellspacing="0">
                <thead>
                  <tr>
                    <!-- <th class="td1">Ulid</th> -->
                    <th class="td0">#</th>
                    <th class="td0">Tax ID</th>
                    <th class="td1">Vender ID</th>
                    <th class="td2">Voucher</th>
                    <th class="td3">PO</th>
                    <th class="td4">Invoice</th>
                    <th class="td5">Exclude VAT</th>
                    <th class="td6">VAT</th>
                    <th class="td7">Include VAT</th>
                    <th class="td8">Credit term</th>
                    <th class="td9">Invoice date</th>
                    <th class="td10">Company</th>
                    <th class="td11">Status</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery';
import FilterData from '@/components/admin/FilterData.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name:'Uploadpage',
    data() {
      return {
          url:this.getUrl(),
          userData:this.getSessionStorage(),
          resultCheckSchedule:''
      }
    },
    components:{
      FilterData
    },
    created() {
      this.formValidate();
      this.getcompany();
      this.getUserPermission(this.userData.ecode);
    },
    mounted() {
      let proxy = this;
      proxy.getMonth();
      proxy.getYearForUpload();
      // proxy.loadBillingUpload();
      proxy.loadFilterOnSessionStorage();

      $('#btn-deleteMd').click(function(){
        // $('#ip-deleteDataMonth , #ip-deleteDataYear').val('');
        proxy.getMonth();
        $("#ip-deleteDataYear").html(`<option value="">กรุณาเลือกปีของข้อมูล</option>`);
      });

      $('#filterBy-period').change(function(){
          const data_month = $("option:selected" , this).attr("data_month");
          const data_year = $("option:selected" , this).attr("data_year");
          
          $('#ipf-datamonth').val(data_month);
          $('#ipf-datayear').val(data_year);
      });

      $('#ip-deleteDataMonth').change(function(){
        if($(this).val() != ""){
          let month = $(this).val();
          proxy.getYear(month);
        }
      });

      $('#btn-submitSearch').click(function(){
        let startDate_filter = $('#startDate').val();
        let endDate_filter = $('#endDate').val();
        let company_filter = $('#filterBy-company').val();
        let status_filter = $('#filterBy-status').val();

        let month_filter = $('#ipf-datamonth').val();
        let year_filter = $('#ipf-datayear').val();

        let filterupload_admin = {
          "startDate_filter":startDate_filter,
          "endDate_filter":endDate_filter,
          "company_filter":company_filter,
          "status_filter":status_filter,
          "month_filter":month_filter,
          "year_filter":year_filter
        };

        //create session storage
        sessionStorage.setItem('filterupload_admin' , JSON.stringify(filterupload_admin));

        let table = $('#dataMainList').DataTable();
        table.state.clear();


        proxy.loadBillingUpload();
      });

      $('#btn-searchClear').click(function(){
        sessionStorage.removeItem("filterupload_admin");
        let table = $('#dataMainList').DataTable();
        table.state.clear();
        $('#startDate').val('');
        $('#endDate').val('');
        $('#filterBy-company').val('');
        $('#filterBy-status').val('');

        $('#ipf-datamonth').val('');
        $('#ipf-datayear').val('');
        $('#filterBy-period').val('');

        proxy.loadBillingUpload();
      });
      
      $(document).on('click' , '.select-delinvoice' , function(){
        const data_autoid = $(this).attr("data_autoid");
        const data_taxid = $(this).attr("data_taxid");
        const data_venderid = $(this).attr("data_venderid");
        const data_po = $(this).attr("data_po");
        const data_invoice = $(this).attr("data_invoice");
        const data_includevat = $(this).attr("data_includevat");
        const data_invoicedate = $(this).attr("data_invoicedate");

        $('#delInv-taxid').val(data_taxid);
        $('#delInv-venderid').val(data_venderid);
        $('#delInv-po').val(data_po);
        $('#delInv-invoice').val(data_invoice);
        $('#delInv-invoicedate').val(data_invoicedate);
        $('#delInv-includevat').val(data_includevat);
        $('#delInv-autoid').val(data_autoid);
        $('.btn-delInv').attr('data_autoid' , data_autoid);
      });

      $(document).on('click' , '.btn-delInv' , function(){
        const data_autoid = $(this).attr("data_autoid");
          Swal.fire({
            title: 'ต้องการลบข้อมูล ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText:'ยกเลิก'
          }).then((result)=> {
            if(result.value == true){
              axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apiadmin/delInvoice',{
                action: "delInvoice",
                autoid : data_autoid
              }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Delete Data Success"){
                  Swal.fire({
                      title: 'ลบข้อมูลสำเร็จ',
                      icon: 'success',
                      showConfirmButton: false,
                      timer:1000
                  }).then(function(){
                    proxy.loadFilterOnSessionStorage();
                    $('.invoiceMd-closeClick').click();
                  });
                }
              });
            }
          });


      });

      $('#ip-uploadDataMonth').on('change' , function(){
        let month1 = $(this).val();
        proxy.getMonth2(month1);
      });

      $('#ip-uploadDataYear').on('change' , function(){
        let year1 = $(this).val();
        let month1 = $('#ip-uploadDataMonth').val();
        proxy.getYearForUpload2(month1 , year1);
      });

    },
    methods: {
      getMonth(){
        let proxy = this;
        let totalMonth = 12 ;
        let monthName = ``;
        let ii = '';
        let output = `
          <option value="">กรุณาเลือกเดือนของข้อมูล</option>
        `;
        for(let i = 1; i <= totalMonth ; i++){


          if(i < 10){
            ii = "0"+i;
          }else{
            ii = i.toString();
          }
          monthName = proxy.conMonth(ii);
          output += `<option value="`+ii+`">`+monthName+`</option>`;
        }
        $('#ip-uploadDataMonth').html(output);
        $('#ip-deleteDataMonth').html(output);
      },
      getMonth2(month1){
        $('#ip-uploadBillDataMonth').attr("style", "pointer-events: none;");
        let proxy = this;
        let totalMonth = 12 ;
        let monthName = ``;
        let ii = '';
        let output = ``;

        if(parseFloat(month1) == 12){
          month1 = 1;
        }else{
          month1 = parseFloat(month1)+1;
        }
        for(let i = month1; i <= totalMonth ; i++){

          if(i < 10){
            ii = "0"+i;
          }else{
            ii = i;
          }
          monthName = proxy.conMonth(ii);
          output += `<option value="`+ii+`">`+monthName+`</option>`;
        }
        $('#ip-uploadBillDataMonth').html(output);
        // $('#ip-deleteDataMonth').html(output);
      },
      getYear(month){
        if(month != ""){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getYear' , {
            monthSelect:month,
            action:'getYear'
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
              let result = res.data.result;
              let html = ``;

              if(result.length != 0){
                for(let i = 0; i < result.length ; i++){
                  html +=`
                  <option value="`+result[i].dataYear+`">`+result[i].dataYear+`</option>
                  `;
                }
              }else{
                html += `
                  <option value="">ไม่พบข้อมูลในระบบ</option>
                `;
              }

              $("#ip-deleteDataYear").html(html);
            }
          });
        }
      },

      getYearForUpload()
      {
        let maxYear = 2050;
        let output = `
        <option value="">กรุณาเลือกปีของข้อมูล</option>`;
        for(let i = 2022 ; i < maxYear ; i++){
          output += `<option value="`+i+`">`+i+`</option>`;
        }
        $('#ip-uploadDataYear').html(output);
      },
      getYearForUpload2(month , year)
      {
        $('#ip-uploadBillDataYear').attr("style", "pointer-events: none;");
        let maxYear = 2050;
        let output = ``;
        if(parseFloat(month) == 12){
          year = parseFloat(year)+1;
        }else{
          year = parseFloat(year);
        }
        for(let i = year ; i < maxYear ; i++){
          output += `<option value="`+i+`">`+i+`</option>`;
        }
        $('#ip-uploadBillDataYear').html(output);
      },

      loadBillingUpload(){

        let startDate_filter = $('#startDate').val();
        let endDate_filter = $('#endDate').val();
        let company_filter = $('#filterBy-company').val();
        let status_filter = $('#filterBy-status').val();

        let month_filter = $('#ipf-datamonth').val();
        let year_filter = $('#ipf-datayear').val();


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

        if(month_filter == "" && year_filter == ""){
          month_filter = 0;
          year_filter = 0;
        }else if(month_filter == null && year_filter == null){
          month_filter = 0;
          year_filter = 0;
        }

        console.log(startDate_filter+"/"+endDate_filter+"/"+company_filter+"/"+status_filter+"/"+month_filter+"/"+year_filter);

          let thid = 1;
          $('#dataMainList thead th').each(function() {
            var title = $(this).text();
            $(this).html(title + ' <input type="text" id="dataMainList'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
            thid++;
          });

            $('#dataMainList').DataTable().destroy();
            var table = $('#dataMainList').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#dataMainList thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadBillingUploadData/'+startDate_filter+'/'+endDate_filter+'/'+company_filter+'/'+status_filter+'/'+month_filter+'/'+year_filter,
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

      uploadData(){
        const proxy = this;
        // Check file input not null
        if($('#ip-uploadData').val() == ""){
          Swal.fire({
              title: 'กรุณาเลือกไฟล์',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else if($('#ip-uploadDataMonth').val() == ""){
          Swal.fire({
              title: 'กรุณาเลือกเดือนของข้อมูล',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else if($('#ip-uploadDataYear').val() == ""){
          Swal.fire({
            title: 'กรุณาเลือกปีของข้อมูล',
            icon: 'error',
            showConfirmButton: false,
            timer:1000
          });
        }else{

          // Check การตั้งค่า Schedule ว่ามีการกำหนดค่าของเดือนและปีที่อัพโหลดข้อมูลไหม
          proxy.getScheduleDataForCheck($('#ip-uploadBillDataMonth').val() , $('#ip-uploadBillDataYear').val());

        }


      },

      getSessionStorage(){
        const getUserData = localStorage.getItem("userData");
        return JSON.parse(getUserData);
      },

      deleteData(){
        // const proxy = this;
        if($('#ip-deleteDataMonth').val() == ""){
          Swal.fire({
              title: 'กรุณาเลือกเดือนที่ต้องการลบข้อมูล',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else if($('#ip-deleteDataYear').val() == ""){
          Swal.fire({
              title: 'กรุณาเลือกปีที่ต้องการลบข้อมูล',
              icon: 'error',
              showConfirmButton: false,
              timer:1000
          });
        }else{

          Swal.fire({
            title: 'ต้องการลบข้อมูล ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText:'ยกเลิก'
          }).then((result)=> {
            if(result.value == true){
              const form = $('#frm-deleteData')[0];
              const data = new FormData(form);

              axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/deleteData' , data, {
              }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Delete Data Success"){
                  Swal.fire({
                      title: 'ลบข้อมูลสำเร็จ',
                      icon: 'success',
                      showConfirmButton: false,
                      timer:1000
                  }).then(function(){
                    $('#dataMainList').DataTable().ajax.reload();
                    $('.closeClick').click();
                    $('#ip-deleteDataMonth').val('');
                    $('#ip-deleteDataYear').val('');
                    $('#frm-deleteData').removeClass('was-validated');
                  });
                }else if(res.data.status == "Delete Data Not Success2"){
                  Swal.fire({
                      title: 'ตรวจพบรายการกำลังวางบิล ไม่สามารถลบข้อมูลชุดนี้ทั้งหมดได้',
                      icon: 'error',
                      showConfirmButton: false,
                      timer:2000
                  });
                }
              });
            }
          });

          
        }
      },

      loadFilterOnSessionStorage(){
        const proxy = this;
        let get_filterupload_admin = sessionStorage.getItem("filterupload_admin");

        if(get_filterupload_admin != null){
          let startDate_filter = JSON.parse(get_filterupload_admin).startDate_filter;
          let endDate_filter = JSON.parse(get_filterupload_admin).endDate_filter;
          let company_filter = JSON.parse(get_filterupload_admin).company_filter;
          let status_filter = JSON.parse(get_filterupload_admin).status_filter;
          let month_filter = JSON.parse(get_filterupload_admin).month_filter;
          let year_filter = JSON.parse(get_filterupload_admin).year_filter;

          $('#startDate').val(startDate_filter);
          $('#endDate').val(endDate_filter);
          $('#filterBy-company').val(company_filter);
          $('#filterBy-status').val(status_filter);

          $('#ipf-datamonth').val(month_filter);
          $('#ipf-datayear').val(year_filter);

          $('#filterBy-period').val(month_filter+'-'+year_filter);

         
        }
         proxy.loadBillingUpload();
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
                  $('#filterBy-company').html(html);
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
                  $('#filterBy-status').html(html);
                  this.getperiod();
              }
          });
      },
      getperiod(){
          const proxy = this;
          axios.get(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getperiod').then(res=>{
              console.log(res.data);
              if(res.data.status == "Select Data Success"){
                  let result = res.data.result;
                  let month = '';
                  let html = `<option value="">กรองด้วยรอบของข้อมูล</option>`;
                  for(let i = 0; i < result.length; i++){
                      month = proxy.conMonth(result[i].dataMonth);
                      html +=`
                          <option value="`+result[i].dataMonth+`-`+result[i].dataYear+`"
                              data_month="`+result[i].dataMonth+`"
                              data_year="`+result[i].dataYear+`"
                          >รอบข้อมูลเดือน `+month+` ปี `+result[i].dataYear+`</option>
                      `;
                  }
                  $('#filterBy-period').html(html);
                  proxy.loadFilterOnSessionStorage();
              }
          });
      },
      getScheduleDataForCheck(month , year)
      {
        const proxy = this;
        if(month != "" && year != ""){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getScheduleDataForCheck' , {
            action:"getScheduleDataForCheck",
            month:month,
            year:year
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
              let result = res.data.result;
              if(result == 1){
                  $('#btn-upload').prop('disabled' , true);
                  const form = $('#frm-uploadData')[0];
                  const data = new FormData(form);

                  axios.post(proxy.url+'intsys/ebilling/ebilling_backend/apiadmin/uploadData' , data , {
                      header:{
                          'Content-Type' : 'multipart/form-data'
                      },
                  }).then(res=>{
                      console.log(res.data);
                      if(res.data.status == "Upload Data Success"){
                          Swal.fire({
                              title: 'อัพโหลดข้อมูลสำเร็จ',
                              icon: 'success',
                              showConfirmButton: false,
                              timer:1000
                          }).then(function(){
                            $('.upload-closeClick').click();
                            $('#btn-upload').prop('disabled' , false);
                            $('#ipf-uploadData').val('');
                            $('#ip-uploadDataMonth').val('');
                            $('#ip-uploadDataYear').val('');
                            proxy.getcompany();
                            
                          });
                          
                      }else if(res.data.status == "Upload Data Failed1"){
                          Swal.fire({
                            title: 'ข้อมูลอัพโหลดไม่ตรงกับเดือนหรือปีที่เลือก',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:2000
                          }).then(function(){
                            $('#btn-upload').prop('disabled' , false);
                          })
                      }else{
                          $('#btn-upload').prop('disabled' , false);
                      }
                  });

              }else if(result == 0){
                Swal.fire({
                    title: 'กรุณากำหนดค่าของเดือนที่ท่านเลือกข้อมูลในหน้า Schedule ก่อนทำการอัพโหลดไฟล์',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:3000
                });
              }
            }
          });
        }
      },

      uploadCloseClick()
      {
        $('#ipf-uploadData').val('');
        $('#ip-uploadDataMonth').val('');
        $('#ip-uploadDataYear').val('');
        $('#ip-uploadBillDataMonth').val('');
        $('#ip-uploadBillDataYear').val('');
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
                      let permissiondata = res.data.result;
                      if(permissiondata.u_upload_section == "yes"){
                        $('#btn-uploadMd , #btn-deleteMd , #lineUpload').css('display','');
                      }else{
                        $('#btn-uploadMd , #btn-deleteMd , #lineUpload').css('display','none');
                      }
                  }
              });
          }
      }



    },
}
</script>

<style scoped>
  /* Control upload page */
  #dataMainList{
    width:100% !important;
  }

  .td0{
    width:110px;
  }
  .td1{
    width:80px;
  }

  @media (min-width:1440px){
    #dataMainList{
      width:1600px !important;
    }
    .td0{
    width:110px;
    }
    .td1{
      width:80px;
    }
  }

  @media (min-width:1024px) and (max-width:1439px){
    #dataMainList{
      width:1600px !important;
    }
    .td0{
    width:110px;
    }
    .td1{
      width:80px;
    }
  }

  @media (min-width:768px) and (max-width:1023px){
    #dataMainList{
      width:1600px !important;
    }
    .td0{
    width:110px;
    }
    .td1{
      width:80px;
    }
  }

  @media (min-width:320px) and (max-width:767px) {

  }

  .text1{
    color:#c00000;
  }
</style>