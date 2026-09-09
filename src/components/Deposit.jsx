// components/Deposit.jsx
// accountId로 대상 계좌를 찾아 1만원을 더하고, 거래 내역도 함께 기록합니다.
function Deposit({ accountId, balance, status, setAccounts, setTransactions }) {
  const handleDeposit = () => {
    const newBalance = balance + 10000;

    setAccounts(prev =>
      prev.map(acc => (acc.accountId === accountId ? { ...acc, balance: newBalance } : acc))
    );

    const newTx = {
      txId: Date.now(), // 간단히 현재 시각을 고유 id로 사용
      accountId,
      txType: "입금",
      amount: 10000,
      balanceAfter: newBalance,
      category: "이체",
      memo: "1만원 입금",
      counterparty: "본인",
      txDatetime: new Date().toISOString(),
    };
    setTransactions(prev => [newTx, ...prev]); // 최신 거래가 맨 위로
  };

  return (
    <button onClick={handleDeposit} disabled={status !== "정상"}>
      1만원 입금
    </button>
  );
}

export default Deposit;
