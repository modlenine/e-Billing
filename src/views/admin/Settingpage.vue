<template>
  <div id="setting">
    <section id="setting-allow-section">
    <div class="modal fade bs-example-modal-lg" id="setBilldate_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">กำหนดวันที่วางบิล</h4>
                    <button type="button" class="close setting-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <form id="frm-saveBillSetting" autocomplete="off" @submit.prevent="saveBillSetting">
                <div class="modal-body">
                  <div class="row form-group">
                    <div class="col-md-12 form-group">
                      <label for=""><b>จำนวนวันที่บัญชีกำหนด</b></label>
                      <input type="number" name="billDateFix" id="billDateFix" class="form-control">
                    </div>

                    <input hidden type="text" name="set_user" id="set_user" :value="userData.Fname+' '+userData.Lname">
                    <input hidden type="text" name="set_ecode" id="set_ecode" :value="userData.ecode">
                  </div>

                  <div class="row form-group">
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-info">บันทึก</button>
                    </div>
                  </div>
                </div>
                </form>
               
            </div>
        </div>
    </div>
    



    <div class="main-container">
      <div class="pd-ltr-20">
      
          <!-- <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                <div class="mt-5"></div>
                  <h3 style="text-align:center;">หน้าตั้งค่า</h3>
                  <hr>
                  <div>
                    <h4 style="text-align:center;">อยู่ระหว่างปรับปรุงข้อมูล</h4>
                  </div>

              </div>
            </div>
          </div> -->

          <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                  <button type="button" id="btn-addBilldate" name="btn-addBilldate" class="btn btn-info btn-addBilldate" data-target="#setBilldate_modal" data-toggle="modal">ตั้งค่า</button>
                <div class="mt-2"></div>
                  <div>
                    <h4 class="text-center">ตั้งค่า</h4>
                    <hr>
                  </div>
                  <div class="row form-group mt-3">
                    <div class="col-md-8">
                      <h4>รายละเอียด</h4>
                      <div class="row mt-3 form-group">
                        <div class="col-md-12 form-group">
                          <div id="showDataSetting"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                <div class="mt-5"></div>
                  <h3 style="text-align:center;">ตั้งค่า Schedule ต่างๆ</h3>
                  <hr>
                  <form id="frm-saveSchedule" autocomplete="off" @submit.prevent="saveSchedule">

                  <section class="secAddSchedule">

                    <div class="row form-group" id="year-month-main">
                      <div class="col-md-4 form-group">
                        <label for=""><b>เลือกปีและเดือน</b></label>
                        <input type="text" name="sche-year" id="sche-year" class="form-control sche-year">
                      </div>
                    </div>

                    <div class="row form-group" id="year-month-edit" style="display:none;">
                      <div class="col-md-4 form-group">
                        <label for=""><b>เลือกปีและเดือน</b></label>
                        <input type="text" name="sche-year-edit" id="sche-year-edit" class="form-control sche-year-edit" readonly>
                      </div>
                    </div>

                    <div class="row form-group">
                      <div class="col-md-3 form-group">
                        <label for=""><b>เลือกวันเปิดรับวางบิล</b></label>
                        <input type="text" name="sche-dayOpen" id="sche-dayOpen" class="form-control" readonly>
                      </div>
                      <div class="col-md-3 form-group">
                        <label for=""><b>เวลาเปิดรับวางบิล</b></label>
                        <input type="text" name="sche-timeOpen" id="sche-timeOpen" class="form-control" readonly>
                      </div>
                      <div class="col-md-3 form-group">
                        <label for=""><b>เลือกวันปิดรับวางบิล</b></label>
                        <input type="text" name="sche-dayClose" id="sche-dayClose" class="form-control" readonly>
                      </div>
                      <div class="col-md-3 form-group">
                        <label for=""><b>เวลาปิดรับวางบิล</b></label>
                        <input type="text" name="sche-timeClose" id="sche-timeClose" class="form-control" readonly>
                      </div>
                    </div>

                    <div class="row form-group">
                      <div class="col-md-3 form-group">
                        <label for=""><b>เลือกวันที่คำนวณวันจ่ายเงิน</b></label>
                        <input type="text" name="sche-dayCalc" id="sche-dayCalc" class="form-control" readonly>
                      </div>
                      <!-- <div class="col-md-3 form-group">
                        <label for=""><b>เวลาเริ่มคำนวณ</b></label>
                        <input type="text" name="sche-timeCalc" id="sche-timeCalc" class="form-control" readonly>
                      </div> -->
                      <div class="col-md-3 form-group">
                        <label for=""><b>เลือกวันที่จ่ายเงิน</b></label>
                        <input type="text" name="sche-dayPay" id="sche-dayPay" class="form-control" readonly>
                      </div>
                      <!-- <div class="col-md-3 form-group">
                        <label for=""><b>เวลาที่จ่ายเงิน</b></label>
                        <input type="text" name="sche-timePay" id="sche-timePay" class="form-control" readonly>
                      </div> -->
                    </div>

                    <div class="row form-group">
                      <div class="col-md-12">
                        <button type="submit" id="add-schedule" name="add-schedule" class="btn btn-info"><i class="mr-2 fa fa-plus-circle" aria-hidden="true"></i>เพิ่ม</button>
                        <button type="button" id="clear-schedule" name="clear-schedule" class="btn btn-warning ml-3"><i class="mr-2 fa fa-refresh" aria-hidden="true"></i>ล้าง</button>
                      </div>

                      <input hidden type="text" name="sche-username" id="sche-username" :value="this.userData.Fname+' '+this.userData.Lname">
                      <input hidden type="text" name="sche-ecode" id="sche-ecode" :value="this.userData.ecode">
                      <input hidden type="text" name="sche-autoid" id="sche-autoid">
                    </div>

                  </section>

                  </form>

                  <!-- <div class="row form-group">
                    <div class="col-md-12">
                      <button type="button" id="add-schedule" name="add-schedule" data-toggle="modal" data-target="#scheduleSetting_modal" class="btn btn-info">เพิ่ม</button>
                    </div>
                  </div> -->
                  
                      <table id="tbl_scheduleList" class="table table-striped table-bordered" cellspacing="0">
                          <thead>
                          <tr>
                              <!-- <th class="td1">Ulid</th> -->
                              <th class="td1">ปี</th>
                              <th class="td2">เดือน</th>
                              <th class="td3">วันที่เปิดวางบิล</th>
                              <th class="td3">เวลาเปิดวางบิล</th>
                              <th class="td4">วันที่ปิดวางบิล</th>
                              <th class="td4">เวลาปิดวางบิล</th>
                              <th class="td5">วันที่เริ่มคำนวณ</th>
                              <th class="td7">วันที่จ่ายเงิน</th>
                              <th class="td7">#</th>
                          </tr>
                          </thead>
                      </table>

              </div>
            </div>
          </div>


      </div>
    </div>
    </section>
    <section id="setting-notallow-section" style="display:none;">
    <div class="main-container">
      <div class="pd-ltr-20">
          <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                <div class="mt-2"></div>
                  <div>
                  </div>
                  <div class="row form-group mt-3 text-center">
                    <div class="col-md-12">
                      <h4>ขออภัยท่านสิทธิ์ของท่านไม่สามารถใช้งานหน้านี้ได้</h4>
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import Swal from 'sweetalert2';
import axios from 'axios'

