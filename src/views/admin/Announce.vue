<template>
  <div id="announce">
    <div class="modal fade bs-example-modal-lg" id="createAnnounce_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าลงประกาศรายผู้ค้า</h4>
                    <button type="button" class="close ann-vender-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">

                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label for=""><b>รายละเอียดของประกาศ</b></label>
                            </div>
                            <Editor
                                api-key="o2vq5rmd8qoetr6i5gntilsjjmzg5hq2ixmt1h8huhzwm02r"
                                :init="{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount textcolor'
                                    ],
                                    toolbar:
                                    'undo redo | formatselect | bold italic backcolor forecolor| \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }"
                                name="announce-vender-text"
                                id="announce-vender-text"
                                v-model="content"
                            />
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" id="btn-save-announce-vender" name="btn-save-announce-vender">บันทึกข้อมูล</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <input hidden type="text" name="ann-vender-taxid" id="ann-vender-taxid">
                    <input hidden type="text" name="ann-vender-username" id="ann-vender-username" :value="this.userData.Fname+' '+this.userData.Lname">
                    <input hidden type="text" name="ann-vender-ecode" id="ann-vender-ecode" :value="this.userData.ecode">

      
                </div>
               
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="editAnnounce_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">แก้ไขหน้าลงประกาศรายผู้ค้า</h4>
                    <button type="button" class="close annEdit-vender-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">

                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label for=""><b>รายละเอียดของประกาศ</b></label>
                            </div>
                            <Editor
                                api-key="o2vq5rmd8qoetr6i5gntilsjjmzg5hq2ixmt1h8huhzwm02r"
                                :init="{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount textcolor'
                                    ],
                                    toolbar:
                                    'undo redo | formatselect | bold italic backcolor forecolor| \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }"
                                name="announceEdit-vender-text"
                                id="announceEdit-vender-text"
                                v-model="contentEdit"
                            />
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <select name="annEdit-vender-status" id="annEdit-vender-status" class="form-control" v-model="dataStatusVender">
                                    <option value="">กรุณาเลือกรายการ</option>
                                    <option value="เผยแพร่">เผยแพร่</option>
                                    <option value="ไม่เผยแพร่">ไม่เผยแพร่</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" id="btn-saveEdit-announce-vender" name="btn-saveEdit-announce-vender">บันทึกการแก้ไขข้อมูล</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <input hidden type="text" name="annEdit-vender-autoid" id="annEdit-vender-autoid">
                    <input hidden type="text" name="annEdit-vender-username" id="annEdit-vender-username" :value="this.userData.Fname+' '+this.userData.Lname">
                    <input hidden type="text" name="annEdit-vender-ecode" id="annEdit-vender-ecode" :value="this.userData.ecode">

      
                </div>
               
            </div>
        </div>
    </div>


    <div class="modal fade bs-example-modal-lg" id="createAnnounceMain_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">หน้าลงประกาศหลัก</h4>
                    <button type="button" class="close ann-main-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">

                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label for=""><b>รายละเอียดของประกาศ</b></label>
                            </div>
                            <Editor
                                api-key="o2vq5rmd8qoetr6i5gntilsjjmzg5hq2ixmt1h8huhzwm02r"
                                :init="{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount textcolor'
                                    ],
                                    toolbar:
                                    'undo redo | formatselect | bold italic backcolor forecolor| \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }"
                                name="announce-main-text"
                                id="announce-main-text"
                                v-model="contentMain"
                            />
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" id="btn-save-announce-main" name="btn-save-announce-main">บันทึกข้อมูล</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <input hidden type="text" name="ann-main-username" id="ann-main-username" :value="this.userData.Fname+' '+this.userData.Lname">
                    <input hidden type="text" name="ann-main-ecode" id="ann-main-ecode" :value="this.userData.ecode">

      
                </div>
               
            </div>
        </div>
    </div>


    <div class="modal fade bs-example-modal-lg" id="editAnnounceMain_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">แก้ไขหน้าลงประกาศหลัก</h4>
                    <button type="button" class="close annEdit-main-closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">

                  <div class="row">
                    <div class="col-xl-12 mb-30">
                      <div class="card-box height-100-p pd-20">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label for=""><b>รายละเอียดของประกาศ</b></label>
                            </div>
                            <Editor
                                api-key="o2vq5rmd8qoetr6i5gntilsjjmzg5hq2ixmt1h8huhzwm02r"
                                :init="{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount textcolor'
                                    ],
                                    toolbar:
                                    'undo redo | formatselect | bold italic backcolor forecolor| \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }"
                                name="announceEdit-main-text"
                                id="announceEdit-main-text"
                                v-model="contentMainEdit"
                            />
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <select name="annEdit-main-status" id="annEdit-main-status" class="form-control" v-model="dataStatusMain">
                                    <option value="">กรุณาเลือกรายการ</option>
                                    <option value="เผยแพร่">เผยแพร่</option>
                                    <option value="ไม่เผยแพร่">ไม่เผยแพร่</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-info" id="btn-saveEdit-announce-main" name="btn-saveEdit-announce-main">บันทึกการแก้ไขข้อมูล</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <input hidden type="text" name="annEdit-main-autoid" id="annEdit-main-autoid">
                    <input hidden type="text" name="annEdit-main-username" id="annEdit-main-username" :value="this.userData.Fname+' '+this.userData.Lname">
                    <input hidden type="text" name="annEdit-main-ecode" id="annEdit-main-ecode" :value="this.userData.ecode">

      
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
                      <h3 style="text-align:center;">หน้าลงประกาศบริษัท</h3>
                      <hr>

                      <div>
                        <h4>ลงประกาศหลัก</h4>
                        <hr>
                        <div class="row form-group mt-3">
                            <div class="col-md-12 form-group">
                                <button type="button" id="btn-add-announce-main" name="btn-add-announce-main" data-toggle="modal" data-target="#createAnnounceMain_modal" class="btn btn-primary">ลงประกาศ</button>
                            </div>
                        </div>

                        <table id="tbl_announce" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="antd1">วันที่ประกาศ</th>
                                <th class="antd2">รายละเอียด</th>
                                <th class="antd3">สถานะ</th>
                                <th class="antd3">#</th>
                            </tr>
                            </thead>
                        </table>

                      </div>
                    <hr>
                    <div>
                        <h4>ลงประกาศย่อย รายผู้ค้า</h4>
                        <hr>
                        <div class="row form-group mt-3">
                            <div class="col-md-6 form-group">
                                <label for=""><b>เลือกบริษัทผู้ค้า</b></label>
                                <input type="text" name="choose-vender" id="choose-vender" class="form-control">
                                <div id="show-venderdata" class="mt-2"></div>
                                <div id="show-venderdata-text" class="mt-2"></div>
                            </div>
                        </div>
                        <div class="row form-group mt-3">
                            <div class="col-md-12 form-group">
                                <button disabled id="btn-add-announce-vender" name="btn-add-announce-vender" class="btn btn-primary" data-toggle="modal" data-target="#createAnnounce_modal">ลงประกาศ</button>
                                <button type="button" id="btn-clear-announce-vender" name="btn-clear-announce-vender" class="btn btn-warning ml-2">ล้างค่า</button>
                            </div>
                        </div>

                        <table id="tbl_announce_byvender" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <!-- <th class="td1">Ulid</th> -->
                                <th class="antd1">วันที่ประกาศ</th>
                                <th class="antd4">บริษัท</th>
                                <th class="antd2">รายละเอียด</th>
                                <th class="antd3">สถานะ</th>
                                <th class="antd3">#</th>
                            </tr>
                            </thead>
                        </table>

                    </div>
   
                  </div>
                </div>
              </div>

          </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2';
