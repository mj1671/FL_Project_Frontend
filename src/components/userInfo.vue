<template>
    <div>
        <h1>{{ msg }}</h1>
        <h2>api 요청 결과 값 : {{apiresult}}</h2>
        <br></br>
        <!-- <button @click.stop="apievent">요청</button> -->
        <b-button variant="outline-dark" @click.stop="apievent">요청</b-button>
    </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'userInfo', //없어도됨
  data () {
    return { // 처음 default 값을 css에 사용
      msg: 'userInfo 부분',
      apiresult: '요청안함'
    }
  },
  methods: {
    async apievent(){
        const {data} = await this.$axios.get('http://localhost:3010/api/PostgreDataTest1/userInfo')
        console.log(data)
        this.apiresult = data
    }
  }
}
</script>
