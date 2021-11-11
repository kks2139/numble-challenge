export const request = async (api: string)=>{
    let url = '';
    switch(api){
        case 'getEvents':
            url = 'https://ridibooks.com/cart/';
            break;
        case 'getBooks':
            url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2e5d183a-415c-43cb-91dc-b0cef96c2a05/BOOK_DATA.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T131228Z&X-Amz-Expires=86400&X-Amz-Signature=61c5485e354365808d9e64198bde2d1fb76fcdc01e16dcbe2df11b5c4dbef7e7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22BOOK_DATA.json%22';
            break;
        case 'getAlerts':
            url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/497ff773-fc8d-4c13-89e7-88e35d7d91a9/ALERT_DATA.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T131259Z&X-Amz-Expires=86400&X-Amz-Signature=89042c9e1f5c24209f68c981745dc54b0c986aab732117f6860807ce71967909&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22ALERT_DATA.json%22';
            break;
        case 'getRents':
            url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c0ba6dc7-9e74-4378-856c-51a85ac5c0fb/RENT_DATA.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T131356Z&X-Amz-Expires=86400&X-Amz-Signature=cfd67f2324c335c803fe0b43db3ce44b3c32912fbde3ceb04dcceb6677e0d2a3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22RENT_DATA.json%22';
            break;
        case 'getCarts':
            url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b1cf3eaf-242d-4a2a-a5c3-dcbcd5053059/CART_DATA.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T131420Z&X-Amz-Expires=86400&X-Amz-Signature=8f42e9085eb0d3d8c86ceb0d59a1f84539a563f45d41edadef3e64fb970adbb2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22CART_DATA.json%22';
            break;
    }
    try{
        const res = await fetch(url);
        if(res.status !== 200) {
            alert('데이터 조회중 문제가 발생하였습니다.');
        }else{
            return res.json();
        }
    }catch(e){
        console.error(`Error : ${e}`);
        alert('문제가 발생하였습니다');
    }
}