import Editor from '@tinymce/tinymce-vue'

export default {
    name:"Announce",
    components:{
        Editor
    },
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrl(),
            content:'',
            contentEdit:'',
            contentMain:'',
            contentMainEdit:'',
            dataStatusMain:'',
            dataStatusVender:'',
            userData:this.getUserData(),
            venderclickData:''
        }
    },
    created() {
        
    },
    mounted() {

        let taxid = 0;
        this.loadAnnounceData_byvender(taxid);
        this.loadAnnounceDataMain();

        const proxy = this;
        $(document).on('keyup' , '#choose-vender' , function(){
            if($(this).val() != ""){
                let venderdataInput = $(this).val();
                proxy.getVenderdata(venderdataInput);
            }else{
                $('#show-venderdata').html('');
            }
        });


        $(document).on('click' , '.selectTaxidLi' , function(){
            const data_taxid = $(this).attr('data_taxid');
            const data_vendername = $(this).attr('data_vendername');
            proxy.checkVenderActivate(data_taxid);

            proxy.venderclickData = `
                <span><b>ชื่อผู้ค้า : </b>`+data_vendername+`</span><br>
                <span><b>เลขประจำตัวผู้เสียภาษี : </b>`+data_taxid+`</span><br>
            `;
            $('#show-venderdata-text').html(proxy.venderclickData);
        });

        $('#btn-save-announce-vender').on('click' , function(){
            proxy.saveAnnounceVender();
        });


        $(document).on('click' , '.editAnnSub' , function(){
            const data_autoid = $(this).attr('data_autoid');
            $('#annEdit-vender-autoid').val(data_autoid);
            proxy.getDataAnnByAutoid(data_autoid);
        });

        $('#btn-saveEdit-announce-vender').click(function(){
            proxy.saveEditAnnounceVender();
        });

        $('#btn-clear-announce-vender').click(function(){
            proxy.loadAnnounceData_byvender(taxid);
            $('#choose-vender').val('');
            $('#show-venderdata-text').html('');
        });


        $('#btn-save-announce-main').click(function(){
            if(proxy.contentMain  != ''){
                proxy.saveAnnounceMain();
            }
        });

        $(document).on('click' , '.editAnnMain' , function(){
            const data_autoid = $(this).attr('data_autoid');
            $('#annEdit-main-autoid').val(data_autoid);
            proxy.getDataAnnMainByAutoid(data_autoid);
        });

        $('#btn-saveEdit-announce-main').click(function(){
            if($('#annEdit-main-autoid').val() != ""){
                proxy.saveAnnounceMainEdit();
            }
        });



    },
    methods: {
        getVenderdata(venderdataInput)
        {
            //coding
            const proxy = this;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getVenderdata' , {
                action:"getVenderdata",
                venderdataInput:venderdataInput
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let venderdata = res.data.venderdata;

                    let html = `
                    <ul class="list-group mt-2 selectTaxid">
                    `;
                    for(let i = 0; i < venderdata.length; i++){
                        //code
                        html +=`
                            <li class="list-group-item list-group-item list-group-item-action selectTaxidLi"
                                data_taxid="`+venderdata[i].bpc_whtid+`"
                                data_vendername="`+venderdata[i].name+`"
                                data_venderaccount="`+venderdata[i].accountnum+`"
                            >
                            <span><b>ชื่อผู้ค้า : </b>`+venderdata[i].name+`</span><br>
                            <span><b>เลขประจำตัวผู้เสียภาษี : </b>`+venderdata[i].bpc_whtid+`</span><br>
                            <span><b>รหัสผู้ค้า : </b>`+venderdata[i].accountnum+`</span>
                            <span><b>บริษัท : </b>`+proxy.conAreaidToFullname(venderdata[i].dataareaid)+`</span>
                            </li>
                        `;
                    }

                    html +=`
                    </ul>`;
                    $('#show-venderdata').html(html);
                }
            });
        },
        checkVenderActivate(taxid){
            const proxy = this;
            if(taxid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/checkVenderActivate',{
                    action:"checkVenderActivate",
                    taxid:taxid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let resultCheck = res.data.result;
                        if(resultCheck == 0){
                            Swal.fire({
                                title: 'ผู้ค้ารายดังกล่าวยังไม่ได้ Activate ข้อมูล',
                                icon: 'error',
                                showConfirmButton: false,
                                timer:1000
                            });
                        }else{
                            //code
                            $('#btn-add-announce-vender').prop('disabled' , false);
                            proxy.loadAnnounceData_byvender(taxid);
                            $('#ann-vender-taxid').val(taxid);
                            $('#show-venderdata').html('');
                        }
                    }
                });
            }
        },
        loadAnnounceData_byvender(taxid){

            // console.log(taxid);
            let thid = 1;
            $('#tbl_announce_byvender thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_announce_byvender'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_announce_byvender').DataTable().destroy();
            var table = $('#tbl_announce_byvender').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_announce_byvender thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadAnnounceData_byvender/'+taxid,
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

                    $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                        'background-color':'#F5F5F5',
                        'cursor':'no-drop'
                    });
        },
        saveAnnounceVender()
        {
            const proxy = this;
            if($('#ann-vender-taxid').val() != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveAnnounceVender',{
                    action:"saveAnnounceVender",
                    taxid:$('#ann-vender-taxid').val(),
                    username:$('#ann-vender-username').val(),
                    ecode:$('#ann-vender-ecode').val(),
                    announceText:proxy.content
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Insert Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลประกาศสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $('.ann-vender-closeClick').click();
                            $('#show-venderdata-text').html(proxy.venderclickData);
                            $('#btn-add-announce-vender').prop('disabled' , false);
                            $('#tbl_announce_byvender').DataTable().ajax.reload();
                        });
                    }
                })
            }
        },
        getUserData(){
            const getUserData = localStorage.getItem("userData");
            return JSON.parse(getUserData);
        },
        getDataAnnByAutoid(autoid)
        {
            // const proxy = this;
            if(autoid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDataAnnByAutoid' , {
                    action:"getDataAnnByAutoid",
                    autoid:autoid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        //code
                        let result = res.data.annText;
                        this.contentEdit = result.an_text;
                        this.dataStatusVender = result.an_status;
                    }
                });
            }
        },
        saveEditAnnounceVender()
        {
           
            if($('#annEdit-vender-autoid').val() != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveEditAnnounceVender',{
                    action:"saveEditAnnounceVender",
                    autoid:$('#annEdit-vender-autoid').val(),
                    textEdit:this.contentEdit,
                    username:$('#annEdit-vender-username').val(),
                    ecode:$('#annEdit-vender-ecode').val(),
                    status:$('#annEdit-vender-status').val()
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Update Data Success"){
                        //code
                        Swal.fire({
                            title: 'บันทึกการแก้ไขข้อมูลประกาศสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $('.annEdit-vender-closeClick').click();
                            // $('#show-venderdata-text').html(proxy.venderclickData);
                            // $('#btn-add-announce-vender').prop('disabled' , false);
                            $('#tbl_announce_byvender').DataTable().ajax.reload();
                        });
                    }
                });
            }
        },
        loadAnnounceDataMain()
        {
            let thid = 1;
            $('#tbl_announce thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_announce'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_announce').DataTable().destroy();
            var table = $('#tbl_announce').DataTable({
                          "scrollX": true,
                          "processing": true,
                          "serverSide": true,
                          "stateSave": true,
                          stateLoadParams: function(settings, data) {
                              for (let i = 0; i < data.columns["length"]; i++) {
                                  let col_search_val = data.columns[i].search.search;
                                  if (col_search_val !== "") {
                                      $("input", $("#tbl_announce thead th")[i]).val(col_search_val);
                                  }
                              }
                          },
                          "ajax": {
                          "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/loadAnnounceDataMain/',
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

                $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                    'background-color':'#F5F5F5',
                    'cursor':'no-drop'
                });
        },
        saveAnnounceMain(){
            const proxy = this;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveAnnounceMain' ,{
                action:"saveAnnounceMain",
                textMain:proxy.contentMain,
                username:$('#ann-main-username').val(),
                ecode:$('#ann-main-ecode').val()
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Insert Data Success"){
                    Swal.fire({
                        title: 'บันทึกข้อมูลประกาศสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        $('.ann-main-closeClick').click();
                        $('#tbl_announce').DataTable().ajax.reload();
                    });
                }
            });
        },
        getDataAnnMainByAutoid(autoid)
        {
            // const proxy = this;
            if(autoid != ""){
                axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDataAnnByAutoid' , {
                    action:"getDataAnnByAutoid",
                    autoid:autoid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        //code
                        let result = res.data.annText;
                        this.contentMainEdit = result.an_text;
                        this.dataStatusMain = result.an_status;
                        // $('#annEdit-main-status option[value="'+result.an_status+'"]').prop("selected" , true);
                    }
                });
            }
        },
        saveAnnounceMainEdit(){
            const proxy = this;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/saveAnnounceMainEdit',{
                action:"saveAnnounceMainEdit",
                textMain:proxy.contentMainEdit,
                autoid:$('#annEdit-main-autoid').val(),
                username:$('#annEdit-main-username').val(),
                ecode:$('#annEdit-main-ecode').val(),
                status:$('#annEdit-main-status').val()
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Update Data Success"){
                    Swal.fire({
                        title: 'บันทึกการแก้ไขข้อมูลสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        $('.annEdit-main-closeClick').click();
                        $('#tbl_announce').DataTable().ajax.reload();
                    });
                }
            });
        }
    },

}
</script>

<style scoped>
#tbl_announce_byvender{
    width:100% !important;
}
#tbl_announce{
    width:100% !important;
}
</style>