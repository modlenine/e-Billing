<template>
  <div id="reportnotifypay">
        <div class="main-container">
            <div class="pd-ltr-20">
            
                <div class="row">
                    <div class="col-xl-12 mb-30">
                        <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>
                            <h3 style="text-align:center;">หน้ารายงานการส่ง Email แจ้งเตือน</h3>
                            <hr>
                            <table id="tbl_notifypay_admin" class="table table-striped table-bordered" cellspacing="0">
                                <thead>
                                <tr>
                                    <th class="td0">Taxid</th>
                                    <th class="td1">Email</th>
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
export default {
    name:'Reportnotifypay',
    data() {
        return {
            url:this.getUrl(),
			baseurl:this.baseUrl(),
        }
    },
    methods: {
        getReportnotifypay(){
            let thid = 1;
            $('#tbl_notifypay_admin thead th').each(function() {
                var title = $(this).text();
                $(this).html(title + ' <input type="text" id="tbl_notifypay_admin'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
                thid++;
            });

            $('#tbl_notifypay_admin').DataTable().destroy();
            var table = $('#tbl_notifypay_admin').DataTable({
                        "scrollX": true,
                        "processing": true,
                        "serverSide": true,
                        "stateSave": true,
                        stateLoadParams: function(settings, data) {
                            for (let i = 0; i < data.columns["length"]; i++) {
                                let col_search_val = data.columns[i].search.search;
                                if (col_search_val !== "") {
                                    $("input", $("#tbl_notifypay_admin thead th")[i]).val(col_search_val);
                                }
                            }
                        },
                        "ajax": {
                        "url":this.url+'intsys/ebilling/ebilling_backend/apiadmin/getReportnotifypay/',
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

                // $('#tbl_billedreport_admin').prop('readonly' , true).css({
                //     'background-color':'#F5F5F5',
                //     'cursor':'no-drop'
                // });
        }
    },
    mounted() {
        this.getReportnotifypay();
    },
}
</script>

<style>

</style>