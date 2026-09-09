// src/hooks/useFetch.js
//use로 시작하면 리액트가 훅으로 인식.
import { useState, useEffect } from "react";

//외부에서 데이터를 불러올 때 성공/실패/로딩중 화면을 만드는 작업을 쉽게 하기 위한 커스텀 훅
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;               //정리용 flag
    setLoading(true);
    setError(null);

    //asynchrous: 비동기로 특정 함수를 실행하기 위한 키워드. 
    async function load() { //async: 내 인터프리터 안에서 벌어지는게 아니라 서버랑 통신하기 위해 왔다갔다 ㅏ하는 동안 이 결과값은 비워놓고 나머지들을 진행해놓을게.
      try {
        const result = await fetcher(); //데이터 가져온다
        if (alive) setData(result); //있고 동작하면 데이터자리에 뒤집어쓴다
      } catch (e) {
        if (alive) setError(e.message); //에러있으면 에러를 뒤집어쓴다
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();

    return () => { alive = false; };
  }, [reloadKey, ...deps]); // reloadKey가 없으면 처음만 마운드 되고 다시시도버튼 등 화면이 바뀌지 않음.
  //dependency: 앞키에 의존. 두번째 키는 해당 state가 변경될 때마다 새로 컴포넌트가 엘리먼트를 찍어내도록 걸어주는 변수

  const reload = () => setReloadKey((k) => k + 1);
  return { data, loading, error, reload };
}