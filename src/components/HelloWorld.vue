<template>
  <div class="hello">
    <br>
    <h1>{{ msg }}</h1>
    <h2>api 테스트</h2>
    <div>
      <a href = "/#/Apitest1" target="_blank"> <!-- localhost:8080/#/Apitest1로 이동. Apitest1.vue 보여줌 -->
        Apitest1
      </a>
    </div>
    <h2>userInfo 테스트</h2>
    <div>
      <a href = "/#/userInfo" target="_blank">
        userInfo
      </a>
    </div>
    <h2>tutorial 테스트</h2>
    <div>
      <a href = "/#/tutorial" target="_blank">
        tutorial
      </a>
    </div>
    <h2>jointest 테스트</h2>
    <div>
      <a href = "/#/jointest" target="_blank">
        jointest
      </a>
    </div>
    <h2>visual 테스트</h2>
    <div>
      <a href = "/#/visual" target="_blank">
        visual
      </a>
    </div>
    <h2>board 테스트</h2>
    <div>
      <a href = "/#/board" target="_blank">
        board
      </a>
    </div>
    <h2>cnnimg 테스트</h2>
    <div>
      <a href = "/#/cnnimg" target="_blank">
        cnnimg
      </a>
    </div>
    <br>
    
    <!-- <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '' //Welcome to Your Vue.js App
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
