export const request = async (api: string)=>{
    let url = '';
    switch(api){
        case 'login':
            url = 'user.json';
            break;
        case 'getEvents':
            url = 'event.json';
            break;
        case 'getBooks':
            url = 'books.json';
            break;
        case 'getAlerts':
            url = 'alert.json';
            break;
        case 'getRents':
            url = 'rent.json';
            break;
        case 'getCarts':
            url = 'cart.json';
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

export const categories = [
    {data : 'fantasy', label : '판타지'},
    {data : 'society', label : '사회'},
    {data : 'detective', label : '추리'},
    {data : 'sf', label : 'SF'},
    {data : 'humanities', label : '인문'},
    {data : 'history', label : '역사'},
    {data : 'romance', label : '로맨스'},
    {data : 'thriller', label : '스릴러'},
]

export const translate = (str: string)=>{
    const result = [
        {from : 'novel', to : '소설'},
        {from : 'webNovel', to : '웹소설'},
        {from : 'ebook', to : 'e북'}
    ].filter(m => m.from === str);

    return result.length > 0 ? result[0].to : str; 
}

export const checkSession = ()=>{
    const user = sessionStorage.getItem('user');
    return user && JSON.parse(user) && JSON.parse(user).id;
}

export const myMenu = [
    {
        group: 'home',
        title: '마이리디 홈',
        children: []
    },
    {
        group: 'book',
        title: '책',
        children: [
            '선호작품',
            '최근 조회한 작품',
            '위시리스트',
            '독서노트',
            '신간알림',
            '이벤트 알림 설정',
        ]
    },
    {
        group: 'buy',
        title: '구매/혜택',
        children: [
            '결제 내역',
            '리디캐시',
            '리디포인트',
            '쿠폰',
        ]
    },
    {
        group: 'my',
        title: '개인',
        children: [
            '1:1문의',
            '내 기기 관리',
            '내 리뷰 관리',
            '정보 변경',
        ]
    },
]