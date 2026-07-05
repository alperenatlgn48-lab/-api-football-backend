export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { team, league = "203", season = new Date().getFullYear() } = req.query;

    if (!team) {
      return res.status(400).json({
        success: false,
        error: "team parametresi gerekli. Örnek: /api/team-stats?team=645&league=203&season=2025"
      });
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/teams/statistics?team=${team}&league=${league}&season=${season}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY
        }
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}