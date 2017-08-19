<template>
  <div>
    <!-- 查询条 -->
    <el-row>
      <el-col :span="24">
        <h2>安排会议室</h2>
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <!--  -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 会议室表格 -->
    <el-row>
      <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
      <el-col :span="18">
        <template>
          <el-table :data="rooms" border>
            <el-table-column header-align="center" prop="roomInfo.roomName" label="会议室" width="180"></el-table-column>
            <el-table-column header-align="center" prop="roomInfo.roomSize" label="容量" width="180"></el-table-column>
            <el-table-column header-align="center" prop="" label="会议状态">
                <template scope="scope">
                    <div v-for="meeting in scope.row.scheduleMeetings">
                            {{meeting.startTime}}~{{meeting.endTime}} : {{meeting.host}}的会议
                    </div>
                </template>
            </el-table-column>
            <el-table-column header-align="center" prop="roomInfo.id" label="操作">
              <template scope="scope">
                <el-button size="big" type="danger" @click="handleReserve(scope.$index, scope.row)">预约</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
      <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
    </el-row>
    <!-- 创建会议室popup -->
    <el-row>
      <el-col>
        <el-dialog title="安排会议" :visible.sync="scheduleTableVisible" size="small">
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
                <el-date-picker type="date" placeholder="选择日期" v-model="meeting.date"></el-date-picker>
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
                <el-tree :data="meetingAttends" show-checkbox node-key="id" :default-expanded-keys="[2]" :default-checked-keys="[2]" :props="defaultProps">
                </el-tree>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="scheduleTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="createMeeting">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <meeting-detail @close="closeDetailTable" :meeting-id="meetingDetailId" :detail-table-visible="detailTableVisible"></meeting-detail>
  </div>
</template>
<script>
import meetingDetail from './meetingDetail.vue'
export default {
  data() {
    return {
      form: {
        startDate: ''
      },
      rooms: [{
          roomInfo: {
            id: "1",
            roomName: "AAA",
            roomSize: "2"
          },
          scheduleMeetings: [{
            host:"twx",
            startTime:"09:00",
            endTime:"11:00"
          },{
            host:"ymj",
            startTime:"09:00",
            endTime:"11:00"
          }]
        }
      ],
      meeting: {
        roomId: 2,
        hostUserId: 2,
        confName: "",
        date: "",
        time:"",
        duration: "",
        attendees: [0]
      },
      scheduleTableVisible: false,
      dialogFormVisible: false,
      meetingAttends: [{
        id: 1,
        label: '部门',
        children: [{
            id: 2,
            label: '财务',
            children: [{
              id: 21,
              label: '张三'
            }, {
              id: 22,
              label: '李四'
            }]
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      meetingDetailId:"",
      detailTableVisible:false
    }
  },
  methods: {
    //查询按钮
    onSubmit() {
      var postData = {}

      var sDate = this.form.startDate

      var mDate = this.$moment(sDate)

      postData.startTime = mDate.startOf('day').format("YYYY-MM-DD HH:MM")
      postData.endTime = mDate.endOf('day').format("YYYY-MM-DD HH:MM")
      postData.size=5
      console.log(postData)

      this.$ajax.post('http://cloud7.cc:8101/api/services/app/meeting/GetRooms', postData)
        .then(res => {
          this.rooms = res.data.result.rooms
          console.log(this.rooms)
        }).catch(function(error) {
          console.log("error-->>" + error);
        });
    },
    //预约
    handleReserve(index, row) {
      // console.log(index,row)
      // console.log(row.roomInfo.id)
      this.meeting.roomId = row.roomInfo.id
      if (this.form.startDate!="") {
        this.meeting.date = this.form.startDate
      }
      this.scheduleTableVisible = true
    },
    createMeeting() {
      this.scheduleTableVisible = false

      let postData={
        roomId: 2,
        hostUserId: 2,
        attendees: []
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
    fromTime(val) {
      console.log("time-->>", val)
    },
    closeDetailTable(){
        this.detailTableVisible = false
    }
  },
  mounted() {
    // let data={
    //     startTime: "2017-08-17T00:31:47.403Z",
    //     endTime: "2017-08-17T00:31:47.403Z",
    //     size: 0
    // }
    // this.$ajax.post('http://192.168.1.126:8099/api/services/app/meeting/GetRooms',data)
    // .then(res=>{
    //     this.rooms=res.data.result.rooms
    //     console.log(this.rooms)
    // }).catch(function (error) {
    //     console.log("error-->>"+error);
    // });
  },
  components: {
        meetingDetail
  }
}

</script>
