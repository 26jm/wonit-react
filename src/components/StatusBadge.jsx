import { useUser } from "../contexts/UserContext.jsx";

const colors = {
  정상: "#00ff00",
  휴면: "#7a7c7a",
  지급정지: "#ff0000",
  해지: "#1f1f1f",
};

function StatusBadge() {
  const { status } = useUser();

  if (!status) return null;

  return (
    <span className="badge" style={{ backgroundColor: colors[status] }}>
      {status}
    </span>
  );
}

export default StatusBadge;