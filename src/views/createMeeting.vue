//安排会议和编辑会议popup
<template>
    <div>
        <el-row>
          <el-col>
            <el-dialog :before-close="handleClose" :close-on-press-escape="forbiddenEsc" title="安排会议" :visible.sync="createTableVisible" size="small">
              <div style="width:500px;margin-left:200px;">
                <el-row>
                  <el-col :span="4">会议主题</el-col>
                  <el-col :span="12">
                    <el-input type="text" v-model="meeting.confName"></el-input>
                  </el-col>
                </el-row>
                <br>
                <el-row>
                  <el-col :span="4">日期</el-col>
                  <el-col :span="4">
                    <el-date-picker type="date" :picker-options="pickerDate" placeholder="选择日期" v-model="meeting.date"></el-date-picker>
                  </el-col>
                </el-row>
                <br>
                <el-row>
                  <el-col :span="4">时间</el-col>
                  <el-col :span="4">
                    <el-time-picker v-model="meeting.time" type="time" placeholder="选择时间"></el-time-picker>
                  </el-col>
                </el-row>
                <br>
                <el-row>
                  <el-col :span="4">时长</el-col>
                  <el-col :span="4">
                        <el-input type="number" v-model="meeting.duration"></el-input>
                  </el-col>
                </el-row>
                <br>
                <el-row>
                  <el-col :span="4">邀请与会者</el-col>
                  <el-col :span="12">
                    <el-tree :data="meetingAttends" show-checkbox node-key="id" ref="tree" :default-expanded-keys="[2]" :default-checked-keys="[2]" :props="defaultProps">
                    </el-tree>
                  </el-col>
                </el-row>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtn">取 消</el-button>
                <el-button type="primary" @click="createMeeting">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
        <meeting-detail @close="closeDetailTable" :meeting-id="meetingDetailId"  :detail-table-visible="detailTableVisible" ></meeting-detail>
    </div>
</template>

<script>
    import meetingDetail from './meetingDetail.vue'
    export default{
        name:'createMeeting',
        props:['createTableVisible','roomId','meetingId'],
        data(){
            return{
                forbiddenEsc:false,
                attends:[],
                pickerDate:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                     } 
                },
                meeting: {
                    roomId: 2,
                    hostUserId: 2,
                    confName: "",
                    date: "",
                    time:"",
                    duration: "",
                    attendees: [0]
                },
                meetingAttends: [{
                    id: 1,
                    label: '部门',
                    children: [{
                        id: 2,
                        label: '财务',
                        children: [{
                          id: 3,
                          label: 'wenxin'
                        }, {
                          id: 4,
                          label: 'xinzhe'
                        },{
                          id: 5,
                          label: 'xiaofeng'
                        }]
                      }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                meetingDetailId:"",
                detailTableVisible:false,
                editRoomId:""
            }
        },
        methods:{
            createMeeting() {
                  // this.createTableVisible = false
                  this.$emit("close")


                  var sNodes = this.$refs.tree.getCheckedNodes()
                  console.log(sNodes)
                  // for(var i=0;i<sNodes.length;i++ ){
                  //    this.attends.push(sNodes[i].label)
                  // }
                  // this.attends.push(sNodes[2].label)
                  // this.attends.push(sNodes[3].label)

                  let room_id=""
                  if (this.editRoomId!="") {
                    room_id=this.editRoomId
                  }else{
                    room_id = this.roomId
                  }
                  console.log("room_id",room_id)

                  let postData={
                    roomId: room_id,
                    hostUserId: 2,
                    attendees: [sNodes[2].id,sNodes[3].id,sNodes[4].id]
                  }

                  postData.startDate = this.$moment(this.meeting.date).format("YYYY-MM-DD")+" "+this.$moment(this.meeting.time).format('HH:mm')
                  postData.duration = parseInt(this.meeting.duration)*60
                  postData.confName = this.meeting.confName

                  let url = "http://cloud7.cc:8101/api/services/app/meeting/CreateMeeting"
                  console.log(postData)
                  this.$ajax.post(url, postData)
                    .then(res => {
                      let meetingid = res.data.result.meetingId
                      console.log("meetingid " + meetingid)
                      //弹出会议详情popup
                      this.meetingDetailId = meetingid
                      this.detailTableVisible = true
                      // this.$router.push({
                      //   path: 'meetingDetail',
                      //   query: { "meetingId": meetingid }
                      // })
                    })
                    .catch(error => {
                      console.log(error)
                    })
            },
            handleClose(){
                this.$emit("close")
                console.log("close be called")
            },
            closeDetailTable(){
                this.detailTableVisible = false
            },
            cancelBtn(){
                this.$emit("close")
            }
        },//end methods
        watch:{
            createTableVisible(val){
                if (val) {
                    if (this.meetingId!="-1") {
                        var url = "http://cloud7.cc:8101/api/services/app/meeting/GetMeeting?meetingId="+this.meetingId
                        this.$ajax.get(url)
                        .then(res=>{
                            let getMeetingJson = res.data.result
                            console.log(res)
                            this.meeting.confName = getMeetingJson.confName
                            let startDate = getMeetingJson.startDate
                            this.meeting.date = this.$moment(startDate).format("YYYY-MM-DD")
                            let time = this.$moment(startDate).format("HH:mm:ss")
                            this.meeting.time = this.$moment(time,'HH:mm:ss')
                            console.log(this.meeting.time)
                            this.meeting.duration = parseInt(getMeetingJson.duration)/60
                            console.log()
                            this.editRoomId = getMeetingJson.roomInfo.id
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    }else{
                        console.log("mmm")
                    }
                }
            }//end createTableVisible
        },
        components: {
            meetingDetail
      }
    }
</script>