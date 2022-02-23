const getCommentData = (res: any) => {
  const [selectData, commentData] = res;
  const result = commentData.comments.map((comment: any) => {
    const createBy = selectData.selectData.find(
      (user: any) => comment.createBy === user.key
    );
    return { ...comment, name: createBy ? createBy.value : null };
  });
  return { comments: result, nextPageToken: commentData.nextPageToken };
};

const createCommentData = (res: any, createBy: any) => {
  const [userData, commentData] = res;
  let newComment;
  userData.users.forEach((user: any) => {
    let name;
    if (user.name === createBy) {
      name = {
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } else {
      name = {};
    }
    newComment = {
      ...commentData,
      name,
    };
  });
  return newComment;
};

export { createCommentData, getCommentData };
