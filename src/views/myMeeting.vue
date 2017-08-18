<template>
    <el-row>
      <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
      <el-col :span="18">
          <div class="meeting">
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
                           <el-button size="small" type="danger" @click="turnIntoMeetingDetail(scope.$index, scope.row)">
                              {{scope.row.confName}}
                           </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startDate" label="开始时间" header-align="center" width="180"></el-table-column>
                    <el-table-column prop="duration" label="会议时长" header-align="center" width="180"></el-table-column>
                    <el-table-column prop="status" label="会议状态" header-align="center" width="180"></el-table-column>
                 </el-table>
               </div>
          </div>
      </el-col>
      <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
    </el-row>
    
</template>

<script>
    export default{
        name:'myMeeting',
        data(){
            return{
                meetings:[
                    {
                      meetingId: 32,
                      meetingKey: "24207647",
                      confName: "string",
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
                      meetingId: 23,
                      meetingKey: "24207647",
                      confName: "string",
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
                      meetingId: 9,
                      meetingKey: "24207647",
                      confName: "string",
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
              console.log(index,row);
              console.log(row.meetingId)
                this.$router.push({
                  path:"meetingDetail",
                  query:{
                    "meetingId":meeting.meetingId
                  }
                })
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                  return 'info-row';
                } else if (index === 2) {
                  return 'positive-row';
                }
                return '';
            }
        },
        computed:{
            
        },
        mounted(){
          let url="http://192.168.1.126:8099/api/services/app/meeting/GetMeetings"
          this.$ajax.post(url,{
              "userId": 0,
              "startDate": "2017-08-15T00:31:47.422Z",
              "endDate": "2017-08-17T00:31:47.422Z"
          })
          .then(res=>{
            console.log(res)
            this.meetings = res.data.result.meetings
          })
          .catch(err=>{
            console.log(err)
          })
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