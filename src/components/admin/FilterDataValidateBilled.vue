<template>
  <div id="filterdata_admin">

    <div class="row mt-2 form-group">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate-adbl" id="startDate-adbl" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate-adbl" id="endDate-adbl" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch-adbl" name="btn-dateSearch-adbl" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear-adbl" name="btn-dateClear-adbl" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>

    <div class="row mt-2">
       <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-company-adbl" id="filterBy-company-adbl" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-status-adbl" id="filterBy-status-adbl" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-datepayreal-adbl" id="filterBy-datepayreal-adbl" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <input type="text" name="filterBy-invoiceid-adbl" id="filterBy-invoiceid-adbl" class="form-control" placeholder="ค้นหาด้วย Invoice">
        </div>
    </div>

    <hr>
  </div>
</template>

<script>

import $ from 'jquery';



export default {
    name:'FilterData_admin',
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

        $('#startDate-adbl').Zebra_DatePicker({
            pair: $('#endDate-adbl')
        });
        $('#endDate-adbl').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {

    },
}
</script>

<style>

</style>