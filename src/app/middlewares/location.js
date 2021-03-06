const location = (req, res, next) => {
  const { countrycode, regionid } = req.headers;

  req.countryCode = countrycode;
  req.regionId = regionid;

  return next();
};

export default location;
