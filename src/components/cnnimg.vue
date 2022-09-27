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
        <b-form-file v-model="file" class="mt-3" plain @change="previewImage"></b-form-file>
        <br></br>
        <div>
          <b-img :src="previewImageData"></b-img>
        </div>
        <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div> -->
        <br></br>

        <b-button variant="outline-dark" @click.stop="apievent()">요청</b-button>
        <br></br>
        <h2>딥러닝 CNN 결과 값 : {{apiresult}}</h2>
  </div>
    </div>
</template>

<script>
import axios from 'axios' //여기서 $axios 사용안되서 선언해야함

export default {
  name: 'cnnimg', //없어도됨
  data () {
    return { // 처음 default 값을 css에 사용
      msg: '파일 업로드 및 CNN 결과',
      apiresult: '요청안함',
      //file1: null,
      file: null,

      //show: true, //없어도됨
      previewImageData: null
    }
  },
  methods: {
    async apievent(){
        const formdata = new FormData(); //node.js에 이미지나 파일을 전송하려면 vue에선 FormData()를 사용함. + node.js에선 multer 사용 
        formdata.append('file', this.file);

        console.log("들어왔음")

        const{data} = await axios.post("http://localhost:3010/api/pythonget/imgupload",
          formdata,
          {
            headers: {
              "content-Type": "multipart/form-data"
            }
          }
        )
        console.log(data)
        //this.apiresult = data.fileInfo //backend에서 가져옴
        this.apiresult = data
    },

    previewImage(evt) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.previewImageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
          this.previewImageData = null;
      }
    }
  }
}
</script>
