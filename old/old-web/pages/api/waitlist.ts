import type { NextApiResponse, NextApiRequest } from "next";

const route = async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = JSON.parse(req.body);

  const url = "https://api.sendinblue.com/v3/contacts";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.SIB_API_KEY!,
    },
    body: JSON.stringify({
      email,
      updateEnabled: false,
      listIds: [5],
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default route;
