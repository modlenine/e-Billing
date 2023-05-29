<template>
  <div id="filterdatareportsum">
    
    <div class="row mt-2 form-group">
        <div class="col-md-4 col-lg-4 form-group">
            <select name="filterBy-company-rps" id="filterBy-company-rps" class="form-control"></select>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch-rps" name="btn-dateSearch-rps" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear-rps" name="btn-dateClear-rps" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>


    <hr>
  </div>
</template>

<script>

import $ from 'jquery';



export default {
    name:'FilterDatareportsum',
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