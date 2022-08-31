<template>
    <div>
        <h1>{{ msg }}</h1>
        <h2>api 요청 결과 값 : {{apiresult}}</h2>
        <button @click.stop="apievent">요청</button>
    </div>
</template>

<script>
export default {
  name: 'Apitest1',
  data () {
    return {
      msg: 'Apitest 부분',
      apiresult: '요청안함'
    }
  },
  methods: {
    async apievent(){
        const {data} = await this.$axios.get('http://localhost:3010/api/gettest1')
        console.log(data)
        this.apiresult = data
    }
  }
}
</script>
