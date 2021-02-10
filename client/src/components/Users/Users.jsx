import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Image, Pagination } from "antd";
import noUser from "../../assets/noUser.png";
import Filter from "../common/Filter/Filter";
import { useCallback } from "react";
import { filterUser } from "../../utils/filterUser";
import Text from "antd/lib/typography/Text";

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
    <div style={{paddingBottom: "5%"}}>
      <h1>Users</h1>
      <div style={{ paddingTop: "10px" }}>
        <Filter onChangeHandler={onChangeHandler} placeHolder={'Name, email'}/>
      </div>
      {postsPage(page).map((u) => {
        return (
          <Link key={u._id} to={`/user/${u._id}`}>
            <Card
              hoverable
              title={
                typeof u.name === "string"
                  ? u.name
                  : u.name &&
                    u.name.map((t, index) => {
                      return filtredWord.toLowerCase() === t.toLowerCase() ? (
                        <Text key={`${u._id}.${index}`} mark>
                          {t}
                        </Text>
                      ) : (
                        <span key={`${u._id}.${index}`}>{t}</span>
                      );
                    })
              }
              bordered={false}
              style={{ margin: 10 }}
            >
              <Avatar src={<Image src={u.avatar ? u.avatar : noUser} />} />

              <p>
                {typeof u.email === "string"
                  ? u.email
                  : u.email &&
                    u.email.map((t, index) => {
                      return filtredWord.toLowerCase() === t.toLowerCase() ? (
                        <Text key={`${u._id}.${index}`} mark>
                          {t}
                        </Text>
                      ) : (
                        <span key={`${u._id}.${index}`}>{t}</span>
                      );
                    })}
              </p>

              <Meta description={`id: ${u._id}`} />
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
  );
};

export default Users;
