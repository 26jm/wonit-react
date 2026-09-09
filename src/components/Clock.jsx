//1. import 구문
import { useState, useEffect } from "react";
//만들어놓은 훅 데려오기

//2. function 동자 작성
//3. 함수혀 컴포넌트 자체
//일반 함수와 구분해서 JSX에서 이해하도록
//대문자로 시작하는 파스칼 케이스를 따른다.


{/* function Clock() {
  const now = new Date();
  return <span>{now.toLocaleTimeString("ko-KR")}</span>;
} */}



function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    console.log(id);
    return () => clearInterval(id);   // 정리 함수 (amount)
  }, []); //뒤에 빈 배열을 넣으면 컴포넌트가 마운트될 때만 실행됨. 
  // 빈배열을 없애면 매 렌더링마다 타이머를 만들어서 지운다음 실행. 콘솔에 찍힘. 메모리 누수.
  //그래서 정리함수를 두면 메모리 누수를 방지할 수 있다.

  return <span className="muted">{now.toLocaleTimeString("ko-KR")}</span>;
}



export default Clock; 