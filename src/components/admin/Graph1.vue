<template>
  <div id="graph1">
    <div id="menu_graph1" class="row mb-2">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
            <select name="ip-selectYear" id="ip-selectYear" class="form-control"></select>
        </div>
        <div class="col-lg-3"></div>
    </div>
    <div id="menu_graph2" class="row mb-2" style="display:none;">
        <div class="col-lg-12">
            <button class="btn btn-primary" id="btn-graph2Back">ย้อนกลับ</button>
        </div>
    </div>

    <figure class="highcharts-figure">
        <div id="container" class="mb-2"></div>
        <div style="height:100px;"></div>
        <div id="container2" class="mt-2"></div>
    </figure>

  </div>
</template>

<script>
import Highcharts from 'highcharts';
import axios from 'axios';
import $ from 'jquery';

export default {
    name:"Graph1",
    data() {
        return {
            url:this.getUrl(),
        }
    },
    created() {

    },
    beforeMount() {
        this.getYearList();
        
    },
    mounted() {
        const proxy = this;

        
        // $('#btn-graph2Back').click(function(){
        //     proxy.getDataForGraph1($('#ip-selectYear').val());
        //     $('#container2').html('');
        //     $('#menu_graph2').css('display' , 'none');
        // });

        $('#ip-selectYear').on('change' , function(){
            console.log($(this).val());
            proxy.getDataForGraph1($(this).val());
        })
    },
    methods: {
        getDataForGraph1(selectYear)
        {
            const proxy = this;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getGraph1/',{
                action:"getDataForGraph1",
                selectYear:selectYear
            }).then(res=>{
                console.log(res.data);

                if(res.data.status == "Select Data Success"){
                    
                    let month = 12;
                    let billuploadAll = res.data.resultAll;
                    let billuploadWait = res.data.resultWait;
                    let billuploadBilling = res.data.resultBilling;
                    let billuploadBilled = res.data.resultBilled;
                    let dataAll = [];
                    let dataWait = [];
                    let dataBilling = [];
                    let dataBilled = [];
                    // let monthArray = [];
                    let dataAllsub = 0;
                    let dataWaitsub = 0;
                    let dataBillingsub = 0;
                    let dataBilledsub = 0;

                    for(let im = 1; im <= month; im++){

                        for(let i = 0; i < billuploadAll.length; i++){
                            let condataMonth = parseFloat(billuploadAll[i].dataMonth);
                            if(im === condataMonth){
                                dataAllsub = parseFloat(billuploadAll[i].invoice);
                            }else if(im > condataMonth){
                                dataAllsub = 0;
                            }
                        }
                        dataAll.push(dataAllsub);

                        for(let i = 0; i < billuploadWait.length; i++){
                            let condataMonth = parseFloat(billuploadWait[i].dataMonth);
                            if(im === condataMonth){
                                dataWaitsub = parseFloat(billuploadWait[i].invoice);
                            }else if(im > condataMonth){
                                dataWaitsub = 0;
                            }
                        }
                        dataWait.push(dataWaitsub);


                        for(let i = 0; i < billuploadBilling.length; i++){
                            let condataMonth = parseFloat(billuploadBilling[i].dataMonth);
                            if(im === condataMonth){
                                dataBillingsub = parseFloat(billuploadBilling[i].invoice);
                            }else if(im > condataMonth){
                                dataBillingsub = 0;
                            }
                        }
                        dataBilling.push(dataBillingsub);


                        for(let i = 0; i < billuploadBilled.length; i++){
                            let condataMonth = parseFloat(billuploadBilled[i].dataMonth);
                            if(im === condataMonth){
                                dataBilledsub = parseFloat(billuploadBilled[i].invoice);
                            }else if(im > condataMonth){
                                dataBilledsub = 0;
                            }
                        }
                        dataBilled.push(dataBilledsub);

                    }
                    

                    console.log(dataAll);
                    console.log(dataWait);
                    console.log(dataBilling);
                    console.log(dataBilled);


                    proxy.createGraph1(dataAll , dataWait , dataBilling , dataBilled);
                }
            });
            
        },
        // getDataForGraph2ByCat(selectMonth , selectYear , month)
        // {
        //     const proxy = this;
        //     axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_getGraph2_bycat/',{
        //         action:"getDataForGraph2bycat",
        //         selectMonth:selectMonth,
        //         selectYear:selectYear
        //     }).then(res=>{
        //         // console.log(res.data);

        //         if(res.data.status == "Select Data Success"){

        //             let monthByCatResult = res.data.result;
        //             let monthByUserResult = res.data.result2;

        //             let onsiteJobCat_bymonth = [];
        //             let onsiteJobCatCount_bymonth = [];

        //             let onsiteUser_bymonth = [];
        //             let onsiteUserCount_bymonth = [];

        //             let sumServiceOnMonth = 0;
        //             let sumUserOnMonth = 0;

        //             console.log(monthByCatResult);

        //             for(let i = 0; i < monthByCatResult.length; i++){
        //                 onsiteJobCat_bymonth.push(monthByCatResult[i].onsite_job_cat);
        //                 onsiteJobCatCount_bymonth.push(parseFloat(monthByCatResult[i].countdata));

        //                 sumServiceOnMonth += parseFloat(monthByCatResult[i].countdata);
        //             }

        //             for(let i = 0; i < monthByUserResult.length; i++){
        //                 onsiteUser_bymonth.push(monthByUserResult[i].onsite_user_inform);
        //                 onsiteUserCount_bymonth.push(parseFloat(monthByUserResult[i].countdata));

        //                 sumUserOnMonth++;
        //             }
        //             console.log(onsiteJobCat_bymonth);
        //             console.log(onsiteJobCatCount_bymonth);
        //             proxy.getGraph2MonthByCat(onsiteJobCat_bymonth , onsiteJobCatCount_bymonth , month);
        //             proxy.getGraph2MonthByUser(onsiteUser_bymonth , onsiteUserCount_bymonth , month);

        //             $('#allServiceSum_txt').text(sumServiceOnMonth+' งาน');
        //             $('#allUserSum_txt').text(sumUserOnMonth+' คน');
        //         }
        //     });
            
        // },
        // getGraph1(countOnsite_array , selectYear)
        // {
        //     const proxy = this;
        //     Highcharts.setOptions({
        //         lang: {
        //             thousandsSep: ','
        //         }
        //     });

        //     Highcharts.chart('container', 
        //     {

        //         chart: {
        //             type: 'column'
        //         },
        //         title: {
        //             text: 'กราฟแสดงจำนวนงาน Service ในแต่ละเดือน'
        //         },

        //         subtitle: {
        //             text: 'ข้อมูลงานประจำปี '+selectYear
        //         },

        //         yAxis: {
        //             title: {
        //                 text: 'จำนวน (งาน)'
        //             }
        //         },

        //         xAxis: {
        //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //         },

        //         legend: {
        //             // layout: 'vertical',
        //             align: 'right',
        //             // verticalAlign: 'middle'
        //         },

        //         plotOptions: {
        //             series: {
        //                 point: {
        //                     events: {
        //                         click: function() {
        //                             let month = proxy.conMonthName(this.category);
        //                             // var linkchart = '#';
        //                             // let datestarts = $('#datestart').val();
        //                             // let dateends = $('#dateend').val();

        //                             $('#menu_graph2').css('display' , '');
                                    

        //                             console.log(month);
        //                             proxy.getDataForGraph2ByCat(month , selectYear , this.category);

        //                         }
        //                     }
        //                 },
        //                 dataLabels: {
        //                     align: 'left',
        //                     enabled: true,
        //                     format: '<span style="font-size:9px;">{point.y:,.0f} งาน</span>',
        //                     rotation: 330,
        //                 },
        //                 pointStart: 0
        //             }
        //         },

        //         tooltip: {
        //             headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
        //             pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
        //         },

        //         series: [{
        //             name: 'งาน Service ประจำปี '+selectYear,
        //             data: countOnsite_array
        //         }],

        //         responsive: {
        //             rules: [{
        //                 condition: {
        //                     maxWidth: 500
        //                 },
        //                 chartOptions: {
        //                     legend: {
        //                         // layout: 'horizontal',
        //                         align: 'right',
        //                         // verticalAlign: 'bottom'
        //                         // horizontal
        //                     }
        //                 }
        //             }]
        //         }

        //     });
        // },
        // getGraph1YearByUser(onsiteUser_byyear , onsiteUserCount_byyear , selectYear)
        // {
        //     Highcharts.setOptions({
        //         lang: {
        //             thousandsSep: ','
        //         }
        //     });

        //     let minWidth = 0;
        //     if(onsiteUser_byyear.length > 50){
        //         minWidth = 5000;
        //     }else{
        //         minWidth = 1000;
        //     }

        //     Highcharts.chart('container2', 
        //     {
                
        //         chart: {
        //             type: 'column',
        //             scrollablePlotArea: {
        //             minWidth: minWidth,
        //             scrollPositionX: 1
        //             }
        //         },
        //         title: {
        //             text: 'กราฟแสดงจำนวนงาน Service ของปี '+selectYear
        //         },

        //         subtitle: {
        //             text: 'ข้อมูลงานประจำเดือน'
        //         },

        //         yAxis: {
        //             title: {
        //                 text: 'จำนวน (งาน)'
        //             },
        //             max: 40,
        //         },

        //         xAxis: {
        //             categories: onsiteUser_byyear
        //         },

        //         legend: {
        //             layout: 'vertical',
        //             align: 'right',
        //             verticalAlign: 'middle'
        //         },

        //         plotOptions: {
        //             series: {
        //                 point: {
        //                     events: {
        //                         click: function() {
        //                             var linkchart = '#';
        //                             // let datestarts = $('#datestart').val();
        //                             // let dateends = $('#dateend').val();
        //                             console.log(linkchart);
        //                         }
        //                     }
        //                 },
        //                 dataLabels: {
        //                     align: 'left',
        //                     enabled: true,
        //                     format: '<span style="font-size:9px;">{point.y:,.0f}</span>',
        //                     rotation: 330,
        //                 },
        //                 pointStart: 0
        //             }
        //         },

        //         tooltip: {
        //             headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
        //             pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
        //         },

        //         series: [{
        //             name: 'Service ประจำปี',
        //             data: onsiteUserCount_byyear
        //         }],

        //         responsive: {
        //             rules: [{
        //                 condition: {
        //                     maxWidth: 1300
        //                 },
        //                 chartOptions: {
        //                     legend: {
        //                         layout: 'horizontal',
        //                         align: 'center',
        //                         verticalAlign: 'bottom'
        //                         // horizontal
        //                     }
        //                 }
        //             }]
        //         }

        //     });
        // },
        // getGraph2MonthByCat(onsiteJobCat_bymonth , onsiteJobCatCount_bymonth , selectMonth)
        // {
        //     Highcharts.setOptions({
        //         lang: {
        //             thousandsSep: ','
        //         }
        //     });

        //     Highcharts.chart('container', 
        //     {

        //         chart: {
        //             type: 'column'
        //         },
        //         title: {
        //             text: 'กราฟแสดงจำนวนงาน Service ของเดือน '+selectMonth
        //         },

        //         subtitle: {
        //             text: 'ข้อมูลงานแยกตามประเภท'
        //         },

        //         yAxis: {
        //             title: {
        //                 text: 'จำนวน (งาน)'
        //             }
        //         },

        //         xAxis: {
        //             categories: onsiteJobCat_bymonth
        //         },

        //         legend: {
        //             // layout: 'vertical',
        //             align: 'right',
        //             // verticalAlign: 'middle'
        //         },

        //         plotOptions: {
        //             series: {
        //                 point: {
        //                     events: {
        //                         click: function() {
        //                             // var linkchart = '#';
        //                             // let datestarts = $('#datestart').val();
        //                             // let dateends = $('#dateend').val();
        //                             console.log(this.category);
        //                         }
        //                     }
        //                 },
        //                 dataLabels: {
        //                     align: 'left',
        //                     enabled: true,
        //                     format: '<span style="font-size:9px;">{point.y:,.0f} งาน</span>',
        //                     rotation: 330,
        //                 },
        //                 pointStart: 0
        //             }
        //         },

        //         tooltip: {
        //             headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
        //             pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
        //         },

        //         series: [{
        //             name: 'รายการ Service',
        //             data: onsiteJobCatCount_bymonth
        //         }],

        //         responsive: {
        //             rules: [{
        //                 condition: {
        //                     maxWidth: 500
        //                 },
        //                 chartOptions: {
        //                     legend: {
        //                         layout: 'horizontal',
        //                         align: 'center',
        //                         verticalAlign: 'bottom'
        //                         // horizontal
        //                     }
        //                 }
        //             }]
        //         }

        //     });
        // },
        // getGraph2MonthByUser(onsiteUser_bymonth , onsiteUserCount_bymonth , selectMonth)
        // {
        //     Highcharts.setOptions({
        //         lang: {
        //             thousandsSep: ','
        //         }
        //     });

        //     let minWidth = 0;
        //     if(onsiteUser_bymonth.length > 50){
        //         minWidth = 4000;
        //     }else{
        //         minWidth = 2000;
        //     }

        //     Highcharts.chart('container2', 
        //     {

        //         chart: {
        //             type: 'column',
        //             scrollablePlotArea: {
        //             minWidth: minWidth,
        //             scrollPositionX: 1
        //             }
        //         },
        //         title: {
        //             text: 'กราฟแสดงจำนวนงาน Service ของเดือน '+selectMonth
        //         },

        //         subtitle: {
        //             text: 'ข้อมูลงานประจำเดือน'
        //         },

        //         yAxis: {
        //             title: {
        //                 text: 'จำนวน (งาน)'
        //             }
        //         },

        //         xAxis: {
        //             categories: onsiteUser_bymonth
        //         },

        //         legend: {
        //             // layout: 'vertical',
        //             align: 'right',
        //             // verticalAlign: 'middle'
        //         },

        //         plotOptions: {
        //             series: {
        //                 point: {
        //                     events: {
        //                         click: function() {
        //                             var linkchart = '#';
        //                             // let datestarts = $('#datestart').val();
        //                             // let dateends = $('#dateend').val();
        //                             console.log(linkchart);
        //                         }
        //                     }
        //                 },
        //                 dataLabels: {
        //                     align: 'left',
        //                     enabled: true,
        //                     format: '<span style="font-size:9px;">{point.y:,.0f}</span>',
        //                     rotation: 330,
        //                 },
        //                 pointStart: 0
        //             }
        //         },

        //         tooltip: {
        //             headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
        //             pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
        //         },

        //         series: [{
        //             name: 'Service ประจำเดือน',
        //             data: onsiteUserCount_bymonth
        //         }],

        //         responsive: {
        //             rules: [{
        //                 condition: {
        //                     maxWidth: 500
        //                 },
        //                 chartOptions: {
        //                     legend: {
        //                         layout: 'horizontal',
        //                         align: 'center',
        //                         verticalAlign: 'bottom'
        //                         // horizontal
        //                     }
        //                 }
        //             }]
        //         }

        //     });
        // },
        conMonthName(monthName)
        {
            if(monthName != ""){
                let month = 0;
                switch(monthName){
                    case "Jan":
                        month = 1
                        break;
                    case "Feb":
                        month = 2
                        break;
                    case "Mar":
                        month = 3
                        break;
                    case "Apr":
                        month = 4
                        break;
                    case "May":
                        month = 5
                        break;
                    case "Jun":
                        month = 6
                        break;
                    case "Jul":
                        month = 7
                        break;
                    case "Aug":
                        month = 8
                        break;
                    case "Sep":
                        month = 9
                        break;
                    case "Oct":
                        month = 10
                        break;
                    case "Nov":
                        month = 11
                        break;
                    case "Dec":
                        month = 12
                        break;
                }

                return month;
            }
        },
        getYearList()
        {
            const proxy = this;
            axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getYearList' , {
                action:"getYearList"
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let html = '<option value="">กรุณาเลือกปี</option>';
                    let resultYear = res.data.yearList;
                    let yearNow = res.data.yearNow;
                    for(let i = 0; i < resultYear.length; i++){
                        html += `
                        <option value="`+resultYear[i].dataYear+`">`+resultYear[i].dataYear+`</option>
                        `;
                    }

                    $('#ip-selectYear').html(html);

                    $('#ip-selectYear option[value="'+yearNow+'"]').prop('selected' , true);
                    proxy.getDataForGraph1(yearNow);
                }
            });
        },

        createGraph1(dataAll , dataWait , dataBilling , dataBilled){
            Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'ข้อมูลการวางบิล'
            },
            subtitle: {
                text: 'แสดงข้อมูลรายปี'
            },
            xAxis: {
                categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                text: 'จำนวน Invoice'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                pointPadding: 0.2,
                borderWidth: 0
                }
            },
            series: [{
                name: 'ทั้งหมด',
                data: dataAll

            }, {
                name: 'รอวางบิล',
                data: dataWait

            }, {
                name: 'กำลังวางบิล',
                data: dataBilling

            }, {
                name: 'วางบิลแล้ว',
                data: dataBilled

            }]
            });
        }
    },
}
</script>

<style>

</style>