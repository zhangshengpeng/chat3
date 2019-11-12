<template>
  <div class="container">
    <div class="main">
      <audio id="ding" controls="controls" hidden>
        <!-- <source src="http://101.132.116.167/music/new.mp3">
        <source src="http://101.132.116.167/music/new.wav"> -->
      </audio>
      <!-- <audio id="lp" controls="controls" hidden>
        <source src="http://101.132.116.167/music/lp.mp3">
        <source src="http://101.132.116.167/music/lp.wav">
      </audio> -->
      <div class="set">
        <el-popover placement="bottom" trigger="hover">
          <p>昵称：{{ user.name }}</p>
          <p>地址：{{ user.address }}</p>
          <img slot="reference" class="head-img" :src="user.url ? 'http://101.132.116.167'+user.url : 'http://101.132.116.167/img/defualt.jpg'" @click="page=2">
        </el-popover>
      </div>
      <!-- 好友列表 -->
      <div class="contact">
        <ul>
          <li v-if="!contactors.length" style="background: none; color:#aaaaaa; justify-content: center">暂无好友</li>
          <li v-for="(contactor, index) in contactors" :key="index" :class="index === isActive ? 'active':''" @click="handelclick(contactor,index)">
            <img class="head-img" :src="'http://101.132.116.167'+contactor.url">
            <span style="width:60px">{{ contactor.name }}</span>
            <span :class=" contactor.isNew ? 'new-msg' : ''" />
            <el-dropdown v-show="index === isActive" class="operation" size="small" @command="operation">
              <span><i class="el-icon-more" /></span>
              <el-dropdown-menu>
                <el-dropdown-item style="background: #fff" command="check">查看</el-dropdown-item>
                <el-dropdown-item style="background: #fff" :command="contactor.id">删除好友</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        <ul>
          <li @click="add" class="add">
            <img class="head-img" src="~/assets/img/add3.png">
            <span style="padding-top:10px">添加好友</span>
          </li>
        </ul>
      </div>

      <!-- 显示消息 -->
      <div v-show="page === 0" class="message">
        <window :info="friend" :messages="messages" :userinfo="user" @newMsg="ding" />
      </div>
      <!-- 添加好友 -->
      <div v-show="page === 1">
        <el-form label-width="80px" style="margin:40px 0 0 40px;text-align:left">
          <el-form-item label="id">
            <el-input v-model="addId" size="small" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addSubmit">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 修改个人信息 -->
      <div v-show="page === 2">
        <el-form label-width="80px" style="margin:40px 0 0 40px;text-align:left;width:300px;">
          <el-form-item label="头像">
            <el-upload class="upload" action="/api/upload-img" name="user" :on-success="headUpload">
              <img v-if="upload.url" :src="'http://101.132.116.167'+upload.url" class="upload-img">
              <i v-else class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="upload.name" size="small" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="upload.address" size="small" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="uploadSubmit">
              修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>


    </div>
  </div>
</template>

<script>
import window from '@/assets/window.vue'

