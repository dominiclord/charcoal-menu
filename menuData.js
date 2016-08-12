window.menuData = [
    {
        label:'Level 1 - Item 1',
        position:0,
        hasChildren: true,
        children: [
            {
                label:'Level 2 - Item 1',
                position:1
            },
            {
                label:'Level 2 - Item 2',
                position:2
            },
            {
                label:'Level 2 - Item 3',
                position:3
            },
            {
                label:'Level 2 - Item 4',
                position:4
            }
        ]
    },
    {
        label:'Level 1 - Item 2',
        position:5
    },
    {
        label:'Level 1 - Item 3',
        position:6,
        hasChildren: true,
        children: [
            {
                label:'Level 2 - Item 5',
                position:7
            },
            {
                label:'Level 2 - Item 6',
                position:8,
                hasChildren: true,
                children: [
                    {
                        label:'Level 3 - Item 1',
                        position:9
                    },
                    {
                        label:'Level 3 - Item 2',
                        position:10
                    },
                    {
                        label:'Level 3 - Item 3',
                        position:11
                    }
                ]
            },
            {
                label:'Level 2 - Item 7',
                position:12
            }
        ]
    }
];