import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Image, Pagination } from "antd";
import noUser from "../../assets/noUser.png";
import Filter from "../common/Filter/Filter";
import { useCallback } from "react";
import { filterUser } from "../../utils/filterUser";
import SearchNotFound from "../common/SeachNotFound/SearchNotFoundPost";
import MarkedText from "../common/MarkedText/MarkedText";
import MyCarousel from "../common/MyCarousel/MyCarousel";

const { Meta } = Card;

const Users = ({ users }) => {
  const [filtredWord, setFiltredWord] = useState("");
  const [filtredUsers, setFiltredUsers] = useState([]);
  const [page, setPage] = useState(1);

  const postsPage = useCallback(
    (page, size = 5) => {
      let postByPage = [];
      for (let i = 0; i < Math.ceil(filtredUsers.length / size); i++) {
        postByPage[i] = filtredUsers.slice(i * size, i * size + size);
      }
      postByPage.length && postByPage.length < page && setPage(1);
      return postByPage[page - 1] || [];
    },
    [filtredUsers]
  );

  useEffect(() => {
    if (!filtredWord) {
      setFiltredUsers(users);
    } else {
      JSON.stringify(filterUser(users, filtredWord)) !==
        JSON.stringify(filtredUsers) &&
        setFiltredUsers(filterUser(users, filtredWord));
    }
    postsPage(page);
  }, [filtredWord, users, postsPage, page, filtredUsers]);

  const onChangeHandler = (e) => {
    setTimeout(setFiltredWord, 250, e.target.value);
  };

  return (
    <div style={{ paddingBottom: "10%" }}>
      <h1>Users</h1>
      <div>
        <MyCarousel users={users}/>
      </div>
      <div style={{ paddingTop: "15px" }}>
        <Filter onChangeHandler={onChangeHandler} placeHolder={"Name, email"} />
      </div>
      {postsPage(page).length ? (
        <div>
          {postsPage(page).map((u) => {
            return (
              <Link key={u._id} to={`/user/${u._id}`}>
                <Card
                  hoverable
                  title={<MarkedText word={u.name} filtredWord={filtredWord} />}
                  bordered={false}
                  style={{ margin: 10 }}
                >
                  <Avatar src={<Image src={u.avatar ? u.avatar : noUser} />} />

                  <p>
                    <MarkedText word={u.email} filtredWord={filtredWord} />
                  </p>

                  <Meta
                    description={
                      <p>
                        id:{" "}
                        <MarkedText word={u._id} filtredWord={filtredWord} />
                      </p>
                    }
                  />
                  <Meta
                    description={`Registreted: ${new Date(
                      u.dateCreated
                    ).toLocaleDateString()}`}
                  />
                </Card>
              </Link>
            );
          })}
          <Pagination
            size="small"
            total={filtredUsers.length}
            pageSize={5}
            onChange={(page) => {
              setPage(page);
            }}
            current={page}
          />
        </div>
      ) : (
        <SearchNotFound title={"Users not found by filter"} />
      )}
    </div>
  );
};

export default Users;
