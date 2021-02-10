const filterByWord = (posts, filterWord) => {
  return posts.filter((p) => {
    const title = p.title;
    const description = p.description;
    const reg = new RegExp(`${filterWord}`, "i");

    return reg.test(title) || reg.test(description);
  });
};

const filtredAndMarkedFunc = (filteredPosts, filterWord) => {
  return filteredPosts.map((p) => {
    const reg2 = new RegExp(`(${filterWord})`, "gi");

    const titleReg = p.title.split(reg2);
    const descriptionReg = p.description.split(reg2);

    return {
      dateCreated: p.dateCreated,
      description: descriptionReg,
      fullText: p.fullText,
      postedBy: p.postedBy,
      title: titleReg,
      _id: p._id,
    };
  });
};

export const filterPost = (
  posts,
  filterWord,
  isMyPosts = false,
  userId = ""
) => {
  try {
    const filteredPosts = filterByWord
      ? filterByWord(posts, filterWord)
      : posts;

    const filtredAndMarked = filterWord
      ? filtredAndMarkedFunc(filteredPosts, filterWord)
      : filteredPosts;
    if (isMyPosts) {
      return filtredAndMarked.filter((p) => {
        return p.postedBy === userId;
      });
    }

    return filtredAndMarked;
  } catch (error) {
    console.log("error from filter",error);
    return posts;
  }
};
