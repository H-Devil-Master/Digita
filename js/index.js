$(document).ready(function() {
    function timeconversion(data){
        const timestamps = data; // 时间戳（以毫秒为单位）
        const convertedDates = timestamps.map(timestamp => {
            const date = new Date(timestamp*1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate
            // return date.toLocaleString(); // 如果需要自定义日期格式，可以使用其他方法来格式化
        });
    }
/*第一个折线图*/
(function (){
    axios.get('http://122.9.161.126:5001/supply/v2/steel_price_chart?steel_name=角钢')
        .then(function(res) {
            console.log(res)
            const timestamps = res.data.data.quoted_date; // 时间戳（以毫秒为单位）
            const convertedDates = timestamps.map(timestamp => {
                const date = new Date(timestamp*1000);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                return formattedDate; // 如果需要自定义日期格式，可以使用其他方法来格式化
            })
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
                        data: convertedDates,
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
                        min:3500,
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
                        name: '价格',
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
                        data: res.data.data.price
                    }
                ]
            };
            myChart.setOption(option);
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });


})();
/*第二个折线图*/

(function (){
    axios.get('http://122.9.161.126:5001/supply/v2/steel_basis?steel_name=螺纹钢')
        .then(function(res) {
            console.log(res)
            const timestamps = res.data.data.spot.quoted_date; // 时间戳（以毫秒为单位）
            const convertedDates = timestamps.map(timestamp => {
                const date = new Date(timestamp*1000);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                return formattedDate; // 如果需要自定义日期格式，可以使用其他方法来格式化
            })
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
                    data: convertedDates,
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
                    min:3400,
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
                        // stack: 'Total',
                        symbol:'none',
                        color:'rgb(210,182,22)',
                        smooth:true,
                        lineStyle:{
                            color:'rgb(210,182,22)'
                        },
                        data: res.data.data.spot.price
                    },
                    {
                        name: '期货价',
                        type: 'line',
                        // stack: 'Total',
                        color:'rgb(0,99,224)',
                        symbol:'none',
                        smooth:true,
                        lineStyle:{
                            color:'rgb(0,99,224)'
                        },
                        data: res.data.data.futures.price
                    },
                ]
            };

            myChart.setOption(option);
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        })

})();

(function (){

    //点击切换效果
    const functions = [showdata1,showdata2,showdata3]
    $('.main-body-header').on("click",'a',function (){
        var index = $(this).index();
        functions[index]();
    })
    showdata1()
    function showdata1(){
        axios.get('http://122.9.161.126:5001/supply/v2/steel_many_chart?model_name=钢铁综合指数')
            .then(function(res) {
                console.log(res)
                const timestamps = res.data.data.quoted_date; // 时间戳（以毫秒为单位）
                const convertedDates = timestamps.map(timestamp => {
                    const date = new Date(timestamp*1000);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;

                    return formattedDate; // 如果需要自定义日期格式，可以使用其他方法来格式化
                })
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
                        data: convertedDates,
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
                        min:3500,
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
                            name: '钢铁综合指数',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.price,
                            color:'rgb(1,253,22)',
                            areaStyle: {
                                color:new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset:0,
                                            color: 'rgba(92,194,96,0.1)'

                                        },
                                        {
                                            offset: 0.8,
                                            color:'rgba(17,14,69,0.9)'
                                        }
                                    ],
                                    false
                                )
                            },
                        },
                    ]
                };

                myChart.setOption(option,true);
            })
            .catch(function(error) {
                console.log('请求失败：' + error);
            });
    }

    function showdata2() {
        axios.get('http://122.9.161.126:5001/supply/v2/steel_many_chart?model_name=钢铁进出口统计')
            .then(function (res) {
                console.log(res,"d换届大会讲课很就看看")
                const timestamps = res.data.data.steel_in.quoted_date; // 时间戳（以毫秒为单位）
                const convertedDates = timestamps.map(timestamp => {
                    const date = new Date(timestamp*1000);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;

                    return formattedDate; // 如果需要自定义日期格式，可以使用其他方法来格式化
                })
                var myChart = echarts.init(document.querySelector('.main-body-table'));
                /*option = {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgb(0,64,143)',
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
                        textStyle: {
                            color: '#ffffff',
                            paddingLeft: '10px',
                            fontSize: '12px'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: convertedDates,
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 12
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgb(22,44,104)"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',

                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 12
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgb(22,44,104)",
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(22,44,104)"
                            }
                        }
                    },
                    series: [
                        {
                            name: '钢铁进口',
                            type: 'line',
                            // stack: 'Total',
                            symbol: 'none',
                            smooth: true,
                            data: res.data.data.steel_in.price
                        },
                        {
                            name: '钢铁出口',
                            type: 'line',
                            // stack: 'Total',
                            symbol: 'none',
                            smooth: true,
                            data: res.data.data.steel_out.price
                        },
                        {
                            name: '钢铁上游港口库存',
                            type: 'line',
                            // stack: 'Total',
                            symbol: 'none',
                            smooth: true,
                            data: res.data.data.steel_ku_cun.price
                        }
                    ]
                };*/

                option = {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgb(0,64,143)',
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
                        textStyle: {
                            color: '#ffffff',
                            paddingLeft: '10px',
                            fontSize: '12px'
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: convertedDates,
                            axisLabel: {
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 12
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(22,44,104)"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 12
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(22,44,104)",
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgb(22,44,104)"
                                }
                            }
                        },
                        {
                            axisLabel: {
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 12
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(22,44,104)",
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgb(22,44,104)"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '钢铁月度进口量',
                            type: 'bar',
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value;
                                }
                            },
                            data: res.data.data.steel_in.price
                        },
                        {
                            name: '钢铁月度出口量',
                            type: 'bar',
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value;
                                }
                            },
                            data: res.data.data.steel_out.price
                        },
                        {
                            name: '钢铁上游港口库存',
                            type: 'line',
                            yAxisIndex: 1,
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value;
                                }
                            },
                            data: res.data.data.steel_ku_cun.price
                        }
                    ]
                };

                myChart.setOption(option,true);
            })
            .catch(function (error) {
                console.log('请求失败：' + error);
            });
    }

    function showdata3(){
        axios.get('http://122.9.161.126:5001/supply/v2/steel_many_chart?model_name=黑色商品期货指数')
            .then(function(res) {
                console.log(res)
                const timestamps = res.data.data.焦炭.quoted_date; // 时间戳（以毫秒为单位）
                const convertedDates = timestamps.map(timestamp => {
                    const date = new Date(timestamp*1000);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;

                    return formattedDate; // 如果需要自定义日期格式，可以使用其他方法来格式化
                })
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
                        data: convertedDates,
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
                        min:3500,
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
                            name: '热轧卷板',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.热轧卷板.price
                        },
                        {
                            name: '焦炭',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.焦炭.price
                        },
                        {
                            name: '焦煤',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.焦煤.price
                        },
                        {
                            name: '螺纹钢',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.螺纹钢.price
                        },
                        {
                            name: '铁矿石',
                            type: 'line',
                            // stack: 'Total',
                            symbol:'none',
                            smooth:true,
                            data: res.data.data.铁矿石.price
                        }
                    ]
                };

                myChart.setOption(option,true);
            })
            .catch(function(error) {
                console.log('请求失败：' + error);
            });
    }


})();
//走势图


