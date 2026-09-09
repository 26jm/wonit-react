// components/AccountCard.jsx
// AccountCard의 panel에 user.name의 계좌라는 글자를 삽입 
import { useUser, UserProvider } from "../contexts/UserContext.jsx";
import StatusBadge from "./StatusBadge";
import Deposit from "./Deposit.jsx";
import { formatWon, formatWonMasked, maskAccountNo } from "../utils/format";

function AccountCard({
  accountNo,
  accountType,
  balance,
  status,
  showFullNo,
  showFullBalance,
  accountId,
  setAccounts,
  setTransactions,
}) {
  const user = useUser();

  return (
    <div className="card">
      <div className="row">
        <span className="muted">{accountType}</span>
        <span className="muted">{user.name}의 계좌</span>

        <UserProvider user={{ ...user, status }}>
          <StatusBadge />
        </UserProvider>
      </div>

      <p className="muted">
        {showFullNo ? accountNo : maskAccountNo(accountNo)}
      </p>

      <strong className="balance">
        {showFullBalance ? formatWon(balance) : formatWonMasked(balance, true)}
      </strong>

      <Deposit
        accountId={accountId}
        balance={balance}
        status={status}
        setAccounts={setAccounts}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default AccountCard;