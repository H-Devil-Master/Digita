$(document).ready(function() {
    function timeconversion(data){
        const timestamp = data*1000; // 时间戳（以毫秒为单位）
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
    //导航栏
    axios.get('http://122.9.161.126:5001/supply/v2/steel_classify')
        .then(function(res) {
            // 处理返回的数据
            console.log(res)
            $('.middle-header-box').each(function() {
                var navText = $(this).find('div:first-child').text(); // 获取导航元素的文本
                // 检查导航元素是否存在对应的数据
                if (res.data.data.hasOwnProperty(navText)) {
                    var dropdownMenu = $(this).parent().find('.middle-t'); // 获取当前导航元素对应的下拉菜单

                    // 遍历数据并生成下拉菜单选项
                    res.data.data[navText].forEach(function(optionText) {
                        var optionHtml = '<a href="javascript:;">' + optionText + '</a>'; // 生成选项的 HTML
                        dropdownMenu.append(optionHtml); // 将选项添加到下拉菜单中
                    });
                }
            });
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });
/*现货资源列表*/
    axios.get('http://122.9.161.126:5001/supply/v2/steel_spot_resources?steel_name=角钢')
        .then(function(res) {
            console.log(res)
            $.each(res.data.data.steel_price_data, function(index, value) {
                var $newRow = $('<tr>');
                $newRow.append($('<td>').text(value.name));
                $newRow.append($('<td>').text(value.texture));
                $newRow.append($('<td>').text(value.specification));
                $newRow.append($('<td>').text(value.place_brand));
                $newRow.append($('<td>').text(value.sales_company));
                $newRow.append($('<td>').text(value.price));
                $('#panel-table').append($newRow);
            });
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });

    /*国际资讯*/
    //遍历所有的a标签
    showconent('http://122.9.161.126:5001/supply/v2/steel_news?model_name=国际资讯')
    const allUrl = ['http://122.9.161.126:5001/supply/v2/steel_news?model_name=国际资讯','http://122.9.161.126:5001/supply/v2/steel_news?model_name=期货快报','http://122.9.161.126:5001/supply/v2/steel_news?model_name=废钢行情','http://122.9.161.126:5001/supply/v2/steel_news?model_name=行业动态','http://122.9.161.126:5001/supply/v2/steel_news?model_name=市场分析','http://122.9.161.126:5001/supply/v2/steel_news?model_name=每周评述']
    $('.main-footer-header a').each(function (index,elemnt){
        $(elemnt).click(function (){
            showconent(allUrl[index])
        })
    })

    function showconent(url){
        $('.asj').html('')
        axios.get(url)
            .then(function(res) {
                console.log(res)
                $.each(res.data.data, function(index, value) {
                    var $newRow = $('<tr class="asj">');
                    var $nameCell = $('<td class="openBtn">').append(
                        $('<div>').addClass('icon-box').append(
                            $('<div>').addClass('icon')
                        ).append(value.title)
                    );
                    $nameCell.attr('data-index', index);
                    $newRow.append($nameCell);
                    $newRow.append($('<td>').text("重庆"));
                    $newRow.append($('<td>').text(value.quoted_date));
                    $('#mainFooter').append($newRow);

                    $(document).on('click', '.openBtn', function() {
                        // 获取当前被点击元素的data-index属性值
                        var clickedIndex = $(this).attr('data-index');

                        // 根据索引获取对应的元素和数据
                        var clickedElement = res.data.data[clickedIndex];

                        $('.popupContent').html(clickedElement.content)
                        $("#popup").fadeIn();
                        console.log(clickedElement)
                    });

                    $(document).mouseup(function(e) {
                        var popup = $("#popup");
                        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                            popup.fadeOut();
                            $('.popupContent').html('')
                        }
                    });
                    $("#closeBtn").click(function() {
                        $("#popup").fadeOut();
                        $('.popupContent').html('')
                    });
                });

            })
            .catch(function(error) {
                console.log('请求失败：' + error);
            });

    }



    /*各地价格总汇*/
    axios.get('http://122.9.161.126:5001/supply/v2/steel_area_price?steel_name=热轧卷板')
        .then(function(res) {
            console.log(res,"dasdad")
            $.each(res.data.data.steel_price_data, function(index, value) {
                var imgPath = '';
                if (value.up_down > 0) {
                    imgPath = './img/gup.png'; // 正数时的图片路径
                } else if (value.up_down < 0) {
                    imgPath = './img/gdown.png'; // 负数时的图片路径
                } else {
                    // 当值为0时，将数据居中对齐
                    $('.g-box').css('justify-content', 'center');
                }
                var $newRow = $('<tr>');
                $newRow.append($('<td>').text(value.name));
                $newRow.append($('<td>').text(value.texture));
                $newRow.append($('<td>').text(value.specification));
                $newRow.append($('<td>').text(value.place_brand));
                $newRow.append($('<td>').text(value.region));
                $newRow.append($('<td>').text(timeconversion(value.quoted_date)));
                $newRow.append($('<td>').text(value.price + value.unit));
                var td = $('<td></td>').html('<div class="g-box"><div>' + Math.abs(value.up_down) + '</div><div><img src="' + imgPath + '" alt=""></div></div>');
                $newRow.append(td);
                $newRow.append($('<td class="trend"></td>').html('<img src="./img/zou.png" alt="网络不佳">'));
                $('.middle-tab').append($newRow);
                $newRow.data("rowData", value);
                // 为动态生成的每个 <tr> 中的 <td> 绑定点击事件
                $newRow.on("click", ".trend", function() {
                    // 执行只触发一次的操作
                    // 点击事件处理程序
                    var rowData = $(this).closest("tr").data("rowData");
                    // 在这里可以使用 rowData 访问对应的数据  `
                    var imgPath = '';
                    if (rowData.up_down > 0) {
                        imgPath = './img/gup.png'; // 正数时的图片路径
                    } else if (rowData.up_down < 0) {
                        imgPath = './img/gdown.png'; // 负数时的图片路径
                    } else {
                        // 当值为0时，将数据居中对齐
                        $('.g-box').css('justify-content', 'center');
                    }
                    console.log(rowData)
                    // 在此处添加您希望执行的代码
                    $('.popupContent1-main-header ul').append('<li>' + rowData.name + '</li>');
                    $('.popupContent1-main-header ul').append('<li>' + rowData.texture + '</li>');
                    $('.popupContent1-main-header ul').append('<li>' + rowData.specification + '</li>');
                    $('.popupContent1-main-header ul').append('<li>' + rowData.place_brand + '</li>');
                    $('.popupContent1-main-header ul').append('<li>' + rowData.region + '</li>');
                    $('.popupContent1-main-header ul').append('<li>' + timeconversion(rowData.quoted_date) + '</li>');
                    $('.popupContent1-main-header ul').append('<li style="color: #00FF00">' + rowData.price +rowData.unit+ '</li>');
                    var li = $('<li></li>').html('<div class="g-box"><div>' + Math.abs(rowData.up_down) + '</div><div><img src="' + imgPath + '" alt=""></div></div>')
                    $('.popupContent1-main-header ul').append(li);
                    axios.get(`http://122.9.161.126:5001/supply/v2/steel_price_chart?steel_name=${rowData.name}&steel_region=${rowData.region}`)
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
                            showpanle(convertedDates,res.data.data.price);
                        })
                        .catch(function(error) {
                            console.log('请求失败：' + error);
                        });
                    $("#popup1").fadeIn();


                });



                $(document).mouseup(function (e) {
                    var popup = $("#popup1");
                    if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                        popup.fadeOut();
                        $(".popupContent1-main-header ul").empty();
                    }
                });
                $(".closebtn").click(function () {
                    $(".popupContent1-main-header ul").empty();
                    $("#popup1").fadeOut();
                });
                function showpanle(a,b){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.querySelector('.popupContent1-main-panle'));

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
                            data: a,
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
                            data: b
                        }
                    ]
                };
                myChart.setOption(option);
                }
            });

        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });
})

