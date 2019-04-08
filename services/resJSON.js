module.exports = ({res, data = null, msg, code = 200, success = true}) => {
  const result = {data, msg, code, success};
  return res.json(result)
}