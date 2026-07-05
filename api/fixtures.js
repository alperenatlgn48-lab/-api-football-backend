module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const key = process.env.API_FOOTBALL_KEY;
  const league = req.query.league || "39";
  const season = req.query.season || "2024";

  const from = `${season}-08-01`;
  const to = `${season}-08-31`;

  const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&from=${from}&to=${to}`;

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": key
    }
  });

  const data = await response.json();
  res.status(200).json(data);
};