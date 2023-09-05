const data = {
  post: {
    text: "This is a sample post.",
    likes: 5,
  },
};

export const getPostData = () => {
  return new Promise((resolve) => {
    // Simulate asynchronous operations, such as getting data from the server
    setTimeout(() => {
      resolve(data);
    }, 1000); // 1 second delay, simulate network request
  });
};
