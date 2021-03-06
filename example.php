
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Vue.js Drag And Drop</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <style>
    /* Prevent the text contents of draggable elements from being selectable. */
    [draggable] {
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      /* Required to make elements draggable in old WebKit */
      -khtml-user-drag: element;
      -webkit-user-drag: element;
    }
    li {
      color: black;
    }
    .dragging {
      opacity: 0.8;
      color: #6894D1;
    }
    .drag-over {
      text-decoration: underline;
    }
    .drag-enter {
      color: #C93742;
    }
  </style>
</head>
<body>
  <div class="container" id="app">
    <h3>Some Tasks</h3>
    <ul>
      <li v-for="task in tasks" id="{{ $index }}"
      v-drag-and-drop
      drag-start="handleDragStart"
      drag-over="handleDragOver"
      drag-enter="handleDragEnter"
      drag-leave="handleDragLeave"
      drag-end="handleDragEnd"
      drop="handleDrop"
      drag="handleDrag"
      >
      <input type="checkbox" name="completed[]" value="1" v-bind:checked="task.completed">
      <strong>{{ task.title }}</strong>
    </li>
  </ul>
  <pre>{{ loggedEvent }}</pre>
  <h3>Some Images</h3>
  <div class="image" v-for="image in images" v-drag-and-drop drop="handleImageDrop">
    <img src="" data-src="{{ image.src }}" data-index="{{ $index }}" title="{{ image.name }}" align="left">
  </div>
</div>
<script src="http://cdn.jsdelivr.net/vue/1.0.17/vue.min.js"></script>
<script src="vue.drag-and-drop.js"></script>
<script>
  /* globals Vue */
  var App = new Vue({
    el: '#app',
    data: {
      loggedEvent: '',
      tasks: [{"id":96,"title":"Task 8","completed":false},{"id":12,"title":"Task 1","completed":true},{"id":24,"title":"Task 2","completed":false},{"id":36,"title":"Task 3","completed":true},{"id":48,"title":"Task 4","completed":false},{"id":60,"title":"Task 5","completed":true},{"id":72,"title":"Task 6","completed":false},{"id":84,"title":"Task 7","completed":true},{"id":0,"title":"Task 0","completed":false},{"id":108,"title":"Task 9","completed":true}],
      images: [{"name":"Image 1","src":"http://placehold.it/100/000000/ffffff"},{"name":"Image 2","src":"http://placehold.it/100/C93742/ffffff"},{"name":"Image 3","src":"http://placehold.it/100/6894D1/ffffff"}]
    },
    ready: function() {
      Array.prototype.slice.call(document.querySelectorAll('.image'), 0).forEach(function(item){
        item.children[0].src = item.children[0].getAttribute('data-src');
      });
    },
    methods: {
      handleDragStart: function(elem) {
        // console.log('handleDragStart', elem);
        this.loggedEvent = 'handleDragStart';
      },
      handleDragOver: function(elem) {
        // console.log('handleDragOver', elem);
        this.loggedEvent = 'handleDragOver';
      },
      handleDragEnter: function(elem) {
        // console.log('handleDragEnter', elem);
        this.loggedEvent = 'handleDragEnter';
      },
      handleDragLeave: function(elem) {
        // console.log('handleDragLeave', elem);
        this.loggedEvent = 'handleDragLeave';
      },
      handleDragEnd: function(elem) {
        // console.log('handleDragEnd', elem);
        this.loggedEvent = 'handleDragEnd';
      },
      handleDrop: function(itemOne, itemTwo) {
        console.log('handleDrop', itemOne.getAttribute('data-index'), itemTwo.getAttribute('data-index'));
        this.loggedEvent = 'handleDrop';
        var dummy = this.tasks[itemOne.getAttribute('data-index')];
        this.tasks.$set(itemOne.getAttribute('data-index'), this.tasks[itemTwo.getAttribute('data-index')]);
        this.tasks.$set(itemTwo.getAttribute('data-index'), dummy);
      },
      handleImageDrop: function(itemOne, itemTwo) {
        console.log('handleImageDrop', itemOne.getAttribute('data-index'), itemTwo.getAttribute('data-index'));
        this.loggedEvent = 'handleImageDrop';
        var dummy = this.images[itemOne.getAttribute('data-index')];
        this.images.$set(itemOne.getAttribute('data-index'), this.images[itemTwo.getAttribute('data-index')]);
        this.images.$set(itemTwo.getAttribute('data-index'), dummy);
      },
      handleDrag: function(elem) {
          //console.log('handleDrag', elem);
          this.loggedEvent = 'handleDrag';
      },
    }
  });
</script>
</body>
</html>
