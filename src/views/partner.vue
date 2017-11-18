//参会者界面
<template>
    <div class="partner">
        <el-form ref="meeting" :model="meeting" label-width="80px">
            <el-form-item label="会议主题">
                <el-input  type="text" readonly v-model="meeting.confName"></el-input>
            </el-form-item>
             <el-form-item label="会议详情">
                <el-input type="text" v-model="meetingDscp"></el-input>
                <!-- {{meeting.date}} | {{meeting.time}} | {{meeting.duration}} | {{meeting.status?'已结束':'未开始'}} -->
            </el-form-item>
            <el-form-item label="主持人">
                <el-input type="text" v-model="meeting.confName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="large" type="primary" @click="beginMeeting">加入会议</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        name:'partner',
        data(){
            return{
                meeting:{
                    
                },
                meetingDscp:""
            }
        },
        watch:{
            meeting(val){
                var status = (val.status=="Scheduled"?"未开始":"已结束")
                this.meetingDscp=this.$moment(val.startDate).format("YYYY-MM-DD HH:MM")+" | "+val.duration+"分钟 | "+status
            }
        },
        methods:{
           beginMeeting(){

           }
        },
        created(){
            
        },
        mounted(){
            let mId = this.$route.params.meetingId
            var url = "http://192.168.1.126:8099/api/services/app/meeting/GetMeeting?meetingId="+mId
            this.$ajax.get(url)
            .then(res=>{
                this.meeting = res.data.result
            })
            .catch(error=>{
                console.log(error)
            })
        },
        computed:{
           
        }
    }
</script>

<style>
    .partner{
        margin: 50px auto;
        width: 400px;
    }
</style>