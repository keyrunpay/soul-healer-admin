import React from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnRedux } from "../../redux/helper";
import Loading from "../../components/Loading";
import { execGetList, execGetSubList } from "../../api/apis/listingManagement";
import { Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddToList from "./AddToList";
import listingDataModal from "./modal";

function ListingManagement() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.list);
  const subLists = useSelector((state) => state.subList);
  const [selectedList, setSelectedList] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);

  const fetchData = () => {
    fetchOnRedux(dispatch, "subList", execGetSubList, selectedList);
  };
  React.useEffect(() => {
    if (lists.status !== "data") fetchOnRedux(dispatch, "list", execGetList);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (lists.status === "data" && lists.data.length > 0) setSelectedList(lists.data[0]._id);
    // eslint-disable-next-line
  }, [lists.status]);

  React.useEffect(() => {
    if (selectedList && (subLists.status !== "data" || subLists.data._id !== selectedList)) fetchData();
    // eslint-disable-next-line
  }, [selectedList]);

  return (
    <div className="listing__management">
      <AddToList
        id={selectedList}
        visible={showAdd}
        onCancel={(refresh = false) => {
          setShowAdd(false);
          if (refresh === true) fetchData();
        }}
      />
      <header className="flex jcsb ci">
        <h1 className="title">Lists</h1>
        {selectedList && (
          <Button type="primary" onClick={() => setShowAdd(true)} shape="round" icon={<PlusOutlined />}>
            Add to List
          </Button>
        )}
      </header>
      <main style={{ marginTop: 10 }}>
        {lists.status === "loading" && <Loading />}
        {lists.status === "data" && (
          <Select
            style={{ width: 300 }}
            placeholder="Select a list item"
            value={selectedList}
            onChange={(val) => {
              setSelectedList(val);
            }}
          >
            {lists.data.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )}
        <br /> <br />
        {subLists.status === "loading" && <Loading />}
        {subLists.status === "error" && <p className="text red"> {JSON.stringify(subLists.data)} </p>}
        {subLists.status === "data" && (
          <DataTable
            customStyles={tableCustomStyles}
            className="data-table"
            noHeader
            title="Admin Lists"
            data={subLists.data.options}
            highlightOnHover
            columns={listingDataModal(selectedList, fetchData)}
          />
        )}
      </main>
    </div>
  );
}

export default ListingManagement;
