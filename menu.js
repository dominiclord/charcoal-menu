Vue.component('children', {
    template: '#child-template',
    props: ['item']
});
var App = new Vue({
    el: '#app',
    data: {
        children: window.menuData,
        loggedEvent: '',
        tasks: [{"id":96,"title":"Task 8","completed":false},{"id":12,"title":"Task 1","completed":true},{"id":24,"title":"Task 2","completed":false},{"id":36,"title":"Task 3","completed":true},{"id":48,"title":"Task 4","completed":false},{"id":60,"title":"Task 5","completed":true},{"id":72,"title":"Task 6","completed":false},{"id":84,"title":"Task 7","completed":true},{"id":0,"title":"Task 0","completed":false},{"id":108,"title":"Task 9","completed":true}],
        images: [{"name":"Image 1","src":"http://placehold.it/100/000000/ffffff"},{"name":"Image 2","src":"http://placehold.it/100/C93742/ffffff"},{"name":"Image 3","src":"http://placehold.it/100/6894D1/ffffff"}]
    },
    ready: function() {
        initSortableLists()
        // Array.prototype.slice.call(document.querySelectorAll('.image'), 0).forEach(function(item){
        //     item.children[0].src = item.children[0].getAttribute('data-src');
        // });
    },
    methods: {
        // handleDragStart: function(elem) {
        //     console.log('handleDragStart', elem);
        //     this.loggedEvent = 'handleDragStart';
        // },
        // handleDragOver: function(elem) {
        //     console.log('handleDragOver', elem);
        //     this.loggedEvent = 'handleDragOver';
        // },
        // handleDragEnter: function(elem) {
        //     console.log('handleDragEnter', elem);
        //     this.loggedEvent = 'handleDragEnter';
        // },
        // handleDragLeave: function(elem) {
        //     console.log('handleDragLeave', elem);
        //     this.loggedEvent = 'handleDragLeave';
        // },
        // handleDragEnd: function(elem) {
        //     console.log('handleDragEnd', elem);
        //     this.loggedEvent = 'handleDragEnd';
        // },
        // handleDrop: function(itemOne, itemTwo) {
        //     console.log('handleDrop', itemOne.id, itemTwo.id);
        //     this.loggedEvent = 'handleDrop';
        //     var dummy = this.tasks[itemOne.id];
        //     this.tasks.$set(itemOne.id, this.tasks[itemTwo.id]);
        //     this.tasks.$set(itemTwo.id, dummy);
        // },
        // handleImageDrop: function(itemOne, itemTwo) {
        //     console.log('handleImageDrop', itemOne.getAttribute('data-index'), itemTwo.getAttribute('data-index'));
        //     this.loggedEvent = 'handleImageDrop';
        //     var dummy = this.images[itemOne.getAttribute('data-index')];
        //     this.images.$set(itemOne.getAttribute('data-index'), this.images[itemTwo.getAttribute('data-index')]);
        //     this.images.$set(itemTwo.getAttribute('data-index'), dummy);
        // },
        // handleDrag: function(elem) {
        //       console.log('handleDrag', elem);
        //       this.loggedEvent = 'handleDrag';
        // },
    }
});

function initSortableLists() {
    var $menu = $('#menu');
    var sortableListsOptions = {
        insertZonePlus: true,
        placeholderClass: 'nest-placeholder',
        hintClass: 'nest-hint',
        ignoreClass: 'clickable',
        /**
         * Is called before dragging.
         * @param  e - jQ event object
         * @param  el - dragged li element.
         */
        onDragStart: function( e, cEl ) {
        },
        /**
         * Is called after the drop but only if the position of dragged element was changed.
         * @param  cEl - currently dragged element.
         */
        onChange: function( cEl ) {
            console.log(cEl)
        },
        /**
         * Is called every time after the drop.
         * @param  cEl - currently dragged element.
         */
        complete: function( cEl ) { return true; }
    };
    $menu.sortableLists(sortableListsOptions);
}

$(function(){
    // $menu.on('click', '.js-toggle', function(event) {
    //     console.log($(this))
    //     $(this).siblings('.js-content').slideToggle();
    // });
});