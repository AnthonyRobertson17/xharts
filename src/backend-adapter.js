const BackendAdapter = {
  getAllData: () => {
    return Promise.resolve({
      data: [
        { datetime: "2019-11-01T19:53:06.875Z", data: { value: 4 } },
        { datetime: "2019-11-02T19:53:06.875Z", data: { value: 3 } },
        { datetime: "2019-11-03T19:53:06.875Z", data: { value: 9 } },
        { datetime: "2019-11-04T19:53:06.875Z", data: { value: 4 } },
        { datetime: "2019-11-05T19:53:06.875Z", data: { value: 4 } },
        { datetime: "2019-11-06T19:53:06.875Z", data: { value: 2 } },
        { datetime: "2019-11-07T19:53:06.875Z", data: { value: 1 } },
        { datetime: "2019-11-08T19:53:06.875Z", data: { value: 0 } },
        { datetime: "2019-11-09T19:53:06.875Z", data: { value: 7 } },
        { datetime: "2019-11-10T19:53:06.875Z", data: { value: 4 } },
      ],
      meta: {
        total: 10,
        page: 0
      }
    });
  },

  getFiltered: (filters) => {
    return Promise.resolve({
      data: [],
      meta: {
        total: 0,
        page: 1
      }
    });
  }
}

export default BackendAdapter