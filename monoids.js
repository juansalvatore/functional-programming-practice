const findColor = name =>
  ({ red: "red!", blue: "blue!", green: "green!" }[name]);

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`
});

const fromNullable = x => (x != null ? Right(x) : Left());
const findColor2 = name =>
  fromNullable({ red: "red!", blue: "blue!", green: "green!" }[name]);

findColor2("red")
  .map(x => x.toUpperCase())
  .map(x => x.slice(1))
  .fold(
    err => err,
    data => data
  );

const getPort_ = () => {
  try {
    const str = fs.readFileSync("config.json");
    const config = JSON.parse(str);
    return config.port;
  } catch (e) {
    return 3000;
  }
};
const fs = { readFileSync: () => {} };
const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const parseJSON = contents => tryCatch(() => JSON.parse(contents));
const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json"))
    .chain(parseJSON)
    .map(config => config.port)
    .fold(
      () => 8080,
      x => x
    );
getPort();
