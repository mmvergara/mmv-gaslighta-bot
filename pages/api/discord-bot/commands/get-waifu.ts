import { APIApplicationCommandInteraction, APIInteractionResponse } from "discord-api-types/v10";
import { SlashCommandBuilder } from "@discordjs/builders";
import { AxiosResponse } from "axios";
import { discord_api } from "services/discord-api";

export const register = new SlashCommandBuilder()
  .setName("get-waifu")
  .setDescription("Returns a waifu")
  .addBooleanOption((option) => option.setName("is-nswf").setDescription("is nsfw?"));

export const execute = async (interaction: APIApplicationCommandInteraction): Promise<APIInteractionResponse> => {
  const data = interaction.data as any;
  let is_nsfw = false;
  if (data?.options) {
    is_nsfw = data.options[0]?.value;
  }

  const fetchWaifu = (await discord_api.get(
    `https://api.waifu.im/search/?is_nsfw=${is_nsfw}`
  )) as AxiosResponse<WaifuImages>;
  return {
    type: 4,
    data: {
      flags: is_nsfw ? 1 << 6 : 0,
      embeds: [
        {
          title: "",
          description: `[Sauce](${fetchWaifu.data.images[0].source}) 🥂`,
          color: 0x00ffff,
          image: {
            url: fetchWaifu.data.images[0].url,
            height: 0,
            width: 0,
          },
        },
      ],
    },
  };
};

interface Images {
  signature: string;
  extension: string;
  image_id: number;
  favourites: number;
  dominant_color: string;
  source: string;
  uploaded_at: string;
  liked_at: null | string;
  is_nsfw: boolean;
  width: number;
  height: number;
  url: string;
  preview_url: string;
  tags: Array<{
    tag_id: number;
    name: string;
    description: string;
    is_nsfw: boolean;
  }>;
}

interface WaifuImages {
  images: Images[];
}
