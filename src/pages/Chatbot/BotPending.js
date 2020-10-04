import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOnRedux } from "../../redux/helper";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/table";
import Loading from "../../components/Loading";
import { execGetBotPending } from "../../api/apis/adminManagement";
import pendingModal from "./pendingModal";
import BotTriggerAdd from "./BotTriggerAdd";

export default function BotPending(props) {
  const state = useSelector((state) => state.bot_pending);
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = React.useState(null);
  const fetchData = () => {
    fetchOnRedux(dispatch, "bot_pending", execGetBotPending);
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sales__page">
      <BotTriggerAdd
        visible={showAdd}
        payload={showAdd}
        onClose={(refresh = false) => {
          setShowAdd(null);
          if (refresh === true) {
            fetchData();
            props.onSuccess();
          }
        }}
      />
      {state.status === "loading" && <Loading />}
      {state.status === "error" && <p className="text red"> {JSON.stringify(state.data)} </p>}
      {state.status === "data" && (
        <DataTable
          customStyles={tableCustomStyles}
          className="data-table"
          noHeader
          highlightOnHover
          responsive={true}
          defaultSortField="_id"
          data={state.data}
          columns={pendingModal(setShowAdd)}
        />
      )}
    </div>
  );
}
