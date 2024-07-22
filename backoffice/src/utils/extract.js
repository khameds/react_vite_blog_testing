export const extract = (data) => {
  const users = {};

  data.forEach((article) => {
    article.comments.forEach((comment) => {
      const userId = comment.user_id;
      if (!users[userId]) {
        users[userId] = {
          user_info: comment.user_info,
          user_email: comment.user_email,
          user_pseudo: comment.user_pseudo,
          user_status: comment.user_status,
          user_avatar: comment.user_avatar,
          comment_count: 0,
          article_count: new Set(),
        };
      }
      users[userId].comment_count += 1;
      if (userId === article.userId) {
        users[userId].article_count.add(article.article_id);
      }
    });
  });

  return Object.keys(users).map((userId) => {
    return {
      user_id: parseInt(userId),
      user_info: users[userId].user_info,
      user_email: users[userId].user_email,
      user_pseudo: users[userId].user_pseudo,
      user_status: users[userId].user_status,
      user_avatar: users[userId].user_avatar,
      comment_count: users[userId].comment_count,
      article_count: users[userId].article_count.size,
    };
  });
};
