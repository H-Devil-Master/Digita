/*第一个折线图*/
(function (){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.line1'));

    option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor:'rgb(0,64,143)',
            borderColor: 'rgb(0,64,143)',
            axisPointer: {
                type: 'line',
                lineStyle: { // 将触发竖线的样式设置为实线，并将颜色修改为红色
                    type: 'solid',
                    color: 'rgb(0,64,143)'
                }
            },
            textStyle: { // 将 Tooltip 内容中字体的颜色设置为白色
                color: 'white'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top:'3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel:{
                    textStyle:{
                        color:'#ffffff',
                        fontSize:12
                    }
                },
                axisLine:{
                    lineStyle:{
                        color: "rgb(22,44,104)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel:{
                    textStyle:{
                        color:'#ffffff',
                        fontSize:12
                    }
                },
                axisLine:{
                    lineStyle:{
                        color: "rgb(22,44,104)",
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:"rgb(22,44,104)"
                    }
                }
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                //填充颜色设置
                areaStyle: {
                    color:new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset:0,
                                color: 'rgba(231,87,110,.4)'

                            },
                            {
                                offset: 0.8,
                                color:'rgba(17,14,69,0.9)'
                            }
                        ],
                        false
                    )
                },
                symbol:'none',
                smooth:true,
                color:'rgb(246,63,67)',
                lineStyle:{
                    color:'red'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };
    myChart.setOption(option);
})();
/*第二个折线图*/
(function (){
    var myChart = echarts.init(document.querySelector('.line2'));
    option = {
        title: {
            text: '期限货基差',
            textStyle: {
                color: '#ffffff', // 设置标题颜色
                fontSize:'15px',
                fontWeight:'bold',
                left:0
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor:'rgb(0,64,143)',
            borderColor: 'rgb(0,64,143)',
            axisPointer: {
                type: 'line',
                lineStyle: { // 将触发竖线的样式设置为实线，并将颜色修改为红色
                    type: 'solid',
                    color: 'rgb(0,64,143)'
                }
            },
            textStyle: { // 将 Tooltip 内容中字体的颜色设置为白色
                color: 'white'
            },
            formatter: function(params) {
                var priceA = params[0].data; // A 线的价格
                var priceB = params[1].data; // B 线的价格
                var diff = Math.abs(priceA - priceB); // 计算差价
                var diffText = diff.toFixed(0); // 格式化差价
                var circle = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:red"></span>';
                return params[0].name + '<br/>' +
                    params[0].marker + params[0].seriesName + ': ' + priceA + '<br/>' +
                    params[1].marker + params[1].seriesName + ': ' + priceB + '<br/>' +
                    circle +'差价：' + diffText; // 构造 tooltip 内容
            }
        },
        toolbox:{

        },
        legend: {
            textStyle:{
                color:'#ffffff',
                paddingLeft:'10px',
                fontSize:'12px'
            }
        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top:'15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{
                textStyle:{
                    color:'#ffffff',
                    fontSize:12
                }
            },
            axisLine:{
                lineStyle:{
                    color: "rgb(22,44,104)"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel:{
                textStyle:{
                    color:'#ffffff',
                    fontSize:12
                }
            },
            axisLine:{
                lineStyle:{
                    color: "rgb(22,44,104)",
                }
            },
            splitLine:{
                lineStyle:{
                    color:"rgb(22,44,104)"
                }
            }
        },
        series: [
            {
                name: '现货价',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                color:'rgb(210,182,22)',
                smooth:true,
                lineStyle:{
                    color:'rgb(210,182,22)'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '期货价',
                type: 'line',
                stack: 'Total',
                color:'rgb(0,99,224)',
                symbol:'none',
                smooth:true,
                lineStyle:{
                    color:'rgb(0,99,224)'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
        ]
    };

    myChart.setOption(option);
})();

(function (){
    var myChart = echarts.init(document.querySelector('.main-body-table'));

    option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor:'rgb(0,64,143)',
            borderColor: 'rgb(0,64,143)',
            axisPointer: {
                type: 'line',
                lineStyle: { // 将触发竖线的样式设置为实线，并将颜色修改为红色
                    type: 'solid',
                    color: 'rgb(0,64,143)'
                }
            },
            textStyle: { // 将 Tooltip 内容中字体的颜色设置为白色
                color: 'white'
            },
        },
        legend: {
            textStyle:{
                color:'#ffffff',
                paddingLeft:'10px',
                fontSize:'12px'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel:{
                textStyle:{
                    color:'#ffffff',
                    fontSize:12
                }
            },
            axisLine:{
                lineStyle:{
                    color: "rgb(22,44,104)"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel:{
                textStyle:{
                    color:'#ffffff',
                    fontSize:12
                }
            },
            axisLine:{
                lineStyle:{
                    color: "rgb(22,44,104)",
                }
            },
            splitLine:{
                lineStyle:{
                    color:"rgb(22,44,104)"
                }
            }
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                smooth:true,
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                smooth:true,
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                smooth:true,
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                smooth:true,
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                symbol:'none',
                smooth:true,
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    myChart.setOption(option);
})();
(function (){

    var trendElements = document.querySelectorAll('.trend');
    trendElements.forEach((item)=>{
        const myChart = echarts.init(item);
        const easingFuncs = {
            elasticInOut: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
                }
                if ((k *= 2) < 1) {
                    return (
                        -0.5 *
                        (a *
                            Math.pow(2, 10 * (k -= 1)) *
                            Math.sin(((k - s) * (2 * Math.PI)) / p))
                    );
                }
                return (
                    a *
                    Math.pow(2, -10 * (k -= 1)) *
                    Math.sin(((k - s) * (2 * Math.PI)) / p) *
                    0.5 +
                    1
                );
            },


        };
        const N_POINT = 30;
        const grids = [];
        const xAxes = [];
        const yAxes = [];
        const series = [];
        const titles = [];
        let count = 0;
        Object.keys(easingFuncs).forEach(function (easingName) {
            var easingFunc = easingFuncs[easingName];
            var data = [];
            for (var i = 0; i <= N_POINT; i++) {
                var x = i / N_POINT;
                var y = easingFunc(x);
                data.push([x, y]);
            }
            grids.push({
                show: true,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 2
            });
            xAxes.push({
                type: 'value',
                show: false,
                min: 0,
                max: 1,
                gridIndex: count
            });
            yAxes.push({
                type: 'value',
                show: false,
                min: -0.4,
                max: 1.4,
                gridIndex: count
            });
            series.push({
                name: easingName,
                type: 'line',
                xAxisIndex: count,
                yAxisIndex: count,
                data: data,
                showSymbol: false,
                animationEasing: easingName,
                animationDuration: 1000,
                lineStyle:{
                    color:'red'
                },

            });
            titles.push({
                textAlign: 'center',
                text: easingName,
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            });
            count++;
        });
        var rowNumber = Math.ceil(Math.sqrt(count));
        grids.forEach(function (grid, idx) {
            grid.left = ((idx % rowNumber) / rowNumber) * 100 + 0.5 + '%';
            grid.top = (Math.floor(idx / rowNumber) / rowNumber) * 100 + 0.5 + '%';
            grid.width = (1 / rowNumber) * 100 - 1 + '%';
            grid.height = (1 / rowNumber) * 100 - 1 + '%';
            titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
            titles[idx].top = parseFloat(grid.top) + '%';
        });
        option = {
            grid: grids,
            xAxis: xAxes,
            yAxis: yAxes,
            series: series
        };
        myChart.setOption(option);
    })


})();

//地图
(function (){
    // 假设我们有一个名为 "china.json" 的 GeoJSON 数据文件
    $.getJSON('china.json', function (geoJson) {
        // 注册地图
        echarts.registerMap('china', geoJson);

        // 初始化 ECharts 实例
        var myChart = echarts.init(document.querySelector('.middle-header-map'));
        window.dataList = [{
        },

        ];


        // option
        var option = {
            title: {
                text: '热卷板价格图例',
                textStyle:{
                    color:'#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const city = params.name;
                    const amount = params.value[2];
                    console.log()
                    return city + ' : ' + amount + ' 元/吨';
                }
            },
            visualMap: {
                // 配置视觉映射组件
                textStyle:{
                  color:'#fff',
                },
                type: 'piecewise',
                min: 0,
                max: 7000,
                seriesIndex: 0,
                dimension: 2,
                pieces: [
                    { min: 5360, max: 5472, color: 'rgb(89,211,245)' },
                    { min: 5472, max: 5585, color: 'rgb(78,239,157)' },
                    { min: 5585, max: 5697, color: 'rgb(193,233,52)' },
                    { min: 5697, max: 5810, color: 'rgb(235,214,73)' },
                    { min: 5810, max: 5922, color: 'rgb(240,185,50)' },
                    { min: 5922, max: 6035, color: 'rgb(241,152,68)' },
                    { min:  6035, max: 6147, color: 'rgb(246,63,67)' },
                    { min: 6147, max: 6260, color: 'rgb(246,63,67)' }
                ],
                calculable: true,
                inRange: {
                    color: ['#50a3ba', '#eac763', '#d94e5d', '#69c7ce', '#a8d8b9']
                }
            },
            geo: {
                map: 'china',
                roam: false, // 开启缩放和平移
                zoom:1.5,
                center: [105, 35],
                label: {
                    normal: {
                        show: !0,
                        fontSize: "12",
                        color: "rgb(255,255,255)"
                    }
                },
                itemStyle: {
                    areaColor:'rgb(8,43,121)'
                }
            },
            series: [
                {
                    name: '散点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{
                        name: '北京',
                        value: [
                            116.46,
                            39.92,
                            6210
                        ]
                    },
                        {
                            name: '天津',
                            value: [
                                117.209528,
                                39.091775,
                                6120
                            ]
                        },
                        {
                            name: '上海',
                            value: [
                                121.480827,31.23667,5966
                            ]
                        },
                        {
                            name: '重庆',
                            value: [
                                106.558724,29.567739,5875
                            ]
                        },
                        {
                            name: '河北',
                            value: [
                                114.517334,38.048429,6123
                            ]
                        },
                        {
                            name: '河南',
                            value: [
                                113.645834,34.806102,5671
                            ]
                        },
                        {
                            name: '云南',
                            value: [
                                99.936946,25.078655,6176
                            ]
                        },
                        {
                            name: '辽宁',
                            value: [
                                123.460603,41.683271,5756
                            ]
                        },
                        {
                            name: '黑龙江',
                            value: [
                                126.870589,46.974422,5869
                            ]
                        },
                        {
                            name: '湖南',
                            value: [
                                111.269681,28.901455,5968
                            ]
                        },
                        {
                            name: '安徽',
                            value: [
                                116.715281,30.825642,5922
                            ]
                        },
                        {
                            name: '山东',
                            value: 5412
                        },
                        {
                            name: '新疆',
                            value: 6100
                        },
                        {
                            name: '江苏',
                            value: 31
                        },
                        {
                            name: '浙江',
                            value: 104
                        },
                        {
                            name: '江西',
                            value: 36
                        },
                        {
                            name: '湖北',
                            value: 1052
                        },
                        {
                            name: '广西',
                            value: 33
                        },
                        {
                            name: '甘肃',
                            value: 7
                        },
                        {
                            name: '山西',
                            value: 9
                        },
                        {
                            name: '内蒙古',
                            value: 7
                        },
                        {
                            name: '陕西',
                            value: 22
                        },
                        {
                            name: '吉林',
                            value: 4
                        },
                        {
                            name: '福建',
                            value: 18
                        },
                        {
                            name: '贵州',
                            value: 5
                        },
                        {
                            name: '广东',
                            value: 98
                        },
                        {
                            name: '青海',
                            value: 1
                        },
                        {
                            name: '西藏',
                            value: 0
                        },
                        {
                            name: '四川',
                            value: 44
                        },
                        {
                            name: '宁夏',
                            value: 4
                        },
                        {
                            name: '海南',
                            value: 22
                        },
                        {
                            name: '台湾',
                            value: 3
                        },
                        {
                            name: '香港',
                            value: 5
                        },
                        {
                            name: '澳门',
                            value: 5
                        }],
                    symbolSize: 10, // 散点大小
                    showEffectOn: 'render', // 显示涟漪效果的时机（render / emphasis）
                    rippleEffect: {
                        brushType: 'fill' // 涟漪绘制方式（stroke / fill）
                    },
                    hoverAnimation: true, // 悬浮时是否有涟漪动画
                    label: {
                        show: false, // 不显示散点上的文本标签
                        position: 'right',
                    },
                    itemStyle: {
                        color: '#FF0000', // 散点颜色
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }
            ]
        };
        // 设置图表配置项并绘制图表
        myChart.setOption(option);
    });
})()