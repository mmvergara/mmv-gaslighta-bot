import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  RESTGetAPIApplicationCommandsResult,
} from "discord-api-types/v10";
import { CLIENT_APPLICATION_ID } from "config";
import { SlashCommandBuilder } from "@discordjs/builders";
import { AxiosResponse } from "axios";
import { discord_api } from "services/discord-api";

export const register = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Returns a list of registered commands");

const x = {
  images: [
    {
      signature: "fb7842d433b6f789",
      extension: ".jpg",
      image_id: 6768,
      favourites: 1,
      dominant_color: "#d8bcba",
      source: "https://www.pixiv.net/artworks/93109788",
      uploaded_at: "2021-11-02T12:16:19.048684+01:00",
      liked_at: null,
      is_nsfw: false,
      width: 2402,
      height: 3602,
      url: "https://cdn.waifu.im/6768.jpg",
      preview_url: "https://www.waifu.im/preview/6768/",
      tags: [{ tag_id: 12, name: "waifu", description: "A female anime/manga character.", is_nsfw: false }],
    },
  ],
};
export const execute = async (interaction: APIApplicationCommandInteraction): Promise<APIInteractionResponse> => {
  const fetchCommands = (await discord_api.get(
    `/applications/${CLIENT_APPLICATION_ID}/commands`
  )) as AxiosResponse<RESTGetAPIApplicationCommandsResult>;
  const fields = fetchCommands.data.map((c) => {
    return { name: "/" + c.name, value: c.description + "\n \u200b" };
  });

  return {
    type: 4,
    data: {
      embeds: [
        {
          color: 0x34d9d9,
          title: "Here are the list of registered commands \n \u200b",
          fields: fields,
        },
      ],
    },
  };
};


