<template>
  <div id="home">

      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">Dashboard</h3>
                      <hr>
                      <div>
                        <h4 style="text-align:center;">ข้อมูลการวางบิลทั้งหมด</h4>
                      </div>
                      <div class="row form-group mt-3">
                        <div class="col-md-3 from-group">
                          <div class="card card-box dashBox1 text-center p-3">
                            <blockquote class="blockquote mb-0">
                              <p>เอกสารทั้งหมด</p>
                              <p><span class="text-bill-all"></span></p>
                            </blockquote>
                          </div>
                        </div>
                        <div class="col-md-3 form-group">
                          <div class="card card-box dashBox2 text-center p-3">
                            <blockquote class="blockquote mb-0">
                              <p>ที่ยังไม่ได้วางบิล</p>
                              <p><span class="text-bill-wait"></span></p>
                            </blockquote>
                          </div>
                        </div>
                        <div class="col-md-3 form-group">
                          <div class="card card-box dashBox3 text-center p-3">
                            <blockquote class="blockquote mb-0">
                              <p>ที่กำลังวางบิล</p>
                              <p><span class="text-bill-billing"></span></p>
                            </blockquote>
                          </div>
                        </div>
                        <div class="col-md-3 from-group">
                          <div class="card card-box dashBox4 text-center p-3">
                            <blockquote class="blockquote mb-0">
                              <p>ที่วางบิลแล้ว</p>
                              <p><span class="text-bill-billed"></span></p>
                            </blockquote>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="row form-group">
                        <div class="col-md-12 text-center">
                          <h4>ข้อมูลการวางบิลแสดงผลรายปี</h4>
                        </div>
                      </div>
                      <Graph1/>
   
                  </div>
                </div>
              </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Graph1 from '@/components/admin/Graph1.vue'

export default {
  name:"Home",
  components:{
    Graph1
  },
  data() {
    return {
      url:this.getUrl(),
			baseurl:this.baseUrl(),
    }
  },
  mounted() {
    this.getDataGraph();
  },
  methods: {
    getDataGraph()
    {
      axios.post(this.url+'intsys/ebilling/ebilling_backend/apiadmin/getDataGraph',{
        action:"getDataGraph"
      }).then(res=>{
        console.log(res.data);
        if(res.data.status == "Select Data Success"){
          //Code
          let billall = res.data.billuploadAll;
          let billwait = res.data.billuploadWait;
          let billing = res.data.billuploadBilling;
          let billed = res.data.billuploadBilled;

          $('.text-bill-all').html(billall);
          $('.text-bill-wait').html(billwait);
          $('.text-bill-billing').html(billing);
          $('.text-bill-billed').html(billed);
        }
      });
    }
  },

  }
</script>

<style scoped>
.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

#container {
  height: 400px;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}

.highcharts-data-table tr:hover {
  background: #f1f7ff;
}


.dashBox1{
	background-color:#00b1c5;
	color:#ffffff;
}
.dashBox2{
	background-color:#CC0000;
	color:#ffffff;
}
.dashBox3{
	background-color:#FF8C00;
	color:#ffffff;
}
.dashBox4{
	background-color:#228B22;
	color:#ffffff;
}
</style>