<template>
<el-row>
  <el-col>
    <el-dialog :title="meetingDetail.confName" :visible.sync="detailTableVisible" :before-close="handleClose" size="small">
        <div class="meeting-form">
            {{meetingDetail.startDate | formatDate}} | {{meetingDetail.duration}}分钟 | {{meetingDetail.status=="Scheduled"?"未开始":"已结束"}}
            <br>
            <br>
            <el-form ref="meetingDetail" :model="meetingDetail" label-width="80px">
                <el-form-item label="主持人">
                    <el-input type="text" value="张三"></el-input>
                </el-form-item>
                <el-form-item label="会议链接">
                    <el-input type="text" :value="meetingUrl"></el-input>
                </el-form-item>
                 <el-form-item label="会议人员">
                    <el-input type="text" value=""></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button size="large" type="primary" @click="beginMeeting">开始会议</el-button>
                </el-form-item> -->
            </el-form>
        </div>
    </el-dialog>
  </el-col>
</el-row>
</template>

<script>
    export default{
        props:['detailTableVisible','meetingId'],
        data(){
            return{
                meetingUrl:"",
                meetingDetail:{
                    meetingKey: "22664992",
                    confName: "test",
                    startDate: "2017-08-15T09:06:38.657",
                    duration: 60,
                    endDate: "2017-08-15T10:06:38.657",
                    status: "Scheduled",
                    attendees: [
                      {
                        id: 2,
                        userName: "admin",
                        surName: "admin",
                        name: "admin",
                        phoneNumber: null,
                        emailAddress: "admin@defaulttenant.com"
                      }
                    ],
                    roomInfo: {
                      id: 5,
                      roomName: "会议室363359",
                      roomSize: 25
                    }
                },//end meetingDetail
            }
        },//end data()
        methods:{
            beginMeeting(){
                
            },
            handleClose(done){
                this.$emit('close')
                console.log("close be called")
                // this.detailTableVisible=false
                // this.$confirm('确认关闭？')
                //   .then(_ => {
                //     done();
                //   })
                //   .catch(_ => {});
            }
        },
        watch:{
            meetingId(val){
                this.meetingUrl = "http://localhost:8010/#/partner/"+val
            },
            detailTableVisible(val){
                if (val) {
                    console.log("is show ",val)
                    if (this.meetingId!="") {
                        console.log("id is ",this.meetingId)
                        var url = "http://cloud7.cc:8101/api/services/app/meeting/GetMeeting?meetingId="+this.meetingId
                        this.$ajax.get(url)
                        .then(res=>{
                            this.meetingDetail = res.data.result
                            console.log(res)
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    }
                    else{
                        console.log("id is null")
                    }
                }
            }
        },
        filters:{
            formatDate(val){
                return val.replace("T"," ")
            },
            formatStatus(val){
                if (val=="Scheduled") {
                    return '未开始'
                }
            }
        },
        mounted(){
            // this.meetingId = this.$route.query.meetingId
            
        }
    }
</script>


<style scoped>
    .meeting-form{
        margin: 50px auto;
        width: 400px;
    }
</style>