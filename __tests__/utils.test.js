const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  articleRef,
  formatCommentData,
} = require("../db/utils/data-manipulation");

describe("testing formaTopicData", () => {
  it("shouldn't mutate the original data", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
      {
        description: "Not dogs",
        slug: "cats",
      },
    ];
    const input2 = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
      {
        description: "Not dogs",
        slug: "cats",
      },
    ];

    formatTopicData(input);

    expect(input).toEqual(input2);
  });
  it("should return an array of nested arrays from an object", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
      {
        description: "Not dogs",
        slug: "cats",
      },
    ];

    const output = [
      ["mitch", "The man, the Mitch, the legend"],
      ["cats", "Not dogs"],
    ];

    expect(formatTopicData(input)).toEqual(output);
  });
});

describe("testing formatUserData", () => {
  it("shoudn't mutate the input data", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      }];
    formatUserData(input);
    expect(input).toEqual([{
      username: "butter_bridge",
      name: "jonny",
      avatar_url:
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    },
    {
      username: "icellusedkars",
      name: "sam",
      avatar_url:
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
    }]);
  });
  it("returns an array or nested arrays matching the corect order", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
    ];
    expect(formatUserData(input)).toEqual([[
      "butter_bridge",
      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      "jonny",
    ],
    [
      "icellusedkars",
      "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      "sam",
    ]]);
  });
});

describe("testing formatArticleData", () => {
  it("doesn't mutate the data", () => {
    const input = [{
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell.",
        created_at: new Date(1602828180000),
        votes: 0,
      }];
    formatArticleData(input);
    expect(input).toEqual([{
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: new Date(1594329060000),
      votes: 100,
    },
    {
      title: "Sony Vaio; or, The Laptop",
      topic: "mitch",
      author: "icellusedkars",
      body: "Call me Mitchell.",
      created_at: new Date(1602828180000),
      votes: 0,
    },]);
  });
  it("returns a nested array of data from article data", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell.",
        created_at: new Date(1602828180000),
        votes: 0,
      },
    ];
    expect(formatArticleData(input)).toEqual([
      [
      "Living in the shadow of a great man",
      "I find this existence challenging",
      100,
      "mitch",
      "butter_bridge",
      new Date(1594329060000),
    ],
    [
      "Sony Vaio; or, The Laptop",
      "Call me Mitchell.",
      0,
      "mitch",
      "icellusedkars",
      new Date(1602828180000),
    ]]);
  });
});

describe("testing articleRef function", () => {
  it('returns an empty object, when passed an empty array', () => {
    expect(articleRef([])).toEqual({});
  });
  it('given an array of article, returns an array of article objects ', () => {
    const article = [{
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
      }];
    expect(Object.keys(articleRef(article)).length).toEqual(article.length);
    expect(typeof articleRef(article)).toEqual('object');
  });
  it("produces an object of key/value pairs from the objects provided", () => {
    const articles = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000),
      },
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: new Date(1604437200000)
      }];
    expect(articleRef(articles, "belongs_to", "body")).toEqual({ 
      " I carry a log — yes. Is it funny to you? It is not to me." : "Living in the shadow of a great man",
      "I hate streaming noses": "Living in the shadow of a great man"});
  });
  it('returned object has different reference to original object from array', () => {
    const article = [{
      body: " I carry a log — yes. Is it funny to you? It is not to me.",
      belongs_to: "Living in the shadow of a great man",
      created_by: "icellusedkars",
      votes: -100,
      created_at: new Date(1582459260000)}]
      expect(articleRef(article)[0]).not.toBe(article[0])
  });
  it("doesn't mutate the original input", () => {
    const article = [{
      body: " I carry a log — yes. Is it funny to you? It is not to me.",
      belongs_to: "Living in the shadow of a great man",
      created_by: "icellusedkars",
      votes: -100,
      created_at: new Date(1582459260000),
    }];
    articleRef(article, "body", "belongs_to")
    expect(article).toEqual([{
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000)
      }]);
  });
});

describe("testing formatCommentData", () => {
  it("should return an array with nested arrays when passed an array with nested objects", () => {
    const input = [{}, {}];
    const output = [[], []];
    const testArticleRef = { number: 1, colour: "red" };
    expect(formatCommentData(input, testArticleRef)).toEqual(output);
  });
  it("should return nested arrays from objects with key/value pairs", () => {
    const input = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000),
      },
    ];
    const output = [
      [
        "icellusedkars",
        1,
        -100,
        new Date(1582459260000),
        " I carry a log — yes. Is it funny to you? It is not to me.",
      ],
    ];
    const testArticleRef = {
      "Living in the shadow of a great man": 1,
      colour: "red",
    };
    expect(formatCommentData(input, testArticleRef)).toEqual(output);
  });
  it("should swap out key names with if required", () => {
    const input = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000),
      },
    ];
    const testArticleRef = {
      "Living in the shadow of a great man": 1,
      colour: "red",
    };

    const output = [
      [
        "icellusedkars",
        1,
        -100,
        new Date(1582459260000),
        " I carry a log — yes. Is it funny to you? It is not to me.",
      ],
    ];

    expect(formatCommentData(input, testArticleRef)).toEqual(output);
  });
  it("doesnt mutate the original entry", () => {
    const input1 = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000),
      },
    ];

    const input2 = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: new Date(1582459260000),
      },
    ];
    const testArticleRef = {
      "Living in the shadow of a great man": 1,
      colour: "red",
    };

    formatCommentData(input1, testArticleRef);

    expect(input1).toEqual(input2);
  });
});