//地图
(function (){
    axios.get('http://122.9.161.126:5001/supply/v2/to_city')
        .then(function(res) {
            console.log(res,'打号机')
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
                            var circle = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:red"></span>';
                            return circle + city + ' : ' + amount + ' 元/吨';
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
                                color: "rgb(255,255,255)",
                                formatter: function(params) {
                                    var cityNamesToShow = res.data.data; // 希望显示的城市名称列表
                                    if (cityNamesToShow.includes(params.name)) {
                                        return params.name; // 返回城市名称
                                    } else {
                                        return ''; // 不在列表中的城市名称不显示
                                    }
                                }
                            },
                            // 鼠标放上去的样式
                            emphasis: {
                                textStyle: {
                                    color: "#fff",
                                },
                            },
                        },
                        itemStyle: {
                            areaColor:'rgb(8,43,121)',
                            normal: {
                                borderColor: "rgba(147, 235, 248, 1)",
                                borderWidth: 1,
                                areaColor: {
                                    type: "radial",
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                                shadowColor: "rgba(128, 217, 248, 1)",
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10,
                            },
                            // 鼠标放上去高亮的样式
                            emphasis: {
                                // borderColor: "rgba(147, 235, 248, 1)",
                                areaColor: "#389BB7",
                                borderWidth: 0,
                            },
                        }
                    },
                    series: [
                {
                  type: "effectScatter",
                  coordinateSystem: "geo",
                  effectType: "ripple",
                  showEffectOn: "render",
                  rippleEffect: {
                    period: 5,
                    scale: 5,
                    brushType: "fill",
                  },

                  hoverAnimation: true,
                  itemStyle: {
                    normal: {
                      color: "rgba(255, 235, 59, .7)",
                      shadowBlur: 10,
                      shadowColor: "#333",
                    },
                  },
                  zlevel: 1,
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
                },
                        /*{
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
                        }*/
                    ]
                };
                // 设置图表配置项并绘制图表
                myChart.setOption(option);
                var data = [
                    {name: '北京', value: 0},
                    {name: '天津', value: 0},
                    {name: '上海', value: 0},
                    {name: '重庆', value: 0},
                    {name: '河北', value: 0},
                    {name: '河南', value: 0},
                    {name: '云南', value: 0},
                    {name: '辽宁', value: 0},
                    {name: '黑龙江', value: 0},
                    {name: '湖南', value: 0},
                    {name: '安徽', value: 0},
                    {name: '山东', value: 0},
                    {name: '新疆', value: 0},
                    {name: '江苏', value: 0},
                    {name: '浙江', value: 0},
                    {name: '江西', value: 0},
                    {name: '湖北', value: 0},
                    {name: '广西', value: 0},
                    {name: '甘肃', value: 0},
                    {name: '山西', value: 0},
                    {name: '内蒙古', value: 0},
                    {name: '陕西', value: 0},
                    {name: '吉林', value: 0},
                    {name: '福建', value: 0},
                    {name: '贵州', value: 0},
                    {name: '广东', value: 0},
                    {name: '青海', value: 0},
                    {name: '西藏', value: 0},
                    {name: '四川', value: 0},
                    {name: '宁夏', value: 0},
                    {name: '海南', value: 0},
                    {name: '台湾', value: 0},
                    {name: '香港', value: 0},
                    {name: '澳门', value: 0}
                ]
                myChart.on("click", (params) => {
                    console.log(params)
                    data.forEach((item) => {
                        if (params.name == item.name) {
                            console.log("a")
                        }
                    })
                });
            });
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });

})()
})
