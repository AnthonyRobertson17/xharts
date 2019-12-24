const BackendAdapter = {
  getAllData: () => {
    return Promise.resolve({
      data: [
        {
          "id": 1,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 9,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:38:39.560041",
          "updated_at": "2019-12-24T17:38:39.560041"
        },
        {
          "id": 2,
          "metric_name": "dat",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 9,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:39:15.176718",
          "updated_at": "2019-12-24T17:39:15.176718"
        },
        {
          "id": 3,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 10,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:39:39.376640",
          "updated_at": "2019-12-24T17:39:39.376640"
        },
        {
          "id": 4,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 3,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:40:42.498604",
          "updated_at": "2019-12-24T17:40:42.498604"
        },
        {
          "id": 5,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 4,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:04.491320",
          "updated_at": "2019-12-24T17:41:04.491320"
        },
        {
          "id": 6,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 3,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:09.888987",
          "updated_at": "2019-12-24T17:41:09.888987"
        },
        {
          "id": 7,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 8,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:13.688332",
          "updated_at": "2019-12-24T17:41:13.688332"
        },
        {
          "id": 8,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 4,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:40.985647",
          "updated_at": "2019-12-24T17:41:40.985647"
        },
        {
          "id": 9,
          "metric_name": "dat",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 5,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:47.353822",
          "updated_at": "2019-12-24T17:41:47.353822"
        },
        {
          "id": 10,
          "metric_name": "who",
          "data": {
            "cloud": "gcp",
            "cluster": "alpha-1",
            "decimal_revision": 9,
            "latency": 9,
            "release": "1911.1.0",
            "revision": 9
          },
          "created_at": "2019-12-24T17:41:58.921534",
          "updated_at": "2019-12-24T17:41:58.921534"
        }
      ],
      meta: {
        total: 10,
        page: 0
      }
    });
  },

  getFilteredData: (filters) => {
    if (filters) {
      const { dates } = filters;
      const startDatetime = dates[0].toISOString().slice(0, -5);
      const endDatetime = dates[1].toISOString().slice(0, -5);
      return fetch(`/metrics?start_datetime=${startDatetime}&end_datetime=${endDatetime}`)
        .then(res => res.json())
        .then(res => {
          console.log(res); return res;
        });
    }

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
