<template>
  <div id="filterdata">

    <div class="row form-group mt-2">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate" id="startDate" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate" id="endDate" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-submitSearch" name="btn-submitSearch" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-searchClear" name="btn-searchClear" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>

    <div class="row mt-2">
       <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-company" id="filterBy-company" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-status" id="filterBy-status" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-period" id="filterBy-period" class="form-control"></select>
            <input hidden type="text" name="ipf-datamonth" id="ipf-datamonth">
            <input hidden type="text" name="ipf-datayear" id="ipf-datayear">
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

        $('#startDate').Zebra_DatePicker({
            pair: $('#endDate')
        });
        $('#endDate').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {

    },
}
</script>

<style>

</style>