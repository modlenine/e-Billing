<template>
  <div id="filterdatareport">

    <div class="row form-group">
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
            <select name="filterBy-company-rp" id="filterBy-company-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-status-rp" id="filterBy-status-rp" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-periodbilling-rp" id="filterBy-periodbilling-rp" class="form-control"></select>
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