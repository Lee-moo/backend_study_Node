const request = require('request');
const iconv = require('iconv-lite');
request({
    url : 'https://www.google.com/search',
    method : 'GET',
    qs : { q : '신사역 맛집'},
    encoding : null,
}, (error, response, body) =>{
    const decodedResult = iconv.decode(body, 'euc-kr');
    console.log(decodedResult);
});