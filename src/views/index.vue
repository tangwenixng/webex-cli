//首页
<template>
  <div>
    <!-- 查询条 -->
    <el-row>
      <el-col :span="24">
        <h2>安排会议室</h2>
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-date-picker :picker-options="pickerDate" v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
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
                    <div v-if="checkMeetingSize(scope.row.scheduleMeetings)">
                        <div style="float:left;" v-for="meeting in scope.row.scheduleMeetings">
                            <div v-if="checkMeetingIsNull(meeting)">
                                空闲
                            </div>
                            <div v-else>
                                {{meeting.startDate| formatDate}}{{meeting.endDate | formatDate}}  {{meeting.confName}} <br />
                            </div>
                        </div>
                       <!--  <br> -->
                    </div>
                    <div style="float:left;" v-else><p>空闲</p></div>
                </template>
            </el-table-column>
            <el-table-column header-align="center" width="200" prop="roomInfo.id" label="操作">
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
    <create-meeting @close="closeCreateTable" :room-id="roomInfoId" :meeting-id="-1" :create-table-visible="createTableVisible"></create-meeting>
    <!-- <meeting-detail @close="closeDetailTable" :meeting-id="meetingDetailId" :detail-table-visible="detailTableVisible"></meeting-detail> -->
  </div>
</template>
<script>
// import meetingDetail from './meetingDetail.vue'
import createMeeting from './createMeeting.vue'
export default {
  data() {
    return {
      pickerDate:{
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
         } 
      },
      form: {
        startDate: ''
      },
      rooms: [{
          roomInfo: {
            id: "1",
            roomName: "AAA",
            roomSize: "2"
          },
          scheduleMeetings: [{}]
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
      roomInfoId:"",
      createTableVisible:false
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
      // this.meeting.roomId = row.roomInfo.id
      // if (this.form.startDate!="") {
      //   this.meeting.date = this.form.startDate
      // }
      this.roomInfoId = row.roomInfo.id  //会议室id
       console.log(this.roomInfoId)
      this.createTableVisible = true //创建会议室
    },
    fromTime(val) {
      console.log("time-->>", val)
    },
    closeCreateTable(){
        this.createTableVisible=false
    },
    checkMeetingIsNull(val){
        // console.log(typeof(val))
        if(val instanceof Object){
            if (val.length==0) {
                return true
            }else{
                //判断是否是空对象
                for (var name in val) 
                {
                    return false;
                }
                return true;
            }
        }
        // if (typeof(val)=="undefined") {
        //     console.log(false)
        //     return false
        // }else{
        //     console.log(true)
        //     return true
        // }
    },
    checkMeetingSize(val){
        // console.log(val instanceof Array)
        if (val.length>0) {
            // console.log("size",val.length)
            return true
        }
        // console.log("false")
        return false
    }
  },
  mounted() {
    let data={
        size: 5
    }
    let mStartDate = this.$moment().startOf('day').format("YYYY-MM-DD HH:MM")
      let mEndDate = this.$moment().endOf('day').format("YYYY-MM-DD HH:MM")
      console.log("local",mStartDate,mEndDate)

      data.startTime = mStartDate
      data.endTime = mEndDate

    this.$ajax.post('http://cloud7.cc:8101/api/services/app/meeting/GetRooms',data)
    .then(res=>{
        this.rooms=res.data.result.rooms
        console.log(this.rooms)
    }).catch(function (error) {
        console.log("error-->>"+error);
    });
  },
  filters:{
    formatDate(val){
        if (typeof(val)!="undefined") {
            let dd = " "+val.substr(val.indexOf("T")+1)+" ~ " 
            return dd
        }
        return ""
    },
    formatStatus(val){
        if (val=="Scheduled") {
            return "未开始"
        }
    }
  },
  components: {
        createMeeting
  }
}

</script>
