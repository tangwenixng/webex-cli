<template>
   <div>
      <el-row>
        <el-col >
            <div class="">
                <h2>我的会议</h2>
                 <div class="btn-group">
                    <el-button type="success">最近三天</el-button>
                    <el-button type="warning">最近一周</el-button>
                    <el-button type="info">最近一月</el-button>
                 </div>
                 <div class="meeting-table">
                   <el-table :data="meetings" stripe border :row-class-name="tableRowClassName">
                      <el-table-column label="会议主题" header-align="center" width="180">
                          <template scope="scope">
                             <el-button size="small" type="text" @click="turnIntoMeetingDetail(scope.$index, scope.row)">
                                {{scope.row.confName}}
                             </el-button>
                          </template>
                      </el-table-column>
                      <el-table-column prop="startDate" label="主持人" header-align="center" width="180"></el-table-column>
                      <el-table-column prop="startDate" label="开始时间" header-align="center" width="180"></el-table-column>
                      <el-table-column prop="duration" label="会议时长" header-align="center" width="180"></el-table-column>
                      <el-table-column prop="status" label="会议状态" header-align="center" width="180"></el-table-column>
                      <el-table-column prop="status" label="开启会议" header-align="center" width="180">
                        <template scope="scope">
                             <el-button size="small" type="success">
                                立即开始
                             </el-button>
                          </template>
                      </el-table-column>
                       <el-table-column prop="status" label="编辑会议" header-align="center" width="180">
                         <template scope="scope">
                             <el-button size="small" type="text">
                                立即开始
                             </el-button>
                          </template>
                       </el-table-column>
                        <el-table-column prop="status" label="取消会议" header-align="center" width="180">
                          <template scope="scope">
                             <el-button size="small" type="danger">
                                取消会议
                             </el-button>
                          </template>
                        </el-table-column>
                   </el-table>
                 </div>
            </div>
        </el-col>
      </el-row>
      <meeting-detail @close="closeDetailTable" :meeting-id="meetingDetailId" :detail-table-visible="detailTableVisible"></meeting-detail>
   </div>
</template>

<script>
    import meetingDetail from './meetingDetail.vue'
    export default{
        name:'myMeeting',
        data(){
            return{
               detailTableVisible:false,
               meetingDetailId:"",
                meetings:[
                    {
                      meetingId: 5,
                      meetingKey: "24207647",
                      confName: "你好",
                      startDate: "2017-08-16 05:39:41",
                      duration: 60,
                      endDate: "2017-08-16T06:39:41",
                      status: "Scheduled",
                      attendees: null,
                      roomInfo: {
                        id: 2,
                        roomName: "会议室143865",
                        roomSize: 25
                      }
                    },
                    {
                      meetingId: 3,
                      meetingKey: "24207647",
                      confName: "周六",
                      startDate: "2017-08-16 05:39:41",
                      duration: 60,
                      endDate: "2017-08-16T06:39:41.443",
                      status: "Scheduled",
                      attendees: null,
                      roomInfo: {
                        id: 2,
                        roomName: "会议室143865",
                        roomSize: 25
                      }
                    },
                    {
                      meetingId: 6,
                      meetingKey: "24207647",
                      confName: "游戏",
                      startDate: "2017-08-16 05:39:41",
                      duration: 60,
                      endDate: "2017-08-16T06:39:41.443",
                      status: "Scheduled",
                      attendees: null,
                      roomInfo: {
                        id: 2,
                        roomName: "会议室143865",
                        roomSize: 25
                      }
                    }
                ]
            }
        },
        methods:{
            turnIntoMeetingDetail(index,row){
              this.meetingDetailId = row.meetingId
              this.detailTableVisible = true
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                  return 'info-row';
                } else if (index === 2) {
                  return 'positive-row';
                }
                return '';
            },
            closeDetailTable(){
                this.detailTableVisible = false
            }
        },
        computed:{
            
        },
        watch:{
            meetings(val){
              // this.meetings.startDate=val.startDate.replace("T"," ")
            }
        },
        mounted(){
          // let mStartDate = this.$moment().startOf('day').format("YYYY-MM-DD HH:MM")
          // let mEndDate = this.$moment().endOf('day').format("YYYY-MM-DD HH:MM")
          // // console.log("local",mStartDate,mEndDate)
          // let url="http://cloud7.cc:8101/api/services/app/meeting/GetMeetings"
          // this.$ajax.post(url,{
          //     "userId": 0,
          //     "startDate": mStartDate,
          //     "endDate": mEndDate
          // })
          // .then(res=>{
          //   this.meetings = res.data.result.meetings
          // })
          // .catch(err=>{
          //   console.log(err)
          // })
        },
        components: {
              meetingDetail
        }
    }
</script>

<style scoped>
    .meeting{
        float: left;
        margin-top: 60px;
        border-style: solid;
        border-width: thin;
        /*width: 750px;*/
        height: auto;
    }
    .el-table .info-row {
      background: #c9e5f5;
    }

    .el-table .positive-row {
      background: #50bfff;
    }

    .btn-group{
      float: left;
      margin: 20px;
    }
    .meeting-table{
      margin-left: 20px;
    }
</style>