export default {
  components: {
    window
  },
  data() {
    return{
      user:{},
      contactors:[],
      isActive: '0',
      friend: {
        id: '',
        name: '',
        url: '',
      },
      page: 0,
      addId: '',
      isNew: [],
      upload: {
        url: '',
        name: '',
        address: ''
      },
      result: '',
      value: ''
    }
  },

  computed: {
    messages() {
      return this.contactors[this.isActive] ? this.contactors[this.isActive].messages : []
    },
  },
  mounted() {
    this.getInfo()
    // let t ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzOCIsImlhdCI6MTU3MjU5OTMxOSwiZXhwIjoxNTcyNjg1NzE5fQ.HtBYwmz5ZiKKn5Dev9NX0OG1fdekHTfMBsbCgFHAfeM"
    // document.cookie=`token=${t}`
  },
  methods: {
    handelclick(item,i) {
      this.isActive = i;
      this.friend = item;
      this.page = 0
      this.contactors[i].isNew = false
      this.$axios.post('/history',
      {
        userId: this.user.id,
        friendId: item.id
      })
        .then(res => {
          //在对象中插入响应属性
          console.log(res)
          this.$set(this.contactors[i], 'messages', res.data)
        })
        .catch(function (error) {
        console.log(error);
      });
    },
    ding(i) {
      if(this.isActive !== i){
          this.contactors.forEach((item,index) => {
          if(item.id === i) {
            this.contactors[index].isNew = true
          }
        })
      }
      if(this.user.id == 17764541552 && i == 1){
        let audio1 = document.querySelector('#lp');
        audio1.play();
      }else{
        let audio = document.querySelector('#ding');
        audio.play();
      }
    },
    getInfo() {
      const _this = this
      this.$axios.get('www.bixiaohe.fun/user-info')
      .then(function (response) {
        if(response.status == 1) {
          location.href = 'www.bixiaohe.fun/turnToLogin.html';
        } else {
          console.log(response.data)
          _this.user = response.data
          _this.upload.name = response.data.name
          _this.upload.address = response.data.address
          _this.$socket.emit('online', _this.user.id)
          _this.$axios.post('www.bixiaohe.fun/friend-info')
          .then(function(response) {
            _this.contactors = response.data
            _this.contactors.forEach((item, index) => {
            _this.$set( _this.contactors[index], 'isNew', false)
            });
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    add() {
      this.page = 1
    },
    operation(id) {
      if(id==='check'){
        console.log(id)
      } else{
          this.$axios.post('www.bixiaohe.fun/friend',{
          friend_id:id,
          user_id:this.user.id,
          operation: 'delete'
        })
        .then((res) =>{
          console.log(res)
        })
      }
    },
    addSubmit() {
      if(this.addId == this.user.id){
        this.$message({
            showClose: true,
            message: '不能添加自己为好友',
            type: 'error'
          });
      } else{
          this.$axios.post('www.bixiaohe.fun/friend',{
          operation: 'add',
          friend_id: this.addId,
          user_id: this.user.id
        })
        .then((res) => {
          if(res.data.status == 1){
            this.$message({
            showClose: true,
            message: '该用户不存在！',
            type: 'error'
          });
          } else if (res.data.status == 2) {
            this.$message({
              showClose: true,
              message: '你们已经是好友',
              type: 'warning'
            });
          } else if (res.data.status == 0){
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
          } else {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'warning'
            });
          }
        })
      }

    },
    headUpload(res) {
      this.upload.url = res.url
    },
    uploadSubmit() {
      this.$axios.post('www.bixiaohe.fun/upload-info',this.upload)
        .then((res) => {
          this.user.name = res.data.name
          this.user.address = res.data.address
          this.user.url = res.data.url
        })
    },

  },
}

</script>
<style lang="less" scoped>
  .new-msg{
    height: 0px;
    display: inline-block;
    padding: 4px;
    border-radius: 4px;
    background-color: rgb(192, 56, 56);
  }
  .active{
    &:hover{
    background: rgb(200, 200, 200)
    }
    background: rgb(200, 200, 200)
  }
  .container{
    text-align: center;
  }
  .main{
    background: white;
    display: flex;
    width: 800px;
    height: 600px;
    margin: 0 auto;
    margin-top: 100px;
    box-shadow: 0 0 10px rgb(33, 36, 70);
  }
  .head-img{
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
    }
  .set{
    height: 584px;
    width: 44px;
    background: rgb(43, 43, 43);
    padding: 8px;
  }
  .contact{
    height: 600px;
    width: 200px;
    background: rgb(236,236,236);
  }
  .message{
    height: 600px;
    width: 540px;
  }
  ul{
    padding: 0;
  }
  li{
    display: flex;
    text-align: left;
    padding: 6px;
    list-style-type: none;
    margin: 0;
    background: rgb(230, 230, 230);
    cursor:pointer;
    &:hover{
      background: rgb(220, 220, 220)
    }
    span{
      padding-left: 8px;
      font-size: 14px;
    }
  }
  .upload{
    width: 80px;
    height: 80px;
     border: 1px dashed #d9d9d9;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    i{
      font-size: 28px;
      color: #d9d9d9;
      line-height: 80px;
    }
    &-img{
      width: 80px;
      height: 80px;
    }
  }
  .operation{
    margin-left:40px;
    height:14px;
    line-height: 40px;
  }
</style>

