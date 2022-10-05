import { useState, useEffect, useMemo, ChangeEvent } from "react";
import UserInfoComponent from "./UserInfoComponent";
import StatusComponent from "./StatusComponent";
import TransactionComponent from "./TransactionComponent";
import { formatDate, formatDateTime } from "../../helper/date";
import * as _ from "lodash";

import "./index.scss";

interface IUserData {
  id: string;
  name: string;
  status: string;
  email: string;
  userName: string;
  avatar: string;
  joinedAt: string;
  lastLogin: string;
  bio: string;
}

enum ORDERBY {
  ASC,
  DESC,
}

interface ISortBy {
  id: string;
  orderby: ORDERBY;
}

const HeaderTitles = [
  "User",
  "Name",
  "Joined On",
  "Last Login",
  "Transaction / Balance",
  "Status",
  "Bio",
];

const HeaderTitlesName = [
  "userName",
  "name",
  "joinedAt",
  "lastLogin",
  "",
  "status",
  "bio",
];

const CustomerTable = () => {
  const [userData, setUserData] = useState<IUserData[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const [sortBy, setSortBy] = useState<ISortBy>();

  const fetchUserData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.log("Data fetching failed");
    }
  };

  const handleNextPage = () => {
    if (offset < userData.length - 5) setOffset((offset) => offset + 5);
  };

  const handlePrevPage = () => {
    if (offset >= 5) setOffset((offset) => offset - 5);
  };

  const handleHeaderClick = (handleName: string) => {
    if (sortBy?.id === handleName)
      setSortBy((sortBy) => ({
        id: handleName,
        orderby: sortBy?.orderby === ORDERBY.ASC ? ORDERBY.DESC : ORDERBY.ASC,
      }));
    else {
      setSortBy({
        id: handleName,
        orderby: ORDERBY.ASC,
      });
    }
  };

  const handlePageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt?.target?.value);
    if (value > 0 && value <= userData.length) setOffset(value - 1);
  };

  const sortedUserData = useMemo(() => {
    let newData = [...userData];
    if (sortBy?.id) {
      newData = _.sortBy(newData, sortBy.id);
    }
    if (sortBy?.orderby === ORDERBY.DESC) newData.reverse();

    return newData;
  }, [sortBy, userData]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderRow = (data: IUserData) => (
    <tr>
      <td>
        <UserInfoComponent {...data} />
      </td>
      <td>{data.name}</td>
      <td>{formatDate(data.joinedAt)}</td>
      <td>{formatDateTime(data.lastLogin)}</td>
      <td>
        <TransactionComponent inValue={500} outValue={-200} />
      </td>
      <td>
        <StatusComponent status={data.status} />
      </td>
      <td>{data.bio}</td>
    </tr>
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {HeaderTitles.map((title, index) => (
              <th
                key={index}
                onClick={() => handleHeaderClick(HeaderTitlesName[index])}
              >
                {title}{" "}
                {sortBy?.id === HeaderTitlesName[index]
                  ? sortBy.orderby === ORDERBY.ASC
                    ? `↓`
                    : `↑`
                  : ``}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUserData
            .slice(offset, offset + 5)
            .map((userInfo, index) => renderRow(userInfo))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={handlePrevPage}>Prev</button>
        <div>
          <input
            type="number"
            value={offset + 1}
            className="page-input"
            onChange={handlePageChange}
          />{" "}
          - {Math.min(offset + 5, userData.length)} / {userData.length}
        </div>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default CustomerTable;
