<template>
    <div>
        <h1>{{ msg }}</h1>
        <div>
        <!-- Styled 업로드 다른 형식
        <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div> -->

        <!-- Plain mode -->
        <b-form-file v-model="file" class="mt-3" plain></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

        <b-button variant="outline-dark" @click.stop="apievent">요청</b-button>
        <h2>api 요청 결과 값 : {{apiresult}}</h2>
  </div>
    </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'cnnimg', //없어도됨
  data () {
    return { // 처음 default 값을 css에 사용
      msg: '파일 업로드 및 CNN 결과',
      apiresult: '요청안함',
      //file1: null,
      file: null
    }
  },
  methods: {
    async apievent(){
        const formdata = new FormData(); //node.js에 이미지나 파일을 전송하려면 vue에선 FormData()를 사용함. + node.js에선 multer 사용 
        formdata.append('file', this.file);

        const{data} = await $axios.post("http://localhost:3010/api/pythonget/imgupload",
          formdata,
          {
            headers: {
              "content-Type": "multipart/form-data"
            }
          }
        )
        console.log(data)
        this.apiresult = data.fileInfo //backend에서 가져옴
    }
  }
}
</script>
