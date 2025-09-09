// netlify/functions/airtable.js
export async function handler(event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK",
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://api.airtable.com/v0/appRjxeEcdwiHAsMo/tblLJvrMtXCG37ab7", {
      method: "POST",
      headers: {
        // patIi3m7f0iFjvv30.3b724ca88dd9a5b2aca963309818279ca256a753fb47f24d48f791efa3c19257
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
            "Campaign Name":body.name,
            "Objective": body.email,
            "Budget": body.message,
            "Start Date": "2025-09-10",
            "End Date": "2025-09-15",
            "Status": "Planned"
        },
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
}