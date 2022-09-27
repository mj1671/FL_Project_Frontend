<template>
    <div>
        <br>
        <h1>{{ msg }}</h1>
        <div style="margin: 0px 10% 10px;">
        <div style="float:right; margin: 0px 0px 10px;">
        <b-input-group>
            <b-input-group-append> <!-- prepend -->
                <b-button variant="outline-primary" v-on:click="select">조회</b-button>
                <b-button variant="outline-primary" v-on:click="insert">추가</b-button>
                <b-button variant="outline-primary" v-on:click="change">수정</b-button>
                <b-button variant="outline-primary" v-on:click="deleted">삭제</b-button>
                <b-button variant="outline-primary" v-on:click="save">저장</b-button>
            </b-input-group-append>
        </b-input-group>
        </div>
        
        <br>
        <!-- <div>
            <b-table v-if=showdata boarderd :items="items" :fields="fields">
                <template v-if=showinsert slot="bottom-row" slot-scope="{fields}">
                    <td>
                    <!-- <td v-for="field in fields" :key="field.key"> 
                        <b-form-input v-model="insertitem1" placeholder="입력하세요"></b-form-input>
                    </td>
                    <td>
                        <b-form-input v-model="insertitem2" placeholder="입력하세요"></b-form-input>
                    </td>
                    <td>
                        <b-form-input v-model="insertitem3" placeholder="입력하세요"></b-form-input>
                    </td>
                </template>
            </b-table>
        </div> -->
        

        <!-- <b-form-group
            label="Selection mode:"
            label-for="table-select-mode-select"
            label-cols-md="4"
        >
        <b-form-select
            id="table-select-mode-select"
            v-model="selectMode"
            :options="modes"
            class="mb-3"
        ></b-form-select>
        </b-form-group> -->

    <b-table v-if=showdata boarderd :items="items" :fields="fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
    <!-- :select-mode="selectMode" -->
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(select)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only"> </span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only"> </span>
        </template>
      </template>

      <template v-if=showinsert slot="bottom-row" slot-scope="{fields}">
        <td>
          <!-- 칸밀리는거 때문에 td태그를 임의로 만들어서 위치를 맞춰줌 -->
        </td>
        <td>
          <!-- <td v-for="field in fields" :key="field.key"> -->
          <b-form-input v-model="insertitem1" placeholder="id 입력"></b-form-input>
        </td>
        <td>
          <b-form-input v-model="insertitem2" placeholder="title 입력"></b-form-input>
        </td>
        <td>
          <b-form-input v-model="insertitem3" placeholder="writer 입력"></b-form-input>
        </td>
        <td>
          <b-form-input v-model="insertitem4" placeholder="date 입력"></b-form-input>
        </td>
      </template>
    </b-table>

    <div v-if=showdata>
    <p>
      <b-button size="sm" @click="selectAllRows">전체 선택</b-button>
      <b-button size="sm" @click="clearSelected">선택 해제</b-button>
      <!-- <b-button size="sm" @click="selectThirdRow">Select 3rd row</b-button>
      <b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button> -->
    </p>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
    </div>
        </div>

        <br>
        <!-- <button @click.stop="apievent">요청</button> -->
        <!-- <b-button variant="outline-dark" @click.stop="save">요청</b-button> -->
        <!-- <br>
        <h2>api 요청 결과 값 : {{apiresult}}</h2> -->
    </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'board', //없어도됨
  data () {
    return { // 처음 default 값을 css에 사용
      msg: '게시판',
      apiresult: '요청안함',
      
      fields: ['select', 'id', 'title', 'writer', 'date'], //fields 순으로 칼럼 순서
      items: [
          // { title: 'Dickerson', writer: 'Macdonald', date: 40 },
          // { title: 'Larsen', writer: 'Shaw', date: 21 },
          // { title: 'Geneva', writer: 'Wilson', date: 89 },
          // { title: 'Jami', writer: 'Carney', date: 38 }
      ],
      //selectMode: 'multi',
      selected: [],

      showdata: false,
      showinsert: false,
      insertitem: [],
      //insert: false,
      insertitem1: '',
      insertitem2: '',
      insertitem3: '',
      insertitem4: '',
    }
  },
  methods: {
    // async apievent(){
    //     const {data} = await this.$axios.get('http://localhost:3010/api/board/board')
    //     console.log(data)
    //     this.apiresult = data
    // },
    /*
    async apievent1(){ //apievent1() 함수. 버튼 클릭했을때 실행할 부분
        //↓ input박스에 입력받은 데이터를 get방식으로 보내기위해 주소에 ?파라미터를 붙여서 보냄. 그리고 반환받은 데이터를 data에 넣음
        const {data} = await this.$axios.get('http://localhost:3010/api/visual')
        console.log(data)
        this.apiresult = data //backend에서 받아온(반환된) data를 this.apiresult에 넣어주고 이걸 위에 css에서 apiresult로 사용

        this.items = [];
        this.items.push(["DATE", "CNT"]);
        for(let i=0; i<this.apiresult.length; i++){     //api로 받아온 데이터는 문자열이므로 Number()로 숫자로 변경해야함
          this.items.push([this.apiresult[i].DATE_T, Number(this.apiresult[i].TOTALCNT)]); //키로 value값 가져와서 배열형태로 넣음
          this.loaded = true; //loaded를 true로 바꿔서 css에서 true가 되서 차트가 나옴 
        }
    },
    */

    async select(){ //조회 backend에서 데이터받아와야함
        const {data} = await this.$axios.get('http://localhost:3010/api/board')
        console.log(data)
        this.items = data //this.items.push(data) 아님
        this.showdata = true
    },
    async insert(){
        this.showinsert = true
        //this.items.push({title: this.title, writer: this.writer, date: this.date})
    },
    async save(){
        //데이터에도 저장하는거 추가
        const {data} = await this.$axios.get('http://localhost:3010/api/board/create?id=' + this.insertitem1 + '&title=' + this.insertitem2 + '&writer=' + this.insertitem3 + '&date=' + this.insertitem4) //?파라미터
        //console.log(this.items)
        
        //this.items.push({id: this.insertitem1, title: this.insertitem2, writer: this.insertitem3, date: this.insertitem4})
        this.insertitem1= ''
        this.insertitem2= ''
        this.insertitem3= ''
        this.insertitem4= ''
        this.showinsert = false

        this.showdata = true
        this.select() //다른 함수 호출 this.함수명()

    },
    async deleted(){
        const {data} = await this.$axios.get('http://localhost:3010/api/board/delete?id=' + this.selected) //?파라미터
        //console.log(this.items)
        this.showdata = true
        this.select() //다른 함수 호출 this.함수명()
      },
    async change(){
        //this.insert()
        this.showinsert = true

        const {data} = await this.$axios.get('http://localhost:3010/api/board/change?id=' + this.selected) //?파라미터
        //console.log(this.items)

        //this.insertitem1= '' //id는 그대로
        this.insertitem2= ''
        this.insertitem3= ''
        this.insertitem4= ''
        this.showinsert = false

        this.showdata = true
        this.select() //다른 함수 호출 this.함수명()
    },


    onRowSelected(items) {
        this.selected = []
        for(let i=0; i<items.length; i++){
        this.selected.push(items[i].id) // front(vue)에 행 선택했을때 몇개뜨는지 items[0]하면 제일 처음 선택한 한개만 뜸
      }
    },
    selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
        this.$refs.selectableTable.clearSelected()
    },
    // selectThirdRow() {
    //     // Rows are indexed from 0, so the third row is index 2
    //     this.$refs.selectableTable.selectRow(2)
    // },
    // unselectThirdRow() {
    //     // Rows are indexed from 0, so the third row is index 2
    //     this.$refs.selectableTable.unselectRow(2)
    // }
  }
}
</script>
