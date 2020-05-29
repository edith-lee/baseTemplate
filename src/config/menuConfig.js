export default {
    overview: [
        {
            title: "数据看板",
            key: "/overview",
            component: "Overview",
            icon: "FundOutlined",
        },
    ],
    menuList: [
        {
            title: "图片列表页",
            key: "/main/grid",
            component: "GridPage",
            icon: "PictureOutlined",
            // children: [
            //     {
            //         title: "表格页",
            //         key: "/main/table1",
            //         component: "TablePage",
            //         icon: "InsertRowAboveOutlined",
            //     },
            //     {
            //         title: "表格页",
            //         key: "/main/table2",
            //         component: "TablePage",
            //         icon: "InsertRowAboveOutlined",
            //     },
            // ]
        },
        {
            title: "表格页",
            key: "/main/table",
            component: "TablePage",
            icon: "InsertRowAboveOutlined",
        },
        {
            title: "时间线",
            key: "/main/timeline",
            component: "TimeLinePage",
            icon: "AlignLeftOutlined",
        }
    ],
} 
