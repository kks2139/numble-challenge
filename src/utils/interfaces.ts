export interface User {
    id: string
    name: string
    emailAddr: string
    emailAuthorized: string
    adult: string
}

export interface Event {
    thumbnail: string
    details: string
}

export interface Alert {
    date: string // yyyy-mm-dd
    type: string
    content: string
}

export interface Author {
    name: string
    awards: string[]
    representatives: {
        name: string
        thumbnail: string
    }[],
    introduction: string
}

export interface Translator {
    name: string
    nationality: string
    career: string[]
    representatives: {
        name: string
        thumbnail: string
    }[],
    introduction: string
}

export interface StarRate {
    rate: number
    rateNum: number // 별점 참여자 수
    rateBuyerNum: number // 별점 참여자 중 구매자 수
}

export interface Book {
    id: number
    thumbnail: string
    type: string // novel, ebook, webNovel
    category: string[] // romance, fantasy, humanities, thriller, detective, society, history, sf
    title: string
    author: Author
    translator: Translator
    publisher: string
    starRate: StarRate
    rentalPrice: number
    rentalSalePercent: number
    buyPrice: number
    buySalePercent: number
    count: number // 총 권 수
    freeCount: number // 무료 권 수. count보다 큰 경우는 전권 무료입니다.
    isFinished: boolean
    canRent: boolean // canRent 항목의 우선 순위가 rentalPrice, rentalSalePrice보다 높습니다.
    waitFree: boolean
    xRated: boolean
    description: string[]
    index: string[]
}

export interface BookData extends Book {
    lastlyRead: string // yyyy-mm-dd
}

export interface RentData extends Book {
    rentEnd: string // yyyy-mm-dd
}

export interface BookType {
    type: string
    selected: boolean
}

export interface IconInfo {
    title: string
    color: string
    cont?: string | HTMLOrSVGElement
}
