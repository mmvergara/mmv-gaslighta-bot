import { APIInteractionResponse } from "discord-api-types/v10";
import { NextApiRequest } from "next";

type httpMethods = "PUT" | "POST" | "GET" | "DELETE";
export default function allowedMethod(req: NextApiRequest, allowedMethod: httpMethods) {
  return req.method === allowedMethod;
}

// const x = {
//   error: null,
//   inviteLink:
//     "https://discord.com/api/oauth2/authorize?client_id=1061928339230707742&permissions=277025445888&scope=bot%20applications.commands",
// };

export const newError = (errorMessage: string, errorCode: number) => {
  const newErr = new Error(errorMessage);
  //@ts-ignore
  newErr.statusCode = errorCode || 500;
  return newErr;
};

export const EmbedFailedResponse = (message?: string): APIInteractionResponse => {
  return {
    type: 4,
    data: {
      embeds: [
        {
          title: `Error occured`,
          description: message || "",
          color: 0xd93321,
        },
      ],
    },
  };
};
