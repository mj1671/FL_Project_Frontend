<template>
    <div>
        <h1>{{ msg }}</h1>
        join : <input v-model="inner" placeholder="입력하세요" > <!-- placeholder에 입력한 값이 script에서 this.inner 이 됨-->
        <!-- <button @click.stop="apievent">요청</button> -->
        <b-button variant="outline-dark" @click.stop="apievent">요청</b-button>
        <h2>api 요청 결과 값 : {{apiresult}}</h2> <!-- this.apiresult에 넣어준 data를 출력함 -->
    </div>
</template>

<script>
    //import axios from 'axios' 
    //밑에서 axios를 쓰려면 선언해야함. 근데 main.js에 이미 선언했기때문에 다른 .vue 파일에서 axios를 this.$axios로 쓰면 선언안해도 됨

    export default {
      name: 'jointest', //없어도됨
      data () {
        return { // 처음 default 값을 css에 사용
          msg : 'jointest 부분',
          apiresult: '요청안함',
          inner: '' // 위에 css에서 사용하기 위해 변수 선언
        }
      },
      methods: { //methods 함수적는 부분. async/await 비동기 -> 순서대로 진행. this.$axios -> backend랑 frontend가 데이터를 주고받는 api통신(get, post)하기 위해 사용
        async apievent(){ //apievent() 함수. 버튼 클릭했을때 실행할 부분
        let info = { // key : value 형태로 info 변수에 넣음
            join : json.stringify(this.inner) //바인딩 변수 선언
            // 데이터를 post 방식으로 보낼거니까 input박스에 입력받은 파라미터를 json.stringify() 이용해서 json 형태로 보냄
            }
        //↓ get방식일땐 주소에 ?파라미터 붙여서 보냈는데 post 방식으로 보낼땐 '주소', 변수(key : value 파라미터 담은)로 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.post('http://localhost:3010/api/PostgreDataTest1/memberjoin', info); 
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용
        }
    }
    }
</script>