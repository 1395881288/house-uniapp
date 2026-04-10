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
			    "name": "区域",
			    "value": "区域",
				"type": 'hierarchy',
				"submenu": [
				    {
				    	"name": "福田",
				    	"value": "福田区",
						"type": 'hierarchy',
						"submenu": [
						    { "name": "不限","value": "" },
						    { "name": "八卦岭", "value": '{"lat":113.212,"lng":39.12312}' },
						    { "name": "百花", "value": '{"lat":113.2121,"lng":39.123121}' },
						    { "name": "车公庙", "value": '{"lat":113.2122,"lng":39.123122}' },
						    { "name": "赤尾", "value": '{"lat":113.2123,"lng":39.123123}' },
						    { "name": "福荣", "value": '{"lat":113.2124,"lng":39.123124}' },
						    { "name": "福田保税区", "value": '{"lat":113.2125,"lng":39.123125}' },
						    { "name": "福田口岸", "value": '{"lat":113.2126,"lng":39.123126}' },
						    { "name": "福田中心", "value": '{"lat":113.2127,"lng":39.123127}' },
						    { "name": "岗厦", "value": "岗厦" },
						    { "name": "皇岗", "value": "皇岗" },
						    { "name": "黄木岗", "value": "黄木岗" },
						    { "name": "华强北", "value": "华强北" },
						    { "name": "华强南", "value": "华强南" },
						    { "name": "景田", "value": "景田" },
						    { "name": "莲花", "value": "莲花" },
						    { "name": "莲塘", "value": "莲塘" },
						    { "name": "梅林", "value": "梅林" },
						    { "name": "上步", "value": "上步" },
						    { "name": "石厦", "value": "石厦" },
						    { "name": "沙尾", "value": "沙尾" },
						    { "name": "水围", "value": "水围" },
						    { "name": "上下沙", "value": "上下沙" },
						    { "name": "香梅北", "value": "香梅北" },
						    { "name": "香蜜湖", "value": "香蜜湖" },
						    { "name": "香蜜湖东", "value": "香蜜湖东" },
						    { "name": "下梅林", "value": "下梅林" },
						    { "name": "新洲", "value": "新洲" },
						    { "name": "银湖", "value": "银湖" },
						    { "name": "园岭", "value": "园岭" },
						    { "name": "竹子林", "value": "竹子林" }
						]
				    },
				    {
				    	"name": "南山",
				    	"value": "南山区",
						"submenu": [
							{
								"name": "不限",
								"value": "南山区",
							},
							{ "name": "半岛", "value": "半岛" },
							{ "name": "白石洲", "value": "白石洲" },
							{ "name": "大新", "value": "大新" },
							{ "name": "大学城", "value": "大学城" },
							{ "name": "桂庙", "value": "桂庙" },
							{ "name": "公明", "value": "公明" },
							{ "name": "海岸城", "value": "海岸城" },
							{ "name": "海上世界", "value": "海上世界" },
							{ "name": "花园城", "value": "花园城" },
							{ "name": "科技园北", "value": "科技园北" },
							{ "name": "科技园南", "value": "科技园南" },
							{ "name": "留仙", "value": "留仙" },
							{ "name": "南山中心", "value": "南山中心" },
							{ "name": "南头", "value": "南头" },
							{ "name": "南油", "value": "南油" },
							{ "name": "侨城东", "value": "侨城东" },
							{ "name": "前海", "value": "前海" },
							{ "name": "麒麟", "value": "麒麟" },
							{ "name": "世界之窗", "value": "世界之窗" },
							{ "name": "蛇口", "value": "蛇口" },
							{ "name": "太古城", "value": "太古城" },
							{ "name": "塘朗", "value": "塘朗" },
							{ "name": "桃源村", "value": "桃源村" },
							{ "name": "曦城", "value": "曦城" },
							{ "name": "西丽", "value": "西丽" },
							{ "name": "愉康", "value": "愉康" },
						    
						]
				    },
				    {
				    	"name": "龙岗",
				    	"value": "龙岗区",
						"submenu": [
							{
								"name": "不限",
								"value": "龙岗区",
							},
							{ "name": "布吉", "value": "布吉" },
							{ "name": "布吉关", "value": "布吉关" },
							{ "name": "布吉慢城", "value": "布吉慢城" },
							{ "name": "布吉南岭", "value": "布吉南岭" },
							{ "name": "布吉水径", "value": "布吉水径" },
							{ "name": "布吉石芽岭", "value": "布吉石芽岭" },
							{ "name": "坂田", "value": "坂田" },
							{ "name": "大芬", "value": "大芬" },
							{ "name": "大运", "value": "大运" },
							{ "name": "大运新城", "value": "大运新城" },
							{ "name": "丹竹头", "value": "丹竹头" },
							{ "name": "龙岗宝荷", "value": "龙岗宝荷" },
							{ "name": "龙岗中心城", "value": "龙岗中心城" },
							{ "name": "龙华新区", "value": "龙华新区" },
							{ "name": "民治", "value": "民治" },
							{ "name": "南联", "value": "南联" },
							{ "name": "平湖", "value": "平湖" },
							{ "name": "天安数码城（龙岗）", "value": "天安数码城（龙岗）" },
							{ "name": "新洲", "value": "新洲" },
						    
						]
				    },
				    {
				    	"name": "宝安",
				    	"value": "宝安区",
						"submenu": [
							{
								"name": "不限",
								"value": "宝安区",
							},
							{ "name": "宝安中心", "value": "宝安中心" },
							{ "name": "碧海", "value": "碧海" },
							{ "name": "宝体", "value": "宝体" },
							{ "name": "翻身", "value": "翻身" },
							{ "name": "福永", "value": "福永" },
							{ "name": "观澜", "value": "观澜" },
							{ "name": "公明", "value": "公明" },
							{ "name": "海雅", "value": "海雅" },
							{ "name": "坪洲", "value": "坪洲" },
							{ "name": "松岗", "value": "松岗" },
							{ "name": "沙井", "value": "沙井" },
							{ "name": "石岩", "value": "石岩" },
							{ "name": "桃源居", "value": "桃源居" },
							{ "name": "新安", "value": "新安" },
							{ "name": "曦城", "value": "曦城" },
							{ "name": "西乡", "value": "西乡" },
						    
						]
				    },
				    {
				    	"name": "罗湖",
				    	"value": "罗湖区",
						"submenu": [
							{
								"name": "不限",
								"value": "罗湖区",
							},
							{ "name": "布吉", "value": "布吉" },
							{ "name": "布吉关", "value": "布吉关" },
							{ "name": "百仕达", "value": "百仕达" },
							{ "name": "布心", "value": "布心" },
							{ "name": "春风路", "value": "春风路" },
							{ "name": "翠竹", "value": "翠竹" },
							{ "name": "东门", "value": "东门" },
							{ "name": "地王", "value": "地王" },
							{ "name": "凤凰", "value": "凤凰" },
							{ "name": "洪湖", "value": "洪湖" },
							{ "name": "罗湖口岸", "value": "罗湖口岸" },
							{ "name": "螺岭", "value": "螺岭" },
							{ "name": "莲塘", "value": "莲塘" },
							{ "name": "清水河", "value": "清水河" },
							{ "name": "人民南", "value": "人民南" },
							{ "name": "水贝", "value": "水贝" },
							{ "name": "笋岗", "value": "笋岗" },
							{ "name": "沙头角", "value": "沙头角" },
							{ "name": "田贝", "value": "田贝" },
							{ "name": "万象城", "value": "万象城" },
							{ "name": "新秀", "value": "新秀" },
							{ "name": "银湖", "value": "银湖" },
						    
						]
				    },
				    {
				    	"name": "龙华",
				    	"value": "龙华区",
						"submenu": [
							{
								"name": "不限",
								"value": "龙华区",
							},
							{ "name": "坂田", "value": "坂田" },
							{ "name": "观澜", "value": "观澜" },
							{ "name": "红山", "value": "红山" },
							{ "name": "龙华新区", "value": "龙华新区" },
							{ "name": "龙华中心", "value": "龙华中心" },
							{ "name": "梅林关", "value": "梅林关" },
							{ "name": "民治", "value": "民治" },
							{ "name": "平湖", "value": "平湖" },
							{ "name": "上塘", "value": "上塘" },
							{ "name": "石岩", "value": "石岩" },
							{ "name": "深圳北站", "value": "深圳北站" },
							{ "name": "银湖", "value": "银湖" },
						    
						]
				    },
				    {
				    	"name": "盐田",
				    	"value": "盐田区",
						"submenu": [
							{
								"name": "不限",
								"value": "盐田区",
							},
							{ "name": "沙头角", "value": "沙头角" },
						    
						]
				    },
				    {
				    	"name": "光明",
				    	"value": "光明区",
						"submenu": [
							{
								"name": "不限",
								"value": "光明区",
							},
							{ "name": "公明", "value": "公明" },
							{ "name": "松岗", "value": "松岗" },
							{ "name": "石岩", "value": "石岩" },
							{ "name": "长圳", "value": "长圳" },
						    
						]
				    }
				]
			},
			{
				"name": "地铁",
				"value": "地铁",
				"type": 'hierarchy',
				"submenu": [
				    {   
						"name": "6号线", 
					    "value": "6号线",
					    "submenu": [
                            {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "科学馆", "value": "科学馆" },
							{ "name": "通新岭", "value": "通新岭" },
							{ "name": "体育中心", "value": "体育中心" },
							{ "name": "八卦岭", "value": "八卦岭" },
							{ "name": "银湖", "value": "银湖" },
							{ "name": "翰岭", "value": "翰岭" },
							{ "name": "梅林关", "value": "梅林关" },
							{ "name": "深圳北站", "value": "深圳北站" },
							{ "name": "红山", "value": "红山" },
							{ "name": "上芬", "value": "上芬" },
							{ "name": "元芬", "value": "元芬" },
							{ "name": "阳台山东", "value": "阳台山东" },
							{ "name": "官田", "value": "官田" },
							{ "name": "上屋", "value": "上屋" },
							{ "name": "长圳", "value": "长圳" },
							{ "name": "凤凰城", "value": "凤凰城" },
							{ "name": "光明大街", "value": "光明大街" },
							{ "name": "光明", "value": "光明" },
							{ "name": "科学公园", "value": "科学公园" },
							{ "name": "楼村", "value": "楼村" },
							{ "name": "红花山", "value": "红花山" },
							{ "name": "公明广场", "value": "公明广场" },
							{ "name": "合水口", "value": "合水口" },
							{ "name": "薯田埔", "value": "薯田埔" },
							{ "name": "松岗公园", "value": "松岗公园" },
							{ "name": "溪头", "value": "溪头" },
							{ "name": "松岗", "value": "松岗" },
					     
					    ]
					},
				    {   
						"name": "10号线", 
					    "value": "10号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "10号线(坂田线)",
							},
							{ "name": "福田口岸", "value": "福田口岸" },
							{ "name": "福民", "value": "福民" },
							{ "name": "岗厦", "value": "岗厦" },
							{ "name": "莲花村", "value": "莲花村" },
							{ "name": "冬瓜岭", "value": "冬瓜岭" },
							{ "name": "孖岭", "value": "孖岭" },
							{ "name": "雅宝", "value": "雅宝" },
							{ "name": "南坑", "value": "南坑" },
							{ "name": "光雅园", "value": "光雅园" },
							{ "name": "五和", "value": "五和" },
							{ "name": "坂田北", "value": "坂田北" },
							{ "name": "贝尔路", "value": "贝尔路" },
							{ "name": "华为", "value": "华为" },
							{ "name": "岗头", "value": "岗头" },
							{ "name": "雪象", "value": "雪象" },
							{ "name": "甘坑", "value": "甘坑" },
							{ "name": "凉帽山", "value": "凉帽山" },
							{ "name": "上李朗", "value": "上李朗" },
							{ "name": "木古", "value": "木古" },
							{ "name": "华南城", "value": "华南城" },
							{ "name": "岗厦北", "value": "岗厦北" },
							{ "name": "禾花", "value": "禾花" },
							{ "name": "平湖", "value": "平湖" },
							{ "name": "双拥街", "value": "双拥街" },
						 
						]
					},
				    {   
						"name": "14号线", 
						"value": "14号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "14号线",
							},
							{ "name": "岗厦北", "value": "岗厦北" },
							{ "name": "黄木岗", "value": "黄木岗" },
							{ "name": "罗湖北", "value": "罗湖北" },
							{ "name": "布吉", "value": "布吉" },
							{ "name": "石芽岭", "value": "石芽岭" },
							{ "name": "六约北", "value": "六约北" },
							{ "name": "四联", "value": "四联" },
							{ "name": "坳背", "value": "坳背" },
							{ "name": "大运", "value": "大运" },
							{ "name": "嶂背", "value": "嶂背" },
							{ "name": "南约", "value": "南约" },
							{ "name": "宝龙", "value": "宝龙" },
							{ "name": "锦龙", "value": "锦龙" },
							{ "name": "坪山围", "value": "坪山围" },
							{ "name": "坪山广场", "value": "坪山广场" },
							{ "name": "坪山中心", "value": "坪山中心" },
							{ "name": "坑梓", "value": "坑梓" },
							{ "name": "沙田", "value": "沙田" },
						 
						]
					
					},
				    {   
						"name": "6号线支线", 
					    "value": "6号线支线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线支线",
							},
							{ "name": "光明", "value": "光明" },
							{ "name": "圳美", "value": "圳美" },
							{ "name": "中大", "value": "中大" },
							{ "name": "深理工", "value": "深理工" },
						 
						]
					},
				    {  
						"name": "12号线", 
					    "value": "12号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "12号线(南宝线)",
							},
							{ "name": "海上田园东", "value": "海上田园东" },
							{ "name": "海上田园南", "value": "海上田园南" },
							{ "name": "国展北", "value": "国展北" },
							{ "name": "国展", "value": "国展" },
							{ "name": "福海西", "value": "福海西" },
							{ "name": "桥头西", "value": "桥头西" },
							{ "name": "福永", "value": "福永" },
							{ "name": "怀德", "value": "怀德" },
							{ "name": "福围", "value": "福围" },
							{ "name": "机场东", "value": "机场东" },
							{ "name": "兴围", "value": "兴围" },
							{ "name": "黄田", "value": "黄田" },
							{ "name": "钟屋南", "value": "钟屋南" },
							{ "name": "西乡桃源", "value": "西乡桃源" },
							{ "name": "平峦山", "value": "平峦山" },
							{ "name": "宝田一路", "value": "宝田一路" },
							{ "name": "宝安客运站", "value": "宝安客运站" },
							{ "name": "流塘", "value": "流塘" },
							{ "name": "上川", "value": "上川" },
							{ "name": "灵芝", "value": "灵芝" },
							{ "name": "新安公园", "value": "新安公园" },
							{ "name": "同乐南", "value": "同乐南" },
							{ "name": "中山公园", "value": "中山公园" },
							{ "name": "南头古城", "value": "南头古城" },
							{ "name": "桃园", "value": "桃园" },
							{ "name": "南山", "value": "南山" },
							{ "name": "南光", "value": "南光" },
							{ "name": "南油", "value": "南油" },
							{ "name": "四海", "value": "四海" },
							{ "name": "花果山", "value": "花果山" },
							{ "name": "海上世界", "value": "海上世界" },
							{ "name": "太子湾", "value": "太子湾" },
							{ "name": "左炮台东", "value": "左炮台东" },
						 
						]
					},
				    {    
						"name": "16号线", 
						"value": "16号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "16号线",
							},
							{ "name": "大运", "value": "大运" },
							{ "name": "大运中心", "value": "大运中心" },
							{ "name": "龙城公园", "value": "龙城公园" },
							{ "name": "黄阁坑", "value": "黄阁坑" },
							{ "name": "愉园", "value": "愉园" },
							{ "name": "回龙埔", "value": "回龙埔" },
							{ "name": "尚景", "value": "尚景" },
							{ "name": "盛平", "value": "盛平" },
							{ "name": "龙园", "value": "龙园" },
							{ "name": "双龙", "value": "双龙" },
							{ "name": "新塘围", "value": "新塘围" },
							{ "name": "龙东", "value": "龙东" },
							{ "name": "宝龙同乐", "value": "宝龙同乐" },
							{ "name": "坪山", "value": "坪山" },
							{ "name": "新和", "value": "新和" },
							{ "name": "六和", "value": "六和" },
							{ "name": "坪山围", "value": "坪山围" },
							{ "name": "坪环", "value": "坪环" },
							{ "name": "东纵纪念馆", "value": "东纵纪念馆" },
							{ "name": "沙壆", "value": "沙壆" },
							{ "name": "燕子湖", "value": "燕子湖" },
							{ "name": "石井", "value": "石井" },
							{ "name": "技术大学", "value": "技术大学" },
							{ "name": "田心", "value": "田心" },
						 
						]
					},
				    {
						"name": "1号线", 
						"value": "1号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "1号线(罗宝线)",
							},
							{ "name": "机场东", "value": "机场东" },
							{ "name": "后瑞", "value": "后瑞" },
							{ "name": "固戍", "value": "固戍" },
							{ "name": "西乡", "value": "西乡" },
							{ "name": "坪洲", "value": "坪洲" },
							{ "name": "宝体", "value": "宝体" },
							{ "name": "宝安中心", "value": "宝安中心" },
							{ "name": "新安", "value": "新安" },
							{ "name": "前海湾", "value": "前海湾" },
							{ "name": "鲤鱼门", "value": "鲤鱼门" },
							{ "name": "大新", "value": "大新" },
							{ "name": "桃园", "value": "桃园" },
							{ "name": "深大", "value": "深大" },
							{ "name": "高新园", "value": "高新园" },
							{ "name": "白石洲", "value": "白石洲" },
							{ "name": "世界之窗", "value": "世界之窗" },
							{ "name": "华侨城", "value": "华侨城" },
							{ "name": "侨城东", "value": "侨城东" },
							{ "name": "竹子林", "value": "竹子林" },
							{ "name": "车公庙", "value": "车公庙" },
							{ "name": "香蜜湖", "value": "香蜜湖" },
							{ "name": "购物公园", "value": "购物公园" },
							{ "name": "会展中心", "value": "会展中心" },
							{ "name": "岗厦", "value": "岗厦" },
							{ "name": "华强路", "value": "华强路" },
							{ "name": "科学馆", "value": "科学馆" },
							{ "name": "大剧院", "value": "大剧院" },
							{ "name": "老街", "value": "老街" },
							{ "name": "国贸", "value": "国贸" },
							{ "name": "罗湖", "value": "罗湖" },
						 
						]
					},
				    {
						"name": "2号线", 
						"value": "2号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "赤湾", "value": "赤湾" },
							{ "name": "蛇口港", "value": "蛇口港" },
							{ "name": "海上世界", "value": "海上世界" },
							{ "name": "水湾", "value": "水湾" },
							{ "name": "东角头", "value": "东角头" },
							{ "name": "湾厦", "value": "湾厦" },
							{ "name": "海月", "value": "海月" },
							{ "name": "登良", "value": "登良" },
							{ "name": "后海", "value": "后海" },
							{ "name": "科苑", "value": "科苑" },
							{ "name": "红树湾", "value": "红树湾" },
							{ "name": "世界之窗", "value": "世界之窗" },
							{ "name": "侨城北", "value": "侨城北" },
							{ "name": "深康", "value": "深康" },
							{ "name": "安托山", "value": "安托山" },
							{ "name": "侨香", "value": "侨香" },
							{ "name": "香蜜", "value": "香蜜" },
							{ "name": "香梅北", "value": "香梅北" },
							{ "name": "景田", "value": "景田" },
							{ "name": "莲花西", "value": "莲花西" },
							{ "name": "福田", "value": "福田" },
							{ "name": "市民中心", "value": "市民中心" },
							{ "name": "岗厦北", "value": "岗厦北" },
							{ "name": "华强北", "value": "华强北" },
							{ "name": "燕南", "value": "燕南" },
							{ "name": "大剧院", "value": "大剧院" },
							{ "name": "湖贝", "value": "湖贝" },
							{ "name": "黄贝岭", "value": "黄贝岭" },
							{ "name": "新秀", "value": "新秀" },
							{ "name": "莲塘口岸", "value": "莲塘口岸" },
							{ "name": "仙湖路", "value": "仙湖路" },
							{ "name": "莲塘", "value": "莲塘" },
							{ "name": "梧桐山南", "value": "梧桐山南" },
							{ "name": "沙头角", "value": "沙头角" },
							{ "name": "海山", "value": "海山" },
							{ "name": "盐田港西", "value": "盐田港西" },
							{ "name": "深外高中", "value": "深外高中" },
							{ "name": "盐田路", "value": "盐田路" },
							{ "name": "鸿安围", "value": "鸿安围" },
							{ "name": "盐田墟", "value": "盐田墟" },
							{ "name": "大梅沙", "value": "大梅沙" },
							{ "name": "小梅沙", "value": "小梅沙" },
						 
						]
					},
				    {
						"name": "3号线", 
						"value": "3号线",
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "福保", "value": "福保" },
							{ "name": "益田", "value": "益田" },
							{ "name": "石厦", "value": "石厦" },
							{ "name": "购物公园", "value": "购物公园" },
							{ "name": "福田", "value": "福田" },
							{ "name": "少年宫", "value": "少年宫" },
							{ "name": "莲花村", "value": "莲花村" },
							{ "name": "华新", "value": "华新" },
							{ "name": "通新岭", "value": "通新岭" },
							{ "name": "红岭", "value": "红岭" },
							{ "name": "老街", "value": "老街" },
							{ "name": "晒布", "value": "晒布" },
							{ "name": "翠竹", "value": "翠竹" },
							{ "name": "田贝", "value": "田贝" },
							{ "name": "水贝", "value": "水贝" },
							{ "name": "草埔", "value": "草埔" },
							{ "name": "布吉", "value": "布吉" },
							{ "name": "木棉湾", "value": "木棉湾" },
							{ "name": "大芬", "value": "大芬" },
							{ "name": "丹竹头", "value": "丹竹头" },
							{ "name": "六约", "value": "六约" },
							{ "name": "塘坑", "value": "塘坑" },
							{ "name": "横岗", "value": "横岗" },
							{ "name": "永湖", "value": "永湖" },
							{ "name": "荷坳", "value": "荷坳" },
							{ "name": "大运", "value": "大运" },
							{ "name": "爱联", "value": "爱联" },
							{ "name": "吉祥", "value": "吉祥" },
							{ "name": "龙城广场", "value": "龙城广场" },
							{ "name": "南联", "value": "南联" },
							{ "name": "双龙", "value": "双龙" },
						 
						]
					},
				    {
						"name": "4号线", 
						"value": "4号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "牛湖", "value": "牛湖" },
							{ "name": "观澜湖", "value": "观澜湖" },
							{ "name": "松元厦", "value": "松元厦" },
							{ "name": "观澜", "value": "观澜" },
							{ "name": "长湖", "value": "长湖" },
							{ "name": "茜坑", "value": "茜坑" },
							{ "name": "竹村", "value": "竹村" },
							{ "name": "清湖北", "value": "清湖北" },
							{ "name": "清湖", "value": "清湖" },
							{ "name": "龙华", "value": "龙华" },
							{ "name": "龙胜", "value": "龙胜" },
							{ "name": "上塘", "value": "上塘" },
							{ "name": "红山", "value": "红山" },
							{ "name": "深圳北站", "value": "深圳北站" },
							{ "name": "白石龙", "value": "白石龙" },
							{ "name": "民乐", "value": "民乐" },
							{ "name": "上梅林", "value": "上梅林" },
							{ "name": "莲花北", "value": "莲花北" },
							{ "name": "少年宫", "value": "少年宫" },
							{ "name": "市民中心", "value": "市民中心" },
							{ "name": "会展中心", "value": "会展中心" },
							{ "name": "福民", "value": "福民" },
							{ "name": "福田口岸", "value": "福田口岸" },
						 
						]
					},
				    {
						"name": "5号线", 
						"value": "5号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
						    { "name": "赤湾", "value": "赤湾" },
						    { "name": "荔湾", "value": "荔湾" },
						    { "name": "铁路公园", "value": "铁路公园" },
						    { "name": "妈湾", "value": "妈湾" },
						    { "name": "前湾公园", "value": "前湾公园" },
						    { "name": "前湾", "value": "前湾" },
						    { "name": "桂湾", "value": "桂湾" },
						    { "name": "前海湾", "value": "前海湾" },
						    { "name": "临海", "value": "临海" },
						    { "name": "宝华", "value": "宝华" },
						    { "name": "宝安中心", "value": "宝安中心" },
						    { "name": "翻身", "value": "翻身" },
						    { "name": "灵芝", "value": "灵芝" },
						    { "name": "洪浪北", "value": "洪浪北" },
						    { "name": "兴东", "value": "兴东" },
						    { "name": "留仙洞", "value": "留仙洞" },
						    { "name": "西丽", "value": "西丽" },
						    { "name": "大学城", "value": "大学城" },
						    { "name": "塘朗", "value": "塘朗" },
						    { "name": "长岭陂", "value": "长岭陂" },
						    { "name": "深圳北站", "value": "深圳北站" },
						    { "name": "民治", "value": "民治" },
						    { "name": "五和", "value": "五和" },
						    { "name": "坂田", "value": "坂田" },
						    { "name": "杨美", "value": "杨美" },
						    { "name": "上水径", "value": "上水径" },
						    { "name": "下水径", "value": "下水径" },
						    { "name": "长龙", "value": "长龙" },
						    { "name": "布吉", "value": "布吉" },
						    { "name": "百鸽笼", "value": "百鸽笼" },
						    { "name": "布心", "value": "布心" },
						    { "name": "太安", "value": "太安" },
						    { "name": "怡景", "value": "怡景" },
						    { "name": "黄贝岭", "value": "黄贝岭" },
						]
					},
				    {
						"name": "7号线", 
						"value": "7号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "西丽湖", "value": "西丽湖" },
							{ "name": "西丽", "value": "西丽" },
							{ "name": "茶光", "value": "茶光" },
							{ "name": "珠光", "value": "珠光" },
							{ "name": "龙井", "value": "龙井" },
							{ "name": "桃源村", "value": "桃源村" },
							{ "name": "深云", "value": "深云" },
							{ "name": "安托山", "value": "安托山" },
							{ "name": "农林", "value": "农林" },
							{ "name": "车公庙", "value": "车公庙" },
							{ "name": "上沙", "value": "上沙" },
							{ "name": "沙尾", "value": "沙尾" },
							{ "name": "石厦", "value": "石厦" },
							{ "name": "皇岗村", "value": "皇岗村" },
							{ "name": "福民", "value": "福民" },
							{ "name": "皇岗口岸", "value": "皇岗口岸" },
							{ "name": "赤尾", "value": "赤尾" },
							{ "name": "华强南", "value": "华强南" },
							{ "name": "华强北", "value": "华强北" },
							{ "name": "华新", "value": "华新" },
							{ "name": "黄木岗", "value": "黄木岗" },
							{ "name": "八卦岭", "value": "八卦岭" },
							{ "name": "红岭北", "value": "红岭北" },
							{ "name": "笋岗", "value": "笋岗" },
							{ "name": "洪湖", "value": "洪湖" },
							{ "name": "田贝", "value": "田贝" },
							{ "name": "太安", "value": "太安" },
						 
						]
					},
				    {
						"name": "9号线", 
						"value": "9号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
						    { "name": "前湾", "value": "前湾" },
						    { "name": "梦海", "value": "梦海" },
						    { "name": "怡海", "value": "怡海" },
						    { "name": "荔林", "value": "荔林" },
						    { "name": "南油西", "value": "南油西" },
						    { "name": "南油", "value": "南油" },
						    { "name": "南山书城", "value": "南山书城" },
						    { "name": "深大南", "value": "深大南" },
						    { "name": "粤海门", "value": "粤海门" },
						    { "name": "高新南", "value": "高新南" },
						    { "name": "红树湾南", "value": "红树湾南" },
						    { "name": "深湾", "value": "深湾" },
						    { "name": "深圳湾公园", "value": "深圳湾公园" },
						    { "name": "下沙", "value": "下沙" },
						    { "name": "车公庙", "value": "车公庙" },
						    { "name": "香梅", "value": "香梅" },
						    { "name": "景田", "value": "景田" },
						    { "name": "梅景", "value": "梅景" },
						    { "name": "下梅林", "value": "下梅林" },
						    { "name": "梅村", "value": "梅村" },
						    { "name": "上梅林", "value": "上梅林" },
						    { "name": "孖岭", "value": "孖岭" },
						    { "name": "银湖", "value": "银湖" },
						    { "name": "泥岗", "value": "泥岗" },
						    { "name": "红岭北", "value": "红岭北" },
						    { "name": "园岭", "value": "园岭" },
						    { "name": "红岭", "value": "红岭" },
						    { "name": "红岭南", "value": "红岭南" },
						    { "name": "鹿丹村", "value": "鹿丹村" },
						    { "name": "人民南", "value": "人民南" },
						    { "name": "向西村", "value": "向西村" },
						    { "name": "文锦", "value": "文锦" },
						]
					},
				    {
						"name": "11号线", 
						"value": "11号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
						    { "name": "碧头", "value": "碧头" },
						    { "name": "松岗", "value": "松岗" },
						    { "name": "后亭", "value": "后亭" },
						    { "name": "沙井", "value": "沙井" },
						    { "name": "马安山", "value": "马安山" },
						    { "name": "塘尾", "value": "塘尾" },
						    { "name": "桥头", "value": "桥头" },
						    { "name": "福永", "value": "福永" },
						    { "name": "机场北", "value": "机场北" },
						    { "name": "机场", "value": "机场" },
						    { "name": "碧海湾", "value": "碧海湾" },
						    { "name": "宝安", "value": "宝安" },
						    { "name": "前海湾", "value": "前海湾" },
						    { "name": "南山", "value": "南山" },
						    { "name": "后海", "value": "后海" },
						    { "name": "红树湾南", "value": "红树湾南" },
						    { "name": "车公庙", "value": "车公庙" },
						    { "name": "岗厦北", "value": "岗厦北" },
						    { "name": "福田", "value": "福田" },
						]
					},
				    {
						"name": "20号线", 
						"value": "20号线" ,
						"submenu": [
						    {
								"name": "不限",
								"value": "6号线(光明线)",
							},
							{ "name": "机场北", "value": "机场北" },
							{ "name": "国展南", "value": "国展南" },
							{ "name": "国展北", "value": "国展北" },
							{ "name": "会展城", "value": "会展城" },
							{ "name": "国展", "value": "国展" },
						 
						]
					},
				    
				]
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
                "name": "1000元以下",
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
                "name": "4500元以上",
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
	            "value": "room.sort asc"
	        },
	        {
	            "name": "最新发布",
	            "value": "room.id desc"
	        },
	        {
	            "name": "价格(从高到低)",
	            "value": "room.price desc"
	        },
	        {
	            "name": "价格(从低到高)",
	            "value": "room.price asc"
	        },
	        {
	            "name": "面积(从大到小)",
	            "value": "room.area desc"
	        },
	        {
	            "name": "面积(从小到大)",
	            "value": "room.area asc"
	        }
	    ]
	}
]

