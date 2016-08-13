<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="menu.css">
    </head>
    <body>
        <template id="child-template">
            <li class="nest-item sortableListsOpen" id="item-{{item.id}}">
                <div class="nest-fieldset">
                    <div class="nest-fieldset-wrap">
                        <span class="nest-handle js-handle"></span>
                        <span class="nest-fieldset-label js-label">{{item.label}}</span>
                        <button class="nest-toggle btn js-toggle" type="button">
                            <span class="glyphicon glyphicon-triangle-bottom"></span>
                        </button>
                        <div class="nest-dropdown js-content">
                            <input class="nest-input" type="text" placeholder="Label">
                        </div>
                    </div>
                </div>
                <ul class="nest-container" v-if="item.hasChildren">
                    <children v-for="item in item.children" :item="item"></children>
                </ul>
            </li>
        </template>
        <div class="container-fluid" id="app">
            <div class="row">
                <div class="col-sm-4">
                </div>
                <div class="col-sm-8">
                    <ul class="nest-container" id="menu" v-on:mousedown="handleMousedown">
                        <children v-for="item in children" :item="item" track-by="id"></children>
                    </ul>
                </div>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
        <script src="vue.nested-menu.js"></script>
        <script src="jquery-sortable-lists.js"></script>
        <script src="menuData.js"></script>
        <script src="menu.js"></script>
    </body>
</html>