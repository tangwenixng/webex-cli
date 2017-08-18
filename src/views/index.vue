<template>
  <div>
    <!-- 查询条 -->
    <el-row>
     <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
      <el-col :span="6">
        <h3>安排会议室</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-col :span="18">
                <el-date-picker v-model="form.startDate" type="date" placeholder="必选"></el-date-picker>
            </el-col>
            
          </el-form-item>
          <el-form-item label="时间">
           <el-col :span="18">
               <el-time-picker v-model="form.time" type="time" placeholder="必选" :picker-options="{format:'HH:mm'}" @change="fromTime"></el-time-picker>
           </el-col>
          </el-form-item>
          <el-form-item label="时长">
            <el-col :span="20">
                <el-select v-model="form.duration" placeholder="必选">
                  <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="会议人数">
            <el-col :span="19"><el-input type="number" v-model="form.size" placeholder="必填"></el-input></el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="18">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>

        <el-col :span="12">
            <template>
              <el-table :data="rooms" border class="display-meeting">
                <el-table-column prop="roomInfo.roomName" label="会议室" width="180"></el-table-column>
                <el-table-column prop="roomInfo.roomSize" label="容量" width="180"></el-table-column>
                <el-table-column prop="roomInfo.id" label="操作">
                  <template scope="scope">
                    <el-button size="big" type="danger" :disabled="reserveBtn" @click="handleReserve(scope.$index, scope.row)">预约</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        <el-col :span="3">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
    </el-row>
    <!-- 会议室表格 -->
    <el-row>
      <el-col :span="6">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
      
      <el-col :span="6">
          <el-input type="hidden" value="lll"></el-input>
      </el-col>
    </el-row>
    <!-- 创建会议室popup -->
    <el-row>
      <el-col>
        <el-dialog title="安排会议" :visible.sync="dialogTableVisible" size="small">
          <div style="width:500px;margin-left:200px;">
            <el-row>
              <el-col :span="4">会议主题</el-col>
              <el-col :span="12">
                <el-input type="text" autofocus v-model="meeting.confName"></el-input>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4">日期</el-col>
              <el-col :span="4">
                <el-date-picker readonly type="date" placeholder="选择日期" v-model="form.startDate"></el-date-picker>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4">时间</el-col>
              <el-col :span="4">
                <el-time-picker readonly v-model="form.time" type="time" placeholder="选择时间"></el-time-picker>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4">时长</el-col>
              <el-col :span="4">
                {{form.duration}}小时
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4">邀请与会者</el-col>
              <el-col :span="12">
                <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2]" :default-checked-keys="[2]" :props="defaultProps">
                </el-tree>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="createMeeting">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- <table-show :rooms-data="rooms"></table-show> -->
    <my-meeting></my-meeting>
  </div>
</template>
<script>
// import tableShow from './table.vue'
import myMeeting from './myMeeting.vue'
export default {
  data() {
    return {
      reserveBtn:true,
      form: {
        startDate: '',
        time: '',
        duration: '',
        size: "",
        options: [{
          value: '1',
          label: '1小时'
        }, {
          value: '2',
          label: '2小时'
        }, {
          value: '3',
          label: '3小时'
        }, {
          value: '4',
          label: '4小时'
        }, {
          value: '5',
          label: '5小时'
        }]
      },
      rooms: [{
          roomInfo: {
            id: "1",
            roomName: "AAA",
            roomSize: "2"
          },
          scheduleMeetings: []
        },
        {
          roomInfo: {
            id: "2",
            roomName: "BBB",
            roomSize: "4"
          },
          scheduleMeetings: []
        },
        {
          roomInfo: {
            id: "3",
            roomName: "CCC",
            roomSize: "56"
          },
          scheduleMeetings: []
        },
      ],
      meeting: {
        roomId: 2,
        hostUserId: 2,
        confName: "",
        startDate: "",
        duration: "",
        attendees: [0]
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      data2: [{
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
          },
          {
            id: 3,
            label: '研发',
            children: [{
              id: 31,
              label: '老王'
            }, {
              id: 32,
              label: '神龟'
            }]
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    checkInput(sDate,sTime,duration,size){
        const h = this.$createElement;
        if (sDate==null||sDate=="") {
            this.$notify.error({
              title: '出错了！',
              message: h('i', { style: 'color: teal'}, '日期必选'),
              duration: 2000
            });
            return false;
        }
        if (sTime==null||sTime=="") {
            this.$notify.error({
              title: '出错了！',
              message: h('i', { style: 'color: teal'}, '时间必选'),
              duration: 2000
            });
            return false;
        }
        if (duration==null||duration=="") {
            this.$notify.error({
              title: '出错了！',
              message: h('i', { style: 'color: teal'}, '时长必选'),
              duration: 2000
            });
            return false;
        }
        if (size==null||size=="") {
            this.$notify.error({
              title: '出错了！',
              message: h('i', { style: 'color: teal'}, '人数必填'),
              duration: 2000
            });
            return false;
        }
    },
    //查询按钮
    onSubmit() {

      

      var postData = {}

      var sDate = this.form.startDate
      var sTime = this.form.time
      var duration = this.form.duration

      var checkStatus = this.checkInput(sDate,sTime,duration,this.form.size)
      if (checkStatus==false) {return;}

        //预定按钮
      this.reserveBtn =false
      // console.log("sDate: "+sDate)


      var dateStr = this.$moment(sDate).format('YYYY-MM-DD')

      postData.startTime = dateStr + " " + this.$moment(sTime).format('HH:mm')
      postData.endTime = dateStr + " " + this.$moment(sTime).add(duration, 'h').format('HH:mm')
      postData.size = parseInt(this.form.size)

      console.log(postData)

      this.$ajax.post('http://192.168.1.126:8099/api/services/app/meeting/GetRooms', postData)
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
      this.dialogTableVisible = true
    },
    createMeeting() {
      if (this.meeting.confName=="") {
         const h = this.$createElement;
         this.$notify.error({
          title: '出错了！',
          message: h('i', { style: 'color: teal'}, '时长必选'),
          duration: 2000
        });
         return;
      }
      this.dialogTableVisible = false
      console.log("continue")
      this.meeting.startDate = this.$moment(this.form.startDate).format("YYYY-MM-DD")+" "+this.$moment(this.form.time).format('HH:mm')
      this.meeting.duration = parseInt(this.form.duration)*60

      let url = "http://192.168.1.126:8099/api/services/app/meeting/CreateMeeting"
      console.log(this.meeting)
      this.$ajax.post(url, this.meeting)
        .then(res => {
          let meetingid = res.data.result.meetingId
          console.log("meetingid " + meetingid)

          this.$router.push({
            path: 'meetingDetail',
            query: { "meetingId": meetingid }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    fromTime(val) {
      console.log("time-->>", val)
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
    myMeeting
  }
}

</script>


<style>
    .display-meeting{
        margin-top:70px;
        margin-left: 70px;
    }
</style>
