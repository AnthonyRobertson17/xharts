const dummyData = {
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
        "revision": 9,
        "vendor": {
          "jitter": 1,
          "compression_factor": {
            "decimal": 0.23,
            "percent": 23
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 3,
          "compression_factor": {
            "decimal": 1.5,
            "percent": 150
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 2,
          "compression_factor": {
            "decimal": 1.5,
            "percent": 150
          }
        }
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
        "revision": 7,
        "vendor": {
          "jitter": 6,
          "compression_factor": {
            "decimal": 0.5,
            "percent": 50
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 11,
          "compression_factor": {
            "decimal": 1.12,
            "percent": 112
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 11,
          "compression_factor": {
            "decimal": 1.5,
            "percent": 150
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 10,
          "compression_factor": {
            "decimal": 1.33,
            "percent": 133
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 7,
          "compression_factor": {
            "decimal": 0.5,
            "percent": 50
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 7,
          "compression_factor": {
            "decimal": 0.4,
            "percent": 40
          }
        }
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
        "revision": 9,
        "vendor": {
          "jitter": 3,
          "compression_factor": {
            "decimal": 0.43,
            "percent": 43
          }
        }
      },
      "created_at": "2019-12-24T17:41:58.921534",
      "updated_at": "2019-12-24T17:41:58.921534"
    }
  ],
  meta: {
    total: 10,
    page: 0
  }
};

const dateToQuery = (date) => date.toISOString().slice(0, -5);

class BackendAdapter {

  getInitialDummyData() {
    return Promise.resolve(dummyData);
  }

  getInitialData() {
    return fetch(`/metrics`)
      .then(res => res.json())
      .then(data => {
        return { data };
      });
  }

  getFilteredData(filters) {
    if (filters.mock) return Promise.resolve(dummyData);

    const { startDatetime, endDatetime } = filters;
    let url = "/metrics";

    if (startDatetime || endDatetime) {
      let params = new URLSearchParams();

      startDatetime && params.set('start_datetime', startDatetime);
      endDatetime && params.set('end_datetime', endDatetime);

      url += '?' + params.toString();
    }

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return { data };
      });
  }

  query(filters) {
    const { startDatetime, endDatetime, metricName, metricType } = filters;
    let url = `/metrics/${metricType}?`;

    let params = new URLSearchParams();

    params.set('start_datetime', startDatetime);
    params.set('end_datetime', endDatetime);
    params.set('metric_name', metricName);
    params.set('bucket_count', 1);

    url += "&" + params.toString();

    return fetch(url)
      .then(res => res.json());
  }

  queryCount(filters) {
    if (filters.mock) {
      return Promise.resolve({
        data: {
          buckets: [{
            value: Math.floor(Math.random() * 100),
            bucket: "random bucket name"
          }]
        }
      });
    }

    return this.query({ ...filters, metricType: "count" });
  }
};

export default new BackendAdapter();

export { dateToQuery };
