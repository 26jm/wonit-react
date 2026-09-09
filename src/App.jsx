// 필요한 부품들을 불러옵니다.
import './App.css' //중복되는 요소가 있을 때 import순서에 좌우된다.
import './index.css' // 전역 스타일을 먼저 불러옵니다.
import Clock from './components/Clock.jsx'
import Panel from './components/Panel.jsx'
import AccountCard  from './components/AccountCard.jsx'
import Header from './components/Header.jsx'
import Counter from './components/Counter.jsx'
import { transactions as initialTransactions } from './data/mockData.js'
import { useState } from "react"; //쓸때마다 불러야함.
//import TransactionRow from './components/TransactionRow.jsx'
import ExchangeRate from './components/ExchangeRate.jsx'
import { formatWon } from './utils/format.js'
import TransactionList from './components/TransactionList.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import TransferForm from './components/TransferForm.jsx'

// 02_html기초.html 안에 만들었던 계좌카드의 css를 가져와서
// 아래에 있는 카드를 좀더 그럴듯하게 꾸며보세요.
// 실제로 사용될 화면을 그립니다.
function App() {
  
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  // 1. 데이터
  // 계좌 목록 (실제 서비스에서는 백엔드 DB에서 내려오는 데이터가 뿌려집니다)
  const [accounts, setAccounts] = useState([
    {
      accountId: 1,
      accountNo: "1002-345-678901", // 
      accountType: "입출금", // 
      balance: 1523000, // 
      status: "정상",
      ownerName: "김연지", // 
    },
    {
      accountId: 2,
      accountNo: "1002-345-112233",
      accountType: "적금",
      balance: 1200000,
      status: "정상",
      ownerName: "김연지",
    },
    {
      accountId: 3,
      accountNo: "1002-345-998877",
      accountType: "적금",
      balance: 397000,
      status: "휴면",
      ownerName: "김연지",
    },
  ])


// 추가: 이 state 가 바뀌고, 그 값을 props 로 받는 TransactionList가 그려집니다
//거래 내역을 처음에 한 번 전체 정보로 불러와서 여러 하위 컴포넌트를 감싼다.
  const [transactions, setTransactions] = useState(initialTransactions);

  // 추가: 이체 폼(TransferForm)에서 이체 버튼을 누르면 이 함수가 실행됩니다.
  // 계좌 잔액과 거래내역, 이 두 state 를 한 번에 갱신하는 것이 이번 세션의 핵심입니다.
  function handleTransfer({ toAccount, amount, memo }) {
    const from = accounts[0]
    const nextBalance = from.balance - amount // 출금 후의 잔액 계산


    //callback 함수로 동작 재정의
    setAccounts((prev) =>
      prev.map((a) =>
        a.accountId === from.accountId ? { ...a, balance: nextBalance } : a //ID가 0과 값 일치하면 나머지는 그대로, 잔액만 새로 계산한걸로 바꾸기
      )
    )

    setTransactions((prev) => [
      {
        txId: Date.now(),  // 현재 시간 UNIXTIME으로 timestamp
        accountId: from.accountId,
        txType: "출금",
        amount,
        balanceAfter: nextBalance,
        category: "이체",
        memo: memo || "이체",
        counterparty: toAccount,
        txDatetime: new Date().toISOString().slice(0, 19),
      },
      ...prev, // 새 거래를 맨 앞에
    ])
  }
  // 총 자산은 state로 따로 두지 않고 accounts로부터 매 렌더링마다 다시 계산합니다.
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // flag 변수: 깃발을 들어서 교통량을 제어하는 것처럼 이 변수의 역할은 특정 로직을 끄거나 켜거나 밖에 없기 때문에
  // flag 변수를 사용할 때는 default 값을 false로 만들고 시작하는 로직을 권장 
  const [showFullNo, setShowFullNo] = useState(false)
  


const [showAmount, setShowAmount] = useState(false)

// 최근 거래 목록 필터: "전체" | "입금" | "출금"
const [filter, setFilter] = useState("전체");
const visibleTransactions = filter === "전체"
  ? transactions //필터링 안함
  : transactions.filter((tx) => tx.txType === filter); //입금 출금만 걸러내기 위함

  // XML에서는 여는 꺽쇠 안의 태그가 무엇이든 될 수 있기 때문에 <이름>김연지 </이름>
  // JSX 가 소문자 태그는 HTML, 대문자로 시작하는 태그는 컴포넌트로 인식
  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.

  return (
    <>
    <UserProvider user={{ name: "김연지", grade: "우수" }}>
  <Header />

  <button onClick={() => setShowFullNo(!showFullNo)}>
    {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
  </button>

  <button onClick={() => setShowAmount(!showAmount)}>
    {showAmount ? "금액 숨기기" : "금액 보기"}
  </button>

  <Clock /> {/* class는 Js의 예약어이므로 JSX에서는 className으로 대신 사용합니다. */}
    {/* 추가 */}
    <Panel title="이체">
      <TransferForm fromAccount={accounts[0]} onTransfer={handleTransfer} />
    </Panel>
  {/*<TransferForm fromAccount={accounts[0]} onTransfer={(tx) => setTransactions([tx, ...transactions])} /> */}

  <div className="total">
    <p>총 자산</p>
    <p>{formatWon(totalBalance)}</p>
  </div>

  <Panel title="내 계좌">
    {accounts.map((acc) => (
      <AccountCard
        key={acc.accountId}
        {...acc}
        showFullBalance={showAmount}
        showFullNo={showFullNo}
        setAccounts={setAccounts}
        setTransactions={setTransactions}
      />
    ))}
  </Panel>
    {/*
    <Panel title="내 계좌">
      <p>총 자산: {formatWon(totalBalance)}</p>
      <AccountCard accountNo={accounts[0].accountNo}
                  accountType={accounts[0].accountType} 
                  balance={accounts[0].balance}
                  showFullBalance={showAmount}
                  status={accounts[0].status}
                  showFullNo={showFullNo}
                  accountId={accounts[0].accountId}
                  setAccounts={setAccounts}
                  setTransactions={setTransactions}/>


      /* 두번째 AccountCard가 출력되도록 accounts[1] dict의 값과 매핑해주세요. 
      <AccountCard accountNo={accounts[1].accountNo}
                  accountType={accounts[1].accountType} 
                  balance={accounts[1].balance}
                  showFullBalance={showAmount}
                  status={accounts[1].status}
                  showFullNo={showFullNo}
                  accountId={accounts[1].accountId}
                  setAccounts={setAccounts}
                  setTransactions={setTransactions}/>
      <AccountCard accountNo={accounts[1].accountNo}
                  accountType={accounts[1].accountType} 
                  balance={accounts[1].balance}
                  showFullBalance={showAmount}
                  status={accounts[1].status}
                  showFullNo={showFullNo}
                  accountId={accounts[1].accountId}
                  setAccounts={setAccounts}
                  setTransactions={setTransactions}/>
       세번째 AccountCard가 출력되도록 accounts[2] dict의 값과 매핑해주세요. 
      <AccountCard accountNo={accounts[2].accountNo}
                  accountType={accounts[2].accountType} 
                  balance={accounts[2].balance}
                  showFullBalance={showAmount} 
                  status={accounts[2].status}
                  showFullNo={showFullNo}
                  accountId={accounts[2].accountId}
                  setAccounts={setAccounts}
                  setTransactions={setTransactions}/>
    </Panel> */}

  {/* txType, amount, category, memo, counterparty, txDatetime, hideAmount */}

    <Panel title="최근 거래">
       <TransactionList transactions={transactions} showAmount={showAmount} />
    </Panel>
  {/* transactions.map의 끝 */}

   <Panel title="오늘의 환율">
      <ExchangeRate />
    </Panel>
    
    </UserProvider>
    </>
  );
}


// 이 컴포넌트를 외부에서 import해서 쓸 수 있도록 선언
export default App
