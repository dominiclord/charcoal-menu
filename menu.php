<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <style>
            .nest-container {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .nest-container .nest-container {
                padding-left: 45px;
            }
            .nest-item {
                display: block;
            }
            .nest-fieldset {
                padding: 5px 0;
            }
            .nest-fieldset,
            .nest-placeholder,
            .nest-hint {
                max-width: 300px;
            }
            .nest-fieldset-wrap,
            .nest-placeholder,
            .nest-hint {
                border-radius: 3px;
            }
            .nest-placeholder,
            .nest-hint {
                background-color: #f0f0f0;
                border: 2px dashed #c0c0c0;
            }
            .nest-placeholder {
                opacity: 0.5;
            }
            .nest-fieldset-wrap {
                background-color: #f7f7f9;
                border: 1px solid #e1e1e8;
                padding: 10px 20px;
            }
            .nest-fieldset-label {

            }
            .nest-toggle {

            }
            .nest-dropdown {
                display: none;
            }
            .nest-input {

            }
        </style>
    </head>
    <body>
        <ul class="nest-container" id="menu">
<?php
$levels = [
    [
        'label' => 'Level 1 - Item 1',
        'children' => [
            [
                'label' => 'Level 2 - Item 1'
            ],
            [
                'label' => 'Level 2 - Item 2'
            ],
            [
                'label' => 'Level 2 - Item 3'
            ],
            [
                'label' => 'Level 2 - Item 4'
            ]
        ]
    ],
    [
        'label' => 'Level 1 - Item 2',
    ],
    [
        'label' => 'Level 1 - Item 3',
        'children' => [
            [
                'label' => 'Level 2 - Item 5'
            ],
            [
                'label' => 'Level 2 - Item 6',
                'children' => [
                    [
                        'label' => 'Level 3 - Item 1'
                    ],
                    [
                        'label' => 'Level 3 - Item 2'
                    ],
                    [
                        'label' => 'Level 3 - Item 3'
                    ]
                ]
            ],
            [
                'label' => 'Level 2 - Item 7'
            ]
        ]
    ]
];
foreach ($levels as $level1) {
?>
            <li class="nest-item sortableListsOpen">
                <div class="nest-fieldset">
                    <div class="nest-fieldset-wrap">
                        <span class="nest-fieldset-label"><?php echo $level1['label'] ?></span>
                        <button class="nest-toggle btn js-toggle clickable" type="button">
                            <span class="glyphicon glyphicon-triangle-bottom clickable"></span>
                        </button>
                        <div class="nest-dropdown js-content clickable">
                            <input class="nest-input clickable" type="text" placeholder="Label">
                        </div>
                    </div>
                </div>
                <?php if (!empty($level1['children'])) { ?>
                <ul class="nest-container">
                    <?php foreach ($level1['children'] as $level2) { ?>
                    <li class="nest-item sortableListsOpen">
                        <div class="nest-fieldset">
                            <div class="nest-fieldset-wrap">
                                <span class="nest-fieldset-label"><?php echo $level2['label'] ?></span>
                                <button class="nest-toggle btn js-toggle clickable" type="button">
                                    <span class="glyphicon glyphicon-triangle-bottom clickable"></span>
                                </button>
                                <div class="nest-dropdown js-content clickable">
                                    <input class="nest-input clickable" type="text" placeholder="Label">
                                </div>
                            </div>
                        </div>
                        <?php if (!empty($level2['children'])) { ?>
                        <ul class="nest-container">
                            <?php foreach ($level2['children'] as $level3) { ?>
                            <li class="nest-item sortableListsOpen">
                                <div class="nest-fieldset">
                                    <div class="nest-fieldset-wrap">
                                        <span class="nest-fieldset-label"><?php echo $level3['label'] ?></span>
                                        <button class="nest-toggle btn js-toggle clickable" type="button">
                                            <span class="glyphicon glyphicon-triangle-bottom clickable"></span>
                                        </button>
                                        <div class="nest-dropdown js-content clickable">
                                            <input class="nest-input clickable" type="text" placeholder="Label">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <?php } ?>
                        </ul>
                        <?php } ?>
                    </li>
                    <?php } ?>
                </ul>
                <?php } ?>
            </li>
<?php
}
?>
        </ul>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="jquery-sortable-lists.js"></script>
        <script>
        $(function(){
            $menu = $('#menu');
            $menu.sortableLists({
                placeholderClass: 'nest-placeholder',
                hintClass: 'nest-hint',
                ignoreClass: 'clickable'
            });
            $menu.on('click', '.js-toggle', function(event) {
                console.log($(this))
                $(this).siblings('.js-content').slideToggle();
            });
        });
        </script>
    </body>
</html>