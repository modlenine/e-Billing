<template>
  <div id="app">
    <div v-if="this.$router.currentRoute.path.substring(1,6) == 'admin'">
      <div v-if="userData !== null">
        <div v-if="userData.DeptCode == '1003' || userData.DeptCode == '1002'">
          <Headeradmin
            :userDataProps="this.userData"
          />
          <router-view></router-view>
        </div>
        <div v-else>
          <Notallowpage/>
        </div>
      </div>
      <div v-else>
        <Loginpageadmin/>
      </div>
    </div>

    <div v-else>
      <div v-if="userData_vender !== null">
        <Header
          :userDataVenderProps="this.userData_vender"
        />
          <router-view></router-view>
      </div>
      <div v-else-if="this.$route.params.id">
          <router-view></router-view>
      </div>
      <div v-else-if="this.$route.params.waittaxid">
          <Waitactivate/>
      </div>
      <div v-else-if="this.$route.params.resultid">
          <Resultactivate/>
      </div>
      <div v-else-if="this.$route.params.edittaxid">
        <EditemailActivate/>
      </div>
      <div v-else-if="this.$route.params.number">
        <Forgotpassword/>
      </div>
      <div v-else-if="this.$route.params.r_taxid">
        <Resetpassword/>
      </div>
      <div v-else>
        <Loginpage/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/vender/Header.vue';
import Headeradmin from '@/components/admin/Header.vue';
import Loginpage from '@/views/vender/Loginpage.vue';
import Loginpageadmin from '@/views/admin/Loginpage.vue';
import Waitactivate from '@/views/vender/WaitActivate.vue';
import Resultactivate from '@/views/vender/ResultActivate.vue';
import EditemailActivate from '@/views/vender/EditemailActivate.vue'
import Forgotpassword from '@/views/vender/Forgotpassword.vue'
import Resetpassword from '@/views/vender/Resetpassword.vue'
import Notallowpage from '@/views/admin/Notallowpage.vue'
// import axios from 'axios'

export default {
  name:"App",
  components:{
    Header,
    Loginpage,
    Loginpageadmin,
    Headeradmin,
    Waitactivate,
    Resultactivate,
    EditemailActivate,
    Forgotpassword,
    Resetpassword,
    Notallowpage
  },
  data() {
    return {
      userData:this.getSessionStorage(),
      userData_vender:this.getSessionStorage_vender(),
      url:this.getUrl(),
      baseurl:this.baseUrl(),
      events:[
        'click' , 'mousemove' , 'mousedown' , 'scroll' , 'keypress' , 'load'
      ],
      warningTimer:null,
		  logoutTimer:null,
    }
  },
  created() {
    console.log(this.$router.currentRoute.path.substring(1,6));
  },
  mounted() {
    // this.events.forEach(function(event){
		//   window.addEventListener(event , this.resetTimer)
	  // },this);
  },
  beforeUpdate(){
    console.log('update');
    // this.checkDateExpire(this.userData.dateExpire);
  },
  methods: {
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return JSON.parse(getUserData);
    },
     getSessionStorage_vender(){
      const getUserData = localStorage.getItem("userData_vender");
      return JSON.parse(getUserData);
    },

    // checkDateExpire(dateExpire){
    //   axios.get(this.url+'intranet/intranet_backend/api/getDateTimeNow').then(res=>{
    //     let dateTimeNow = res.data.dateTimeNow;
    //     let conDateExpirt = parseFloat(dateExpire);
    //     let conDateNow = parseFloat(dateTimeNow);
    //     if(conDateNow > conDateExpirt){
    //       localStorage.removeItem('userData');
    //       location.href = this.baseurl;
    //     }
    //     console.log("date now : "+dateTimeNow);
    //     console.log("date expire : "+dateExpire);
    //   });

    // },

    // setTimers(){
		//   this.warningTimer = setTimeout(this.warningMessage , 60*60*1000) // 30 Min
	  // },

	  // warningMessage(){
    //   alert('ท่านไม่ได้ใช้งานโปรแกรม เกิน 60 นาทีกรุณา Login ใหม่อีกครั้งหากต้องการใช้งานโปรแกรม');
    //   localStorage.removeItem("userData");
    //   localStorage.removeItem("uriRequest");
    //   this.resetTimer();
    //   window.location = '/'
	  // },


	  // resetTimer(){
    //   clearTimeout(this.warningTimer);
    //   if(this.userData !== null){
    //     this.setTimers();
    //   }
	  // },

  },
}
</script>

<style>

</style>