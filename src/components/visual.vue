<template>
    <div>
        <h1>{{ msg }}</h1>
        <div>
          <b-form-select v-model="selected" :options="options"></b-form-select>
          <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
        </div>
        <!-- 첫번째 방법
          <select v-model="selected" multiple>
            <option :value="{COMP_ID: 'A'}">A</option>
            <option :value="{COMP_ID: 'B'}">B</option>
            <option :value="{COMP_ID: 'D'}">D</option>
            <option :value="{COMP_ID: 'O'}">O</option>
            <option :value="{COMP_ID: 'G'}">G</option>
            <option :value="{COMP_ID: 'E'}">E</option>
        </select>
        {{selected}}  {"COMP_ID" : "A"} 형태로 들어옴 -->
        <!--description : <input v-model="description" placeholder="description 입력하세요">--> <!-- placeholder에 입력한 값이 script에서 this.description 이 됨-->
        <!-- <button @click.stop="apievent">요청</button> -->
        <b-button variant="outline-dark" @click.stop="apievent1">요청1</b-button> <!-- 버튼을 클릭하면 apievent1 함수 실행 -->
        <b-button variant="outline-dark" @click.stop="apievent2">요청2</b-button> <!-- 버튼을 클릭하면 apievent2 함수 실행 -->
        <h2>api 요청 결과 값 : {{apiresult}}</h2> <!-- this.apiresult에 넣어준 data를 출력함 -->
    </div>
</template>

<script>
    //import axios from 'axios' 
    //밑에서 axios를 쓰려면 선언해야함. 근데 main.js에 이미 선언했기때문에 다른 .vue 파일에서 axios를 this.$axios로 쓰면 선언안해도 됨

    export default {
      name: 'visual', //없어도됨
      data () {
        return { // 처음 default 값을 css에 사용
          msg : 'visual 부분',
          apiresult: '요청안함',
          selected: null,
          options: [ //두번째 bootstrap 방법 사용할 경우
            { value: null, text: 'null 값' },
            { value: 'A', text: 'A' },
            { value: 'B', text: 'B' },
            { value: 'D', text: 'D' },
            { value: 'E', text: 'E' },
            { value: 'G', text: 'G' },
            { value: 'O', text: 'O' }
          ]
        }
      }, 
      methods: { //methods 함수적는 부분. async/await 비동기 -> 순서대로 진행. this.$axios -> backend랑 frontend가 데이터를 주고받는 api통신(get, post)하기 위해 사용
        async apievent2(){ //apievent2() 함수. 버튼 클릭했을때 실행할 부분
        if(this.selected != null) {
          let info = { // key : value 형태로 info 변수에 넣음
            //this.selected가 {"COMP_ID" : "A"} 형태이기 때문에 (this.selected[0]).COMP_ID -> 'A'만 추출함
            //COMP_ID : (this.selected[0]).COMP_ID //바인딩 변수 선언. 첫번째 select 방법일 경우
            COMP_ID : this.selected //바인딩 변수 선언. 두번째 bootstrap 방법일 경우
            }
        //↓ get방식일땐 주소에 ?파라미터 붙여서 보냈는데 post 방식으로 보낼땐 '주소', 변수(key : value 파라미터 담은)로 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.post('http://localhost:3010/api/visual/comp', info); 
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용
        } else{
          this.apiresult = "null 값"
        }
        },

        async apievent1(){ //apievent1() 함수. 버튼 클릭했을때 실행할 부분
        //↓ input박스에 입력받은 데이터를 get방식으로 보내기위해 주소에 ?파라미터를 붙여서 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.get('http://localhost:3010/api/visual')
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용
        }
      }
    }
</script>