<template>
  <div id="filterdatareport">
    
    <div class="row mt-2 form-group">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate-rp" id="startDate-rp" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate-rp" id="endDate-rp" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch-rp" name="btn-dateSearch-rp" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear-rp" name="btn-dateClear-rp" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>

    <div class="row mt-2">
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-period-rp" id="filterBy-period-rp" class="form-control" placeholder="กรองด้วยรอบของข้อมูล"></select>
        </div>
       <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-company-rp" id="filterBy-company-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-status-rp" id="filterBy-status-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-creditterm-rp" id="filterBy-creditterm-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-datepayreal-rp" id="filterBy-datepayreal-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <button type="button" id="btn-exportreport" name="btn-exportreport" class="btn btn-info btn-exportreport"
                startDate_filter = "0"
                endDate_filter = "0"
                company_filter = "0"
                status_filter = "0"
                creditterm_filter = "0"
                datepayreal_filter = "0"
                period_filter = "0"
            ><i class="mr-2 dw dw-upload2"></i>ส่งออกข้อมูล</button>
        </div>
    </div>

    <hr>
  </div>
</template>

<script>

import $ from 'jquery';



export default {
    name:'FilterDatareport',
    data() {
        return {
            url:this.getUrl()
        }
    },
    created() {
        
    },
    beforeMount() {

    },
    mounted() {

        $('#startDate-rp').Zebra_DatePicker({
            pair: $('#endDate-rp')
        });
        $('#endDate-rp').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {

    },
}
</script>

<style>

</style>