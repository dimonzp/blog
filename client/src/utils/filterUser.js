const filterByWord = (users, filterWord) => {
  return users.filter((u) => {

    const name = u.name;
    const email = u.email;
    const _id = u._id;
    const reg = new RegExp(`${filterWord}`, "i");
    
    return reg.test(name) || reg.test(email) || reg.test(_id);
  });
};

const filtredAndMarkedFunc = (filteredPosts, filterWord) => {
  return filteredPosts.map((u) => {
    const reg2 = new RegExp(`(${filterWord})`, "gi");

    const nameReg = u.name.split(reg2);
    const emailReg = u.email.split(reg2);
    const idReg = u._id.split(reg2);
    return {
        _id: idReg,
        email: emailReg,
        name: nameReg,
        avatar: u.avatar,
        dateCreated: u.dateCreated
    };
  });
};

export const filterUser = (
  users,
  filterWord,
  
) => {
  try {
    const filteredUsers = filterWord
      ? filterByWord(users, filterWord)
      : users;

    const filtredAndMarked = filterWord
      ? filtredAndMarkedFunc(filteredUsers, filterWord)
      : filteredUsers;


    return filtredAndMarked;
  } catch (error) {
    console.log("error from filter",error);
    return users;
  }
};
