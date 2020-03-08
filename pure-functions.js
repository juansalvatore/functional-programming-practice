// is TOTAL (Always a returns value), otherwise it would be a PARTIAL function
const toSlug = title => {
  return new Promise((res, rej) => {
    const urlFriendly = title.replace(/\W+/gi, "-");
    if (urlFriendly < 1) {
      rej(new Error("URL too short"));
    }
    return res(urlFriendly);
  });
};

toSlug("hello");
toSlug("").catch(res => "HELLO");

// DETERMINISTIC (same return value for the same inputs)
const getDifference = (now, then) => {
  const days = Math.abs(now.getDate() - then.getDate());
  const hours = Math.abs(now.getHours() - then.getHours());
  return { days, hours };
};

// NO SIDE EFFECTS
const add = (x, y) => {
  return { result: x + y, log: `Adding ${x} ${y}` };
};
