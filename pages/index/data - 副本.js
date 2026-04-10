//0.0.4版本起 返回结果将有两部分组成:
/*
{
	index:[],	//旧版本的下标数组形式
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中,我故意把value设置成跟name一样,只是为了方便演示,使示例更加易懂,实际使用时候value应该是一个标识,给后台识别所用的.
// 数据较长，请仔细查看。
export default [
	{
		"name": '位置',
		"type": 'hierarchy',
		"submenu": [
		        {
                    "name": "不限",
                    "value": "",
 					"submenu":[
						{
						    "name": "100米",
						    "value": "100米",
							"submenu":[
								{
								    "name": "100米",
								    "value": "100米"
								},
								{
								    "name": "200米",
								    "value": "200米"
								},
								{
								    "name": "300米",
								    "value": "300米"
								},
								{
								    "name": "400米",
								    "value": "400米"
								},
								{
								    "name": "500米",
								    "value": "500米"
								},
								{
								    "name": "600米",
								    "value": "600米"
								},
								{
								    "name": "700米",
								    "value": "700米"
								},
								{
								    "name": "800米",
								    "value": "800米"
								}
							] 
						}
					] 
                },
				{
					"name": "福田",
					"value": "福田区",
					"submenu":[
						{
						    "name": "200米",
						    "value": "200米",
							"submenu":[
								{
								    "name": "400米",
								    "value": "400米"
								},
								{
								    "name": "800米",
								    "value": "800米"
								}
							] 
						}
					] 
				},
				{
					"name": "宝安",
					"value": "宝安区"
				},
				{
					"name": "南山",
					"value": "南山区"
				},
				{
					"name": "龙华",
					"value": "龙华区"
				},
				{
					"name": "龙岗",
					"value": "龙岗区"
				},
				{
					"name": "罗湖",
					"value": "罗湖区"
				},
				{
					"name": "布吉",
					"value": "布吉区"
				},
				{
					"name": "光明",
					"value": "光明区"
				},
				{
					"name": "坪山",
					"value": "坪山区"
				},
				{
					"name": "盐田",
					"value": "盐田区"
				}
		]
    },
	/*
    {
        "name": '方式',
        "type": 'hierarchy',
        "submenu": [
            {
                "name": "不限",
                "value": "不限"
            },
            {
                "name": "整租",
                "value": "整租"
            },
            {
                "name": "合租",
                "value": "合租"
            }
        ]
    },
	*/
    {
        "name": '租金',
        "type": 'hierarchy',
        "submenu": [
            {
                "name": "不限",
                "value": ""
            },
            {
                "name": "<1000元",
                "value": "0-1000"
            },
            {
                "name": "1000-1500元",
                "value": "1000-1500"
            },
            {
                "name": "1500-2000元",
                "value": "1500-2000"
            },
            {
                "name": "2000-3000元",
                "value": "2000-3000"
            },
            {
                "name": "3000-4500元",
                "value": "3000-4500"
            },
            {
                "name": ">4500元",
                "value": "4500-999999"
            }
        ]
    },
    {
        name: '户型',
        "type": 'radio',
        "submenu": [
			    {
				"name": "户型",
				"submenu": [
					{
					    "name": "一居",
					    "value": "1"
					},
					{
						"name": "二居",
						"value": "2"
					},
					{
						"name": "三居",
						"value": "3"
					},
					{
						"name": "四居",
						"value": "4"
					}
                ]
            },
            {
                "name": "朝向",
                "submenu": [
					{
                        "name": "东",
                        "value": "朝东",
					},
                    {
                        "name": "南",
                        "value": "朝南",
                    },
                    {
                        "name": "西",
                        "value": "朝西"
                    },
                    {
                        "name": "北",
                        "value": "朝北"
                    }
                ]
            },
            /* {
                "name": "房屋亮点",
                "submenu": [
					{
                        "name": "近地铁",
                        "value": "近地铁"
					},
					{
						"name": "独卫",
						"value": "独卫"
					},
					{
						"name": "独立阳台",
						"value": "独立阳台"
					},
					{
						"name": "精装修",
						"value": "精装修"
					},
					{
						"name": "可短租",
						"value": "可短租"
					},
					{
						"name": "首次出租",
						"value": "首次出租"
					},
					{
						"name": "免物业费",
						"value": "免物业费"
					},
					{
						"name": "民用水电",
						"value": "民用水电"
					},
                ]
            } */
        ]
    },
	{
	    "name": '排序',
	    "type": 'hierarchy',
	    "submenu": [
	        {
	            "name": "综合排序",
	            "value": "sort=desc"
	        },
	        {
	            "name": "最新发布",
	            "value": "id=desc"
	        },
	        {
	            "name": "价格(从高到低)",
	            "value": "rental=desc"
	        },
	        {
	            "name": "价格(从低到高)",
	            "value": "rental=asc"
	        },
	        {
	            "name": "面积(从大到小)",
	            "value": "area=desc"
	        },
	        {
	            "name": "面积(从小到大)",
	            "value": "area=asc"
	        }
	    ]
	}
]

