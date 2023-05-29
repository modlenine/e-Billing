<template>
  <div id="home">

      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าแรก</h3>
                      <hr>
                      <div>
                        <h4 style="text-align:center;">ประกาศหลัก</h4>
                        <div class="mt-3"></div>
                        <table id="tbl_announce_mainshow" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <th class="antd1">วันที่ประกาศ</th>
                                <th class="antd2">รายละเอียด</th>
                            </tr>
                            </thead>
                        </table>
                      </div>
                      <hr>
                      <div class="mt-4">
                        <h4 style="text-align:center;">ประกาศย่อย</h4>
                        <div class="mt-3"></div>
                        <table id="tbl_announce_show" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <th class="antd1">วันที่ประกาศ</th>
                                <th class="antd2">รายละเอียด</th>
                            </tr>
                            </thead>
                        </table>
                      </div>
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

export default {
  name:"Home",
  components:{

  },
  data() {
    return {
      url:this.getUrl(),
			baseurl:this.baseUrl(),
      userData_vender:this.getSessionStorage_vender(),
    }
  },
  created() {
   
  },
  mounted() {
    this.loadAnnounceData_byvender();
    this.loadAnnounceData_main();
  },
  methods: {
    loadAnnounceData_byvender(){
      const proxy = this;
      let taxid = proxy.userData_vender.taxid;
        // console.log(taxid);
        let thid = 1;
        $('#tbl_announce_show thead th').each(function() {
            var title = $(this).text();
            $(this).html(title + ' <input type="text" id="tbl_announce_show'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
            thid++;
        });

        $('#tbl_announce_show').DataTable().destroy();
        var table = $('#tbl_announce_show').DataTable({
                      "scrollX": true,
                      "processing": true,
                      "serverSide": true,
                      "stateSave": true,
                      stateLoadParams: function(settings, data) {
                          for (let i = 0; i < data.columns["length"]; i++) {
                              let col_search_val = data.columns[i].search.search;
                              if (col_search_val !== "") {
                                  $("input", $("#tbl_announce_show thead th")[i]).val(col_search_val);
                              }
                          }
                      },
                      "ajax": {
                      "url":this.url+'intsys/ebilling/ebilling_backend/apivender/loadAnnounceData_show/'+taxid,
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
    loadAnnounceData_main(){
        // console.log(taxid);
        let thid = 1;
        $('#tbl_announce_mainshow thead th').each(function() {
            var title = $(this).text();
            $(this).html(title + ' <input type="text" id="tbl_announce_mainshow'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
            thid++;
        });

        $('#tbl_announce_mainshow').DataTable().destroy();
        var table = $('#tbl_announce_mainshow').DataTable({
                      "scrollX": true,
                      "processing": true,
                      "serverSide": true,
                      "stateSave": true,
                      stateLoadParams: function(settings, data) {
                          for (let i = 0; i < data.columns["length"]; i++) {
                              let col_search_val = data.columns[i].search.search;
                              if (col_search_val !== "") {
                                  $("input", $("#tbl_announce_mainshow thead th")[i]).val(col_search_val);
                              }
                          }
                      },
                      "ajax": {
                      "url":this.url+'intsys/ebilling/ebilling_backend/apivender/loadAnnounceData_main/',
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
    getSessionStorage_vender(){
        const getUserData = localStorage.getItem("userData_vender");
        return JSON.parse(getUserData);
    },
  },

  }
</script>

<style scoped>

</style>