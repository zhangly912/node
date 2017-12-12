var url = require("url");
var getUrl = 'https://bp-backend-test.wxb.com.cn/bill/receive/receivableBillList?currentPage=1&pageSize=10&companyArray=[%7B%22id%22:800,%22type%22:1%7D]&inssueArray=[%7B%22id%22:801,%22type%22:1%7D]&areaCode=330102&startDate=2017-12-13&endDate=2018-01-15&orderNo=171210173351121504632&contractCode=zhongan-003&paytimeSort=0&token=bp_token_ee15af728f9c4ac198730685bd8430a7'
var querystring = require('querystring');
var params = url.parse(getUrl).query;
params = querystring.parse(params);
//请求参数
console.log(params);
//请求接口
console.log(url.parse(getUrl).pathname)
    /** 
    {
        currentPage: '1',
        pageSize: '10',
        companyArray: '[{"id":800,"type":1}]',
        inssueArray: '[{"id":801,"type":1}]',
        areaCode: '330102',
        startDate: '2017-12-13',
        endDate: '2018-01-15',
        orderNo: '171210173351121504632',
        contractCode: 'zhongan-003',
        paytimeSort: '0',
        token: 'bp_token_ee15af728f9c4ac198730685bd8430a7'
    }
    */