export default {
    name:"Setting",
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),
        }
    },
    created() {
      this.loadBillSetting();
      this.getUserPermission(this.userData.ecode);
    },
    mounted() {
      const proxy = this;
      this.loadScheduleSetting();

        let scheyearandmonth1 = '';
        let scheyearandmonth2 = '';
        $('#sche-year').Zebra_DatePicker(
          {
            format:'Y-m',
            onSelect: function (date) {

              let yearMonth = date;

              // Check Month
              scheyearandmonth1 = yearMonth+"-01";
              console.log(`'`+scheyearandmonth1+`'`);

              let dateOriginal = new Date(scheyearandmonth1);
              let lastDayOfMonth = new Date(dateOriginal.getFullYear(), dateOriginal.getMonth()+1, 0);

              scheyearandmonth2 = yearMonth+"-"+lastDayOfMonth.getDate();
              console.log(`'`+scheyearandmonth2+`'`);

              $('#sche-dayOpen').Zebra_DatePicker({
                  direction: [scheyearandmonth1, scheyearandmonth2],
              });
              $('#sche-timeOpen').Zebra_DatePicker({
                format:'H:i'
              });

              $('#sche-dayClose').Zebra_DatePicker({
                  direction: [scheyearandmonth1, scheyearandmonth2]
              });
              $('#sche-timeClose').Zebra_DatePicker({
                format:'H:i'
              });

              $('#sche-dayCalc').Zebra_DatePicker({
                  direction: [scheyearandmonth1, scheyearandmonth2]
              });

              $('#sche-dayPay').Zebra_DatePicker({
                  direction: [scheyearandmonth1, scheyearandmonth2]
              });



            }
          }
        );

      $(document).on('click' , '.editSchedule' , function(){
        const data_autoid = $(this).attr("data_autoid");
        proxy.getScheduleData(data_autoid);
        $('#add-schedule').html('<i class="mr-2 dw dw-diskette1"></i>บันทึกการแก้ไข')
      });


      $(document).on('click' , '.delSchedule' , function(){
        const data_autoid = $(this).attr('data_autoid');
        Swal.fire({
          title: 'ต้องการลบข้อมูล ใช่หรือไม่',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText:'ยกเลิก'
        }).then((result) => {
          if(result.value == true){
              proxy.delScheduleData(data_autoid);
          }
        });

      });


      $(document).on('click' , '#clear-schedule' , function(){

        $('#year-month-main').css('display' , '');
        $('#year-month-edit').css('display' , 'none');

        $('#add-schedule').html('<i class="mr-2 fa fa-plus-circle" aria-hidden="true"></i>เพิ่ม')

        $('#sche-year').val('');
        $('#sche-dayOpen').val('');
        $('#sche-timeOpen').val('');
        $('#sche-dayClose').val('');
        $('#sche-timeClose').val('');
        $('#sche-dayCalc').val('');
        $('#sche-dayPay').val('');
        $('#sche-autoid').val('');

      });



    },
    methods: {
        saveBillSetting(){
          const proxy = this;
          if($('#billDateOpen').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่เปิดให้วางบิล',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#billDateclose').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่ปิดให้วางบิล',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#billDateCalc').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่เริ่มคำนวณ',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#billDateFix').val() == ""){
            Swal.fire({
                title: 'กรุณากำหนดวันทางบัญชี',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else{
            const form = $('#frm-saveBillSetting')[0];
            const data = new FormData(form);
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveBillSetting' , data).then(res=>{
              console.log(res.data);
              if(res.data.status == "Update Data Success"){
                  Swal.fire({
                      title: 'บันทึกการตั้งค่าสำเร็จ',
                      icon: 'success',
                      showConfirmButton: false,
                      timer:1000
                  }).then(function(){
                    $('.setting-closeClick').click();
                    proxy.loadBillSetting();
                  });
              }
            });
          }
        },
        loadBillSetting(){
          axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadBillSetting',{
            action:"loadBillSetting"
          }).then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
              //echo to html
              if(res.data.result !== null){
                let result = res.data.result;
                let html = `
                <span><b>จำนวนวันที่บัญชีกำหนดเพื่อร่วมคำนวณ : </b>`+result.set_datefix+` วัน</span><br>
                `;
                $('#showDataSetting').html(html);

                $('#billDateOpen').val(result.set_dateopen);
                $('#billDateClose').val(result.set_dateclose);
                $('#billDateCalc').val(result.set_datecalc);
                $('#billDateFix').val(result.set_datefix);
              }

            }
          });
        },
        getSessionStorage(){
          const getUserData = localStorage.getItem("userData");
          return JSON.parse(getUserData);
        },
        loadScheduleSetting()
        {
            let thid = 1;
            $('#tbl_scheduleList thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_scheduleList'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_scheduleList').DataTable().destroy();
            var table = $('#tbl_scheduleList').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_scheduleList thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadScheduleSetting/',
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
                                  orderable: false,
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
        saveSchedule()
        {
          if($('#sche-dayOpen').val() == "" && $('#sche-timeOpen').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่เปิดรับวางบิล',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#sche-dayClose').val() == "" && $('#sche-timeClose').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่ปิดรับวางบิล',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#sche-dayCalc').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันที่คำนวณวันจ่ายเงิน',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else if($('#sche-dayPay').val() == ""){
            Swal.fire({
                title: 'กรุณาเลือกวันจ่ายเงิน',
                icon: 'error',
                showConfirmButton: false,
                timer:1000
            });
          }else{
            const form = $('#frm-saveSchedule')[0];
            const data = new FormData(form);

            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveSchedule' , data).then(res=>{
              console.log(res.data);
              if(res.data.status == "Insert Data Success" || res.data.status == "Update Data Success"){
                //code
                Swal.fire({
                  title: 'บันทึกข้อมูลการตั้งค่า Schedule สำเร็จ',
                  icon: 'success',
                  showConfirmButton: false,
                  timer:1000
                }).then(function(){
                  $('#year-month-main').css('display' , '');
                  $('#year-month-edit').css('display' , 'none');
                  $('#tbl_scheduleList').DataTable().ajax.reload();
                  $('#sche-year').val('');
                  $('#sche-dayOpen').val('');
                  $('#sche-timeOpen').val('');
                  $('#sche-dayClose').val('');
                  $('#sche-timeClose').val('');
                  $('#sche-dayCalc').val('');
                  $('#sche-dayPay').val('');
                  $('#sche-autoid').val('');
                });
              }else if(res.data.status == "Found Duplicate Data"){
                Swal.fire({
                  title: 'พบข้อมูลซ้ำในระบบ กรุณาตรวจสอบความถูกต้องอีกครั้ง',
                  icon: 'error',
                  showConfirmButton: false,
                  timer:1000
                });
              }
            });
          }


        },
        getScheduleData(autoid){
          if(autoid != ""){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getScheduleData' , {
              action:"getScheduleData",
              autoid:autoid
            }).then(res=>{
              console.log(res.data);
              if(res.data.status == "Select Data Success"){
                //code
                let result = res.data.result;

                let scheyearandmonth1 = '';
                let scheyearandmonth2 = '';

                scheyearandmonth1 = result.sc_year+'-'+result.sc_month+"-01";
                let dateOriginal = new Date(scheyearandmonth1);
                let lastDayOfMonth = new Date(dateOriginal.getFullYear(), dateOriginal.getMonth()+1, 0);
                scheyearandmonth2 = result.sc_year+'-'+result.sc_month+"-"+lastDayOfMonth.getDate();

                $('#sche-dayOpen').Zebra_DatePicker({
                    direction: [scheyearandmonth1, scheyearandmonth2],
                });
                $('#sche-timeOpen').Zebra_DatePicker({
                  format:'H:i'
                });

                $('#sche-dayClose').Zebra_DatePicker({
                    direction: [scheyearandmonth1, scheyearandmonth2]
                });
                $('#sche-timeClose').Zebra_DatePicker({
                  format:'H:i'
                });

                $('#sche-dayCalc').Zebra_DatePicker({
                    direction: [scheyearandmonth1, scheyearandmonth2]
                });

                $('#sche-dayPay').Zebra_DatePicker({
                    direction: [scheyearandmonth1, scheyearandmonth2]
                });

                $('#year-month-main').css('display' , 'none');
                $('#year-month-edit').css('display' , '');
                $('#sche-year-edit').val(result.sc_year+'-'+result.sc_month);

                $('#sche-dayOpen').val(result.sc_dateOpen);
                $('#sche-timeOpen').val(result.sc_timeOpen);
                $('#sche-dayClose').val(result.sc_dateClose);
                $('#sche-timeClose').val(result.sc_timeClose);
                $('#sche-dayCalc').val(result.sc_dateCalc);
                $('#sche-dayPay').val(result.sc_datePay);
                $('#sche-autoid').val(result.sc_autoid);
              }else if(res.data.status == "Found Billing Data"){
                Swal.fire({
                  title: 'ตรวจพบรายการกำลังวางบิลไม่สามารถแก้ไข Schedule ได้',
                  icon: 'error',
                  showConfirmButton: false,
                  timer:2000
                });
              }
            });
          }
        },
        delScheduleData(autoid){
          if(autoid != ""){
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/delScheduleData' , {
              action:"delScheduleData",
              autoid:autoid
            }).then(res=>{
              console.log(res.data);
              if(res.data.status == "Delete Data Success"){
                Swal.fire({
                  title: 'ลบข้อมูล Schedule สำเร็จ',
                  icon: 'success',
                  showConfirmButton: false,
                  timer:1000
                }).then(function(){
                  $('#tbl_scheduleList').DataTable().ajax.reload();
                });
              }else if(res.data.status == "Can Not Delete Data"){
                Swal.fire({
                  title: 'ไม่สามารถลบการราย Schedule ได้เนื่องจากตรวจสอบรายการอัพโหลดรอดำเนินการ',
                  icon: 'error',
                  showConfirmButton: false,
                  timer:2000
                });
              }
            });
          }
        },
        getUserPermission(ecode){
          // const proxy = this;
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
                      if(permissiondata.u_admin_section == "yes"){
                        $('#setting-allow-section').css('display','');
                        $('#setting-notallow-section').css('display','none');
                      }else{
                        $('#setting-notallow-section').css('display','');
                        $('#setting-allow-section').css('display','none');
                      }
                  }
              });
          }
        }
    },
}
</script>

<style>

</style>