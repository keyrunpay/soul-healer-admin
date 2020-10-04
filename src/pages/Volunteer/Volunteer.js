import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnRedux } from "../../redux/helper";
import { execGetVolunteers } from "../../api/apis/adminManagement";
import Loading from "../../components/Loading";
import adminDataModal from "./modal";
import AddAdmin from "./AddAdmin";

function Volunteer() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const [showAdd, setShowAdd] = React.useState(false);

  const fetchData = () => {
    fetchOnRedux(dispatch, "admin", execGetVolunteers);
  };

  React.useEffect(() => {
    if (state.status !== "data") fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="admin__management">
      <AddAdmin
        visible={showAdd}
        onCancel={(refresh = false) => {
          setShowAdd(false);
          if (refresh === true) fetchData();
        }}
      />

      <header className="flex jcsb ci">
        <h1 className="title">Volunteer</h1>
        <Button
          onClick={() => {
            setShowAdd(true);
          }}
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
        >
          Add Volunteer
        </Button>
      </header>
      <br />
      <main>
        {state.status === "loading" && <Loading />}
        {state.status === "error" && <p className="text red"> {JSON.stringify(state.data)} </p>}
        {state.status === "data" && (
          <DataTable
            customStyles={tableCustomStyles}
            className="data-table"
            noHeader
            highlightOnHover
            responsive={true}
            data={state.data}
            columns={adminDataModal(fetchData)}
          />
        )}
      </main>
    </div>
  );
}

export default Volunteer;
