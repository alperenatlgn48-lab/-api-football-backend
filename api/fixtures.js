module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return res.status(500).json({
      error: "API_FOOTBALL_KEY bulunamadı."
    });
  }

  const {
    league = "203",
    season = "2024",
    next = "5"
  } = req.query;

  async function request(url) {
    const r = await fetch(url, {
      headers: {
        "x-apisports-key": key
      }
    });

    return await r.json();
  }

  // Önce gelecek maçları dene
  let data = await request(
    `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&next=${next}`
  );

  // Eğer boş geldiyse son oynanan maçları getir
  if (
    !data.response ||
    data.response.length === 0
  ) {
    data = await request(
      `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&last=${next}`
    );
  }

  res.status(200).json(data);
};