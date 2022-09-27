<template>
    <div>
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
        <h1>{{ msg }}</h1>
        <div>
          <b-form-select v-model="selected" :options="options"></b-form-select>
          <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
        </div>
        <br></br>

        <table style="margin : auto"> <!-- 가운데정렬 -->
	        <th>FROM</th>
	        <th>TO</th>
	        <tr><!-- 첫번째 줄 시작 -->
	          <td><p>{{ fromdate.from | yyyyMMdd }}</p></td>
	          <td><p>{{ todate.from | yyyyMMdd }}</p></td>
	        </tr><!-- 첫번째 줄 끝 -->
	        <tr><!-- 두번째 줄 시작 -->
	          <td>
              <!-- <td><p>{{ date.month}}</p></td> -->
              <!-- <month-picker-input :no-default="true" @change="showDateFrom"></month-picker-input> -->
              <month-picker-input @change="showDateFrom"></month-picker-input> <!-- 그냥 month-picker 태그로 하면 처음부터 달력이 크게나옴 -->
            </td>
	          <td>
              <!-- <td><p>{{ date.month}}</p></td> -->
              <!-- <month-picker-input :no-default="true" @change="showDateTo"></month-picker-input> -->
              <month-picker-input @change="showDateTo"></month-picker-input>
            </td>
	        </tr><!-- 두번째 줄 끝 -->
        </table>
        
        <br></br>
        <!-- <button @click.stop="apievent">요청</button> -->
        <b-button variant="outline-dark" @click.stop="apievent1">전체 요청</b-button> <!-- 버튼을 클릭하면 apievent1 함수 실행 -->
        <b-button variant="outline-dark" @click.stop="apievent2">요청2</b-button> <!-- 버튼을 클릭하면 apievent2 함수 실행 -->
        <br></br>

        <!-- <div class="container">
          <Bar v-if="loaded" :chart-data="chartData" />
        </div> -->
        <div>
          <GChart v-if="loaded" 
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
          />
        </div>    
        <br></br>
        <h2>api 요청 결과 값 : {{apiresult}}</h2> <!-- this.apiresult에 넣어준 data를 출력함 -->
    </div>
</template>

