import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOnRedux } from "../../redux/helper";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/table";
import salesDataModal from "./modal";
import Loading from "../../components/Loading";
import { execGetBotTriggers } from "../../api/apis/adminManagement";
import BotTriggerEdit from "./BotTriggerEdit";

export default function BotTriggers(props) {
  const state = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = React.useState(null);

  const fetchData = () => {
    fetchOnRedux(dispatch, "sales", execGetBotTriggers);
  };
  console.log(state);
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sales__page">
      <BotTriggerEdit
        visible={showEdit}
        payload={showEdit}
        onClose={(refresh = false) => {
          setShowEdit(null);
          if (refresh === true) fetchData();
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
          columns={salesDataModal(setShowEdit)}
        />
      )}
    </div>
  );
}
