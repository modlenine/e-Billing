<template>
  <div id="filterdata">

    <div class="row form-group">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate-bl" id="startDate-bl" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate-bl" id="endDate-bl" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch-bl" name="btn-dateSearch-bl" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear-bl" name="btn-dateClear-bl" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>

    <div class="row mt-2">
       <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-company-bl" id="filterBy-company-bl" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-status-bl" id="filterBy-status-bl" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <input type="text" name="filterBy-invoiceid-bl" id="filterBy-invoiceid-bl" class="form-control" placeholder="ค้นหาด้วย Invoice">
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-periodbilling-bl" id="filterBy-periodbilling-bl" class="form-control"></select>
        </div>
    </div>

    <hr>
  </div>
</template>

<script>

import $ from 'jquery';



export default {
    name:'FilterData',
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

        $('#startDate-bl').Zebra_DatePicker({
            pair: $('#endDate-bl')
        });
        $('#endDate-bl').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {

    },
}
</script>

<style>

</style>