<script>
    //import axios from 'axios' 
    //밑에서 axios를 쓰려면 선언해야함. 근데 main.js에 이미 선언했기때문에 다른 .vue 파일에서 axios를 this.$axios로 쓰면 선언안해도 됨
    // import { Bar } from 'vue-chartjs' // /legacy
    // import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { GChart } from 'vue-google-charts/legacy' // /legacy 붙여줘야함. npm i vue-google-charts 로 터미널에서 설치
    import { MonthPicker } from 'vue-month-picker' // 월력 //컴포넌트에 추가해줘야 사용할 수 있음
    import { MonthPickerInput } from 'vue-month-picker' // 월력 //컴포넌트에 추가해줘야 사용할 수 있음

    export default {
      name: 'visual', //없어도됨
      components: {
        GChart,
        MonthPicker,
        MonthPickerInput
      },

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
          ],
          loaded: false, //여기부터 차트
          chartData: [
          //chartdata 예시. axios로 받아온 데이터를 이형태로 chartdata에 넣어주어야함.
          // ["Year", "Sales", "Expenses", "Profit"],
          // ["2014", 1000, 400, 200],
          // ["2015", 1170, 460, 250],
          // ["2016", 660, 1120, 300],
          // ["2017", 1030, 540, 350]
          ],
          chartOptions: {
            chart: {
              title: "Company Performance",
              subtitle: "Sales, Expenses, and Profit: 2014-2017"
            }
          },
          fromdate: { //여기부터 캘린더
				    from: null,
				    to: null,
				    month: null,
				    year: null
          },
          todate: {
				    from: null,
				    to: null,
				    month: null,
				    year: null
          }
        }
      }, 
      filters : { //filter 아님 오타조심! //filter로 filter ID 지정
        yyyyMMdd : function(value) {
          //들어오는 value 값이 공백이면 그냥 공백으로 불러옴
          if(value == '') 
            return '';
          
          //현재 Date 혹은 Datetime 데이터를 javascript date 타입화
          var js_date = new Date(value);

          // console.log("월 더하기전 : " +js_date.getMonth())
          // console.log("일 더하기전 : " +js_date.getMonth()+1)

          //연도, 월, 일 추출
          var year = js_date.getFullYear();
          var month = js_date.getMonth() + 1;
          var day = js_date.getDate();

          //월, 일의 경우 한자리 수 값이 있기 때문에 앞공백에 0 넣어줌
          if(month < 10){
            month = '0' + month;
          }

          if(day < 10){
            day = '0' + day;
          }

          //최종 출력 형태
          return year + '-' + month + '-' + day;
        }
      },

      methods: { //methods 함수적는 부분. async/await 비동기 -> 순서대로 진행. this.$axios -> backend랑 frontend가 데이터를 주고받는 api통신(get, post)하기 위해 사용
        showDateFrom (date) { //캘린더 부분
			    this.fromdate = date
		    },
        showDateTo (date) { //캘린더 부분
			    this.todate = date
		    },
        month(value) {
          //들어오는 value 값이 공백이면 그냥 공백으로 불러옴
          if(value == '') 
            return '';
          
          //현재 Date 혹은 Datetime 데이터를 javascript date 타입화
          var js_date = new Date(value);

          // console.log("월 더하기전 : " +js_date.getMonth())
          // console.log("일 더하기전 : " +js_date.getMonth()+1)

          //연도, 월, 일 추출
          var year = js_date.getFullYear();
          var month = js_date.getMonth() + 1;
          var day = js_date.getDate();

          //월, 일의 경우 한자리 수 값이 있기 때문에 앞공백에 0 넣어줌
          if(month < 10){
            month = '0' + month;
          }

          if(day < 10){
            day = '0' + day;
          }

          //최종 출력 형태
          return year + '-' + month + '-' + day;
        },
        
        async apievent2(){ //apievent2() 함수. 버튼 클릭했을때 실행할 부분
        if(this.selected != null) {
          let param = { // key : value 형태로 info 변수에 넣음
            //this.selected가 {"COMP_ID" : "A"} 형태이기 때문에 (this.selected[0]).COMP_ID -> 'A'만 추출함
            //COMP_ID : (this.selected[0]).COMP_ID //바인딩 변수 선언. 첫번째 select 방법일 경우
            COMP : this.selected, //바인딩 변수 선언. 두번째 bootstrap 방법일 경우
            
            //캘린더 부분
            from: await this.month(this.fromdate.from), //위에 다른 함수 month()를 호출하기 위해서 앞에 this. 을 붙여야함
            to: await this.month(this.todate.to) //위에 다른 함수 month()를 호출하기 위해서 앞에 this. 을 붙여야함
            }
        //↓ get방식일땐 주소에 ?파라미터 붙여서 보냈는데 post 방식으로 보낼땐 '주소', 변수(key : value 파라미터 담은)로 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.post('http://localhost:3010/api/visual/comp', param); 
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용
        
        this.chartData = [];
        this.chartData.push(["DATE", "CNT"]);
        for(let i=0; i<this.apiresult.length; i++){     //api로 받아온 데이터는 문자열이므로 Number()로 숫자로 변경해야함
          this.chartData.push([this.apiresult[i].DATE_T, Number(this.apiresult[i].TOTALCNT)]); //키로 value값 가져와서 배열형태로 넣음
          this.loaded = true; //loaded를 true로 바꿔서 css에서 true가 되서 차트가 나옴 
        }
        
        } else{
          this.apiresult = "null 값"
          this.loaded = false;
        }
        },

        async apievent1(){ //apievent1() 함수. 버튼 클릭했을때 실행할 부분
        //↓ input박스에 입력받은 데이터를 get방식으로 보내기위해 주소에 ?파라미터를 붙여서 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.get('http://localhost:3010/api/visual')
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용

        this.chartData = [];
        this.chartData.push(["DATE", "CNT"]);
        for(let i=0; i<this.apiresult.length; i++){     //api로 받아온 데이터는 문자열이므로 Number()로 숫자로 변경해야함
          this.chartData.push([this.apiresult[i].DATE_T, Number(this.apiresult[i].TOTALCNT)]); //키로 value값 가져와서 배열형태로 넣음
          this.loaded = true; //loaded를 true로 바꿔서 css에서 true가 되서 차트가 나옴 
        }
        }
      }
    }
</script>