 // /src/api/exchange.js

import { transactions } from "../data/mockData.js";

// 환율 API. 
const API_URL = "https://open.er-api.com/v6/latest/USD";

export function fetchTransactions() {
  return transactions;
}

//실제 서버는 많은 사람들의 요청을 동시에 받습니다.
//이 함수가 외부서버에 가서 결과를 받아올 때까지는 인터프리터가 기다리지 않습니다.


//async로 작성한 함수 안에서 
export async function fetchUsdKrw() {
//              await으로 걸어놓은 동작들은
// 인터프리터가 지켜보지 않습니다. 
// (await fetch(API_URL) 가 도착할 때까지 기다리지 않고 다른 함수들을 쓰는데 메모리를 쓴다. 신경쓰지 않는다.)
  const res = await fetch(API_URL); //결과값은 res에 넣는다
  if (!res.ok) throw new Error("응답 오류 " + res.status); //200번대 응답코드 아니면 에러
  const data = await res.json();
  return data.rates.KRW;
}

