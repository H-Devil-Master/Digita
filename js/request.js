$(document).ready(function() {
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
            console.log(res,"das")
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
                $newRow.append($('<td>').text(value.quoted_date));
                $newRow.append($('<td>').text(value.price + value.unit));
                var td = $('<td></td>').html('<div class="g-box"><div>' + value.up_down + '</div><div><img src="' + imgPath + '" alt=""></div></div>');
                $newRow.append(td);
                $newRow.append($('<td class="trend">'));
                $('.middle-tab').append($newRow);
            });
        })
        .catch(function(error) {
            console.log('请求失败：' + error);
        });
})

