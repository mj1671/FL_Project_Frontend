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

    <b-table v-if=showdata boarderd :items="items" :fields="fields" :select-mode="selectMode" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
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
          <b-form-input  readonly v-if="selectMode == 'single'" v-model="insertitem1" placeholder=No></b-form-input>
          <b-form-input v-else v-model="insertitem1" placeholder="id 입력"></b-form-input>
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
      selectMode: 'multi',
      selected: [],

      showdata: false,
      showinsert: false,
      insertitem: [],
      insertitem1: '',
      insertitem2: '',
      insertitem3: '',
      insertitem4: '',
    }
  },
  methods: {
    async select(){ //조회 backend에서 데이터받아와야함
        this.selectMode = 'multi'
        const {data} = await this.$axios.get('http://localhost:3010/api/board')
        console.log(data)
        this.items = data //this.items.push(data) 아님
        this.showdata = true
        this.showinsert = false
    },
    async insert(){
        this.selectMode = 'multi'
        this.showinsert = true
        //this.items.push({title: this.title, writer: this.writer, date: this.date})
    },
    async save(){

        if(this.selectMode == 'single') {
          const {data} = await this.$axios.get('http://localhost:3010/api/board/change?id=' + this.selected + '&title=' + this.insertitem2 + '&writer=' + this.insertitem3 + '&date=' + this.insertitem4) //?파라미터
        }
        else {
        //데이터에도 저장하는거 추가
        const {data} = await this.$axios.get('http://localhost:3010/api/board/create?id=' + this.insertitem1 + '&title=' + this.insertitem2 + '&writer=' + this.insertitem3 + '&date=' + this.insertitem4) //?파라미터
        //console.log(this.items)
        }

        //this.items.push({id: this.insertitem1, title: this.insertitem2, writer: this.insertitem3, date: this.insertitem4})
        this.insertitem1= ''
        this.insertitem2= ''
        this.insertitem3= ''
        this.insertitem4= ''
        this.showinsert = false

        //this.showdata = true
        this.select() //다른 함수 호출 this.함수명()
    },
    async deleted(){
        const {data} = await this.$axios.get('http://localhost:3010/api/board/delete?id=' + this.selected) //?파라미터
        //console.log(this.items)
        //this.showdata = true
        this.select() //다른 함수 호출 this.함수명()
    },
    async change(){
        this.selectMode = 'single'
        //console.log(this.selectMode)
        
        this.showinsert = true
        // this.insertitem1= this.selected[0].id
        // this.insertitem2= this.selected[0].title
        // this.insertitem3= this.selected[0].writer
        // this.insertitem4= this.selected[0].date
        
        /*
        //const {data} = await this.$axios.get('http://localhost:3010/api/board/change?id=' + this.selected) //?파라미터
        //console.log(this.items)

        //this.insertitem1= '' //id는 그대로
        this.insertitem2= ''
        this.insertitem3= ''
        this.insertitem4= ''
        this.showinsert = false

        //this.showdata = true
        this.select() //다른 함수 호출 this.함수명()
        */
    },


    onRowSelected(items) {
        // if(this.selectMode == 'single') {
        // this.selected = items
        // }
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
