var App;

function initVue() {
    Vue.component('children', {
        template: '#child-template',
        props: ['item']
    });
    App = new Vue({
        el: '#app',
        data: {
            children: [
                {
                    label: 'Level 1 - Item 1',
                    hasChildren: true,
                    children: [
                        {
                            label: 'Level 2 - Item 1'
                        },
                        {
                            label: 'Level 2 - Item 2'
                        },
                        {
                            label: 'Level 2 - Item 3'
                        },
                        {
                            label: 'Level 2 - Item 4'
                        }
                    ]
                },
                {
                    label: 'Level 1 - Item 2'
                },
                {
                    label: 'Level 1 - Item 3',
                    hasChildren: true,
                    children: [
                        {
                            label: 'Level 2 - Item 5'
                        },
                        {
                            label: 'Level 2 - Item 6',
                            hasChildren: true,
                            children: [
                                {
                                    label: 'Level 3 - Item 1'
                                },
                                {
                                    label: 'Level 3 - Item 2'
                                },
                                {
                                    label: 'Level 3 - Item 3'
                                }
                            ]
                        },
                        {
                            label: 'Level 2 - Item 7'
                        }
                    ]
                }
            ]
        }
    })
}

$(function(){
    initVue();
    var $menu = $('#menu');
    var sortableListsOptions = {
        placeholderClass: 'nest-placeholder',
        hintClass: 'nest-hint',
        ignoreClass: 'clickable'
    };
    $menu.sortableLists(sortableListsOptions);
    $menu.on('click', '.js-toggle', function(event) {
        console.log($(this))
        $(this).siblings('.js-content').slideToggle();
    });
});